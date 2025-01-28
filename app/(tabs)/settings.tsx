import { Text, View } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

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
