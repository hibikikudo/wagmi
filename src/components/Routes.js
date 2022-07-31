import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MintPage from '../pages/MintPage';
import AppPage from '../pages/AppPage';

export const Path = {
    home: "/",
    mint: "/mint",
    app: "/app"
};

const MyRoutes = ({sales, inStock, maxSupply, minted}) => {
    return <>
        <BrowserRouter>
            <Routes>
`               <Route path={Path.home} element={<HomePage  sales={sales} inStock={inStock} maxSupply={maxSupply} minted={minted}/>} />
                <Route path={Path.mint} element={<MintPage sales={sales} inStock={inStock} maxSupply={maxSupply} minted={minted}/>} />
                <Route path={Path.app} element={<AppPage sales={sales} inStock={inStock} maxSupply={maxSupply} minted={minted}/>} />`
            </Routes>
        </BrowserRouter>
    </>
};

export default MyRoutes;