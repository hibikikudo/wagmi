import { Button, Card, makeStyles } from "@material-ui/core";
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import { Path } from '../components/Routes';
import { useMoralis } from "react-moralis";
import Footer from "../components/Footer";
import AllowListButton from "../moralis/AllowlistButton";

const useStyles = makeStyles({
  back: {
    color: "white",
    backgroundColor: '#151515',
    minHeight: '100vh',
    minWidth: '100vw',
    zIndex: -1
  },
  appField: {
    width:"92vw",
  },
  columnCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position:'relative',
  },
  rowCenter: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  appBox: {
    width:300,
    height:380,
    margin: "1vw",
    backgroundColor:"#030303",
    borderRadius: "1vw",
  },
  appButton: {
    fontSize:16,
    width:"40%",
    color:"white",
    border:"solid",
    borderColor:"white",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    "&:hover": {
      background: "#5c5c5c"
    },
  },
  appInvalid: {
    fontSize:16,
    fontWeight:'bolder',
    width:"50%",
    color:"white",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  img: {
    width: "100%",
    borderTopRightRadius: "1vw",
    borderTopLeftRadius: "1vw",
  },
  fade: {
    bottom:0,
    width:"100%",
    height:"50%",
    background: "linear-gradient(to bottom, transparent, black)",
    position:'absolute',
  },
  frame: {
    borderTopRightRadius: "1vw",
    borderTopLeftRadius: "1vw",
    width:300,
    height:300,
    position:'relative',
  },
  description: {
    bottom:70,
    color:'white',
    position:'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  aName: {
    fontSize:20,
  },
  aDesc: {
    // fontFamily:'Lato',
    fontSize:10,
  }
})

const AppPage = ({sales}) => {
  const classes = useStyles();
  const { account } = useMoralis();

  return <>
  <div className={classes.back}>
    <Header color="white" subColor="#030303" sales={sales}/>
    <Spacer height={150}></Spacer>
    <div className={classes.columnCenter}>
    <div className={classes.appField}>
      <div className={classes.rowCenter}>
        {/* <AllowListButton/> */}
        <Card raised className={classes.appBox}>
          <div className={classes.frame}>
            <img className={classes.img}
            src={`/image/omni2.jpg`}/>
            <div className={classes.fade}></div>
          </div>
          <div className={classes.columnCenter}>
            <div className={classes.description}>
              <div className={classes.aName}>Omnichain Sender</div>
              <div className={classes.aDesc}>異なるチェーンにNFTを転送します</div>
            </div>
            {account?
            <Button 
                href={Path.omni}
                className={classes.appButton}
                >
              Launch
            </Button>:
            <div className={classes.appInvalid}>
              ConnectWallet
            </div>
            }
          </div>
        </Card>
        <Card raised className={classes.appBox}>
          <div className={classes.frame}>
            <img className={classes.img}
            src={`/image/wagmi1.png`}/>
            <div className={classes.fade}></div>
          </div>
          <div className={classes.columnCenter}>
            <div className={classes.description}>
              <div className={classes.aName}>Wagmi Collection</div>
              <div className={classes.aDesc}>保有しているWagmi NFTをプレビューできます</div>
            </div>
            {account?
            <Button 
                href={Path.album}
                className={classes.appButton}
                >
              Launch
            </Button>:
            <div className={classes.appInvalid}>
              ConnectWallet
            </div>
            }
            
          </div>
        </Card>
        <Card raised className={classes.appBox}>
          <div className={classes.frame}>
            <img className={classes.img}
            src={`/image/wagmi2.png`}/>
            <div className={classes.fade}></div>
          </div>
          <div className={classes.columnCenter}>
            <div className={classes.description}>
              <div className={classes.aName}>Token Exchanger</div>
              <div className={classes.aDesc}>旧規格トークンの引換を行います</div>
            </div>
            <div className={classes.appInvalid}>
              Coming Soon...
            </div>
          </div>
        </Card>
        <Card raised className={classes.appBox}>
          <div className={classes.frame}>
            <img className={classes.img}
            src={`/image/wagmi2.png`}/>
            <div className={classes.fade}></div>
          </div>
          <div className={classes.columnCenter}>
            <div className={classes.description}>
              <div className={classes.aName}>Token Staking</div>
              <div className={classes.aDesc}>ステーキングで新しいNFTを獲得します</div>
            </div>
            <div className={classes.appInvalid}>
              Coming Soon...
            </div>
          </div>
        </Card>
      </div>
    </div>
    </div>
    <Spacer height={100}/>
    <Footer/>
  </div>
  </>
}

export default AppPage;