import TokenDoughnuts from "./TokenDoughnuts";
import { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Spacer from "./Spacer";

const useStyles = makeStyles({
  title: {
    color: "white",
    fontSize: 60,
    zIndex: 0,
  },
  columnCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  rowCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  saleLabels: {
    width:'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    position:'relative',
  },
  saleLabel: {
    color:'white',
    fontFamily:'Lato',
    fontWeight:'bold',
    width: 300,
    height:10,
    marginTop:"2vw",
    borderRadius:10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    flexDirection: 'row',
    whiteSpace:'nowrap',
    padding:25
  },
  colorTag: {
    height:60,
    width:"2%",
    left:0,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    position:'absolute',
  }
})

const SaleLabel = ({title, id, minted, supply, color}) => {
  const classes = useStyles();
  return<div className={classes.saleLabel} style={{backgroundColor:"#282333"}}>
    <div className={classes.colorTag} style={{backgroundColor:color}}>
    </div>
    <Spacer width={10}></Spacer>
    <div style={{color:color, fontSize:16}}>
      {Math.floor(minted*100/supply)}% minted 
    </div>
    <Spacer width={10}></Spacer>
    <div style={{color:color, fontWeight:'normal'}}>
      {minted}/{supply}
    </div>
    <Spacer width={10}></Spacer>
    <div style={{fontSize:16}}>
      {title}
    </div>
    <Spacer width={10}></Spacer>
  </div>
}


const SalesTracker = ({sales, supply, minted, isMobile}) => {
  const classes = useStyles();

  return<div>
    <div className={classes.columnCenter}>
      <div className={classes.title}>Tokenomics</div>
    </div>
    <Spacer height={50}></Spacer>
    <div className={classes.rowCenter}>
    <TokenDoughnuts isMobile={isMobile} sales = {sales} supply={supply} minted={minted}></TokenDoughnuts>
    <div className={classes.saleLabels}>
        {/* '#1a1c1c','#6dbfbe','#d9e86b','#3755ed', '#F4E8D6' */}
        <SaleLabel title={"Luna - Normal"} id={1} minted={minted[0]} supply={45} color={"#4911BF"}/>
        <SaleLabel title={"Luna - Special"} id={2} minted={minted[1]}  supply={5} color={"#6dbfbe"}/>
        <SaleLabel title={"Luna - Instrumental"} id={3} minted={minted[2]}  supply={5} color={"#b8c934"}/>
        <SaleLabel title={"Luna - Acappella"} id={4} minted={minted[3]}  supply={5} color={"#3755ed"}/>
    </div>
    </div>
  </div>
}

export default SalesTracker;