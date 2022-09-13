import Header from "../components/Header";
import Spacer from "../components/Spacer";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import { Doughnut } from 'react-chartjs-2';
import InputBase from '@material-ui/core/InputBase';
import { Button, makeStyles } from "@material-ui/core";
import CallMadeIcon from '@mui/icons-material/CallMade';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useMoralis } from "react-moralis";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import { MoralisProvider } from 'react-moralis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLink, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { getEllipsisTxt } from "../helpers/formatters";
import Sequence from "../components/Sequence";
import styled from 'styled-components'
import Footer from "../components/Footer";

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;
const contractAddress = "0x2FE90DC5116eeC7504E32D599D4307031823F58a";

const StyledDoughnuts = styled(Doughnut)`
  color: #4A434D;
  position: absolute;
`

const useStyles = makeStyles((theme)=>({
  back: {
    // backgroundImage:"url(/image/waveform.png)",
    backgroundColor: '#212029',
    // backgroundColor: '#151515',
    minHeight: '200vh',
    minWidth: '100vw',
  },
  circle: {
    overflow:"hidden",
    position:"fixed",
    top:"90%",
    left:"80%",
    borderRadius:1000,
    transform: "translate(-50%,-50%)",
    background: '#9144fc',
    width: 800,
    height: 800,
    backgroundImage:'linear-gradient( 90deg, rgb(137, 99, 219) 0%,rgb(95, 48, 194) 50%,rgb(41, 24, 77) 100%)',
    boxShadow: "-20px -10px 50px 5px rgba(41, 24, 77, 0.8) inset",
  },
  columnCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position:'relative',
  },
  columnStart: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'start',
    flexDirection: 'column',
    position:'relative',
  },
  rowCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap:'wrap',
  },
  musicBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    flexDirection: 'row',
    // flexWrap:'wrap',
    width:"90vw",
    maxWidth:1200
  },
  rowSpace: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // flexWrap:'wrap',
  },
  rowEvenly: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    // flexWrap:'wrap',
  },
  rowStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    flexDirection: 'row',
  },
  material: {
    position: "relative",
    // margin: "0 50px 0 50px",
    width:"70vw",
    maxWidth:300,
    height:"70vw",
    maxHeight:300,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // position:'relative',
  },
  RoleLabels: {
    width:"auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  RoleLabel: {
    position:'relative',
    color:'white',
    fontWeight:'bold',
    fontFamily:"Regular",
    width:"70vw",
    maxWidth: 400,
    height:"auto",
    // marginTop:"2vw",
    borderRadius:10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    whiteSpace:'nowrap',
    padding:"12px 15px 12px 15px",
  },
  colorTag: {
    height:"100%",
    width:"2%",
    left:0,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    position:'absolute',
  },
  iconButton: {
    // backgroundColor: "red",
    color: "black",
    border: 'solid',
    borderWidth:1.5,
    maxWidth: 25,
    maxHeight: 25,
    minWidth: 25,
    minHeight: 25,
    "&:hover": {
      background: "#1d1a26"
    },
  },
  address: {
    fontFamily:"Regular",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap:'wrap',
    width: "auto",
    opacity: 1,
    backgroundColor: "#1d1a26",
    padding:"6px 15px 6px 15px",
    borderRadius: 5,
  },
  copy: {
    color:"white",
    maxWidth: 20,
    maxHeight: 20,
    minWidth: 20,
    minHeight: 20,
  },
  role: {
    fontFamily:"Regular",
    fontSize:20,
    color: 'white',
  },
  artist: {
    fontFamily:"Regular",
    color: "#665e75",
  },
  musicTitle: {
    fontFamily:"Heavy",
    color: 'white',
  },
  dis: {
    fontFamily:"Heavy",
    margin:"0 20px 0 20px",
    fontSize:20,
    color: 'white',
  },
  chartBox: {
    backgroundColor:'rgba(17, 17, 17, 0.7)',
    boxSizing:"border-box",
    padding: 20,
    borderRadius:10,
    width:"90vw",
    maxWidth:1200
  },
  img: {
    marginTop:40,
    marginLeft:40,
    width: "30vw",
    maxWidth: 400,
    height: "30vw",
    maxHeight: 400,
    borderRadius:20,
    boxShadow: "10px 10px 10px 5px rgba(0, 0, 0, 0.4)"
  },
  info: {
    maxWidth: "90vw",
  },
  link: {
    position: "absolute",
    top:20,
    right:25,
  },
  icon: {
    width:20,
    height:20,
  },
  progressBox: {
    backgroundColor:'rgba(17, 17, 17, 0.7)',
    boxSizing:"border-box",
    padding: 20,
    borderRadius:10,
    width:"90vw",
    maxWidth:1200,
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'start',
    flexDirection: 'column',
  },
  cover: {
    position: "absolute",
    backgroundColor:'rgba(255,255,255, 0.3)',
    width:"100%",
    height:"100%",
    borderRadius:10,
  },
  chartCore: {
    color: "white",
    fontFamily:"Medium",
    position:"absolute",
    top:"53%",
    left:"50%",
    transform: "translate(-50%,-50%)",
  }
}));

