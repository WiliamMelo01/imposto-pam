import { useFocusEffect } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { isTemplateExpression } from "typescript";
import { UserData } from "../components/UserData";
import { UserService } from "../services/User.service";
import { IUser } from "../types/user";

export default function ListScreen() {
    const [users, setUsers] = useState<IUser[]>([]);

    useFocusEffect(() => {
        (async () => {
            const usersService = new UserService();

            const users = await usersService.getAll();

            setUsers([...users]);

        })();
    });

  return <View style={styles.container}>
      <FlatList
      data={users}
      keyExtractor={({id}) => id}
      renderItem={({item}) => (
          <UserData  user={item}/>
      )}
      />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1
  },
});
