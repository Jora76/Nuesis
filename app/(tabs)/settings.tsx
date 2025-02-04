import { Text, View } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

// TODO: Y a tout à faire, force les mecs on est carrément pas ensemble

// Nan en vrai ce qui serait cool ce serait de pouvoir changer le thème de l'appli. (Voir contants/Colors.ts et hooks/useThemeColor.ts pour voir comment c'est géré)

export default function Settings() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: useThemeColor({}, "background"),
      }}
    >
      <Text>Settings page</Text>
    </View>
  );
}
