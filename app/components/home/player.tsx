import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import Slider from '@react-native-community/slider';

import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
// import * as ExponentAV from "expo-av/build/AV";

import usePlayer from "@/app/contexts/playerContext";

interface PlayerProps {
    item: string;
}

export default function Player({ item }: PlayerProps) {
    const { loadRecordings } = usePlayer();
    const [soundState, setSoundState] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSliderChanging, setIsSliderChanging] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    const playRecording = async (uri: string) => {
        const { sound } = await Audio.Sound.createAsync({ uri });
        sound?.setOnPlaybackStatusUpdate((status) => onPlaybackStatusUpdate(status, sound));
        await sound?.setPositionAsync(position);
        await sound?.playAsync();
        setSoundState(sound);
        setIsPlaying(true);
    };

    const pauseRecording = async () => {
        await soundState?.pauseAsync();
        setIsPlaying(false);
    };

    const onPlaybackStatusUpdate = async (status: any, sound: Audio.Sound) => {
        if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis);
            if (status.didJustFinish) {
                setIsPlaying(false);
                setPosition(0);
                await sound?.unloadAsync();
                console.log("Playback finished");
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
        if (soundState && isSliderChanging) {
            await soundState?.setPositionAsync(value);
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
            <Button title="Play" onPress={() => isPlaying ? pauseRecording() : playRecording(`${FileSystem.documentDirectory}${item}`)} />
            <Button title="Delete" onPress={() => deleteRecording(`${FileSystem.documentDirectory}${item}`)} />
        </View>
    )
}