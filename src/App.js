import { ThemeProvider } from "@material-ui/core";
import Header from "./Header";
import Home from "./Home";
import theme from "./Theme";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
      <div style={{ 
        backgroundSize: "50px 50px",
        backgroundImage: `url("https://storage.googleapis.com/studio-design-asset-files/projects/xmaZZplJaR/s-178x157_webp_e1ceac5a-b338-4a18-8f2c-fbf9490beb35.png")`,
        minHeight:'100vh'
        }}>
        <Header />
        <Home />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
