import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EmptyFlatList = () => {
    return(
        <View style={styles.container}>
            <Ionicons size={24} color="black" name="cloud-offline-outline" />
            <Text style={styles.text}>Soory!! There's nothing loaded for the now.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        height : Dimensions.get("screen").height * 0.89,
        justifyContent : "center",
        alignItems : "center",
    },
    text : {
        color : "black",
        textAlign : "center"
    }
})


export default EmptyFlatList;