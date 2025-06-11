import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "../ThemeContext";
import { useFavorites } from "../FavoritesContext";
import { Feather, AntDesign } from "@expo/vector-icons";

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<any>(null);
  const { theme, toggleTheme, isDark } = useTheme();
  const { toggleFavorite, isFavorite } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/recipes/${id}`);
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        console.error("Erro ao buscar detalhes:", err);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe)
    return (
      <Text style={{ color: theme.text, padding: 16 }}>Carregando...</Text>
    );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 16 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginRight: 16 }}
        >
          <AntDesign name="arrowleft" size={24} color={theme.text} />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}>
          Detalhes da Receita
        </Text>

        <TouchableOpacity onPress={toggleTheme}>
          <Feather
            name={isDark ? "sun" : "moon"}
            size={24}
            color={theme.text}
          />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: theme.text,
          marginBottom: 8,
        }}
      >
        {recipe.name}
      </Text>

      <Image
        source={{ uri: recipe.image }}
        style={{
          height: 220,
          borderRadius: 12,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
        resizeMode="cover"
      />

      <TouchableOpacity
        onPress={() =>
          toggleFavorite({
            id: recipe.id,
            name: recipe.name,
            image: recipe.image,
          })
        }
        style={{
          backgroundColor: theme.primary,
          padding: 10,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text style={{ color: theme.background }}>
          {isFavorite(recipe.id)
            ? "Remover dos Favoritos"
            : "Adicionar aos Favoritos"}
        </Text>
      </TouchableOpacity>

      <Text style={{ fontWeight: "bold", color: theme.text, marginBottom: 4 }}>
        Ingredientes:
      </Text>
      {recipe.ingredients?.map((ingr: string, idx: number) => (
        <Text key={idx} style={{ color: theme.text }}>
          - {ingr}
        </Text>
      ))}

      <Text
        style={{
          fontWeight: "bold",
          color: theme.text,
          marginTop: 16,
          marginBottom: 4,
        }}
      >
        Instruções:
      </Text>
      <Text style={{ color: theme.text }}>{recipe.instructions}</Text>
    </ScrollView>
  );
}
