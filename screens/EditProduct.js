import React, {useReducer, useState } from "react";
import Product from "../model/Product";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Platform, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createProductAddEditAction } from "../stateManagement/actions/addToCart";
const FORM_UPDATE = "FORM_UPDATE";

const createFormUpdateAction = inputs => {
    return {
        type : FORM_UPDATE,
        inputs : inputs
    }
}

const createFormeStateTemplate = newValues => {
    return {  
        title : newValues.title,
        price : newValues.price,
        description : newValues.description,
        imageUrl : newValues.imageUrl
    };
};

const formStateReducer = ( state, action ) =>{
   switch( action.type ){
       case FORM_UPDATE :
            const uppdatedFormState = {
                formInputs : {
                    title : action.inputs.title,
                    price : action.inputs.price,
                    description : action.inputs.description,
                    imageUrl : action.inputs.imageUrl
                },
                formInputsValidities : {
                    isTitleValide : (action.inputs.title.length > 1),
                    isPriceValide : !(parseFloat(action.inputs.price).toString() == "NaN" || parseFloat(action.inputs.price) <= 0),
                    isDescriptionValide : !(action.inputs.description.length <= 0),
                    isImageUrlValide : action.inputs.imageUrl.match(new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)),
                },
                isFormValide : (action.inputs.title.length > 1) &&
                    !(parseFloat(action.inputs.price).toString() == "NaN" || parseFloat(action.inputs.price) <= 0) &&
                    !(action.inputs.description.length <= 0) && 
                    action.inputs.imageUrl.match(new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi))
            }
            return uppdatedFormState;
        default :
            return state;
   }
};

