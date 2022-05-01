import { ThemeProvider } from "@material-ui/core";
import Header from "./components/Header";
import Home from "./pages/HomePage";
import MyRoutes from "./components/Routes";
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
          <MyRoutes />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
