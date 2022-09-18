import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import { Toast } from "../../utils"
import { config } from "../../config";

const CardWrapper = styled("div")(({ theme }) => ({
  padding: "29px",
}));

const CardWrapper2 = styled(Card)(({ theme }) => ({
  background: theme.palette.purple.main,
  borderRadius: "0.5rem",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  padding: "12px",
  maxWidth: "540px",
  transition: '0.5s',
}));

const CardWrapper3 = styled(Card)(({ theme }) => ({
  background: theme.palette.purple.main,
  borderRadius: "0.5rem",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  padding: "12px",
  width: "1096px",
  transition: '0.5s',
}));

const CustomCardHeader = styled(Typography)(({ theme }) => ({
  marginBottom: '16px',
  // textDecoration: "underline",
  // textDecorationColor: "#0abcf9",
  textDecorationThickness: "2px",
  textUnderlinePosition: "under",
  color: "#ffbb00",
  fontSize: '30px'
}))

const UnderlineTypography = styled(Typography)(({ theme }) => ({
  textDecoration: "underline",
  textDecorationColor: "#0abcf9",
  textDecorationThickness: "1px",
  textUnderlinePosition: "under",
  cursor: 'pointer'
}))

const RefBox = styled(Box)(({ theme }) => ({
  border:"solid 2px #ffbb00",
  borderRadius:"30px",
  width:"fit-content",
  padding:"10px",
  "&: hover": {
    borderColor: "white",
    color:"#ffbb00",
  }
}))



export default function Description({ address }) {
  const { t, i18n } = useTranslation();

  const link = `${window.origin}?ref=${address}`;

  const copyToClipboard = str => {
    navigator.clipboard.writeText(str);
    Toast.fire({
      icon: 'success',
      title: "Copied to clipboard!"
    });
  };

  return (
    <CardWrapper>
      <Grid item xs={12} sm={12} md={12}>
        <Grid
          container
          justifyContent="center"
          columns={12}
          spacing={2}
          sx={{
            textAlign: 'left',
          }}
        >
          <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <CardWrapper3>
              <CustomCardHeader variant="body4">
                {`Self Sustainable`}
              </CustomCardHeader>
              <Typography variant="body2" sx={{ mt: 2, paddingBottom: 2 }}>
                WC Miner is proud to present a software that will mine altcoin on low- and high-end PC’s and VPS’s.
                VPS is a Virtual Private Server, they are inexpensive and a better route to go for the mining software.
                How it works is once you download the Zip File, extract the software click run and it will automatically run and begin mining altcoin.
                After every block mined there will be a payout once the server receives the payout it will automatically be converted to BNB and deposited into the contract.
                Depending on the hash rate, we project between 50 – 75 users will bring in 200 - 400 USD a day as a new line of revenue making the contract self-sustainable.
                Of course we welcome new investors daily but this will only bring up our daily ROI.
                This is the first step to being a self-sustainable BNB miner! We will list the link to the software soon!
              </Typography>
            </CardWrapper3>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Grid
              container
              justifyContent="center"
              columns={12}
              spacing={2}
              sx={{
                textAlign: 'left',
              }}
            >
              <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Grid
                  container
                  spacing={2}
                  sx={{ display: 'flex', justifyContent: 'end' }}
                >
                  <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <CardWrapper2>
                      <CustomCardHeader variant="body4">
                        {`How does it work?`}
                      </CustomCardHeader>
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        You invest $BNB and hire Wolf Miners who work for you forever! Wolf Miners can also be viewed as your shares in the contract.  
                        Your value in the contract can rise and fall based on the combined actions of the community. 
                        But, unlike your average coins and tokens, WC Miner allows you to stabilize and increase your TVL by taking long-term advantage of its compound feature. <br/><br/>
                      </Typography>
                    </CardWrapper2>
                    
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <CardWrapper2>
                      <CustomCardHeader variant="body4">
                        {`Rewards`}
                      </CustomCardHeader>
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        We added a feature that will incentivize the community for utilizing the compound feature!<br/><br/>
                          •	1st week 0 withdraws and compound daily 3% bonus added to total deposit amount<br/>
                          •	2nd week 0 withdraws and compound daily 5% bonus added to total deposit amount<br/>
                          •	3rd week 0 withdraws and compound daily 7% bonus added to total deposit amount<br/>
                          •	4th week 0 withdraws and compound daily 9% bonus added to total deposit amount<br/><br/>
                        Once you withdraw rewards restart back to zero! 
                        </Typography>
                      </CardWrapper2>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'start' }}>
                <CardWrapper2>
                  <CustomCardHeader variant="body4">
                    {`WC Miner`}
                  </CustomCardHeader>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    WC Miner is part of Binance chain to create as many opportunities as possible and enrich the ecosystem.
                    To use this platform you need to connect your wallet (MetaMask, TrustWallet) using the Binance Smart Chain.
                    To start generating $BNB you need to purchase "Wolf Miners" using $BNB. The more Wolf Miners you have, the more $BNB you generate.
                    More Wolf Miners mean a higher personal TVL. When you have Wolf Miners generating $BNB, you can always WITHDRAW or COMPOUND your $BNB to let the compound interest work its magic.
                    Your Wolf Miners will generate 3.5% interest of your total TVL. 
                    Your Miners will work for you indefinitely, and the more Miners you accumulate, you'll.... Well you already know the rest. 
                    Stay tuned to learn more about our other projects.
                  </Typography>
                </CardWrapper2>
              </Grid>

            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <CardWrapper3>
              <CustomCardHeader variant="body4">
                {`Referrals`}
              </CustomCardHeader>
              <Typography variant="body2" sx={{ mt: 2, paddingBottom: 2 }}>
                Earn 12% referral fee when anyone uses your link to hire Wolf miners:
              </Typography>
              <RefBox>
                <Typography variant="body2" sx={{cursor:"pointer"}} onClick={() => copyToClipboard(link)}>
                  {
                    address ?
                      `${link} (Click to copy)`
                      : 'Please connect your wallet to see your referral link.'
                  }
                </Typography>
              </RefBox>
            </CardWrapper3>
          </Grid>
        </Grid>

      </Grid>

    </CardWrapper>
  );
}
