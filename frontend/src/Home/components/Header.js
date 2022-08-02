import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import logo from "../../assets/FullLogo.png";
import Connect from "./Connect";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";

const Wrapper = styled("div")(({ theme }) => ({
  // position: "fixed",
  // zIndex: "40",
  // left: 0,
  // top: 0,
  // right: 0,
  // background: "white",
  // boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px',

  [theme.breakpoints.down("md")]: {
    h5: {
      fontSize: 20,
      margin: 0,
    },
  },
}));

const AdvPanel = styled("div")(({ theme }) => ({
  background: theme.palette.purple.main,
  textAlign: 'center',
  color: 'white',
  padding: '10px 0 10px 0'
}));

const Item = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: '20px 0 20px 0',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ItemConnect = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: '20px 0 20px 0',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  [theme.breakpoints.down("md")]: {
    padding: '0'
  },
}));

export default function Header() {
  return (
    <Wrapper>
      <AdvPanel>
        <Typography variant="h6" textAlign="center" color="white">
          {"ETH Snowball will start mining on Aug. 2th 4:00 PM UTC"}
        </Typography>
      </AdvPanel>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Item>
            <img src={logo} alt="" style={{ maxHeight: "40px", marginRight: "16px" }} />
            <Typography variant="h4" textAlign="center" color='#03989e'>
              ETH Snowball
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ItemConnect>
            <Connect />
          </ItemConnect>
        </Grid>
      </Grid>

      <Typography variant="h3" textAlign="center" color="black" marginTop={'40px'}>
        The New Wave of Miner Integrated with NFT
      </Typography>
    </Wrapper>
  );
}
