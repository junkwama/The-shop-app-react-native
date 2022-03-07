import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "./CustomHeaderButton";

const MenuToggleButton = props => {
    return(
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
            <Item iconName="ios-menu" onPress={() => { props.navigationdata.toggleDrawer(); }}/>
        </HeaderButtons>
    );
};

export default MenuToggleButton;