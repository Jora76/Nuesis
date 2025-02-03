import React, { useState } from "react";
import { View, Button } from "react-native";
import Slider from '@react-native-community/slider';

import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";

import usePlayer from "@/app/contexts/playerContext";

interface PlayerProps {
    item: string;
}

export default function Player({ item }: PlayerProps) {
    const { loadRecordings } = usePlayer();
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSliderChanging, setIsSliderChanging] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    const playRecording = async (uri: string) => {
        const { sound } = await Audio.Sound.createAsync({ uri });
        setSound(sound);
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        await sound.playAsync();
        setIsPlaying(true);
    };
    const onPlaybackStatusUpdate = (status: any) => {
        if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis);
            if (status.didJustFinish) {
                setIsPlaying(false);
                sound?.stopAsync();
            }
        }
    };
    const deleteRecording = async (uri: string) => {
        try {
            await FileSystem.deleteAsync(uri);
            loadRecordings(); // Reload recordings after deletion
        } catch (error) {
            console.error("Failed to delete recording", error);
        }
    };
    const handleSliderChange = async (value: number) => {
        if (sound && isSliderChanging) {
            await sound.setPositionAsync(value);
            await sound.playFromPositionAsync(value);
            setIsPlaying(true);
        }
    };
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '50%' }}>
            <Slider
                style={{ width: '80%' }}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                onTouchStart={() => setIsSliderChanging(true)}
                onTouchEnd={() => setIsSliderChanging(false)}
                onValueChange={handleSliderChange}
            />
            <Button title="Play" onPress={() => playRecording(`${FileSystem.documentDirectory}${item}`)} />
            <Button title="Delete" onPress={() => deleteRecording(`${FileSystem.documentDirectory}${item}`)} />
        </View>
    )
}