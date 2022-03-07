import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {View, Text, StyleSheet} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "../constants/Colors";


const OrderView = props => {
    const [showDetails, setShowDetails] = useState(false);

    let cartItem = [];
    for(let i = 0; i<props.order.carts.length; i++){
        cartItem.push(
            <View key={props.order.carts[i].id} style={styles.oneCart}>
                <Text style={styles.oneCartText}>{props.order.carts[i].itemNum} {props.order.carts[i].product.title}</Text>
                <Text style={styles.oneCartText}>${parseInt((props.order.carts[i].product.price * props.order.carts[i].itemNum) * 100) / 100}</Text>
            </View>
        );
    }
    return(
        <View style={styles.container}>
            <View style={styles.block1}>
                <Text style={styles.price}>Total : <Text style={{color : Colors.ternary,fontSize : 17}}>${props.order.total}</Text></Text>
                <Text style={styles.id}> {props.order.orderDate}</Text>
            </View>
            <TouchableWithoutFeedback style={styles.block2} onPress={()=>{
                setShowDetails(prevState => !prevState);
            }}>
                <Text style={styles.block2Text}>{showDetails ? "hide details" : "show details"}</Text>
                <Ionicons size={20} color={Colors.primaryBlue} name={showDetails ? "caret-up" : "caret-down"} />
            </TouchableWithoutFeedback>
            <View style={styles.block3}>
                {showDetails && cartItem}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        backgroundColor : "white",
        margin : 4,
        padding : 10,
        borderRadius : 5,

        shadowColor : "black",
        shadowOffset : {
            width : 1,
            height : 1
        },
        shadowOpacity : 0.7,
        shadowRadius : 2,

        elevation : 3,
    },
    block1 : {
        flexDirection : "row",
        justifyContent : "space-between"
    },
    price : {
        color : "grey",
        fontSize : 16,
    },
    id : {
        color : "grey",
        fontSize : 16
    },
    block2 : {
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "flex-start",
        marginTop : 5,
    },
    block2Text : {
        color : Colors.primaryBlue,
        fontFamily : "louis",
        fontSize : 16
    },
    oneCart : {
        flexDirection : "row",
        justifyContent : "space-between",
        backgroundColor : Colors.accent,
        borderTopRightRadius : 8,
        borderBottomLeftRadius : 8,
        paddingVertical: 3,
        paddingHorizontal : 10,
        marginTop : 4
    },
    oneCartText : {
        fontSize : 14,
        fontWeight : "bold",
        color : "white"
    }
});

export default OrderView;