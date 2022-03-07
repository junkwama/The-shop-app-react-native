import React from "react";
import OrderView from "../components/OrderView";
import MenuToggleButton from "../components/buttons/MenuToggleButton";
import EmptyFlatList from "../components/EmptyFlatList";
import { FlatList} from "react-native";
import { useSelector } from "react-redux";

const OdersScreen = () => {
    const allOders = useSelector(state => state.orders );
    const userOrders = allOders.filter( item => item.ordererId = "u1");
    return(
        <FlatList
            ListEmptyComponent={EmptyFlatList}
            data={userOrders}
            renderItem={item => {
                return <OrderView order={item.item} />
            }}
        />
    );
};

OdersScreen.navigationOptions = navigationData => {
    return({
        headerLeft : () => {
            return(
                <MenuToggleButton navigationdata={navigationData.navigation} />
            );
        },
    });
};

export default OdersScreen;