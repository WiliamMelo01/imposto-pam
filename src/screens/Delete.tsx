import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { z } from "zod";
import Input from "../components/Input";
import MySnack from "../components/MySnack";
import { primaryColor, white } from "../constants/Colors";
import { UserService } from "../services/User.service";

export default function DeleteScreen() {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  //Schema for validation
  const schema = z
    .object({
      id: z.string().uuid(),
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
      id: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: formType) => {
    const userService = new UserService();

    await userService.delete(data.id, setSuccess, setError);

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
            placeholder="e.g.  
            43489180-21ef-4ac1-833e-895789498f4c"
            label="ID do usuário"
            type="text"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="id"
      />

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Deletar</Text>
      </TouchableOpacity>

      {success && (
        <MySnack
          text="Usuário deletado com sucesso."
          type="SUCCESS"
          onDismiss={() => setSuccess(false)}
          visible={success}
        />
      )}

      {error && (
        <MySnack
          text="Erro ao deletar usuário."
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
