export const ADD_TO_CART = "ADD_TO_CART";
export const INCREMENT_ITEM_NUM = "INCREMENT_ITEM_NUM";
export const DECREMENT_ITEM_NUM = "DECREMENT_ITEM_NUM";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CONFIRM_ORDER = "CONFIRM_ORDER";
export const ADD_EDIT_PRODUCT = "ADD_EDIT_PRODUCT";
export const PRODUCTS_FETCHER = "PRODUCTS_FETCHER";

export const createAddToCartAction = product => {
    return({
        type : ADD_TO_CART,
        payload : product
    });
};

export const createRemoveFromCart = cartId => {
    return({
        type : REMOVE_FROM_CART,
        payload : cartId
    });
};

export const createIncrementItem = cartId =>{
    return ({
        type : INCREMENT_ITEM_NUM,
        payload : cartId
    });
};

export const createDecrementItem = cartId =>{
    return ({
        type : DECREMENT_ITEM_NUM,
        payload : cartId
    });
};

export const createCofirmOrder = (carts, total) =>{
    return({
        type : CONFIRM_ORDER,
        carts : carts,
        total : total
    })
}

export const createProductAddEditAction = (product, isNew ) => {
    return async dispatch => {

        if(isNew){
            const addItem = await fetch("https://themealsapp-3b037-default-rtdb.firebaseio.com/products.json",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(product)
            });
            const responce = await addItem.json();
        }

        dispatch({
            type : ADD_EDIT_PRODUCT,
            product : product,
            isNew : isNew
        });
    };
}

export const fetchLastestProducts = () => {
    return async dispatch => {

        const addItem = await fetch("https://themealsapp-3b037-default-rtdb.firebaseio.com/products.json");
        const responce = await addItem.json();
        
        dispatch({ type : PRODUCTS_FETCHER, userProducts : responce });
    };
}