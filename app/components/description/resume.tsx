import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import { useThemeColor } from "@/app/hooks/useThemeColor";
import Player from "../home/player";
import React from "react";

export default function Resume({ item, index, scrollRef }: { item: any, index: number, scrollRef: React.RefObject<FlatList> }) {
    const [itemState, setItemState] = useState(0);

    const heightAnim = useRef(new Animated.Value(40)).current; // Valeur animée pour la hauteur
    const minWidthAnim = useRef(new Animated.Value(0)).current; // Valeur animée pour la largeur

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            scrollRef.current?.scrollToIndex({ animated: true, index });
            return () => clearTimeout(timeoutId);
        }, 100);

        let toHeightValue;
        if (itemState === 0) {
            toHeightValue = 40;
        } else if (itemState === 1) {
            toHeightValue = 250;
        } else {
            const screenHeight = Dimensions.get("window").height;
            toHeightValue = screenHeight * 0.9;
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
            duration: 200,
            useNativeDriver: false,
        }).start();

        Animated.timing(minWidthAnim, {
            toValue: toWidthValue,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [itemState, heightAnim, minWidthAnim]);

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'flex-start',

            padding: 5,

            backgroundColor: useThemeColor({}, "tabIconDefault"),

            marginVertical: 10,
            borderRadius: 10,
            borderColor: useThemeColor({}, 'icon'),
            borderWidth: 1,
        },
        title: {
            fontSize: 19,
            marginLeft: 8,
            fontWeight: 'bold',
            color: useThemeColor({}, 'text'),
            fontFamily: 'Montserrat_700Bold',
        },
        text: {
            fontSize: 16,
            marginLeft: 8,
            color: useThemeColor({}, 'text'),
            fontFamily: 'Montserrat_400Regular',
        },
    });

    const handlePress = () => {
        itemState < 2 ? setItemState(itemState + 1) : setItemState(0);
        console.log("Pressed on", item, "state : ", itemState);
    };

    return (
        <Animated.View style={[styles.container, { height: heightAnim, minWidth: minWidthAnim, maxWidth: minWidthAnim }]}>
            <TouchableOpacity onPress={handlePress}>
                <Text style={styles.title}>RESUME 1</Text>
            </TouchableOpacity>
            {itemState > 0 &&
                <>
                    <View style={{ height: '85%', width: '100%', marginTop: 10 }}>
                        <ScrollView style={{ width: '100%' }}>
                            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel libero</Text>
                        </ScrollView>
                    </View>
                    <Player item={item} />
                </>
            }
        </Animated.View >
    );
}