import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    typography: {
        fontFamily: "Press Start 2P",
        color: 'white',
        button: {
            textTransform: "none",
            fontFamily: "Press Start 2P"
        }
    },
    palette: {
        primary: {
            main: "#ffffff",//`url("https://storage.googleapis.com/studio-design-asset-files/projects/xmaZZplJaR/s-178x157_webp_e1ceac5a-b338-4a18-8f2c-fbf9490beb35.png")`,
            contrastText: '#333',
        }
    },
});

export default theme;