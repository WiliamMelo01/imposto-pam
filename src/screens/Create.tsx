import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import FormError from "../components/FormError";
import Input from "../components/Input";
import MySnack from "../components/MySnack";
import { UserData } from "../components/UserData";
import { primaryColor, white } from "../constants/Colors";
import { UserService } from "../services/User.service";
import { IUser } from "../types/user";

export default function CreateSCreen() {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  //Schema for validation
  const schema = z
    .object({
      name: z.string().min(4, "O nome deve contem pelo menos 4 caracteres"),
      email: z.string().email("E-mail invalido"),
      income: z.coerce.number().min(0),
    })
    .required();

  type formType = z.infer<typeof schema>;

  // React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    defaultValues: {
      name: "",
      email: "",
      income: 0,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: formType) => {
    const userService = new UserService();
    const user = await userService.create(
      data.name,
      data.email,
      data.income,
      setSuccess,
      setError
    );
    setUserData(user);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="e.g. Jõao"
            label="Nome Completo"
            type="text"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="name"
      />

      {errors.name && <FormError error={errors.name.message as string} />}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="e.g. joao@gmail.com"
            label="E-mail"
            type="text"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="email"
      />

      {errors.email && <FormError error={errors.email.message as string} />}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="e.g. 1320.00"
            label="Renda Mensal"
            type="numeric"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="income"
      />

      {errors.income && <FormError error={errors.income.message as string} />}

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {userData && (
        <View style={styles.center}>
          <UserData user={userData} full />
        </View>
      )}

      {success && (
        <MySnack
          text="Usuário cadastrado com sucesso."
          type="SUCCESS"
          onDismiss={() => setSuccess(false)}
          visible={success}
        />
      )}

      {error && (
        <MySnack
          text="Erro ao cadastrar usuário."
          type="ERROR"
          onDismiss={() => setSuccess(false)}
          visible={error}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: white,
    gap: 15,
    marginTop: 20,
  },
  button: {
    backgroundColor: primaryColor,
    width: "85%",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: white,
    fontWeight: "bold",
    letterSpacing: 3,
  },
  center: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
  },
});
