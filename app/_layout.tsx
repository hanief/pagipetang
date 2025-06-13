import { Stack } from "expo-router";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.phoneWidthContainer}>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{
              title: "Pagi Petang",
            }}
          />
        </Stack>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  phoneWidthContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 450, // Standard phone width
  },
});

function DisplayModeButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={{
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 6,
        marginRight: 8,
      }}
      onPress={() => {
        // @ts-ignore
        navigation.getParent()?.setParams({ toggleMode: Date.now() });
      }}
    >
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>Switch</Text>
    </TouchableOpacity>
  );
}
