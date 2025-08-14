import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";

const Bookmarks = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.save} className="size-10" tintColor="#fff" />
        <Text className="text-gray-500 text-2xl font-bold">Bookmarks</Text>
      </View>
    </View>
  );
};

export default Bookmarks;