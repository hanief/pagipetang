import { View } from "react-native";
import Supplication from "./Supplication";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Supplication />
    </View>
  );
}
