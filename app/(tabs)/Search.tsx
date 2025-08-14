import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovie } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQueryQuery] = useState("");
  const {
    data: movieData,
    loading,
    error,
    reset,
    refetch: loadMovies,
  } = useFetch(() => fetchMovie({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
        if (movieData?.length > 0 && movieData?.[0]) {
          await updateSearchCount(searchQuery, movieData[0]);
        }
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="z-0 absolute w-full" />
      <FlatList
        data={movieData}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        className="mt-2 pb-32"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row items-center justify-center mt-20 mb-5">
              <Image source={icons.logo} className="h-10 w-12" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQueryQuery(text)}
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color={"#0000ff"}
                className="my-3"
              />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error?.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              movieData?.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 mx-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
