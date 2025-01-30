import { useEffect, useState, useRef } from "react";
import { useThemeColor } from "@/app/hooks/useThemeColor";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from "react-native";

export default function Resume({ item }: { item: string }) {
    const [itemState, setItemState] = useState(0);
    const heightAnim = useRef(new Animated.Value(40)).current; // Valeur animée pour la hauteur
    const minWidthAnim = useRef(new Animated.Value(0)).current; // Valeur animée pour la largeur

    useEffect(() => {
        let toHeightValue;
        if (itemState === 0) {
            toHeightValue = 40;
        } else if (itemState === 1) {
            toHeightValue = 100;
        } else {
            // Calculez la hauteur relative en pixels
            const screenHeight = Dimensions.get("window").height;
            toHeightValue = screenHeight * 0.80;
        }

        let toWidthValue;
        const screenWidth = Dimensions.get("window").width;
        if (itemState === 0) {
            toWidthValue = screenWidth * 0.80;
        } else {
            toWidthValue = screenWidth * 0.90;
        }

        Animated.timing(heightAnim, {
            toValue: toHeightValue,
            duration: 200, // Durée de l'animation en millisecondes
            useNativeDriver: false, // Désactiver l'utilisation du pilote natif pour les animations de mise en page
        }).start();

        Animated.timing(minWidthAnim, {
            toValue: toWidthValue,
            duration: 200, // Durée de l'animation en millisecondes
            useNativeDriver: false, // Désactiver l'utilisation du pilote natif pour les animations de mise en page
        }).start();
    }, [itemState, heightAnim, minWidthAnim]);

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'flex-start',

            padding: 5,
            minWidth: itemState != 0 ? '90%' : '80%',
            height: itemState == 2 ? '95%' : itemState == 1 ? 100 : 40,

            backgroundColor: useThemeColor({}, "tabIconDefault"),

            marginVertical: 10,
            borderRadius: 10,
            borderColor: useThemeColor({}, 'icon'),
            borderWidth: 1,
        },
        text: {
            fontSize: 18,
            marginLeft: 8,
            fontWeight: 'bold',
            color: useThemeColor({}, 'text'),
        },
    });

    const handlePress = () => {
        itemState < 2 ? setItemState(itemState + 1) : setItemState(0);
        console.log("Pressed on", item, "state : ", itemState);
    };

    return (
        <Animated.View style={[styles.container, { height: heightAnim, minWidth: minWidthAnim }]}>
            <TouchableOpacity onPress={handlePress}>
                {/* <View style={styles.container}> */}
                    <Text style={styles.text}>RESUME 1</Text>
                {/* </View> */}
            </TouchableOpacity>
        </Animated.View >
    );
}