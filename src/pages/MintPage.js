import { Grid, makeStyles, Typography } from "@material-ui/core";
import  EventListener  from "../moralis/EventListener"
import MintButton from "../moralis/MintButton";
import Player from "../components/Player";
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import { useEffect, useState } from 'react'

const useStyles = makeStyles({
    pageClass: {
        color: 'white'
    },
    columnCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    back: {
        "background-color": "black",
        backgroundSize: "800px 800px",
        backgroundImage: 'url("/image/38.gif")',//`url("https://storage.googleapis.com/studio-design-asset-files/projects/xmaZZplJaR/s-178x157_webp_e1ceac5a-b338-4a18-8f2c-fbf9490beb35.png")`,
        minHeight:'180vh',
        minWidth: '100vw',
        position: 'absolute',
        zIndex: -1,
    },
    title: {
        fontSize: 60
    },
    top: {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'white'
    },
    subtitle: {
        fontSize: 28
    },
    description: {
        fontSize: 14
    }
})
const MintPage = () => {

    const [opacity, setOpacity] = useState(1);

    const toggleVisibility = () => {
        window.scrollY < 500
            ? setOpacity(1 - window.scrollY / 500)
            : setOpacity(0)
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const classes = useStyles();
    return <div>
        <div style={{position:'fixed', left: 10, bottom: 10}}> 
                <Player />
        </div>
        <div className={classes.back}/>
        <Header color="white" subColor="#030303"/>
        <div className={classes.columnCenter}>
            <Spacer height={700}/>
            <div className={classes.top} style={{opacity: opacity}}>
                <div className={classes.title}>We are gonna make it !!</div>
                <Spacer height={20}/>   
                <div className={classes.subtitle}>This is our policy</div>    
                <Spacer height={30}/>  
                <div className={classes.description}>
                    このトークンは、イーサリアムチェーン上で機能するERC721規格のNFTです。
                </div>  
                <div className={classes.description}>
                    このトークンを買うと、アーティストのディスコードコミュニティに参加することができます。
                </div>  
                <div className={classes.description}>
                    このトークンの画像および音楽データはすべてIPFSに保存されています。
                </div>  
                <div className={classes.description}>
                    このトークンは、将来の価格を保証するものではありません。
                </div>  
                <div className={classes.description}>
                    This token is NFT following ERC721 standard on Ethereum chain.
                </div>  
                <div className={classes.description}>
                    This token is a way to access closed channel in the WAGMI discord community.
                </div>  
                <div className={classes.description}>
                    The metadata of this token is hosted in IPFS.This token is not a promise of future value.
                </div>  
                <div className={classes.description}>
                    This token is not a promise of future value.
                </div>  
            </div>
        </div>
        <div className={classes.columnCenter}>
            <Spacer height={90}/>
            <div className={classes.pageClass}>
                <Grid item>
                    <EventListener/>
                </Grid>
            </div>
        </div>
    </div>;
};

export default MintPage;