import React from "react";
import EmptyFlatList from "../components/EmptyFlatList";
import { View, Text,FlatList, Platform, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { useDispatch } from "react-redux";
import { 
    createIncrementItem, createDecrementItem, 
    createRemoveFromCart, createCofirmOrder
} from "../stateManagement/actions/addToCart";

const Cart = props => {
    const mydispatcher = useDispatch();
    return(
        <View style={styles.cart}>
            <Text style={styles.title} numberOfLines={1}>{props.product.product.title}</Text>
            <View style={styles.priceNnumber}>
                <TouchableOpacity style={styles.moreLessBut} onPress={()=>{
                    mydispatcher(createIncrementItem(props.product.id));
                }}>
                    <Ionicons size={20} name="ios-add-circle-outline" color={Colors.primaryBlue}/>
                </TouchableOpacity>
                
                    <Text style={styles.itemNumber}>{props.product.itemNum}</Text>
                    <Text style={styles.price}>${parseInt((props.product.product.price * props.product.itemNum) * 100)/100}</Text>

                <TouchableOpacity style={styles.moreLessBut} onPress={()=>{
                    mydispatcher(createDecrementItem(props.product.id));  
                }}>
                    <Ionicons size={20} name="ios-remove-circle-outline" color={Colors.primaryBlue}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.removeBut} onPress={()=>{
                    mydispatcher(createRemoveFromCart(props.product.id));  
                }}>
                    <Ionicons size={20} name="trash" color={Colors.cancel}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const CartsScreen = props => {
    const mydispatcher = useDispatch();
    const cartProducts = useSelector( state => state.cart);
    let total = 0;
    for(let i = 0; i<cartProducts.length; i++ ){
        total += ( cartProducts[i].product.price * cartProducts[i].itemNum );
    }
    total = parseInt(total * 100) / 100;
    
    return(
        <View style={styles.screen}>
            <FlatList
                ListEmptyComponent={EmptyFlatList}
                contentContainerStyle={styles.flexFlatList}
                style={styles.list}
                data={cartProducts}
                renderItem={item => <Cart product={item.item} />}
                keyExtractor={(item,index) => index }
            />
            <View style={styles.sum}>
                <Text style={styles.sumPrice}>Total : ${total}</Text>
                <TouchableOpacity style={styles.sumBut} onPress={()=>{
                    mydispatcher(createCofirmOrder(cartProducts, total));
                }}>
                    <Text style={styles.sumButText}>Confirm order </Text>
                    <Ionicons size={23} name="checkmark-circle" color={Platform.OS == "android" ? "white" : Colors.confirm} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        
    },
    list : {

    },
    cart : {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        margin : 5,
        padding : 5,
        borderRadius : 5,
        backgroundColor : "white",

        shadowColor : "black",
        shadowOffset : {
            width : 1,
            height : 1
        },
        shadowOpacity : 0.6,
        shadowRadius : 1,
        elevation : 2,
    },
    flexFlatList : {

    },
    title : {
        fontFamily : "louis",
        fontSize : 18,
        maxWidth : Dimensions.get("screen").width * 0.5
    },
    priceNnumber : {
        flexDirection : "row",
        justifyContent : "flex-end",
        alignItems : "center"
    },
    price : {
        backgroundColor : Colors.ternary,
        padding : 3,
        color : "white",
        fontFamily : "louis",
        fontSize : 18,
        borderRadius : 3
    },
    itemNumber : {
        fontSize : 17,
        backgroundColor : "#e6e6e6",
        padding : 2,
        marginEnd : 2
    },
    removeBut : {
        borderWidth : 1,
        borderColor : 1
    },
    moreLessBut : {
        marginStart : 2
    },
    sum : {
        alignItems : "center",
        marginTop : 20
    },
    sumPrice : {
        marginBottom : 5,
        fontFamily : "louis",
        fontSize : 20,
        color : Colors.ternary
    },
    sumBut : {
        paddingVertical : 5,
        paddingHorizontal : 15,
        borderRadius : 5,
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : Platform.OS == "android" ? Colors.confirm : "transparent",
    },
    sumButText : {
        color : Platform.OS == "android" ? "white" : Colors.confirm,
        fontFamily : "louis",
        fontSize : Platform.OS == "android" ? 20 : 24,
        fontWeight : Platform.OS == "android" ? "normal" : "800",
    }

});
export default CartsScreen;