import { Button, Typography, Card, makeStyles, InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import { useState } from "react";
import { ConfirmButton } from "../moralis/Confirm";
import AllowListButton from "../moralis/AllowlistButton";

// const StyledInputLabel = styled(InputLabel)`
//   color: #030303;
// `;

const useStyles = makeStyles({
  back: {
    backgroundColor: '#151515',
    color: "white",
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
    top: "47%",
    left: "37%",
    width: 50,
    height: 50,
    position: 'absolute',
  },
  arrow: {
    width: 50,
    height: 50,
  },
  columnCenter: {
    fontFamily: "Rock Salt",
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
    margin: 20,
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
        src='/image/omni1.jpg'/>
        </div>
    case 2:
        return <div className={classes.image}>
        <img className={classes.img}
        src='/image/omni2.jpg'/>
        </div>
    case 3:
        return <div className={classes.image}>
        <img className={classes.img}
        src='/image/omni3.jpg'/>
        </div>
    case 4:
      return <div className={classes.image}>
      <img className={classes.img}
      src='/image/omni4.jpg'/>
      </div>
    case 5:
      return <div className={classes.image}>
      <img className={classes.img}
      src='/image/omni5.jpg'/>
      </div>
    case 6:
      return <div className={classes.image}>
      <img className={classes.img}
      src='/image/omni6.jpg'/>
      </div>
    case 7:
      return <div className={classes.image}>
      <img className={classes.img}
      src='/image/omni7.jpg'/>
      </div>
    default:
      return <div className={classes.image}>
      <img className={classes.img}
      src='/image/omni1.jpg'/>
      </div>
}
}

const OmnichainSender = ({sales}) => {
  const classes = useStyles();
  const [ ToETH, setToETH ] = useState();
  const [tokenId, setTokenId] = useState(1);
  const [update,setUpdate]=useState(false);

  const handleChange = (event) => {
    setTokenId(event.target.value);
    setUpdate(update?false:true);
  };

  return <>
  <div className={classes.back}>
    <Header color="#030303" subColor="white" sales={sales}/>
        <Spacer height={150}></Spacer>
    <div className={classes.columnCenter}>
      <Typography style={{fontSize: 60, marginBottom: 10, fontWeight:'bold'}}>
        Omnichain Sender
      </Typography>
      <div className={classes.subtitle}>Let's Send Omnichain NFT!!</div>
      <Spacer height={20}></Spacer>
      <div className={classes.description}>このアプリケーションはRisin' To The Topを所有しているユーザーのみが使用できます</div>
      <div className={classes.description}>SendするNFTを所有しているチェーンに接続してください</div>
      <div className={classes.description}>Only Holders of "Risin' to the top" can use This app</div>
      <div className={classes.description}>Please connect chain from which you send NFT</div>
      <Spacer height={50}></Spacer>
      <Card raised className={classes.card}>
              <div className={classes.title}>Hibikilla - Risin' To The Top feat. Laya</div>
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
                  <MenuItem value={1}>Neo Tokyo Rude Boy</MenuItem>
                  <MenuItem value={2}>Neo Tokyo Rude Gyal</MenuItem>
                  <MenuItem value={3}>Animation by Cool Rulers</MenuItem>
                  <MenuItem value={4}>Original Mix</MenuItem>
                  <MenuItem value={5}>Instrumental</MenuItem>
                  <MenuItem value={6}>Acappella</MenuItem>
                  <MenuItem value={7}>Remix</MenuItem>
                </Select>
              </FormControl>
              <Spacer height={40}/>
              <div className={classes.rowCenter}>
                <Jacket tokenId={tokenId}/>
                <div className={classes.info}>
                    <div className={classes.base}>
                        <div className={classes.from}>
                          <div style={{fontSize:22, marginBottom: '4%'}}>from</div>
                          {ToETH ?<Card raised className={classes.chainCard}>
                            <img className={classes.polygon} src="/image/polygon.svg"/>
                            Polygon
                          </Card>:
                          <Card raised className={classes.chainCard}>
                            <img className={classes.ethereum} src="/image/ethereum.png"/>
                            Ethereum
                          </Card>
                          }
                          </div>
                        <Spacer height={30}/>
                        <Button className={classes.button} onClick={()=>{
                          ToETH ? setToETH(false) : setToETH(true);
                          setUpdate(update?false:true)
                        }} >
                          <img className={classes.arrow}
                          src="/image/arrowUpDown.svg"/>
                        </Button>
                        <div className={classes.from}>
                          <div style={{fontSize:22, marginBottom: '4%'}}>to</div>
                          {ToETH ?<Card raised className={classes.chainCard}>
                            <img className={classes.ethereum} src="/image/ethereum.png"/>
                            Ethereum
                          </Card>
                          :
                          <Card raised className={classes.chainCard}>
                            <img className={classes.polygon} src="/image/polygon.svg"/>
                            Polygon
                          </Card>
                          }
                        </div>
                    </div>
                    <Spacer height={40}/>
                    <ConfirmButton toETH={ToETH} tokenId={tokenId} update={update}></ConfirmButton>
                    <Spacer height={20}/>
                </div>
              </div>
            </Card>
            <Spacer height={200}/>
    </div>
  </div>
  </>
}

export default OmnichainSender;