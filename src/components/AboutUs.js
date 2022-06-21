import { makeStyles, Button } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import Spacer from "./Spacer";

const useStyles = makeStyles({
    title: {
        fontSize: 60
    },
    sub: {
        fontSize: 20,
        marginBottom: 60
    },
    icon: {
        fontSize: 30
    },
    profile: {
        fontFamily: 'Lato',
        width: 250
    },
    columnCenter: {
        width:"auto",
        marginLeft: "20%",
        marginRight: "20%",
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
    },
    profileName: {
        fontSize: 25,
        fontFamily: 'Rock Salt',
        marginTop: 15
    },
    profileTitle: {
        fontSize: 15,
    },
    profileDescription: {
        fontSize: 15,
        margin: "5%"
    }
})
const Profile = ({name, imageURL, title, description, twitter, globe, github}) => {
    const classes = useStyles();
    return <div className={classes.columnCenter + ' ' +classes.profile}>
        <img width={250} height={250} src={imageURL} />
        <div className={classes.profileName}>{name}</div>
        <div className={classes.profileTitle}>{title}</div>
        <div className={classes.profileDescription}>{description}</div>
        <div>
            {twitter ? <>
                <Button
                    href={twitter}
                    target="_blank"
                    >
                    <FontAwesomeIcon className={classes.icon} icon={faTwitter} />
                </Button>
            </> : <></>}
            {globe ? <>
                <Button
                    href={globe}
                    target="_blank"
                    >
                    <FontAwesomeIcon className={classes.icon} icon={faGlobe} />
                </Button>
            </> : <></>}
            {github ? <>
                <Button
                    href={github}
                    target="_blank"
                    >
                    <FontAwesomeIcon className={classes.icon} icon={faGithub} />
                </Button>
            </> : <></>}
        </div>
    </div>;
}
const AboutUs = () => {
    const classes = useStyles();
    return <div className={classes.columnCenter}>
        <div className={classes.title}>AboutUs</div>
        <div className={classes.sub}>We are WAGMI music</div>
        <Profile
            name="Hibikilla"
            imageURL="/image/hibikilla.png"
            title="artist"
            description="北海道出身で現在は埼玉県在住のレゲエミュージシャン。日本語DJ（レゲエ界では「DJ」は歌う人）スタイルで1998年から音楽活動を続けている。「ミュージックマガジン」誌の年間ベスト・アルバム受賞経験や100万再生を超える数本のYoutube動画がある。5年ほどの活動休止期間を経て、2020年には「この世界 feat. Dabo」でiTunes Storeレゲエシングルチャート1位を、「Wha Gwaan Midnight feat. Tach-B and Zukie」でAudiusレゲエ部門年間1位を記録。2021年には「This World Riddim」でiTunes Storeレゲエアルバムチャート1位、2022年にも「No Limit feat. Gabby」でiTunes Storeレゲエシングルチャート1位を記録。"
            twitter="https://twitter.com/hibikilla30"
            globe="https://linkco.re/2nnn3Ysv"
            />
        <Spacer height={50}/>
        <div className={classes.rowCenter}>
            <Profile
                name="Allegorywrite"
                imageURL="/image/allegorywrite.jpg"
                title="Smart Contract Engineer"
                twitter="https://twitter.com/allegory_write"
                github="https://github.com/allegorywrite"
            />
            <Profile
                name="Haruto Takano"
                imageURL="/image/hal.png"
                title="Frontend Engineer"
                twitter="https://twitter.com/hal_bo_"
                github="https://github.com/hal-bo"
                />
        </div>
    </div>;

};

export default AboutUs;