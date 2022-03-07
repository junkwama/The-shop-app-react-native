import React from "react";
import { Colors } from "../constants/Colors";
import { Image, Text, StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { createAddToCartAction } from "../stateManagement/actions/addToCart";

const ProductCard = props => {

    const product = props.product.name ? props.product.product : props.product;

    //------------------------------------------------------//
    let RightBut = props.isEditable  
    ? 
        <TouchableOpacity style={styles.buttonView} onPress={()=>{
            props.navigation.navigate("edit",{product : product});
        }}>
            <Ionicons size={22} name="create-outline" color={Colors.secondary} />
            <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
    :
        <TouchableOpacity style={styles.buttonView} onPress={()=>{
            mydispacher(createAddToCartAction(product));
        }}>
            <Ionicons size={22} name="add-circle-outline" color={Colors.secondary} />
            <Text style={styles.buttonText}>Add to Carts</Text>
        </TouchableOpacity>
    ;
    //-----------------------------------------------------//

    const mydispacher = useDispatch();

    return(
        <View style={styles.card}>
            <View style={styles.imageZone}>
                <View style={styles.bihindBgImage} >
                    <Image
                        source={{uri : product.imageUrl}} 
                        style={styles.bgImage}
                        resizeMode="cover"
                    />
                </View>
                <Text style={styles.title} numberOfLines={1}>{product.title} </Text>
                <Text style={styles.price}>${product.price}</Text>
            </View>
            <View style={styles.buttonsZone}>
                <TouchableOpacity style={styles.buttonView} onPress={()=>{
                    props.navigation.navigate("details",{product : product});
                }}>
                    <Text style={styles.buttonText}>Details</Text>
                    <Ionicons size={22} name="caret-down" color={Colors.secondary} />
                </TouchableOpacity>
                {RightBut}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card : {
        height : 400,
        marginBottom : 20,
        borderRadius : 20,
        backgroundColor : "white",
        overflow : "hidden",
        justifyContent : "space-between",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    imageZone : {
        backgroundColor : Colors.ternary,
        height : 200,
        paddingTop : 30,
        alignItems : "center"
    },
    bihindBgImage : {
        width : Dimensions.get("screen").width * 0.75,
        height : 250,
        backgroundColor : Colors.ternary,
        alignItems : "center",
        justifyContent : "center",
        borderRadius : 10
    },
    bgImage : {
        width : Dimensions.get("screen").width * 0.72,
        height : 240,
        borderColor : "white",
        borderWidth : 4,
        borderRadius : 10,
        overflow  : "hidden"
    },
    buttonsZone : {
        flexDirection : "row",
        justifyContent : "space-between",
        padding: 15,
    },
    buttonView : {
        backgroundColor : Colors.primary,
        paddingHorizontal : 10,
        paddingVertical : 7,
        borderRadius : 7,
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
        fontSize : 23,
        fontFamily : "caviar",
    },
    title : {
        color : Colors.primaryBlue,
        fontSize : 18,
        marginTop : 4,
        marginBottom : 5,
        fontFamily : "caviar-bold",
        fontWeight : "bold"
    }
});

export default ProductCard;