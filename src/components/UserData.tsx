import { StyleSheet, Text, View } from "react-native";
import { secondaryColor, white } from "../constants/Colors";
import { IUser } from "../types/user";

interface IUserDataProps {
  user: IUser;
  full?: boolean
}

export function UserData({ user, full  = false}:IUserDataProps) {
  const labels = [
    "ID",
    "Nome",
    "E-mail",
    "Renda Mensal",
    "Aliquota",
    "Taxa Mensal",
  ];

  const values = Object.values(user);

  return (
    <View style={[styles.container, {
      width: full ? '100%' : "90%"
    }]}>
      {labels.map((label, index) => {
        const text =
          index === labels.length - 1 || index === labels.length - 3
            ? moneyFormater(values[index])
            : values[index];
        return (
          <View style={styles.row}>
            <Text style={styles.title}>{`${label}: `}</Text>
            <Text>{text}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: white,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: secondaryColor,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
  },
  title: {
    fontWeight: "bold",
  },
});

function moneyFormater(money: string) {
  return Number(
    money.toString().split("BRL")[0].replaceAll(/\s/g, "").replaceAll(/,/g, ".")
  ).toLocaleString("BR", {
    style: "currency",
    currency: "BRL",
  });
}
