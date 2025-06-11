import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { useTheme } from "./ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function About() {
  const { theme } = useTheme();
  const router = useRouter();

  const handleOpenGitHub = () => {
    Linking.openURL("https://github.com/MiqueiasVCB");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Feather name="arrow-left" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Sobre</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={[styles.card, { backgroundColor: theme.secondary }]}>
        <Text style={[styles.description, { color: theme.text }]}>
          Desenvolvido por Miquéias Veloso.
        </Text>

        <Text style={[styles.description, { color: theme.text }]}>
          {"\n"}Projeto de app de receitas desenvolvido para a atividade
          avaliativa de Desenvolvimento Mobile no IFMA Campus Timon.
        </Text>

        <TouchableOpacity onPress={handleOpenGitHub}>
          <Text style={[styles.link, { color: theme.text }]}>
            {"\n"}Repositório no GitHub
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
