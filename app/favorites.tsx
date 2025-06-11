import { useRouter } from "expo-router";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useFavorites } from "../app/FavoritesContext";
import { useTheme } from "../app/ThemeContext";
import { MaterialIcons, Feather } from "@expo/vector-icons";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: theme.background }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color={theme.text} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleTheme}>
          <Feather
            name={isDark ? "sun" : "moon"}
            size={24}
            color={theme.text}
          />
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 22, marginBottom: 12, color: theme.text }}>
        Receitas Favoritas
      </Text>

      {favorites.length === 0 ? (
        <Text style={{ color: theme.text }}>
          Nenhuma receita favoritada ainda.
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: theme.secondary,
                padding: 8,
                marginBottom: 10,
                borderRadius: 8,
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
                onPress={() => router.push(`/recipes/${item.id}`)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 8,
                    marginRight: 12,
                  }}
                />
                <Text
                  style={{ fontSize: 16, color: theme.text, flexShrink: 1 }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => toggleFavorite(item)}>
                <MaterialIcons name="delete" size={24} color={theme.primary} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
