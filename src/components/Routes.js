import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MintPage from '../pages/MintPage';
import AppPage from '../pages/AppPage';

export const Path = {
    home: "/",
    mint: "/mint",
    app: "/app"
};

const MyRoutes = () => {
    return <>
        <BrowserRouter>
            <Routes>
`               <Route path={Path.home} element={<HomePage/>} />
                <Route path={Path.mint} element={<MintPage/>} />
                <Route path={Path.app} element={<AppPage/>} />`
            </Routes>
        </BrowserRouter>
    </>
};

export default MyRoutes;