import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MintPage from '../pages/MintPage';

export const Path = {
    home: "/",
    mint: "/mint",
};

const MyRoutes = () => {
    return <>
        <BrowserRouter>
            <Routes>
`               <Route path={Path.home} element={<HomePage/>} />
                <Route path={Path.mint} element={<MintPage/>} />`
            </Routes>
        </BrowserRouter>
    </>
};

export default MyRoutes;