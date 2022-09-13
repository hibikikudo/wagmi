import { makeStyles } from "@material-ui/core";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, CircularProgress, Grid, Typography } from '@material-ui/core'
import React from 'react'
import Spacer from "../components/Spacer";
import styled from 'styled-components'
import { useEffect, useRef, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const StyledCircularBar = styled(CircularProgress)`
  color: #4A434D;
  position: absolute;
`;

const StyledDoughnuts = styled(Doughnut)`
  color: #4A434D;
  position: absolute;
`

const useStyles = makeStyles({
  columnCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  exGraph: {
    marginRight:180
  },
  graph: {
    width: "50vw",
    height: "50vw",
    position: "relative",
  },
  circle: {
    display: 'flex',
    width: "20vw",
    height: "20vw",
    position: "absolute",
    "border-radius": "50%",
    top: "51%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    background: '#9144fc',
    justifyContent: 'center',
    alignItems: 'center',
    "text-align": "center",
    "line-height": "150px",
    boxShadow: "0px 0px 30px 0px rgba(128, 44, 245, 0.8)"
  },
  dayLabel: {
    fontFamily: "Lato",
    width: "auto",
    height: "50px",
    fontSize: 16,
    // fontWeight: 'bold',
    position: "relative",
    'margin-left': '10%',
    display: 'flex',
    "align-items": "center",
    justifyContent: 'flex-start'
  },
  salesLabel: {
    fontFamily: "Lato",
    width: "auto",
    height: "50px",
    fontSize: 16,
    // fontWeight: 'bold',
    position: "relative",
    'margin-left': '6%',
    display: 'flex',
    "align-items": "center",
    justifyContent: 'flex-start'
  },
  salesColumn: {
    // backgroundColor:"black",
    width: 200,
    top: "50%",
    left: "50%",
    display: 'flex',
    flexDirection: 'row',
    position: "absolute",
    "align-items": "center",
    justifyContent: 'flex-start'
  },
  salesPoint: {
    width:"0.6vw",
    height: "0.6vw",
    "border-radius": "50%",
    position: "relative",
  },
  tokenSupply: {
    width: "auto",
    height: "auto",
    top: "50%",
    left: "50%",
    // transform: "translate(-50%,-50%)",
    // position: "absolute",
    fontFamily: 'Lato',
    // "text-align": "center",
    "line-height": "0px",
    color: "#FFFAF3"
  },
  tokenAmount: {
    width:"20vw",
    display: 'flex',
    flexDirection: 'row',
    alignItems: "end",
    justifyContent: 'center',
    flexWrap:'wrap'
  },
  sbold: {
    fontFamily:"Medium",
    "margin-bottom": "3vw"
  },
  bbold: {
    fontFamily:"Medium"
  },
  thin: {
    fontFamily:"Lato"
  }
});

const TokenDoughnut = ({supply, minted, total}) => {
  const graphdata = {
    datasets: [
    {
      data: [minted[0], minted[1], minted[2], minted[3], supply - total],
      backgroundColor: ["#4911BF",'#6dbfbe','#d9e86b','#3755ed', '#151515'],
      borderWidth: 0,
      borderRadius: 0,
      borderColor: "#151515",
      radius:"80%",
      cutout:"95%"
    },
   ],
  };

  const doughnutOptions = {
    legend: {
      display: false,
    },
  };

  return <div>
    <StyledDoughnuts
          data={graphdata} 
          options={doughnutOptions} />
  </div>
}

const SalesLabels = ({sales}) => {
  // const graphdata = {
  //   datasets: [
  //    {
  //      data: [25, 75],
  //      backgroundColor: ['#030303', '#F4E8D6'],
  //      borderWidth: 1,
  //      borderRadius: 1,
  //      radius:200,
  //      cutout:"98%"
  //    },
  //   ],
  // };

  const graphdata_prepared = {
    datasets: [
     {
       data: [100],
       backgroundColor: ['#151515'],
       borderWidth: 0,
       radius:"95%",
       cutout:"99%"
     },
    ],
  };

  const graphdata_presale = {
    datasets: [
     {
       data: [12.5, 87.5],
       backgroundColor: ["#d9c8f7", '#151515'],
       borderWidth: 0,
       radius:"95%",
       cutout:"99.5%"
     },
    ],
  };

  const graphdata_public = {
    datasets: [
     {
       data: [25, 75],
       backgroundColor: ["#d9c8f7", '#151515'],
       borderWidth: 0,
       radius:"95%",
       cutout:"99.5%"
     },
    ],
  };

  const graphdata_end = {
    datasets: [
     {
       data: [37.5, 62.5],
       backgroundColor: ["#d9c8f7", '#151515'],
       borderWidth: 0,
       radius:"95%",
       cutout:"99.5%"
     },
    ],
  };

  const doughnutOptions = {
    legend: {
      display: false,
    },
  };

  /*
  *  sales == 0 => prepared
  *  sales == 1 => presale
  *  sales == 2 => pulicsale
  *  sales == 3 => suspended
  */
  switch(sales){
    case "0":
        return <div>
        <StyledDoughnuts
          data={graphdata_prepared} 
          options={doughnutOptions} />
        <SalesLabel day="8/19" label="Presale" progress="false" degree1="-45" degree2="45"/>
        <SalesLabel day="8/20" label="Public Sale" progress="false" degree1="0" degree2="0"/>
        <SalesLabel day="9/26" label="End of Sale" progress="false" degree1="45" degree2="-45"/>
      </div>
    case "1":
        return <div>
        <StyledDoughnuts
          data={graphdata_presale} 
          options={doughnutOptions} />
        <SalesLabel day="8/19" label="Presale" progress="true" degree1="-45" degree2="45"/>
        <SalesLabel day="8/20" label="Public Sale" progress="false" degree1="0" degree2="0"/>
        <SalesLabel day="9/26" label="End of Sale" progress="false" degree1="45" degree2="-45"/>
      </div>
    case "2":
        return <div>
        <StyledDoughnuts
          data={graphdata_public} 
          options={doughnutOptions} />
        <SalesLabel day="8/19" label="Presale" progress="true" degree1="-45" degree2="45"/>
        <SalesLabel day="8/20" label="Public Sale" progress="true" degree1="0" degree2="0"/>
        <SalesLabel day="9/26" label="End of Sale" progress="false" degree1="45" degree2="-45"/>
      </div>
    case "3":
      return <div>
      <StyledDoughnuts
        data={graphdata_end} 
        options={doughnutOptions} />
      <SalesLabel day="8/19" label="Presale" progress="true" degree1="-45" degree2="45"/>
      <SalesLabel day="8/20" label="Public Sale" progress="true" degree1="0" degree2="0"/>
      <SalesLabel day="9/26" label="End of Sale" progress="true" degree1="45" degree2="-45"/>
    </div>
    default:
        return <div>
        <StyledDoughnuts
          data={graphdata_prepared} 
          options={doughnutOptions} />
        <SalesLabel day="8/19" label="Presale" progress="false" degree1="-45" degree2="45"/>
        <SalesLabel day="8/20" label="Public Sale" progress="false" degree1="0" degree2="0"/>
        <SalesLabel day="9/26" label="End of Sale" progress="false" degree1="45" degree2="-45"/>
      </div>
}
};

const SalesLabel = ({day, label, progress, degree1, degree2}) => {
  const classes = useStyles();
  if(progress === "true"){
    return <div 
    className={classes.salesColumn} 
    style={{transform: `translate(-155px,-20px) rotate(${degree1}deg) translate(23.4vw,0) rotate(${degree2}deg) translate(150px, 0px)`}}>
    <div className={classes.salesPoint} style={{background: "#d9c8f7"}}></div>
    <div className={classes.dayLabel} style={{color: "#d9c8f7"}}>{day}</div>
    <div className={classes.salesLabel} style={{color: "#d9c8f7"}}>{label}</div>
  </div>
  }else{
    return <div 
    className={classes.salesColumn} 
    style={{transform: `translate(-155px,-20px) rotate(${degree1}deg) translate(23.4vw,0) rotate(${degree2}deg) translate(150px, 0px)`}}>
    {/* translate(-7px,-2px) rotate(${degree1}deg) translate(23.12vw,0) */}
    <div className={classes.salesPoint} style={{background: "#151515"}}></div>
    <div className={classes.dayLabel} style={{color: "#151515"}}>{day}</div>
    <div className={classes.salesLabel} style={{color: "#151515"}}>{label}</div>
    </div>
  }
};

const TokenDoughnuts = ({sales, supply, minted, isMobile}) => {

 const classes = useStyles();
 const totalRef = useRef(0);
 const [total, setTotal] = useState(0);

 useEffect(()=>{
  let a = totalRef.current;
  a = minted.reduce((a,b)=>Number(a)+Number(b), 0);
  // console.log("total", a);
  setTotal(a);
 },[minted[0],minted[1],minted[2],minted[3]])

 return <div className={classes.exGraph}>
  <div className={classes.graph}>
    <div className={classes.circle}>
      <div className={classes.tokenSupply}>

        <div className={classes.sbold} style={{fontSize:isMobile?"10px":"20px"}}>total minted</div>
        <div className={classes.tokenAmount}>
          <div className={classes.bbold} style={{fontSize:isMobile?"12px":"24px"}}>{total ?total :0}</div>
          <div className={classes.thin} style={{fontSize:isMobile?"8px":"18px"}}>/{supply}</div>
          <Spacer width={"0.5vw"}/>
          <div className={classes.bbold} style={{fontSize:isMobile?"12px":"24px"}}>tokens</div>
        </div>

      </div>
    </div>
    <TokenDoughnut supply={supply} minted={minted} total={total}></TokenDoughnut>
    <SalesLabels sales={sales}/>
  </div>
</div>;
}

// const CircularInternalContent = styled.div`
//   // left: 0;
//   // top: 16px;
//   // bottom: 0;
//   // right: 0;
//   position: absolute;
// `

// const ProbabilitySuffix = styled(Typography)`
//   margin-bottom: 4px;
// `;

// const StyledCircularBackground = styled(CircularProgress)`
//   color: #4A434D;
//   position: absolute;
// `;

// const StyledCircularBar = styled(CircularProgress)`
//   position: absolute;
// `;


// const Tokenomics = () => {
//   const classes = useStyles();
//   const value = 80;
//   return (
//     <div className={classes.columnCenter}>
//     <div className={classes.title}>Tokenomics</div>
//     <Box position="relative" display="inline-flex">
//       {/* 背景用のCircularProgress */}
//       {/* <StyledCircularBackground variant="determinate" size={96} value={100} /> */}
//       {/* バロメーター用のCircularProgress */}
//       {/* <StyledCircularBar variant="determinate" size={96} value={value} /> */}
//       <CircularInternalContent>
//         <Grid container justify="center">
//           <Grid
//             container
//             justify="center"
//             alignItems="flex-end"
//           >
//             <Typography variant="h5">{value}</Typography>
//             <ProbabilitySuffix variant="caption">%</ProbabilitySuffix>
//           </Grid>
//         </Grid>
//       </CircularInternalContent>
//     </Box>
//     </div>
//   )
// }

export default TokenDoughnuts;