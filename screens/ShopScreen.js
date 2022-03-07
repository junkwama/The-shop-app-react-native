import React from "react";
import MenuToggleButton from "../components/buttons/MenuToggleButton";
import CartsButton from "../components/buttons/CartsButton";
import ProductList from "../components/ProductList";
import { useSelector } from "react-redux";
import { View, StyleSheet, Dimensions } from "react-native";

const ShopScreen = props => {
    const availableProduct = useSelector( state => state.availableProducts );
    return(
        <View style={styles.screen}>
            <ProductList data={availableProduct} navigation={props.navigation}/> 
        </View>
    );
};

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        paddingTop : 5,
        paddingHorizontal : Dimensions.get("screen").width * 0.02,
        backgroundColor : "#edeff0"
    }
});

const navigateToCartsScreen = data => {
    data.navigation.navigate("carts");
}


ShopScreen.navigationOptions = navigationData => {
    return({
        headerLeft : () => {
            return(
                <MenuToggleButton navigationdata={navigationData.navigation} />
            );
        },
        headerRight : () => {
            return(
                <CartsButton goto={() => { navigateToCartsScreen(navigationData)} } />
            );
        },
    });
};

export default ShopScreen;