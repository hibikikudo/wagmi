import { Grid, makeStyles } from "@material-ui/core";
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import { useEffect, useState } from 'react'
import MusicCard from '../components/MusicCard';
import { useMoralis } from "react-moralis";

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
        backgroundSize: "100% auto",
        backgroundImage: 'url("/image/luna1.png")',//`url("https://storage.googleapis.com/studio-design-asset-files/projects/xmaZZplJaR/s-178x157_webp_e1ceac5a-b338-4a18-8f2c-fbf9490beb35.png")`,
        minHeight:10000,
        minWidth: '100vw',
        position: 'fixed',
        zIndex: -1
    },
    title: {
        fontSize: 60,
        textShadow: '0px 0px 2px  rgba(0, 0, 0, 1)'
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
        fontSize: 28,
        textShadow: '0px 0px 2px  rgba(0, 0, 0, 1)'
    },
    description: {
        fontSize: 14
    },
    descriptionBoard: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textShadow: '0px 0px 2px  rgba(0, 0, 0, 1)'
    }
})
const MintPage = ({sales, inStock, maxSupply, minted}) => {

    const { isAuthenticated, account } = useMoralis();
    const [opacity, setOpacity] = useState(1);
    const [position, setPosition] = useState(0);

    const toggleScroll = () => {
        window.scrollY < 500
            ? setOpacity(1 - window.scrollY / 500)
            : setOpacity(0)
        setPosition(-1 * window.scrollY / 3.8);
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleScroll)
        return () => window.removeEventListener('scroll', toggleScroll)
    }, [])

    const classes = useStyles();
    return <div>
        <div className={classes.back} style={{top: position}}/>
        <Header color="#030303" subColor="white" sales={sales}/>
        <div className={classes.columnCenter}>
            <Spacer height={750}/>
            <div className={classes.top} style={{top: position+150, opacity:opacity}}>
                <div className={classes.title}>We are gonna make it !!</div>
                <Spacer height={20}/>   
                <div className={classes.subtitle}>This is our policy</div>    
                <Spacer height={30}/>  
                <div className={classes.descriptionBoard}>
                <div className={classes.description}>
                    このトークンは、イーサリアムチェーン上で機能するERC1155規格のNFTです。
                </div>  
                <div className={classes.description}>
                    このトークンをMintすると、アーティストのディスコードコミュニティに参加することができます。
                </div>  
                <div className={classes.description}>
                    このトークンの画像および音楽データはすべてIPFSに保存されています。
                </div>  
                <div className={classes.description}>
                    このトークンは、将来の価格を保証するものではありません。
                </div>  
                <div className={classes.description}>
                    This token is NFT following ERC1155 standard on Ethereum chain.
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
        </div>
        <div className={classes.columnCenter}>
            <Spacer height={90}/>
            <div className={classes.pageClass}>
                <Grid item>
                    <MusicCard title={"LUNA - Original"} artist={"hibikilla"} id={1} sales={sales} inStock={inStock[0]}/>
                    <Spacer height={50}/>
                    <MusicCard title={"LUNA - Special"} artist={"hibikilla"} id={2} sales={sales} inStock={inStock[1]}/>
                    <Spacer height={50}/>
                    <MusicCard title={"LUNA - Instrumental"} artist={"hibikilla"} id={3} sales={sales} inStock={inStock[2]}/>
                    <Spacer height={50}/>
                    <MusicCard title={"LUNA - Acappella"} artist={"hibikilla"} id={4} sales={sales} inStock={inStock[3]}/>
                    <Spacer height={150}/>
                </Grid>
            </div>
        </div>
    </div>;
};

export default MintPage;