import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateSCreen from "./screens/Create";
import { MaterialIcons } from "@expo/vector-icons";
import { primaryColor, white } from "./constants/Colors";
import ListScreen from "./screens/List";
import UpdateScreen from "./screens/Update";
import DeleteScreen from "./screens/Delete";

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="create"
        component={CreateSCreen}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="create" color={color} size={size} />
          ),
          title: "Create",
          headerTitleStyle: {
            color: white,
            letterSpacing: 2,
          },
          headerStyle: {
            backgroundColor: primaryColor,
          },
        }}
      />

      <Tab.Screen
        name="list"
        component={ListScreen}
        options={{
          tabBarLabel: "List",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list" color={color} size={size} />
          ),
          title: "List",
          headerTitleStyle: {
            color: white,
            letterSpacing: 2,
          },
          headerStyle: {
            backgroundColor: primaryColor,
          },
        }}
      />

      <Tab.Screen
        name="update"
        component={UpdateScreen}
        options={{
          tabBarLabel: "Update",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="drive-file-rename-outline" color={color} size={size} />
          ),
          title: "Update",
          headerTitleStyle: {
            color: white,
            letterSpacing: 2,
          },
          headerStyle: {
            backgroundColor: primaryColor,
          },
        }}
      />

<Tab.Screen
        name="delete"
        component={DeleteScreen}
        options={{
          tabBarLabel: "Delete",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="delete" color={color} size={size} />
          ),
          title: "Delete",
          headerTitleStyle: {
            color: white,
            letterSpacing: 2,
          },
          headerStyle: {
            backgroundColor: primaryColor,
          },
        }}
      />

    </Tab.Navigator>
  );
}
