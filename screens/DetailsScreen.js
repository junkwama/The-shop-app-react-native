import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from "react-native";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { createAddToCartAction } from "../stateManagement/actions/addToCart";

const DetailsScreen = props => {
    const mydispacher = useDispatch();
    const product = props.navigation.getParam("product");
    return(
        <View style={styles.screen}>
            <View style={styles.imageWrapper}>
                <Image source={{uri : product.imageUrl}} style={styles.image} />
            </View>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <TouchableOpacity style={styles.buttonView} onPress={()=>{
                mydispacher(createAddToCartAction(product));
            }}>
                <Ionicons size={22} name="add-circle-outline" color={Colors.secondary} />
                <Text style={styles.buttonText}>To Carts</Text>
            </TouchableOpacity>
        </View>
    );
};
DetailsScreen.navigationOptions = data => {
    const title = data.navigation.getParam("product").title;
    return({
        headerTitle : title
    });
};

const styles = StyleSheet.create({
    screen: {
        flex : 1,
        alignItems : "center",
        paddingTop : 5,
        backgroundColor : "#fcfcfc",
    },
    imageWrapper : {
        width : "100%",
        borderBottomColor : "#ccc",
        borderBottomWidth : 1.5,
    },
    image : {
        width : "100%",
        height : 300,
        backgroundColor : "#cfcfcf",
    },
    buttonView : {
        backgroundColor : Platform.OS == "ios" ? "transparent" : Colors.primaryBlue,
        paddingHorizontal : 10,
        paddingVertical : 7,
        borderRadius : 7,
        marginTop : 10,
        flexDirection : "row",
        alignItems : "center"
    },
    buttonText : {
        color : Colors.secondary,
        fontSize : 16,
        fontFamily : "caviar",
    },
    price : {
        color : Colors.ternary,
        fontSize : 25,
        fontFamily : "caviar",
        marginTop : 10
    },
    description : {
        fontFamily : "caviar",
        marginTop : 5,
        textAlign : "center"
    }
});
export default DetailsScreen;