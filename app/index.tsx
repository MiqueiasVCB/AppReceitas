import { View, Text, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "./ThemeContext";
import { Feather } from "@expo/vector-icons";

export default function Home() {
  const router = useRouter();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      <View style={{ position: "absolute", top: 40, right: 16 }}>
        <TouchableOpacity onPress={toggleTheme}>
          <Feather
            name={isDark ? "sun" : "moon"}
            size={24}
            color={theme.text}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/about")}>
          <Feather name="help-circle" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 24, marginBottom: 16, color: theme.text }}>
        🍲 IFMA Receitas 🍲
      </Text>
      <Button
        title="Ver Receitas"
        color={theme.primary}
        onPress={() => router.push("/recipes")}
      />
    </View>
  );
}
