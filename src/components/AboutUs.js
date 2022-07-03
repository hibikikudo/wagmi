import { makeStyles, Button } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    profileCard: {
        width:600,
        fontFamily: 'Lato',
        marginLeft: "5%",
        marginRight: "5%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
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
const Profile = ({name, imageURL, title, description, twitter, globe, github, instagram}) => {
    const classes = useStyles();
    return <div className={classes.profileCard}>
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
            {instagram ? <>
                <Button
                    href={instagram}
                    target="_blank"
                    >
                    <FontAwesomeIcon className={classes.icon} icon={faInstagram} />
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
        {/* <Profile
            name="Hibikilla"
            imageURL="/image/hibikilla.png"
            title="artist"
            description="北海道出身で現在は埼玉県在住のレゲエミュージシャン。日本語DJ（レゲエ界では「DJ」は歌う人）スタイルで1998年から音楽活動を続けている。「ミュージックマガジン」誌の年間ベスト・アルバム受賞経験や100万再生を超える数本のYoutube動画がある。5年ほどの活動休止期間を経て、2020年には「この世界 feat. Dabo」でiTunes Storeレゲエシングルチャート1位を、「Wha Gwaan Midnight feat. Tach-B and Zukie」でAudiusレゲエ部門年間1位を記録。2021年には「This World Riddim」でiTunes Storeレゲエアルバムチャート1位、2022年にも「No Limit feat. Gabby」でiTunes Storeレゲエシングルチャート1位を記録。"
            twitter="https://twitter.com/hibikilla30"
            globe="https://linkco.re/2nnn3Ysv"
            />
        <Spacer height={50}/> */}
        <div className={classes.rowCenter}>
            <Profile
                name="Hibikilla"
                imageURL="/image/hibikilla.png"
                title="artist"
                description="北海道出身で現在は埼玉県在住のレゲエミュージシャン。日本語DJ（レゲエ界では「DJ」は歌う人）スタイルで1998年から音楽活動を続けている。「ミュージックマガジン」誌の年間ベスト・アルバム受賞経験や100万再生を超える数本のYoutube動画がある。5年ほどの活動休止期間を経て、2020年には「この世界 feat. Dabo」でiTunes Storeレゲエシングルチャート1位を、「Wha Gwaan Midnight feat. Tach-B and Zukie」でAudiusレゲエ部門年間1位を記録。2021年には「This World Riddim」でiTunes Storeレゲエアルバムチャート1位、2022年にも「No Limit feat. Gabby」でiTunes Storeレゲエシングルチャート1位を記録。"
                twitter="https://twitter.com/hibikilla30"
                globe="https://linkco.re/2nnn3Ysv"
            />
            <Profile
                name="Itaq"
                imageURL="/image/itaq.jpg"
                title="artist"
                description="1999年生。幸福の科学学園中学校・高等学校在学中にヒップホップと出会い、孤独の中で腕を磨く。上京後の2019年に粗悪ビーツが作曲を担当した1st Album『委託』をリリース。
                2020年にはABEMA「ラップスタア誕生」にてファイナリストとなり、自身の信仰をレプリゼントした姿勢と濃密な歌詞、卓越したラップスキルを世間に知らしめた。
                2021年5月に、2nd Album『Savior of Aquarius』をリリース。全体で一つの物語となる構成が話題を呼んだ。"
                twitter="https://twitter.com/itaq_nasu"
                instagram="https://www.instagram.com/itaq_nasu/"
            />
        </div>
        <Spacer height={100}/>
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