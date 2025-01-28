import { View, Text, Button } from "react-native";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import usePlayer from "@/app/contexts/playerContext";


interface PlayerProps {
    item: string;
}

export default function Player({ item }: PlayerProps) {
    const { loadRecordings } = usePlayer();

    const playRecording = async (uri: string) => {
        const { sound } = await Audio.Sound.createAsync({ uri });
        await sound.playAsync();
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '50%' }}>
            {/* <Text>{item}</Text> */}
            <Button title="Play" onPress={() => playRecording(`${FileSystem.documentDirectory}${item}`)} />
            <Button title="Delete" onPress={() => deleteRecording(`${FileSystem.documentDirectory}${item}`)} />
        </View>
    )
}