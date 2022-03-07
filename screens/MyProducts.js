import React, { useEffect } from "react";
import MenuToggleButton from "../components/buttons/MenuToggleButton";
import AddNewProductBut from "../components/buttons/AddNewProductBut";
import ProductList from "../components/ProductList";
import { View, StyleSheet, Dimensions} from "react-native";
import { useSelector } from "react-redux";
import { fetchLastestProducts } from "../stateManagement/actions/addToCart";
import { useDispatch } from "react-redux";

const MyProducts = props => {

    useEffect( () => {
        const subcription = props.navigation.addListener("willFocus", ()=>{
            dispatcher(fetchLastestProducts());
        })
        return( ()=> { subcription.remove()});
    });

    const dispatcher = useDispatch();

    useEffect(()=>{
        dispatcher(fetchLastestProducts());
    },[fetchLastestProducts]);

    const myproduct = useSelector( state => state.userProducts);

    return(
        <View style={styles.screen}>
            <ProductList data={myproduct} navigation={props.navigation} isEditable={true}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex : 1,
        paddingTop : 5,
        paddingHorizontal :  Dimensions.get("screen").width * 0.02,
        backgroundColor : "#edeff0"
    }
});

MyProducts.navigationOptions = navigationData => {
    return({
        headerLeft : () => {
            return(
                <MenuToggleButton navigationdata={navigationData.navigation} />
            );
        },
        headerRight : () => {
            return(
                <AddNewProductBut navigationdata={navigationData.navigation} />
            );
        }
    });
};

export default MyProducts;