import { useEffect, useState, useRef } from "react";
import { useThemeColor } from "@/app/hooks/useThemeColor";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from "react-native";

export default function Resume({ item }: { item: string }) {
    const [itemState, setItemState] = useState(0);
    const heightAnim = useRef(new Animated.Value(40)).current; // Valeur animée pour la hauteur

    useEffect(() => {
        let toValue;
        if (itemState === 0) {
            toValue = 40;
        } else if (itemState === 1) {
            toValue = 100;
        } else {
            // Calculez la hauteur relative en pixels
            const screenHeight = Dimensions.get("window").height;
            toValue = screenHeight * 0.80;
        }

        Animated.timing(heightAnim, {
            toValue,
            duration: 300, // Durée de l'animation en millisecondes
            useNativeDriver: false, // Désactiver l'utilisation du pilote natif pour les animations de mise en page
        }).start();
    }, [itemState, heightAnim]);

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: itemState == 0 ? 'center' : 'flex-start',

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
        <Animated.View style={[styles.container, { height: heightAnim }]}>
            <TouchableOpacity onPress={handlePress}>
                {/* <View style={styles.container}> */}
                    <Text style={styles.text}>RESUME 1</Text>
                {/* </View> */}
            </TouchableOpacity>
        </Animated.View >
    );
}