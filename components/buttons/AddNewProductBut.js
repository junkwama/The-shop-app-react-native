import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "./CustomHeaderButton";

const AddNewProductBut = props => {
    return(
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item iconName="ios-add-circle-outline" onPress={() => { props.navigationdata.navigate("edit"); }}/>
        </HeaderButtons>
    );
};

export default AddNewProductBut;