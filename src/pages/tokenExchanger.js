import { Button, Typography, Card, makeStyles, InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import { useState } from "react";
import { ConfirmExchangeButton } from "../moralis/Confirm";

const useStyles = makeStyles({
  back: {
    backgroundColor: '#151515',
    minHeight: '155vh',
    minWidth: '100vw',
    zIndex: -1
  },
  image: {
    margin: 10
  },
  img: {
      width: 300,
      height: 300,
      borderRadius: "8%",
  },
  button: {
    top: "50%",
    left: "45%",
    width: 50,
    height: 50,
    position: 'absolute',
  },
  arrow: {
    width: 35,
    height: 35,
  },
  columnCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  rowCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Rock Salt',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 28
  },
  version: {
    fontSize: 24
  },
  card: {
    width: 700,
    height: 500,
    padding: 40,
    borderRadius: 20,
    backgroundColor: '#2F2C37',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily:'Lato',
  },
  chainCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 240,
    height: 50,
    padding:6,
    borderRadius: 5,
    fontSize: 20,
  },
  transparentBlock: {
    width: '5%',
    height: 'auto',
  },
  formContent: {
      fontSize: 14,
      width: 250
  },
  info: {
      marginLeft: 50,
      marginRight: 10,
      width: "auto",
      height: "auto",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
  },
  base: {
      width: 'auto',
      position: 'relative',
      height: "auto",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
  },
  from: {
      fontWeight: 'bold',
      height: "auto",
      width: "auto",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
  },
  polygon: {
    width: 50,
    height: 50,
    margin: 5,
  },
  ethereum: {
    width: 20,
    height: 35,
    margin: 15,
  },
  form: {
    width: "auto",
    border: "2px solid skyblue",
    fontFamily:'Lato',
    color:'red',
    backgroundColor:'red',
  },
  item : {
    fontFamily:'Lato',
  },
  description: {
    fontSize: 14
  },
  formControl: {
    minWidth: 400,
  },
  selectItem: {
    color: 'white',
    fontFamily:'Rock Salt',
  },
  selectLabel: {
    color: 'white',
    fontWeight:'bold',
  }
})

const Jacket = ({tokenId}) => {
  const classes = useStyles();

  switch(tokenId){
    case 1:
        return <div className={classes.image}>
        <img className={classes.img}
        src='/image/wagmi1.jpg'/>
        </div>
    case 2:
        return <div className={classes.image}>
        <img className={classes.img}
        src='/image/wagmi2.jpg'/>
        </div>
    case 3:
        return <div className={classes.image}>
        <img className={classes.img}
        src='/image/wagmi3.jpg'/>
        </div>
    case 4:
      return <div className={classes.image}>
      <img className={classes.img}
      src='/image/wagmi4.jpg'/>
      </div>
    default:
      return <div className={classes.image}>
      <img className={classes.img}
      src='/image/wagmi1.jpg'/>
      </div>
}
}

const TokenExchanger = ({sales}) => {
  const classes = useStyles();
  const [tokenId, setTokenId] = useState(1);
  const [update,setUpdate]=useState(false);

  const handleChange = (event) => {
    setTokenId(event.target.value);
    setUpdate(update?false:true);
  };

  const handletokenId = (id) => {
    switch(id){
      case 1:
        return "78555306292208822264975053909961537674478548303611333324072215595578311049286"
      case 2:
        return "78555306292208822264975053909961537674478548303611333324072215598876845932549"
      case 3:
        return "78555306292208822264975053909961537674478548303611333324072215599976357560325"
      case 4:
        return "78555306292208822264975053909961537674478548303611333324072215601075869188106"
      default:
        return null
    }
  }

  return <>
  <div className={classes.back}>
    <Header color="#030303" subColor="white" sales={sales}/>
        <Spacer height={150}></Spacer>
        {/* <AllowListButton/> */}
    <div className={classes.columnCenter}>
      <Typography style={{fontSize: 60, marginBottom: 10, fontWeight:'bold'}}>
        Token Exchanger
      </Typography>
      <div className={classes.subtitle}>Let's Exchange Legacy NFT!!</div>
      <Spacer height={20}></Spacer>
      <div className={classes.description}>このアプリケーションは"Wagmi"を所有しているユーザーのみが使用できます</div>
      <div className={classes.description}>ExchangeするNFTを選択してください</div>
      <div className={classes.description}>Only Holders of "Wagmi" can use this app</div>
      <div className={classes.description}>Please selecrt NFT to exchange</div>
      <Spacer height={50}></Spacer>
      <Card raised className={classes.card}>
              <div className={classes.title}>"WAGMI" by Hibikilla</div>
              <Spacer height={10}/>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.selectLabel} id="demo-simple-select-label">Version</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tokenId}
                  onChange={handleChange}
                  className={classes.selectItem}
                >
                  <MenuItem value={1}>Normal</MenuItem>
                  <MenuItem value={2}>MV rare</MenuItem>
                  <MenuItem value={3}>Record Rare</MenuItem>
                  <MenuItem value={4}>acappella</MenuItem>
                </Select>
              </FormControl>
              <Spacer height={40}/>
              <div className={classes.rowCenter}>
                <Jacket tokenId={tokenId}/>
                <div className={classes.info}>
                    <div className={classes.base}>
                        <div className={classes.from}>
                          <div style={{fontSize:22, marginBottom: '4%'}}>legacy</div>
                          <Card raised className={classes.chainCard}>
                            <img className={classes.polygon} src="/image/polygon.svg"/>
                            OpenSea contract
                          </Card>
                          </div>
                        <Spacer height={30}/>
                        <div className={classes.button}>
                          <img className={classes.arrow}
                          src="/image/arrowDown.svg"/>
                        </div>
                        <div className={classes.from}>
                          <div style={{fontSize:22, marginBottom: '4%'}}>brand-new</div>
                          <Card raised className={classes.chainCard}>
                            <img className={classes.polygon} src="/image/polygon.svg"/>
                            WAGMI contract
                          </Card>
                        </div>
                    </div>
                    <Spacer height={40}/>
                    <ConfirmExchangeButton tokenId={handletokenId(tokenId)} update={update}></ConfirmExchangeButton>
                    <Spacer height={20}/>
                </div>
              </div>
            </Card>
            <Spacer height={200}/>
    </div>
  </div>
  </>
}

export default TokenExchanger;