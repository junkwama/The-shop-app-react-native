import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "./CustomHeaderButton";

const CartsButton = props => {
    return(
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
            <Item iconName="cart-outline" onPress={() => { props.goto(); }}/>
        </HeaderButtons>
    );
};

export default CartsButton;