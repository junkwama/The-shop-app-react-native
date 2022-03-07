import { Platform } from "react-native";

export const Colors = {
    primary : Platform.OS === "android" ? "#0362fc" : "white",
    secondary : Platform.OS === "android" ? "white" : "#0362fc",
    ternary : "#e60278",
    accent : "#ff5724",
    primaryBlue : "#0362fc",
    confirm : "#3ebf24",
    cancel : "#ff3867"
}