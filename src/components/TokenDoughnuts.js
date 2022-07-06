import { makeStyles } from "@material-ui/core";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, CircularProgress, Grid, Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

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
  title: {
    fontSize: 60
  },
  columnCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  graph: {
    margin: "auto",
    width: "600px",
    height: "600px",
    position: "relative"
  },
  circle: {
    width: "250px",
    height: "250px",
    position: "absolute",
    "border-radius": "50%",
    top: "51%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    background: "#030303",
    "text-align": "center",
    "line-height": "150px"
  },
  dayLabel: {
    width: "auto",
    height: "50px",
    fontSize: 24,
    // fontWeight: 'bold',
    position: "relative",
    'margin-left': '10%',
    fontFamily: 'Lato',
    display: 'flex',
    "align-items": "center",
    justifyContent: 'flex-start'
  },
  salesLabel: {
    width: "auto",
    height: "50px",
    fontSize: 24,
    // fontWeight: 'bold',
    position: "relative",
    'margin-left': '6%',
    fontFamily: 'Rock Salt',
    display: 'flex',
    "align-items": "center",
    justifyContent: 'flex-start'
  },
  salesColumn: {
    width: "300px",
    height: "50px",
    top: "50%",
    left: "50%",
    display: 'flex',
    flexDirection: 'row',
    position: "absolute",
    "align-items": "center",
    justifyContent: 'flex-start'
  },
  salesPoint: {
    width: "10px",
    height: "10px",
    "border-radius": "50%",
    position: "relative"
  },
  tokenSupply: {
    width: "auto",
    height: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    position: "absolute",
    fontFamily: 'Lato',
    "text-align": "center",
    "line-height": "25px",
    color: "#FFFAF3"
  },
  tokenAmount: {
    display: 'flex',
    "align-items": "flex-end"
  },
  sbold: {
    fontSize: "24px",
    fontWeight: 'bold',
    "margin-left": "5px",
    "margin-bottom": "20px"
  },
  bbold: {
    fontSize: "32px",
    fontWeight: 'bold',
    "margin-left": "5px"
  },
  thin: {
    fontSize: "24px",
    "line-height": "20px"
  }
});

const TokenDoughnut = ({supply, minted}) => {
  const graphdata = {
    datasets: [
    {
      data: [minted, supply - minted],
      backgroundColor: ['#030303', '#F4E8D6'],
      borderWidth: 0,
      borderRadius: 1,
      radius:220,
      cutout:"70%"
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

  const graphdata_pre = {
    datasets: [
     {
       data: [100],
       backgroundColor: ['#F4E8D6'],
       borderWidth: 1,
       borderRadius: 1,
       radius:250,
       cutout:"98%"
     },
    ],
  };

  const graphdata_presale = {
    datasets: [
     {
       data: [12.5, 87.5],
       backgroundColor: ['#030303', '#F4E8D6'],
       borderWidth: 1,
       borderRadius: 1,
       radius:250,
       cutout:"98%"
     },
    ],
  };

  const graphdata_public = {
    datasets: [
     {
       data: [25, 75],
       backgroundColor: ['#030303', '#F4E8D6'],
       borderWidth: 1,
       borderRadius: 1,
       radius:250,
       cutout:"98%"
     },
    ],
  };

  const graphdata_end = {
    datasets: [
     {
       data: [37.5, 62.5],
       backgroundColor: ['#030303', '#F4E8D6'],
       borderWidth: 1,
       borderRadius: 1,
       radius:250,
       cutout:"98%"
     },
    ],
  };

  const doughnutOptions = {
    legend: {
      display: false,
    },
  };
  switch(sales){
    case 0:
        return <div>
        <StyledDoughnuts
          data={graphdata_presale} 
          options={doughnutOptions} />
        <SalesLabel day="7/10" label="Site Release" progress="true" degree1="-45" degree2="45"/>
        <SalesLabel day="7/15" label="Mint Sale" progress="false" degree1="0" degree2="0"/>
        <SalesLabel day="8/20" label="End of Sale" progress="false" degree1="45" degree2="-45"/>
      </div>
    case 1:
        return <div>
        <StyledDoughnuts
          data={graphdata_public} 
          options={doughnutOptions} />
        <SalesLabel day="7/10" label="Site Release" progress="true" degree1="-45" degree2="45"/>
        <SalesLabel day="7/15" label="Mint Sale" progress="true" degree1="0" degree2="0"/>
        <SalesLabel day="8/20" label="End of Sale" progress="false" degree1="45" degree2="-45"/>
      </div>
    case 2:
        return <div>
        <StyledDoughnuts
          data={graphdata_end} 
          options={doughnutOptions} />
        <SalesLabel day="7/10" label="Site Release" progress="true" degree1="-45" degree2="45"/>
        <SalesLabel day="7/15" label="Mint Sale" progress="true" degree1="0" degree2="0"/>
        <SalesLabel day="8/20" label="End of Sale" progress="true" degree1="45" degree2="-45"/>
      </div>
    default:
        return <div>
        <StyledDoughnuts
          data={graphdata_pre} 
          options={doughnutOptions} />
        <SalesLabel day="7/10" label="Site Release" progress="false" degree1="-45" degree2="45"/>
        <SalesLabel day="7/15" label="Mint Sale" progress="false" degree1="0" degree2="0"/>
        <SalesLabel day="8/20" label="End of Sale" progress="false" degree1="45" degree2="-45"/>
      </div>
}
};

const SalesLabel = ({day, label, progress, degree1, degree2}) => {
  const classes = useStyles();
  if(progress === "true"){
    return <div 
    className={classes.salesColumn} 
    style={{transform: `translate(-100px,-20px) rotate(${degree1}deg) translate(248px,0) rotate(${degree2}deg) translate(100px,25px) translate(-2%,-50%)`}}>
    <div className={classes.salesPoint} style={{background: "#030303"}}></div>
    <div className={classes.dayLabel} style={{color: "#030303"}}>{day}</div>
    <div className={classes.salesLabel} style={{color: "#030303"}}>{label}</div>
  </div>
  }else{
    return <div 
    className={classes.salesColumn} 
    style={{transform: `translate(-100px,-20px) rotate(${degree1}deg) translate(248px,0) rotate(${degree2}deg) translate(100px,25px) translate(-2%,-50%)`}}>
    <div className={classes.salesPoint} style={{background: "#F4E8D6"}}></div>
    <div className={classes.dayLabel} style={{color: "#F4E8D6"}}>{day}</div>
    <div className={classes.salesLabel} style={{color: "#F4E8D6"}}>{label}</div>
    </div>
  }
};

const TokenDoughnuts = ({sales, supply, minted}) => {

 const classes = useStyles();

 return (
   <div className={classes.columnCenter}>
     <div className={classes.title}>Tokenomics</div>
     <div className={classes.graph}>
        <div className={classes.circle}></div>
        <div className={classes.tokenSupply}>
          <div className={classes.sbold}>total minted</div>
          <div className={classes.tokenAmount}>
            <div className={classes.bbold}>{minted}</div>
            <div className={classes.thin}>/{supply}</div>
            <div className={classes.bbold}>tokens</div>
          </div>
        </div>
        <TokenDoughnut supply={supply} minted={minted}></TokenDoughnut>
        <SalesLabels sales={sales}/>
     </div>
   </div>
 );
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