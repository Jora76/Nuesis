import { createContext, useContext, useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";

// Contexte pour gérer les enregistrements audio.
// Permet de charger, envoyer et supprimer des enregistrements audio.
// Utilisé dans les composants Recorder, Description et Player.

// Propriétés du contexte :
// recordings : Liste des enregistrements audio.
// sendRecording : Fonction pour envoyer un enregistrement audio en base 64.
// deleteRecording : Fonction pour supprimer un enregistrement audio.
// loadRecordings : Fonction pour charger les enregistrements audio.

interface PlayerContextProps {
    recordings: string[];
    sendRecording?: (uri: string) => void;
    deleteRecording?: (uri: string) => void;
    loadRecordings: () => void;
}

const PlayerContext = createContext<PlayerContextProps>({
    recordings: [],
    loadRecordings: () => { },
    deleteRecording: () => { },
    sendRecording: () => { },
});

export function PlayerProvider({ children }: any) {
    const [recordings, setRecordings] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            loadRecordings();
        })();
    }, []);

    const loadRecordings = async () => {
        const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory || '');
        setRecordings(files.filter(file => file.endsWith('.m4a')));
    };

    const sendRecording = async (uri: string) => {
        const data = await convertRecordingToBase64(uri);
        try {
            fetch("http://185.229.220.74:5050/api/audio", {
                mode: "no-cors",
                method: "POST",
                body: JSON.stringify(data)
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                })
        }
        catch (err) {
            console.error("Failed to send recording", err);
        }
    }

    const convertRecordingToBase64 = async (uri: string) => {
        const fileInfo = await FileSystem.getInfoAsync(uri, { md5: true });
        const mimeType = fileInfo.uri.split('.').pop() === 'm4a' ? 'audio/mp4' : 'audio/mpeg';
        const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        const base64WithMime = `data:${mimeType};base64,${base64}`;
        console.log("Recording converted to base64", base64WithMime);

        // Send the recording to the API
        const recordingData = {
            Name: `recording-${Date.now()}.m4a`,
            Data: base64WithMime,
        };
        return recordingData;
    }

    const deleteRecording = async (uri: string) => {
        try {
            await FileSystem.deleteAsync(uri);
            loadRecordings(); // Reload recordings after deletion
        } catch (error) {
            console.error("Failed to delete recording", error);
        }
    };

    return (
        <PlayerContext.Provider value={{ recordings, sendRecording, deleteRecording, loadRecordings }}>
            {children}
        </PlayerContext.Provider>
    );
}

export default function usePlayer() {
    return useContext(PlayerContext);
};