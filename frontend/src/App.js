import Box from "@mui/material/Box";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import { Suspense } from "react";
import "./i18n";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="loading">
        <Box>
          <Home />
        </Box>
      </Suspense>
    </BrowserRouter >
  );
}

export default App;
