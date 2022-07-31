import { useState, createContext } from 'react';
import useSound from "use-sound";

export const MusicContext = createContext();

export const MusicProvider = ({children}) =>  {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [title, setTitle] = useState("Hibikilla - Bad Mind - featuring xxx");
    const [play, {stop, pause}] = useSound('/music/bad_mind.mp3');

    const onPlay = () => {
        play();
        setIsPlaying(true);
    }
    const onStop = () => {
        pause();
        setIsPlaying(false);
    }
    return <MusicContext.Provider
        value={{
            isPlaying,
            volume,
            title,
            setTitle,
            onPlay,
            onStop
        }}
        >
            {children}
        </MusicContext.Provider>

}