const BarRoot = styled('div')(({ theme, isMobile }) => ({
  backgroundColor: 'white',
  height:30,
  width:3,
  borderRadius:2,
}));

const EarningBoxRoot = styled('div')(({ theme, isMobile }) => ({
  color: 'white',
  boxSizing:"border-box",
  width:"55vw",
  maxWidth:600,
  padding:"40px 50px 40px 50px",
  backgroundColor: "rgba(17, 17, 17, 0.7)",
  borderRadius:10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  position:'relative',
  ...(isMobile && {
    maxWidth:1000,
    width:"90vw",
    padding:"20px 30px 20px 30px",
    borderRadius:10,
    backgroundImage: 'url(/image/luna1.png)',
    backgroundSize: "cover",
    // backgroundColor: "rgba(17, 17, 17, 0)",
  }),
}));

const EarningRoot = styled('div')(({ theme, isMobile }) => ({
    // backgroundColor: "#1d1a26",
    borderColor: "#1d1a26",
    border: 'solid',
    borderWidth:2,
    padding:"15px 20px 15px 20px",
    borderRadius: 10,
    ...(isMobile && {
      borderWidth:0,
      width:"60vw",
      // color:"black",
      backgroundColor: "#1d1a26",
    }),
}));

const handleOption = (opt, id) => {
  switch(opt){
    case "profit":
      const profit_options = {
        chain: "polygon",
        address: contractAddress,
        function_name: "profit",
        abi: [{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"profit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
        params: {_tokenId:id}
      };
      return profit_options;
    case "share":
      const share_options = {
        chain: "polygon",
        address: contractAddress,
        function_name: "getShare",
        abi: [{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getShare","outputs":[{"internalType":"address[]","name":"","type":"address[]"},{"internalType":"uint32[]","name":"","type":"uint32[]"},{"internalType":"address payable","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
        params: {_tokenId:id}
      };
      return share_options;
    default:
      return "";
  }
}

const handleSource = (src, address) => {
  switch(src){
    case "etherscan":
      return `https://etherscan.io/address/${address}`
    default:
      return `https://etherscan.io/address/${address}`;
  }
}

const Aggregator = ({isMobile, address, value, color}) => {
  const classes = useStyles();
  const [copy, setCopy] = useState(false);

  function copyTextToClipboard() {
    navigator.clipboard.writeText(address)
    .then(function() {
      setCopy(true)
      // console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  return<>
    <div className={classes.RoleLabel} style={{backgroundColor:"#282333"}}>
    <div className={classes.colorTag} style={{backgroundColor:color}}>
    </div>
    <Spacer width={5}></Spacer>
    <div style={{color:color, fontSize:16}}>
      {Math.floor(value)} ETH
    </div>
    {/* <div style={{color:color, fontSize:12, fontFamily:'Lato'}}>
      
    </div> */}
    <Spacer width={10}/>
    {isMobile?<></>:<div style={{color:"#665e75"}}>address</div>}
    <div className={classes.address} style={{fontSize:16}}>
      {getEllipsisTxt(address, 4, 4)}
      <Spacer width={10}/>
      <Button
        onClick={copyTextToClipboard}
        className={classes.copy}
        >
        {copy?<FontAwesomeIcon icon={faCheck}/>:
        <ContentCopyIcon fontSize="small" sx={{ color: "white" }}/>}
      </Button>
    </div>
    <Spacer width={10}></Spacer>
    <Button
        href={handleSource("etherscan",address)}
        target="_blank"
        className={classes.iconButton}
        >
        <CallMadeIcon fontSize="small" sx={{ color: "black" }}/>
    </Button>
  </div>
  <Spacer height={10}/>
  </>
}

const RoleLabel = ({isMobile, data, i}) => {
  const classes = useStyles();
  const [copy, setCopy] = useState(false);

  // console.log(data, i);

  function copyTextToClipboard() {
    navigator.clipboard.writeText(data[0][i])
    .then(function() {
      setCopy(true)
      // console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  return<>
    <div className={classes.RoleLabel} style={{backgroundColor:"#282333"}}>
    <div className={classes.colorTag} style={{backgroundColor:colorSet[i]}}>
    </div>
    <Spacer width={5}></Spacer>
    <div className={classes.rowCenter}>
    <div style={{color:colorSet[i], fontSize:16}}>
      {Math.floor(data[1][i])}
    </div>
    <Spacer width={5}/>
    <div style={{color:colorSet[i], fontSize:12, fontFamily:'Lato'}}>
      %
    </div>
    </div>
    <Spacer width={5}></Spacer>
    {isMobile?<></>:<div style={{color:"#665e75"}}>address</div>}
    <div className={classes.address} style={{fontSize:16}}>
      {getEllipsisTxt(data[0][i], 4, 4)}
      <Spacer width={10}></Spacer>
      <Button
        onClick={copyTextToClipboard}
        className={classes.copy}
        >
        {copy?<FontAwesomeIcon icon={faCheck}/>:
        <ContentCopyIcon fontSize="small" sx={{ color: "white" }}/>}
      </Button>
    </div>
    <Spacer width={10}></Spacer>
    <Button
        href={handleSource(data[0][i])}
        target="_blank"
        className={classes.iconButton}
        >
        <CallMadeIcon fontSize="small" sx={{ color: "black" }}/>
    </Button>
  </div>
  <Spacer height={10}/>
  </>
}

const Earning = ({isMobile, value}) => {
  const classes = useStyles();
  return<EarningBoxRoot isMobile={isMobile}>
    {isMobile?<div className={classes.cover}></div>:<></>}
    <FontAwesomeIcon className={classes.link} icon={faShareNodes} style={{color:isMobile?"#151515":"white"}}/>
    <div className={classes.columnStart}>
      <div style={{fontFamily:"Heavy",fontSize:20, color:isMobile?"#151515":"white"}}>
        Music Earning
      </div>
      <Spacer height={10}/>
      <EarningRoot isMobile={isMobile}>
      <div className={classes.rowSpace}>
        <div style={{fontFamily:"Medium",fontSize:isMobile?24:40}}>
          {1.5217}
        </div>
        <Spacer width={10}/>
        <div style={{fontFamily:"Light",fontSize:isMobile?10:16}}>
          ETH
        </div>
        <Spacer width={15}/>
        <BarRoot isMobile={isMobile}/>
        <Spacer width={15}/>
        <div style={{fontFamily:"Medium",fontSize:isMobile?24:40}}>
          {405699}
        </div>
        <Spacer width={10}/>
        <div style={{fontFamily:"Light",fontSize:isMobile?10:16}}>
          JPY
        </div>
        <Spacer width={10}/>
        {/* <FontAwesomeIcon className={classes.icon} icon={faShareNodes}/> */}
        {/* <img className={classes.icon} src='/image/chainlink.svg'/> */}
      </div>
      <div className={classes.rowStart} style={{fontFamily:"Regular",fontSize:16}}>
        <div>Recoup line : {10000} JPY</div>
      </div>
      </EarningRoot>
      {/* <div className={classes.rowStart} style={{fontFamily:"Regular",fontSize:16}}>
        <div>Recoup line : {10000} JPY</div>
      </div> */}
    </div>
  </EarningBoxRoot>
}

let checker = [true, true];

const colorSet = ["#5f30c2",'#6dbfbe','#d9e86b','#3755ed', '#151515'];

const MusicData = ({sales}) => {
  const classes = useStyles();
  const { native } = useMoralisWeb3Api();
  const [data, setData] = useState();
  const [value, setValue] = useState();
  const [isMobile, setIsMobile] = useState();

  const onResize = () => {
    window.innerWidth < 800
        ? setIsMobile(true)
        : setIsMobile(false)
}

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const getShare = useMoralisWeb3ApiCall(native.runContractFunction,{...handleOption("share",1)});
  const getProfit = useMoralisWeb3ApiCall(native.runContractFunction,{...handleOption("profit",1)});

  useEffect(() => {
    if(checker[0]){
      getShare.fetch();
      checker[0] = false;
    }
    if(checker[1]){
      getProfit.fetch();
      checker[1] = false;
    }
  },[]);

  useEffect(() => {
    if(getShare.data){
      setData(getShare.data);
    }
    if(getProfit.data){
      setValue(getProfit.data);
    }
  }, [getShare.data, getProfit.data])

  const graphdata = {
    datasets: [
    {
      data: data?data[1]:[0],
      backgroundColor: colorSet,
      borderWidth: 0,
      borderRadius: 0,
      borderColor: "#151515",
      radius:"80%",
      cutout:"80%"
    },
   ],
  };

  return<MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
  <div className={classes.back} style={{zIndex: -1}}>
  <div className={classes.circle} style={{zIndex: 0}}/>
  <Header color="white" subColor="#030303" sales={sales}/>
  <Spacer height={isMobile?90:150}></Spacer>
  <div className={classes.columnCenter}>
  <div className={classes.info}>
    <div className={classes.musicBox}>
      <div className={classes.columnStart}>
        <div className={classes.artist} style={{fontSize:isMobile?20:30}}>hibikilla</div>
        <div className={classes.musicTitle} style={{fontSize:isMobile?30:60}}>Luna - Normal</div>
        <Spacer height={30}/>
        {value?<Earning isMobile={isMobile} value={value}/>:<></>}
      </div>
      {isMobile?<></>:<img className={classes.img} src='/image/luna1.png'/>}
    </div>
  </div>
  <Spacer height={30}/>
  <div className={classes.progressBox}>
    <div className={classes.dis}>Progress</div>
    <Spacer height={50}/>
    <Sequence step={3}/>
  </div>
  <Spacer height={30}/>
  <div className={classes.chartBox}>
  <div className={classes.dis}>Share Chart</div>
    <div className={classes.rowCenter}>
      <div className={classes.material}>
        <div className={classes.chartCore} style={{fontSize:isMobile?24:24}}>{1.5217} ETH</div>
        <StyledDoughnuts
        data={graphdata}/>
        {/* <div className={classes.circle}></div> */}
      </div>
    <Spacer width={150}/>
    <div  className={classes.columnStart}>
    {data&&data[2]?<div className={classes.role}>aggregator</div>:<></>}
      <Spacer height={10}/>
      <div className={classes.RoleLabels}>
          {data?<Aggregator address={data[2]} value={data[3]} isMobile={isMobile} color={"#e66529"}/>:<></>}
      </div>
      <Spacer height={10}/>
      <div className={classes.role}>stakeholder</div>
      <Spacer height={10}/>
      <div className={classes.RoleLabels}>
          {data?data[0].map((d,i)=><RoleLabel key={i} i={i} data={data} isMobile={isMobile} color={"#6dbfbe"}/>):<></>}
      </div>
    </div>
    </div>
  </div>
  <Spacer height={50}/>
  <Footer color={"white"}/>
  </div>
  </div>
  </MoralisProvider>;
}

export default MusicData