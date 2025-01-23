import { View, Text, Button } from "react-native";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";


interface PlayerProps {
    item: string;
}

export default function Player({ item }: PlayerProps) {
    const playRecording = async (uri: string) => {
        const { sound } = await Audio.Sound.createAsync({ uri });
        await sound.playAsync();
    };
    return (
        <View>
            <Text>{item}</Text>
            <Button title="Play" onPress={() => playRecording(`${FileSystem.documentDirectory}${item}`)} />
        </View>
    )
}