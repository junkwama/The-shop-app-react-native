import React from "react";
import ProductCard from "../components/ProductCard";
import EmptyFlatList from "../components/EmptyFlatList";
import { FlatList } from "react-native";

const ProductList = props => {
    return(
        <FlatList
            data={props.data}
            ListEmptyComponent={EmptyFlatList}
            keyExtractor={(item, index) => item.name ? item.name : item.id}
            renderItem={ item =>{
                return <ProductCard product={item.item} navigation={props.navigation} isEditable={ props.isEditable ? true : false }/>;
            }}
        />
    );
};

export default ProductList;