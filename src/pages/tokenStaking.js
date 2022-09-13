import Header from "../components/Header";
import Spacer from "../components/Spacer";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import InputBase from '@material-ui/core/InputBase';
import { Button, Typography, Card, makeStyles, InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
  back: {
    backgroundColor: '#151515',
    minHeight: '200vh',
    minWidth: '100vw',
    zIndex: -1
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap:'wrap',
  },
  rowSpace: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
    flexDirection: 'row',
    flexWrap:'wrap',
    width: "100%"
  },
  rowStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    flexDirection: 'row',
  },
  material: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor:'#2F2C37',
    width:"30vw",
    height:"30vw",
  },
  form: {
    display: 'flex',
    // alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    color:'white',
    marginLeft: theme.spacing(1),
    flex: 1,
    width:"100px"
  },
  setMaterial: {
    borderRadius:0,
    color:"white",
    maxWidth: '70px',
    maxHeight: '40px',
    minWidth: '70px',
    minHeight: '40px',
    backgroundColor:'#7547D7',
    "&:hover": {
      background: "#4911BF"
    },
  },
  tag: {
    color:'white',
  },
  materialImage: {
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: "2px",
    backgroundColor:"#333333",
    width: "15vw",
    height: "15vw",
  },
  appZone: {
    width:"60%",
    backgroundColor:"red",
  },
  appDiv: {
    width:400,
    backgroundColor:"blue",
    margin:"20px",
  }
}));


const DisplayMaterial = ({}) => {
  const classes = useStyles();
  const [text, setText] = useState("");

  const handleText = (input)=>{
    if(Number.isInteger(Number(input))){
      setText(input);
    }
  }

  return<div className={classes.material}>
    <div className={classes.materialImage}></div>
    <Spacer height={40}></Spacer>
    <div className={classes.form}>
      <div className={classes.tag}>tokenId</div>
      <InputBase
        className={classes.input}
        placeholder="999"
        onChange={(event) => handleText(event.target.value)}
        value={text}
      />
      {text?<Button className={classes.setMaterial}>Set</Button>:
      <Button className={classes.setMaterial} style={{backgroundColor: "#333333"}} disabled>Set</Button>
      }
    </div>
  </div>
}

const TokenStaking = ({sales}) => {
  const classes = useStyles();
  return<div className={classes.back}>
  <Header color="#030303" subColor="white" sales={sales}/>
  <Spacer height={150}></Spacer>
  <div className={classes.rowCenter}>
    <div className={classes.appZone}>
      <div className={classes.columnCenter}>
      <div className={classes.rowStart}>
          <DisplayMaterial/>
          <Spacer width={"10vw"}></Spacer>
          <DisplayMaterial/>
      </div>
      </div>
    </div>
    <div className={classes.appDiv}>
      hogehoge
    </div>
  </div>
  </div>;
}

export default TokenStaking;