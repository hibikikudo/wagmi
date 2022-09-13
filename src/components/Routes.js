import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MintPage from '../pages/MintPage';
import AppPage from '../pages/AppPage';
import OmnichainSender from '../pages/omnichainSender';
import WagmiCollection from '../pages/wagmiCollection';
import TokenExchanger from '../pages/tokenExchanger';
import TokenStaking from '../pages/tokenStaking';
import MusicData from '../pages/MusicData';

export const Path = {
    home: "/",
    mint: "/mint",
    app: "/app",
    omni: "/app/omni",
    album: "/app/album",
    exchange: "/app/exchange",
    staking: "/app/staking",
    luna: "/hibikilla/luna",
};

const MyRoutes = ({sales, inStock, maxSupply, minted}) => {
    return <>
        <BrowserRouter>
            <Routes>
`               <Route path={Path.home} element={<HomePage  sales={sales} inStock={inStock} maxSupply={maxSupply} minted={minted}/>} />
                <Route path={Path.mint} element={<MintPage sales={sales} inStock={inStock} maxSupply={maxSupply} minted={minted}/>} />
                <Route path={Path.app} element={<AppPage sales={sales} inStock={inStock} maxSupply={maxSupply} minted={minted}/>} />
                <Route path={Path.omni} element={<OmnichainSender sales={sales}/>} />
                <Route path={Path.album} element={<WagmiCollection sales={sales}/>} />
                <Route path={Path.exchange} element={<TokenExchanger sales={sales}/>} />
                <Route path={Path.staking} element={<TokenStaking sales={sales}/>}/>
                <Route path={Path.luna} element={<MusicData sales={sales}/>}/>`
            </Routes>
        </BrowserRouter>
    </>
};

export default MyRoutes;