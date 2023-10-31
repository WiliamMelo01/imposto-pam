import { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { IUser } from "../types/user";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserService } from "../services/User.service";
import Input from "../components/Input";
import FormError from "../components/FormError";
import { primaryColor, white } from "../constants/Colors";
import { UserData } from "../components/UserData";
import MySnack from "../components/MySnack";

export default function UpdateScreen() {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  //Schema for validation
  const schema = z
    .object({
      name: z
        .string()
        .min(4, "O nome deve contem pelo menos 4 caracteres")
        .optional()
        .or(z.literal("")),
      email: z.string().email("E-mail invalido").optional().or(z.literal("")),
      income: z.coerce.number().min(0).optional().or(z.literal(0)),
      id: z.string().uuid("ID invalido"),
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
      id: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: formType) => {
    const _userService = new UserService();

    const updatedUser = await _userService.update(
      data.id,
      setSuccess,
      setError,
      data.name,
      data.email,
      data.income
    );

    setUserData(updatedUser);
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
            placeholder="e.g. 5151bb95-1abb-49ca-ac8e-c65944714491"
            label="ID do usuário"
            type="text"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="id"
      />

      {errors.id && <FormError error={errors.id.message as string} />}

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
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>

      {userData && <UserData user={userData} />}

      {success && (
        <MySnack
          text="Usuário atualizado com sucesso."
          type="SUCCESS"
          onDismiss={() => setSuccess(false)}
          visible={success}
        />
      )}

      {error && (
        <MySnack
          text="Erro ao atualizar usuário."
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
