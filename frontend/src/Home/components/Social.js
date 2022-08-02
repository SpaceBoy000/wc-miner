import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import { BscscanIcon } from "../../components/Icons";
import logo from "../../assets/polygon.svg";
import { config } from "../../config";

import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";

const CardWrapper = styled("div")(({ theme }) => ({
  maxWidth: 400,
  margin: "0 auto",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  overflow: "hidden",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  borderRadius: "5px",
  background: theme.palette.primary.main,
  marginBottom: 24,
}));

const SocialText = styled('span')(({ theme }) => ({
  color: 'black',// theme.typography.allVariants.color,
  marginTop: '3px',
  marginLeft: '5px',
}));


export default function Social() {
  const { t, i18n } = useTranslation();

  return (
    <CardWrapper>
      <CardContent>
        <Typography variant="h5" borderBottom="2px solid" color="black" >
          {t("Links & Social Media")}
        </Typography>
        <Box paddingTop={2} sx={{ display: 'flex', justifyContent: 'space-between'}}>

          <a href="https://t.me/ethsnowball" target="_blank" style={{color: 'inherit', textDecoration: 'inherit', display: 'flex', alignItems: 'center'}}>
            <i class='fa fa-telegram' style={{color: '#047d82', fontSize: '26px'}}></i>
            <SocialText>Telegram</SocialText>
          </a>
          <a href="https://twitter.com/ethsnowball" target="_blank" style={{color: 'inherit', textDecoration: 'inherit', display: 'flex', alignItems: 'center'}}>
            <i class='fa fa-twitter' style={{color: '#047d82', fontSize: '26px'}}></i>
            <SocialText>Twitter</SocialText>
          </a>
          <a href="https://discord.gg/pnaDGkej2w" target="_blank" style={{color: 'inherit', textDecoration: 'inherit', display: 'flex', alignItems: 'center'}}>
            <i class='fab fa-discord' style={{color: '#047d82', fontSize: '26px'}}></i>
            <SocialText>Discord</SocialText>
          </a>
          {/* <a href={config.scanLink} target="_blank" style={{color: 'inherit', textDecoration: 'inherit', display: 'flex', alignItems: 'center'}}>
            <img class="u-sm-avatar" src={logo} alt="Polygon" style={{width: '24px'}}></img>
            <SocialText>Scan</SocialText>
          </a> */}
        </Box>
      </CardContent>
    </CardWrapper>
  );
}
