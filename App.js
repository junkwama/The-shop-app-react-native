import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import * as Fonts from "expo-font";
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import AppRoot from './navigation/shopNavigationSystem';
import defaultReducer from './stateManagement/reducers/defaultReducer';
import Thunk from "redux-thunk";
import { enableScreens } from "react-native-screens";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './constants/Colors';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";

enableScreens()

/*const rootReducer = combineReducers({
    default : defaultReducer,
});*/

const store = createStore(defaultReducer, applyMiddleware(Thunk));


const fetchFonts = () => {
    return Fonts.loadAsync({
        "caviar" : require("./assets/fonts/caviar_dreams/CaviarDreams.ttf"),
        "caviar-bold" : require("./assets/fonts/caviar_dreams/CaviarDreams_Bold.ttf"),
        "breadley" : require("./assets/fonts/breadley_sans/BreadleySans-Regular.ttf"),
        "coolvetica" : require("./assets/fonts/coolvetica/coolveticacrammedrg.otf"),
        "louis" : require("./assets/fonts/louis_george_caf/LouisGeorgeCafe.ttf"),
        "stop" : require("./assets/fonts/stop_bullying/StopBullying.ttf")
    });
};

const App = () => {

    const [isFontsReady, setIsFontsReady ] = useState(false);

    const fontsReadyHandler = () => {
        setIsFontsReady( () => true )
    }

    if(!isFontsReady){
        return <AppLoading startAsync={fetchFonts} onFinish={fontsReadyHandler} onError={()=>{alert("Fonts loading error!")}} />
    }else{
        return (
            <Provider store={store}>
                <SafeAreaView style={styles.screen}>
                    <AppRoot />
                    <StatusBar style={Platform.OS == "ios" ? "dark" : "light"}  backgroundColor={Colors.primary}/> 
                </SafeAreaView>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    screen : {
        flex : 1,
    }
});

export default App;