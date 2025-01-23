// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View } from "react-native";

import Recorder from "../components/home/recorder";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Recorder />

    </View >
  );
}
