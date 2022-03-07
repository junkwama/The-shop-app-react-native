import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Colors } from "../constants/Colors";
import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { Text, View, Platform } from "react-native";
import ShopScreen from "../screens/ShopScreen";
import DetailsScreen from "../screens/DetailsScreen";
import CartsScreen from "../screens/CartsScreen";
import MyProducts from "../screens/MyProducts";
import EditProduct from "../screens/EditProduct";
import OdersScreen from "../screens/OdersScreen";

const defaultNavigationOptions = {
    headerStyle : {
        backgroundColor : Colors.primary,
    },
    headerTintColor : Colors.secondary,
    headerTitleStyle : {
        fontFamily : "stop"
    }
}

const drawerLabelStyle = tintColor => {
    return (
        {
            color : tintColor, 
            fontFamily : "caviar-bold", 
            padding : 15, 
            fontSize : 18
        }
    );
};

const TitleComponent = props => {
    return(
        <View style={{flexDirection : "row"}}>   
            <MaterialCommunityIcons name={props.iconName} size={28} color={props.tintColor} />
            <Text style={{
                color : props.tintColor, 
                fontFamily: "stop", 
                fontSize: 18, 
                paddingStart : 3
            }}>
                {props.title}
            </Text>
        </View>
    );
}

//---------------------------- Shop Stack ------

const ShopStack = createStackNavigator({
    feed : {
        screen : ShopScreen,
        navigationOptions : {
            headerTitle : (data) => <TitleComponent iconName="shopping-outline" tintColor={data.tintColor} title="Shop"/>,
        }
    },
    details : {
        screen : DetailsScreen,
    },
    carts : {
        screen : CartsScreen,
        navigationOptions : {
            headerTitle : (data) => <TitleComponent iconName="cart-outline" tintColor={data.tintColor} title="Carts"/>,
        }
    }
},
{
    //initialRouteName : "details",
    defaultNavigationOptions : {
        ...defaultNavigationOptions,
    },
});
//---------------------------- 

//---------------------------- UserBashboard Stacks ------

const ProductsStack = createStackNavigator({ //Products Stack as one Tab Section
    myproducts : {
        screen : MyProducts,
        navigationOptions : {
            headerTitle : "My Products"
        }
    },
    edit : {
        screen : EditProduct
    }
},
{
    defaultNavigationOptions : {
        ...defaultNavigationOptions,
    }
});

const OdersSctack = createStackNavigator({ // OdersStack as one Tab section
    oders : {
        screen : OdersScreen,
        navigationOptions : {
            ...defaultNavigationOptions,
            headerTitle : "Customers Oders"
        }
    }
});

const UserDashdoard = Platform.OS === "ios" ? createBottomTabNavigator({ // Tab Bar containing MyProduct-list in one section and the customers oders in the other
    products : {
        screen : ProductsStack,
        navigationOptions : {
            tabBarLabel : (tabBarData) => <Text style={{color: tabBarData.tintColor, fontFamily : "caviar-bold"}}>My Products</Text>,
            tabBarIcon : tabBarData => <Ionicons name="md-shirt-sharp" size={24} color={tabBarData.tintColor} />
        }
    },
    customersOrders : {
        screen : OdersSctack,
        navigationOptions : {
            tabBarLabel : (tabBarData) => <Text style={{color: tabBarData.tintColor, fontFamily : "caviar-bold"}}>Oders</Text>,
            tabBarIcon : tabBarData => <Ionicons name="document-attach-outline" size={24} color={tabBarData.tintColor} />
        }
    }
},{
    tabBarOptions : {
        activeTintColor : Colors.secondary
    }
})
:
createMaterialBottomTabNavigator({
    products : {
        screen : ProductsStack,
        navigationOptions : {
            tabBarColor : Colors.primary,
            tabBarLabel : "My Products",
            tabBarIcon : tabBarData => <Ionicons name="md-shirt-sharp" size={24} color={tabBarData.tintColor} />
        }
    },
    customersOrders : {
        screen : OdersSctack,
        navigationOptions : {
            tabBarColor : Colors.ternary,
            tabBarLabel : "Oders",
            tabBarIcon : tabBarData => <Ionicons name="document-attach-outline" size={24} color={tabBarData.tintColor} />
        }
    }
},{
    shifting : true
});

// ----------------------- App Drawer / App Menu : Containing UserDashbord and Shop as item

const AppMainDrawerMenu = createDrawerNavigator({
    shop : {
        screen : ShopStack,
        navigationOptions : {
            drawerLabel : (data) =>  <Text style={drawerLabelStyle(data.tintColor)}>Shopping</Text>,
            drawerIcon : (data) => <Fontisto name="shopping-store" size={21} color={data.tintColor}/>,
        }
    },
    dashboard : {
        screen : UserDashdoard,
        navigationOptions : {
            drawerLabel : (data) =>  <Text style={drawerLabelStyle(data.tintColor)}>My Corner</Text>,
            drawerIcon : (data) => <Fontisto name="home" size={21} color={data.tintColor}/>,
        }
    }
},
{
    defaultNavigationOptions : {
        activeTintColor : Colors.secondary,
        inactiveTintColor : "#ccc",
    },
    drawerLabel : "Menu"
});

const AppRoot = createAppContainer(AppMainDrawerMenu);

export default AppRoot;