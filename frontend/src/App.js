import Box from "@mui/material/Box";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import NFT from "./pages/NFT";
import Gamefi from "./pages/Gamefi";
import NFTMarketplace from "./pages/NFTMarketplace";
import { Suspense } from "react";
import "./i18n";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="loading">
        <Box sx={{backgroundColor:"#495057", minHeight:"100vh"}}>
          <Layout>
            <Routes>
              <Route exact path="/" element={ <Home /> }/>
              <Route exact path="/nft" element={ <NFT /> }/>
              <Route exact path="/gamefi" element={ <Gamefi /> }/>
              <Route exact path="/marketplace" element={ <NFTMarketplace /> }/>
            </Routes>
          </Layout>
        </Box>
      </Suspense>
    </BrowserRouter >
  );
}

export default App;
