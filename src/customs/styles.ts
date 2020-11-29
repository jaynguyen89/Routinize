import { StyleSheet } from "react-native";
import { BASE_HEIGHT } from "../shared/typography";

const styles = StyleSheet.create({
    popover : {
        padding : BASE_HEIGHT * 0.3
    },
    popoverTitle : {
        textAlign : "center",
        marginBottom : BASE_HEIGHT * 0.3
    },
    popoverBtn : {
        marginBottom : BASE_HEIGHT * 0.5
    }
});

export default styles;
