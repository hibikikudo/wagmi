import { Button, Card, makeStyles } from "@material-ui/core";
import Spacer from "../components/Spacer";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  columnCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position:'relative',
  },
  rowCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  tokenBox: {
    color:"#030303",
    width:"25vw",
    height: "35vw",
    margin: "1vw",
    blurRadius: 10,
    // backgroundColor:"white",
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
  img: {
    width: "80%",
    borderRadius: "1vw",
    blurRadius:1
  },
  description: {
    fontFamily:'Lato',
    fontSize:18,
  },
  musicTitle: {
    fontFamily:'Lato',
    fontWeight:'bolder',
    fontSize:20,
    margin:'2%',
    textAlign: 'center'
  },
  artist: {
    fontSize:20,
  },
  opensea: {
    width: "60%"
  },
  customIcon: {
    width:"10%",
    margin: 5,
  },
  white: {
    color:'white'
  }
})

// data:[id, amount, url]
const Collection = ({data}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();

  const fetchMetadata = async (uri) => {
    if(uri){
      fetch(
        uri,
        // {mode: 'cors',
        // credentials: 'include'}
      )
    .then(res => res.json())
    .then((rows) => {
        setName(rows.name);
        setImage(rows.image);
    });
    }else{
      console.log("no uri is passed")
    }
  }

  useEffect(()=>{
    fetchMetadata(data[2]);
    setIsOpen(true)
  },[1])
  if(name&&image){
    return<div className={classes.tokenBox} style={
      {
        transition: '2s',
        opacity: isOpen ? 1 : 0,
        blurRadius: isOpen ? 50 : 0,
      }
    }>
      <div className={classes.columnCenter}>
        <img className={classes.img}
        src={image}/>
        <Spacer height={15}/>
        <div className={classes.musicTitle}>{name}</div>
        <div className={classes.artist}>hibikilla</div>
        <div className={classes.rowCenter}>
          <div className={classes.description}>id:</div>
          <Spacer width={5}/>
          <div className={classes.description}>{data[0]}</div>
          <Spacer width={15}/>
          <div className={classes.description}>amount:</div>
          <Spacer width={5}/>
          <div className={classes.description}>{data[1]}</div>
        </div>
        <Spacer height={10}/>
        <div className={classes.rowCenter}>
          <Button
              href="https://twitter.com/hibikilla30"
              target="_blank"
              className={classes.customIcon}
              >
              <img className={classes.opensea} src="/image/opensea.svg"/>
          </Button>
          <Button
              href="https://twitter.com/hibikilla30"
              target="_blank"
              className={classes.customIcon}
              >
              <img className={classes.opensea} src="/image/etherscan.svg"/>
          </Button>
        </div>
      </div>
    </div>
  }else{
    return<div></div>
  }
}

export default Collection;