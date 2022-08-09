import { styled } from "@mui/system";
import PolyCoinsImg from "../../assets/coin.png";
import PolyFrontImg from "../../assets/tree.png";

const Item = styled('img')(({ theme }) => ({
  position: 'fixed',
  zIndex: '-1',
  maxHeight: '200px',
  [theme.breakpoints.down("md")]: {
    display: 'none'
  },
}));


export default function BackBrand() {
  return (
    <>
      {/* <Item src={PolyCoinsImg} alt="" style={{ left: '100px', top: '300px'}} />
      <Item src={PolyFrontImg} alt="" style={{ right: '100px', bottom: '0px' }} /> */}
    </>
  );
}
