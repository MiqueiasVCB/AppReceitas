import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../ThemeContext";
import { useFavorites } from "../FavoritesContext";

interface Recipe {
  id: number;
  name: string;
  image: string;
}

export default function RecipesPage() {
  const router = useRouter();
  const { theme, toggleTheme, isDark } = useTheme();
  const { favorites, toggleFavorite } = useFavorites();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");

  const isFavorited = (recipe: Recipe) =>
    favorites.some((fav) => fav.id === recipe.id);

  useEffect(() => {
    async function fetchRecipes() {
      const res = await fetch("https://dummyjson.com/recipes");
      const data = await res.json();
      setRecipes(data.recipes);
    }

    fetchRecipes();
  }, []);

  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <TouchableOpacity onPress={() => router.push("/")}>
          <Feather name="arrow-left" size={24} color={theme.text} />
        </TouchableOpacity>

        <TextInput
          placeholder="Buscar receitas..."
          placeholderTextColor={theme.placeholder}
          style={{
            flex: 1,
            marginHorizontal: 10,
            backgroundColor: theme.secondary,
            color: theme.text,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 8,
          }}
          value={search}
          onChangeText={setSearch}
        />

        <TouchableOpacity onPress={() => router.push("/favorites")}>
          <MaterialIcons name="favorite" size={24} color={theme.primary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleTheme} style={{ marginLeft: 12 }}>
          <Feather
            name={isDark ? "sun" : "moon"}
            size={22}
            color={theme.text}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const favorited = isFavorited(item);
          return (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                padding: 8,
                borderRadius: 8,
                backgroundColor: theme.secondary,
                borderWidth: favorited ? 1 : 0,
                borderColor: favorited ? theme.primary : "transparent",
              }}
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
              <Text style={{ color: theme.text, flex: 1 }}>{item.name}</Text>

              <TouchableOpacity onPress={() => toggleFavorite(item)}>
                <MaterialIcons
                  name={favorited ? "favorite" : "favorite-border"}
                  size={24}
                  color={theme.primary}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