const EditProduct = props => {
    let product = props.navigation.getParam("product");
    const currentProducts = useSelector( state => state.availableProducts);
    const dispatcher = useDispatch();

    const [ isTouches, setIsTouches ] = useState({
        isTitleTouched : false,
        isPriceTouched : false,
        isDescriptionTouched : false,
        isImageUrlTouched : false
    });

    const handleTouches = touchedInput => {
        switch(touchedInput){
            case "title": 
                setIsTouches( {...isTouches, isTitleTouched : true} );
                break;
            case "price": 
                setIsTouches( {...isTouches, isPriceTouched : true} );
                break;
            case "description": 
                setIsTouches( {...isTouches, isDescriptionTouched : true} );
                break;
            case "imageUrl": 
                setIsTouches( {...isTouches, isImageUrlTouched : true} );
                break;
        }
    }

    const [ formState, dispatchFormAction ] = useReducer(formStateReducer, {
        formInputs : {
            title : product ? product.title : "",
            price : product ? product.price.toString() : "",
            description : product ? product.description : "",
            imageUrl : product ? product.imageUrl : ""
        },
        formInputsValidities : {
            isTitleValide : product ? true: false,
            isPriceValide : product ? true: false,
            isDescriptionValide : product ? true: false,
            isImageUrlValide : product ? true: false
        },
        isFormValide : product ? true : false
    });

    const resetTheForm = () => {
        dispatchFormAction(createFormUpdateAction(createFormeStateTemplate({
            title : "",
            price : "",
            description : "",
            imageUrl : ""
        })));
    };

    const setFormChanges = toBeUpdstted =>{
        dispatchFormAction(createFormUpdateAction(createFormeStateTemplate({
            title : toBeUpdstted.item === "title" ? toBeUpdstted.value : formState.formInputs.title.trim(),
            price : toBeUpdstted.item === "price" ? toBeUpdstted.value :  formState.formInputs.price.trim(),
            description : toBeUpdstted.item === "description" ? toBeUpdstted.value :  formState.formInputs.description.trim(),
            imageUrl : toBeUpdstted.item === "imageUrl" ? toBeUpdstted.value :  formState.formInputs.imageUrl.trim()
        })));
    }

    const formCheck = () =>{
        if(!formState.isFormValide){
            Alert.alert("Invalid Inputs", "The form is invalid! Please check the values and try again", [{text: "Okay", onPress: ()=>{}, style:"destructive"}]);
            return false;
        }
        return true;
    }

    return(
        <View style={styles.screen}>
            {!formState.formInputsValidities.isTitleValide && isTouches.isTitleTouched && <View style={styles.errView}><Text style={styles.errText}>The title should have at least two characters</Text></View>}
            <TextInput 
                style={{ ...styles.inputs, ...{
                    shadowColor : !formState.formInputsValidities.isTitleValide && isTouches.isTitleTouched ? Colors.cancel : "black",
                    borderWidth : Platform.OS === "android" && isTouches.isTitleTouched ? 1 : 0,
                    borderColor : Platform.OS === "android" && isTouches.isTitleTouched ? Colors.cancel : "transparent"
                }}} placeholder="Title Of The Product"
                maxLength={25} value={formState.formInputs.title} defaultValue={formState.formInputs.title}
                onChangeText={ value => {setFormChanges({item : "title", value : value})}}
                onBlur={() => { handleTouches("title")}}
            />
            {!formState.formInputsValidities.isPriceValide && isTouches.isPriceTouched && <View style={styles.errView}><Text style={styles.errText}>Please enter a valid value in the price field</Text></View>}
            <TextInput 
                style={{ ...styles.inputs, ...{
                    shadowColor : !formState.formInputsValidities.isPriceValide  && isTouches.isPriceTouched ? Colors.cancel : "black",
                    borderWidth : Platform.OS === "android"  && isTouches.isPriceTouched ? 1 : 0,
                    borderColor : Platform.OS === "android"  && isTouches.isPriceTouched ? Colors.cancel : "transparent"
                }}} placeholder="Price"
                maxLength={10} keyboardType="decimal-pad" value={formState.formInputs.price} defaultValue={formState.formInputs.price}
                onChangeText={ value => {setFormChanges({item : "price", value : value})}}
                editable={product?false:true} onBlur={ () => { handleTouches("price")}}
            />
            {!formState.formInputsValidities.isDescriptionValide &&  isTouches.isDescriptionTouched && <View style={styles.errView}><Text style={styles.errText}>The description field cannot be left empty</Text></View>}
            <TextInput 
                style={{ ...styles.inputs, ...{
                    shadowColor : !formState.formInputsValidities.isDescriptionValide  && isTouches.isDescriptionTouched ? Colors.cancel : "black",
                    borderWidth : Platform.OS === "android"  && isTouches.isDescriptionTouched ? 1 : 0,
                    borderColor : Platform.OS === "android"  && isTouches.isDescriptionTouched ? Colors.cancel : "transparent",
                    minHeight : 100
                }}} multiline={true} placeholder="Description of the product"
                defaultValue={formState.formInputs.description} value={formState.formInputs.description}
                onChangeText={ value => {setFormChanges({item : "description", value : value})}} onBlur={ () => { handleTouches("description")}}
            />
            {!formState.formInputsValidities.isImageUrlValide &&  isTouches.isImageUrlTouched && <View style={styles.errView}><Text style={styles.errText}>Enter correct Url for the image please</Text></View>}
            <TextInput 
                style={{ ...styles.inputs, ...{
                    shadowColor : !formState.formInputsValidities.isImageUrlValide  && isTouches.isImageUrlTouched ? Colors.cancel : "black",
                    borderWidth : Platform.OS === "android"  && isTouches.isImageUrlTouched ? 1 : 0,
                    borderColor : Platform.OS === "android"  && isTouches.isImageUrlTouched ? Colors.cancel : "transparent"
                }}} placeholder="Image link : http//img.com/naff.jpj"
                defaultValue={formState.formInputs.imageUrl} value={formState.formInputs.imageUrl}
                onChangeText={ value => {setFormChanges({item : "imageUrl", value : value})}} onBlur={ () => { handleTouches("imageUrl")}}
            />

            <TouchableOpacity style={styles.sumBut} onPress={()=>{
                if(product){
                    if(formCheck()){
                        const newProduct = new Product(
                            product.id , 
                            "u1", 
                            formState.formInputs.title, 
                            formState.formInputs.imageUrl, 
                            formState.formInputs.description, 
                            parseInt(formState.formInputs.price)
                        );
                        dispatcher(createProductAddEditAction(newProduct, false));
                        props.navigation.navigate("details",{product : newProduct});
                        props.navigation.setParams({product : undefined});
                        product = undefined;
                        resetTheForm();
                    }
                }else{
                    if(formCheck()){
                        const id = "p" + (currentProducts.length + 1);
                        const newProduct = new Product(
                            id , 
                            "u1", 
                            formState.formInputs.title, 
                            formState.formInputs.imageUrl, 
                            formState.formInputs.description, 
                            parseInt(formState.formInputs.price)
                        );
                        dispatcher(createProductAddEditAction(newProduct, true));
                        resetTheForm();
                    }
                }
            }}>
                <Text style={styles.sumButText}>Confirm order </Text>
                <Ionicons size={23} name="checkmark-circle" color={Platform.OS == "android" ? "white" : Colors.confirm} />
            </TouchableOpacity>
        
        </View>
    );
};

EditProduct.navigationOptions = data =>{
    const product = data.navigation.getParam("product");
    return {
        headerTitle : product ? "Edit " + product.title : "New Product"
    }
}


const styles = StyleSheet.create({
    screen: {
        flex : 1,
        paddingTop : 10
    },
    inputs :{
        backgroundColor : "white",
        paddingHorizontal : 20,
        paddingVertical : 10,
        color : "black",
        fontSize : 16,
        fontFamily : "caviar",
        marginVertical : 7,
        marginHorizontal: 10,
        borderRadius : 10,

        elevation : 3,
        shadowColor : "black",
        shadowOpacity : 0.7,
        shadowRadius : 2,
        shadowOffset : {
            width : 1,
            height : 1
        },
    },
    description : {
        minHeight : 100
    },
    sumBut : {
        paddingVertical : 5,
        paddingHorizontal : 15,
        borderRadius : 5,
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : Platform.OS == "android" ? Colors.confirm : "transparent",
    },
    sumButText : {
        color : Platform.OS == "android" ? "white" : Colors.confirm,
        fontFamily : "louis",
        fontSize : Platform.OS == "android" ? 20 : 24,
        fontWeight : Platform.OS == "android" ? "normal" : "800",
    },
    errView : {
        marginHorizontal: 10,
        marginTop : 10
    },
    errText : {
        color : Colors.cancel,
        fontFamily : "caviar",
        fontSize : 14
    }
});
export default EditProduct;