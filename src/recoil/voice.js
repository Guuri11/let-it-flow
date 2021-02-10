import { atom } from "recoil"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


export const voice_supported_app = atom({
    key: "voice_supported",
    default: SpeechRecognition.browserSupportsSpeechRecognition()
})
