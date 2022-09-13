/* eslint-disable no-duplicate-case */
import { useState, createContext } from 'react';
import useSound from "use-sound";

export const MusicContext = createContext();

export const MusicProvider = ({children}) =>  {
    const [musicPlaying, setMusicPlaying] = useState();
    const [volume, setVolume] = useState(1);
    const [title, setTitle] = useState("Hibikilla - LUNA -");
    const [play, {stop, pause}] = useSound('/music/luna1.wav');

    const handleTitle = (id) => {
        switch(id){
            case 1:
                return("Hibikilla - LUNA Original -");
            case 2:
                return("Hibikilla - LUNA Special -");
            case 3:
                return("Hibikilla - LUNA Instrumental -");
            case 4:
                return("Hibikilla - LUNA Acappella -");
            default:
                return("Hibikilla - LUNA -");
        }
    }

    const onPlay = (id) => {
        stop();
        play();
        setMusicPlaying(id);
    }
    const onStop = () => {
        pause();
        setMusicPlaying(null);
    }
    return <MusicContext.Provider
        value={{
            musicPlaying,
            volume,
            title,
            setTitle,
            handleTitle,
            onPlay,
            onStop
        }}
        >
            {children}
        </MusicContext.Provider>

}