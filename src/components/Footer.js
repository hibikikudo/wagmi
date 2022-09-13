import { Grid, makeStyles, Button } from "@material-ui/core";
import Spacer from "./Spacer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons';

const useStyles = makeStyles({
  back: {
    overflow: "hidden",
    backgroundColor: 'rgba(0, 0, 0 ,0.6)',
    minHeight: '65vh',
    minWidth: '100vw',
    zIndex:0,
  },
  columnCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position:'relative',
  },
  labelbox: {
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'column',
    position:'relative',
    width:"20%",
    marginLeft:"5%",
    marginRight:"5%",
  },
  rowCenter: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
    flexDirection: 'row',
  },
  rowStart: {
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  logo: {
    width:'20%'
  },
  label: {
    fontSize:20,
    fontWeight:'bolder',
  },
  title: {
    marginLeft:'4%',
    fontSize:18,
    fontWeight:'bolder',
  },
  description: {
    fontFamily: "Lato",
    fontSize:14,
  },
  icon: {
    color: "white",
    height:30,
  },
  exicon: {
    maxWidth: '50px',
    maxHeight: '50px',
    minWidth: '50px',
    minHeight: '50px',
    margin:'2%'
  },
  iconmargin: {
    "box-sizing": "border-box",
  },
  resource: {
    color: "white",
    fontSize:15,
    fontFamily:"Regular",
    maxHeight: '20px',
    justifyContent:'start',
    marginTop:'5%',
    whiteSpace:'nowrap'
  }
})

const Footer = ({color}) => {
  const classes = useStyles();
  return<div className={classes.back} style={{color:color}}>
    <Spacer height={80}/>
    <div className={classes.columnCenter}>
      <div className={classes.rowCenter}>
        <Spacer width={"1vw"}/>
        <div className={classes.labelbox}>
          <img className={classes.logo}
          src="/logo_white.png"/>
          <Spacer height={10}/>
          <div className={classes.label}>WAGMI Music</div>
          <Spacer height={10}/>
          <div className={classes.description}>WAGMI Music is a music NFT project by Japanese reggae and dancehall artist Hibikilla. / WAGMI Music aims to help artists and creators sustainable activities that respond to the web3 era, and to improve together with the power of blockchain: non-fungible-token(NFTs), smart contract, and all that jazz.</div>
        </div>
        <div className={classes.labelbox}>
          <div className={classes.title}>Resource</div>
          <Button
              href="https://responsible-hip-ae9.notion.site/Hibikilla-LUNA-Music-NFT-Lightpaper-281932987f1142a99509f6334f8e7810"
              target="_blank"
              className={classes.resource}
              style={{background:'transparent'}}
              >
              Light Paper
          </Button>
          <Button
              href="https://responsible-hip-ae9.notion.site/Hibikilla-LUNA-Music-NFT-Lightpaper-281932987f1142a99509f6334f8e7810"
              target="_blank"
              className={classes.resource}
              style={{background:'transparent'}}
              >
              Privacy Policy
          </Button>
          <Button
              href="https://twitter.com/allegory_write"
              target="_blank"
              className={classes.resource}
              style={{background:'transparent'}}
              >
              Contact
          </Button>
        </div>
        <div className={classes.labelbox}>
          <div className={classes.title}>Join Community</div>
          <Spacer height={15}/>
          <div className={classes.rowStart}>
            <Button
                href="https://discord.com/invite/yGwTRWNssq"
                target="_blank"
                className={classes.exicon}
                >
                <FontAwesomeIcon className={classes.icon} icon={faDiscord} />
            </Button>
            <Button
                href="https://twitter.com/hibikilla30"
                target="_blank"
                className={classes.exicon}
                >
                <FontAwesomeIcon className={classes.icon} icon={faTwitter} />
            </Button>
            <Button
                href="https://github.com/RisingToTheTop"
                target="_blank"
                className={classes.exicon}
                >
                <FontAwesomeIcon className={classes.icon} icon={faGithub} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Footer