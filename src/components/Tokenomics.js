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
    fontSize: 40
  },
  columnCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  graph: {
    margin: "auto",
    width: "500px",
    height: "500px",
    position: "relative"
  },
  circle: {
    width: "150px",
    height: "150px",
    position: "absolute",
    "border-radius": "50%",
    top: "51%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    background: "#4A434D",
    "text-align": "center",
    "line-height": "150px"
  },
  salesLabel: {
    width: "160px",
    height: "50px",
    fontSize: 24,
    position: "relative",
    'margin-left': '10%'
  },
  salesColumn: {
    width: "200px",
    height: "50px",
    top: "50%",
    left: "50%",
    transform: "translate(-100px,-20px) rotate(-30deg) translate(198px,0) rotate(30deg) translate(100px,25px) translate(-5%,-50%)",
    display: 'flex',
    flexDirection: 'row',
    position: "absolute",
    "align-items": "center",
    justifyContent: 'center'
  },
  salesPoint: {
    width: "8px",
    height: "8px",
    "border-radius": "50%",
    background: "#030303",
    position: "relative"
  }
})

const Saleslabel = ({label}) => {
  const classes = useStyles();
  return <div className={classes.salesColumn}>
    <div className={classes.salesPoint}></div>
    <div className={classes.salesLabel}>{label}</div>
  </div>
};

const Tokenomics = () => {

  const graphdata1 = {
    datasets: [
     {
       data: [15, 25, 35],
       backgroundColor: ['#B9D8F7', '#FFE5EC', '#DEDFE0'],
       borderWidth: 1,
       borderRadius: 1,
       radius:200,
       cutout:"98%"
     },
    ],
  };
 
  const doughnutOptions1 = {
    legend: {
      display: false,
    },
  };

 const graphdata2 = {
   datasets: [
    {
      data: [15, 25, 35],
      backgroundColor: ['#B9D8F7', '#FFE5EC', '#DEDFE0'],
      borderWidth: 1,
      borderRadius: 1,
      radius:180,
      cutout:"60%"
    },
   ],
 };

 const doughnutOptions2 = {
   legend: {
     display: false,
   },
 };

 const classes = useStyles();

 return (
   <div className={classes.columnCenter}>
     <div className={classes.title}>Tokenomics</div>
     <div className={classes.graph}>
        <div className={classes.circle}>1</div>
        {/* <StyledCircularBar 
          variant="determinate" 
          thickness={1}
          size={200} 
          value={30} /> */}
        <StyledDoughnuts
          data={graphdata1} 
          options={doughnutOptions1} />
        <StyledDoughnuts
          data={graphdata2} 
          options={doughnutOptions2} />
        <Saleslabel label="public sale" />
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

export default Tokenomics;