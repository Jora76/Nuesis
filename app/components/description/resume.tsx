import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Button } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import * as FileSystem from "expo-file-system";

import { useThemeColor } from "@/app/hooks/useThemeColor";
import Player from "./player";
import usePlayer from "@/app/contexts/playerContext";

// Rendu du composant :

// Affiche un résumé d'un enregistrement audio.

// Fonctions principales :

// useEffect : Met à jour et anime la hauteur et la largeur du composant en fonction de l'état de l'élément. (0 = base, 1 = semi-développé, 2 = totalement développé) 
// styleSheet : Feuille de styles en français. Regroupe tous les styles css du composant.
// handlePress : Gère le clic sur le composant et change l'état de l'élément.
// deleteRecording : Supprime l'enregistrement et recharge la liste des enregistrements.

// TODO : 

// Ajouter une icône de suppression pour l'enregistrement.
// Implémenter les vrais textes pour les résumés.
// Ajouter des points de pagination, pour swiper entre la transcription et le résumé. (Voir Enzo pour les détails du style)

// Bugs:

// Si il y a une liste assez longue de transcriptions, certaines transcriptions peuvent ne pas se dérouler. Il faut scroll de nouveau pour faire en sorte que ça refonctionne.
// La font ne s'affiche pas correctement tout le temps.

export default function Resume({ item, index, scrollRef }: { item: any, index: number, scrollRef: React.RefObject<FlatList> }) {
    const [itemState, setItemState] = useState(0);

    const heightAnim = useRef(new Animated.Value(40)).current; // Valeur animée pour la hauteur
    const minWidthAnim = useRef(new Animated.Value(0)).current; // Valeur animée pour la largeur

    const {loadRecordings} = usePlayer();

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
        // Suivre le figma pour le style de la page.
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

    const deleteRecording = async (uri: string) => {
        try {
            await FileSystem.deleteAsync(uri);
            loadRecordings(); // Reload recordings after deletion
        } catch (error) {
            console.error("Failed to delete recording", error);
        }
    };

    return (
        <Animated.View style={[styles.container, { height: heightAnim, minWidth: minWidthAnim, maxWidth: minWidthAnim }]}>
            <TouchableOpacity onPress={handlePress}>
                <Text style={styles.title}>RESUME 1</Text>
            </TouchableOpacity>
            {itemState > 0 &&
                <>
                    <View style={{ height: '85%', width: '100%', marginTop: 10 }}>
                        {
                            itemState > 1 ?
                                <ScrollView style={{ width: '100%' }}>
                                    <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel liberoLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel libero</Text>
                                </ScrollView>
                                : <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ante vel libero</Text>
                        }

                    </View>
                    {itemState > 1 &&
                        <>
                            <Player item={item} />
                            <Button title="Delete" onPress={() => deleteRecording(`${FileSystem.documentDirectory}${item}`)} />
                        </>
                    }
                </>
            }
        </Animated.View >
    );
}