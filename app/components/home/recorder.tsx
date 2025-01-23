import { useState } from "react";
import { Pressable } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";


export default function Recorder() {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [recordings, setRecordings] = useState<string[]>([]);
    const [base64Recording, setBase64Recording] = useState<string | null>(null);

    const [isRecording, setIsRecording] = useState(false);

    const toggleRecording = async () => {
        if (isRecording) {
            // console.log("Stopping recording..");
            // setRecording(null);
            // await recording?.stopAndUnloadAsync();
            // const uri = recording?.getURI();
            // const newUri = `${FileSystem.documentDirectory}recording-${Date.now()}.m4a`;
            // await FileSystem.moveAsync({
            //     from: uri!,
            //     to: newUri,
            // });
            // setRecordings([...recordings, newUri]);
            // // console.log("Recording stopped and stored at", newUri);
            // await sendRecording();
            console.log("Stopping recording..");
            await recording?.stopAndUnloadAsync();
            const uri = recording?.getURI();
            console.log("Recording stopped and stored at", uri);

            // Convert the recording to base64
            if (uri) {
                const fileInfo = await FileSystem.getInfoAsync(uri, { md5: true });
                const mimeType = fileInfo.uri.split('.').pop() === 'm4a' ? 'audio/mp4' : 'audio/mpeg';
                const base64 = await FileSystem.readAsStringAsync(uri, {
                  encoding: FileSystem.EncodingType.Base64,
                });
                const base64WithMime = `data:${mimeType};base64,${base64}`;
                setBase64Recording(base64WithMime);
                console.log("Recording converted to base64", base64WithMime);
          
                // Send the recording to the API
                const recordingData = {
                  Name: `recording-${Date.now()}.m4a`,
                  Data: base64WithMime,
                };
                sendRecording(recordingData);
              }
        } else {
            try {

                console.log("Requesting permissions..");
                // await Audio.requestPermissionsAsync();
                const { status } = await Audio.requestPermissionsAsync();
                if (status !== "granted") {
                    alert("Permission to access microphone is required!");
                }
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });

                console.log("Starting recording..");
                const { recording } = await Audio.Recording.createAsync(
                    Audio.RecordingOptionsPresets.HIGH_QUALITY
                );
                setRecording(recording);
                console.log("Recording started");
            } catch (err) {
                console.error("Failed to start recording", err);
            }
        }
        setIsRecording(!isRecording);
    }

    const sendRecording = async (recordingData: { Name: string; Data: string }) => {
        // console.log("Sending recording..");
        try {
            fetch("http://185.229.220.74:5050/api/audio", {
                mode: "no-cors",
                method: "POST",
                body: JSON.stringify(recordingData)
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                })
        }
        catch (err) {
            console.error("Failed to send recording", err);
        }
    }

    // const f = () => {
    //     let file = form.children[0].files[0]
    //     let readerfile = new FileReader();
    //     readerfile.readAsDataURL(file);
    //     readerfile.onload = () => {
    //         let Image = {};
    //         Image.Name = file.name;
    //         Image.Data = readerfile.result;
    //         send(Image);
    //         console.log(Image.Data)
    //     }
    // }


    return (
        <Pressable
            onPress={toggleRecording}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white'
                },
                {
                    padding: 10,
                    borderRadius: 5,
                }
            ]}
        >
            <MaterialIcons size={28} name="mic" />
        </Pressable>
    )

}
