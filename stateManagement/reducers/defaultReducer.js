import PRODUCTS from "../../data/dummy-data";
import Cart from "../../model/Cart";
import Order from "../../model/Order";
import { 
    ADD_TO_CART, REMOVE_FROM_CART, 
    INCREMENT_ITEM_NUM, DECREMENT_ITEM_NUM,
    CONFIRM_ORDER, ADD_EDIT_PRODUCT, PRODUCTS_FETCHER
} from "../actions/addToCart";


const defaultState = {
    availableProducts : PRODUCTS,
    userProducts : [],
    cart : [],
    orders : []
};

const generateNewId = list =>{
    const listCopy = list;
    let id;
    if(listCopy.length == 0){
        id = 0;
    }else if(listCopy.length == 1){
        id = parseInt(listCopy[0].id) + 1;
    }else{
        listCopy.sort( (a,b) => parseInt(a.id) - parseInt(b.id) );
        id = parseInt(listCopy[listCopy.length - 1].id) + 1;
    }
    return id;
}

const defaultReducer = (state = defaultState, action ) => {
    switch(action.type){

        case ADD_TO_CART :

            if(!state.cart.some( cart => cart.product.id == action.payload.id)){
                const newCart = new Cart(generateNewId(state.cart), action.payload, 1);
                return { ...state, cart : state.cart.concat(newCart) };      
            }
            return state;

        case REMOVE_FROM_CART : 

            if(state.cart.some(cart => cart.id == action.payload)){
                return { ...state, cart : state.cart.filter( item => item.id != action.payload) };      
            }
            return state;

        case INCREMENT_ITEM_NUM :
        case DECREMENT_ITEM_NUM : 

            const cartItemIdex = state.cart.findIndex( item => item.id == action.payload);
            if(cartItemIdex >= 0){
                let allTheCarts = state.cart.filter( item => item.id != action.payload);
                let cartToEdit = state.cart[cartItemIdex];
                if(action.type === INCREMENT_ITEM_NUM){
                    cartToEdit.itemNum++;
                }else{
                    cartToEdit.itemNum = cartToEdit.itemNum > 1 ? cartToEdit.itemNum - 1 : cartToEdit.itemNum;
                }
                allTheCarts.push(cartToEdit);
                allTheCarts.sort((a,b) => a.id - b.id);
                return { ...state, cart : allTheCarts };
            }
            return state;
        case CONFIRM_ORDER : 

            const now = new Date();
            const orderDate = now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear() + " : " + now.getHours() + "H" + now.getMinutes();

            const ordersCopy = [...state.orders, new Order(generateNewId(state.orders), "u1", action.carts, action.total, orderDate)];
            return { ...state, orders : ordersCopy, cart : [] }
        case ADD_EDIT_PRODUCT : 
            if(action.isNew){
                const newProductsList = [...state.availableProducts, action.product];
                return { 
                    ...state, 
                    availableProducts : newProductsList, 
                    userProducts : newProductsList.filter( product => product.ownerId === "u1") 
                }
            }else if(!action.isNew){ 
                let newProductsList = state.availableProducts.filter( item => item.id != action.product.id);
                newProductsList = [ ...newProductsList, action.product ];
                return { 
                    ...state, 
                    availableProducts : newProductsList, 
                    userProducts : newProductsList.filter( product => product.ownerId === "u1") 
                }
            }
        case PRODUCTS_FETCHER : 

            const products = [];

            const fetchProducts = action.userProducts;

            for(let key in fetchProducts){
                products.push({
                    name : key,
                    product : fetchProducts[key]
                });
            }

            return {
                ...state, userProducts : products
            };
        default : 
            return state;
    }
};

export default defaultReducer;