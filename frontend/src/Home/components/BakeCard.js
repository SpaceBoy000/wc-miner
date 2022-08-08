/* eslint-disable react-hooks/exhaustive-deps */
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import Web3 from "web3";

import PriceInput from "../../components/PriceInput";
import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { config } from "../../config";
import { useTranslation } from "react-i18next";
import { Toast } from "../../utils"
import { shorten } from "./Connect";
import ReferralLink from "./ReferralLink";

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

const DevilButton = styled(Button)(({ theme }) => ({
  "&:disabled": { background: 'rgba(0, 0, 0, 0.12)', color: 'rgb(150, 150, 150) !important' },
  "&: hover": { background: theme.button.secondary.main },
  borderRadius: 5,
  background: theme.button.primary.main,
  color: theme.typography.allVariants.color,
  boxShadow: 'none',
}));

const ButtonContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    "> div": {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));

let timeout = null;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const numberWithCommas = (x, digits = 3) => {
  return Number(x).toLocaleString(undefined, { maximumFractionDigits: digits });
}

export default function BakeCard() {
  const { contract, wrongNetwork, getBnbBalance, fromWei, toWei, web3 } =
    useContractContext();
  const { address, chainId } = useAuthContext();
  const [contractBNB, setContractBNB] = useState(0);
  const [walletBalance, setWalletBalance] = useState({
    bnb: 0,
    beans: 0,
    rewards: 0,
  });
  const [bakeBNB, setBakeBNB] = useState(0);
  const [calculatedBeans, setCalculatedBeans] = useState(0);
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const { t, i18n } = useTranslation();

  const EGGS_TO_HIRE_1MINERS = 1440000; // 3.3%, 864000: 10%;

  const [lasthatch, setLasthatch] = useState(0);
  const [compoundTimes, setCompoundTimes] = useState(0);
  const [yourLevel, setYourLevel] = useState(0);
  const [countdown, setCountdown] = useState({
    alive: true,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Lottery
  const zeroAddrss = '0x0000000000000000000000000000000000000000';
  const [roundStarted, setRoundStarted] = useState(false);
  const [roundStartTime, setRoundStartTime] = useState(0);
  const [lotteryWinner, setLotteryWinner] = useState(zeroAddrss);
  const [roundIntervalLottery, setRoundIntervalLottery] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);
  const [lastTicketCount, setLastTicketCount] = useState(0);
  const [totalTicketCount, setTotalTicketCount] = useState(0);
  const [countdownLottery, setCountdownLottery] = useState({
    alive: true,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const getCountdown = (lastCompound) => {
    const now = Date.now() / 1000;
    const total = lastCompound > 0 ? Math.max(lastCompound - now, 0) : 0;
    const seconds = Math.floor((total) % 60);
    const minutes = Math.floor((total / 60) % 60);
    const hours = Math.floor((total / (60 * 60)) % 24);
    const days = Math.floor(total / (60 * 60 * 24));

    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      try {
        const last = Number(lasthatch);
        const data = getCountdown(last + 24 * 3600 + 110); //24 * 3600
        setCountdown({
          alive: data.total > 0,
          days: data.days,
          hours: data.hours,
          minutes: data.minutes,
          seconds: data.seconds,
        });

      } catch (err) {
        console.log(err);
      }
    }, 1000);
    return () => {
      clearInterval(intervalID)
    }
  }, [lasthatch])

  useEffect(() => {
    const intervalID = setInterval(() => {
      try {
        const data = getCountdown(Number(roundStartTime) + Number(roundIntervalLottery));
        setCountdownLottery({
          alive: data.total > 0,
          days: data.days,
          hours: data.hours,
          minutes: data.minutes,
          seconds: data.seconds,
        });
      } catch (err) {
        console.log(err);
      }
    }, 1000);
    return () => {
      clearInterval(intervalID)
    }
  }, [roundStartTime, roundIntervalLottery])

  const fetchContractBNBBalance = async () => {
    if (!web3 || wrongNetwork) {
      setContractBNB(0);
      return;
    }
    await contract.methods.getBalance().call().then((amount) => {
      setContractBNB(fromWei(amount));
    });
  };

  const fetchWalletBalance = async () => {
    if (!web3 || wrongNetwork || !address) {
      setWalletBalance({
        bnb: 0,
        beans: 0,
        rewards: 0,
      });
      setCompoundTimes(0);
      setYourLevel(0);
      return;
    }

    try {
      console.log("address: ", address);
      const aaaa = await contract.methods

      const [bnbAmount, rewardsAmount, userInfo] = await Promise.all([
        getBnbBalance(address),
        contract.methods
          .getAvailableEarnings(address)
          .call({from: address})
          .catch((err) => {
            console.error("getAvailableEarnings error: ", err);
            return 0;
          }),
        contract.methods
          .users(address)
          .call()
          .catch((err) => {
            console.error("userInfo error", err);
            return 0;
          })
        ]);

        console.log("rewardsAmount: ", rewardsAmount);
      // const tvlAmount = await contract.methods
      //   .calculateEggSell(beansAmount * EGGS_TO_HIRE_1MINERS)
      //   .call()
      //   .catch((err) => {
      //     console.error("calc_egg_sell", err);
      //     return 0;
      //   });

      setWalletBalance({
        bnb: fromWei(`${bnbAmount}`),
        beans: userInfo.miners,
        rewards: fromWei(`${rewardsAmount}`),
      });
      setLasthatch(userInfo.lastHatch);
      setCompoundTimes(userInfo.dailyCompoundBonus);
      setYourLevel(userInfo.level);
    } catch (err) {
      console.error(err);
      setWalletBalance({
        bnb: 0,
        beans: 0,
        rewards: 0,
      });
      // setLasthatch(0);
      setCompoundTimes(0);
      setYourLevel(0);
    }
  };

  const fetchLottoryInfo = async () => {
    if (!web3 || wrongNetwork || !address) {
      setTicketCount(0);
      setLastTicketCount(0);
      setTotalTicketCount(0);
      setRoundStartTime(0);
      setRoundIntervalLottery(0);
      // setRoundStarted(false);
      setLotteryWinner(zeroAddrss);
      
      return;
    }
    const [roundStarted, roundID] = await Promise.all ([
      contract.methods.lotteryStarted()
                        .call()
                        .catch((err) => {
                          console.error("lottory error:", err);
                        }),
      contract.methods.LOTTERY_ROUND()
                        .call()
                        .catch((err) => {
                          console.error("lottory error:", err);
                        })
    ]);;
    const [roundStartTime, roundInterval, lastLotteryInfo, currentLotteryInfo, ticketCnt, lastTicketCnt] = await Promise.all([
      contract.methods.LOTTERY_START_TIME()
                        .call()
                        .catch((err) => {
                          console.error("lottory error: ", err);
                        }),
      contract.methods.LOTTERY_INTERVAL()
                        .call()
                        .catch((err) => {
                          console.error("lottory LOTTERY_INTERVAL error: ", err);
                        }),
      contract.methods.lotteryInfo(roundID-1)
                        .call()
                        .catch((err) => {
                          console.error("lottory error: ", err);
                        }),
      contract.methods.lotteryInfo(roundID)
                        .call()
                        .catch((err) => {
                          console.error("lottory error: ", err);
                        }),
      contract.methods.getUserTicketInfo(address, roundID)
                        .call()
                        .catch((err) => {
                          console.error("lottory error: ", err);
                        }),
      contract.methods.getUserTicketInfo(address, roundID-1)
                        .call()
                        .catch((err) => {
                          console.error("lottory error: ", err);
                        }),
    ]);
    setLotteryWinner(lastLotteryInfo.winnerAccount);

    console.log("totalTicketCnt: ", currentLotteryInfo.totalTicketCnt);
    setTicketCount(ticketCnt);
    setLastTicketCount(lastTicketCnt);
    setTotalTicketCount(currentLotteryInfo.totalTicketCnt);
    setRoundStartTime(roundStartTime);
    setRoundIntervalLottery(roundInterval);
    setRoundStarted(roundStarted);
    console.log("roundStarted: ", roundInterval);
  }

  useEffect(() => {
    fetchContractBNBBalance();
  }, [web3, chainId]);

  useEffect(() => {
    fetchWalletBalance();
    fetchLottoryInfo();
  }, [address, web3, chainId]);

  const onUpdateBakeBNB = (value) => {
    setBakeBNB(value);
  };

  const getRef = () => {
    const ref = Web3.utils.isAddress(query.get("ref"))
      ? query.get("ref")
      : "0xBA2Dd8dB1728D8DE3B3b05cc1a5677F005f34Ba3"; // "0x0000000000000000000000000000000000000000";
    return ref;
  };
  // const encode = atob('0xBA2Dd8dB1728D8DE3B3b05cc1a5677F005f34Ba');
  // const decode = btoa(encode);

  // console.log("Base64: ", getRef(), "=> ", encode.toString(), " => ", decode.toString());

  const bake = async () => {
    setLoading(true);

    const ref = getRef();

    try {
      await contract.methods.BuySnows(ref).send({
        from: address,
        value: toWei(`${bakeBNB}`),
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    fetchContractBNBBalance();
    fetchLottoryInfo();
    setLoading(false);
  };

  const reBake = async () => {
    setLoading(true);

    const ref = getRef();

    try {
      await contract.methods.CompoundRewards(ref).send({
        from: address,
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    setLoading(false);
  };

  const eatBeans = async () => {
    setLoading(true);

    if (countdown.alive) {
      Toast.fire({
        icon: 'error',
        title: "You should wait until the countdown timer is done."
      });
      setLoading(false);
      return;
    }

    try {
      await contract.methods.ClaimRewards().send({
        from: address,
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    fetchContractBNBBalance();
    setLoading(false);
  };

  return (
    <>
      <div id="main">
        <div id="mine" class="bg d-flex">
          <div class="container main" data-aos="fade-up">
            <div class="content-box">
              <h4 style={{color:"#fff", fontWeight:"bold", fontFamily:"cursive", justifyContent:"center", letterSpacing:"2px", fontSize:"2rem", textAlign:"center"}} ><div class="busd">Farmer Dashboard</div></h4>
              <div class="row stats-row-container">
                <div class="col-lg-2 stat">
                  <div class="header">
                    <i class="bi-bank"></i>
                    <span> Initial Deposit</span>
                  </div>
                  <strong id="initial-deposit" class="number">-</strong>
                  <div>
                    <strong class="busd">BNB</strong>
                  </div>
                </div>
                <div class="col-lg-2 stat">
                  <div class="header">
                    <i class="bi-bank"></i>
                     <span> Total Deposit</span>
                  </div>
                  <strong id="total-deposit" class="number">-</strong>
                  <div>
                    <strong class="busd">BNB</strong>
                  </div>
                </div>
                <div class="col-lg-2 stat">
                  <div class="header">
                    <i class="bi-wallet2"></i>
                     <span> Total Claimed</span>
                  </div>
                  <div>
                    <strong id="total-withdrawn" class="number">-</strong>
                  </div>
                  <div>
                    <strong class="busd">BNB</strong>
                  </div>
                </div>
                <div class="col-lg-2 stat">
                  <div class="header">
                    <i class="bi-people"></i>
                     <span> Referral Rewards </span>
                     (<span id="ref-count"> - </span>)
                  </div>
                  <div>
                    <strong id="ref-rewards-busd" class="number">-</strong>
                  </div>
                  <div>
                    <strong class="busd">BNB</strong>
                  </div>
                </div>
              </div>
              <div class="row mt-5" style={{justifyContent:"space-evenly"}}>
                <div class="col-xl-5 first-box" style={{marginBottom:"20px"}}>
                  <div class="mine-card">
                    <div class="row example">
                      <div class="col-lg-8">
                        <div style={{lineHeight:"1.8"}}>
                          <strong>
                            Hiring Example
                          </strong>
                          <div>
                            <div>1<span class="busd">BNB</span> = <span id="example-miners"> 1234 </span> Wolf Cryptos</div>
                            <div>
                              <i class="ri-coins-line ri-1x"></i>
                              <span> Daily: </span>
                              <span id="example-busd">0.033</span><span class="busd">BNB</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="wallet">
                          <i class="bi-wallet2"></i>
                          <strong> Wallet</strong>
                          <div>
                            <span id="user-balance">10</span>
                            <span class="busd">BNB</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div class="timer">
                      <i class="bi-hourglass-split"></i>
                      <span> Compound will be activated in: </span>
                      <span id="claim-timer">00 : 00 : 00</span>
                    </div> */}
                    <div class="timer" style={{padding:"14px", marginBottom:"20px"}}>
                      <i class="bi bi-clock"></i>
                      <span> Next compound bonus is activated in: </span>
                      <span id="compound-timer"> 00 : 00 : 00 </span>
                    </div>
                    <div class="btn-container">
                      {/* <div class="approve-container">
                        <div style={{paddingLeft:"5px", fontWeight:"700"}}>
                          <span style={{fontSize:"16px"}}>1.</span>
                          <strong>Approve</strong><span class="busd"> BUSD </span><span class="usd">(<span id="user-approved-spend">0</span> BUSD approved)</span>
                        </div>
                        <div>
                          <input class="form-control" id="approve-spend" name="approved-spend" step="1" type="number" value="1000"/>
                          <button class="btn glow-on-hover" id="" onClick={() => approveMiner()} style={{marginTop:"5px"}}>Approve BUSD</button>
                        </div>
                      </div> */}
                      <strong>
                        <i class="bi-bank"></i>
                        <span> Deposit</span>
                        <span class="busd">BNB</span>
                        <span class="usd">
                        ( MIN:<span class="busd" id="min-deposit"> 0.01BNB, </span>
                        </span>	
                        <span class="usd">
                        MAX:<span class="busd" id="max-deposit"> Unlimited </span>)</span>
                        <input class="form-control" id="busd-spend" name="buy-miners" /*onChange={handleBUSD}*/ step="1" type="number" value={0}/>
                      </strong>
                      <button class="btn glow-on-hover" id="buy-eggs-btn" /*onClick={ hireFarmers }*/ role="button" style={{marginTop:"5px"}}>
                        <span>Hire </span>
                        <span id="eggs-to-buy">0</span>
                        <span> Wolf Cryptos</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-xl-5" style={{marginBottom:"20px"}}>
                  <div class="mine-card">
                    <div class="miners-info" style={{marginBottom:"unset"}}>
                      <div style={{display:"flex", justifyContent:"space-between"}}>
                        {/* <i class="bi-minecart"></i> */}
                        {/* <span id="your-miners"> - </span> */}
                        <span>Your Wolf Cryptos</span>
                        <span> 10 WCs</span>
                      </div>
                      <div>
                        <i class="bi-arrow-down-short" style={{fontSize:"23px"}}></i>
                      </div>
                      <div style={{display:"flex", justifyContent:"space-between"}}>
                        {/* <i class="ri-coins-line ri-1x"></i> */}
                        {/* <strong id="mined"> -</strong> */}
                        <span>Your Rewards</span>
                        <span> 10 BNB</span>
                      </div>
                      <div style={{display:"flex", justifyContent:"space-between"}}>
                        <span>Estimated daily yield</span>
                        <span>0 BNB</span>
                      </div>
                      <div style={{display:"flex", justifyContent:"space-between"}}>
                        <span> Compound Count </span>
                        <span> 0 </span>
                      </div>
                    </div>
                    <div>
                      <div class="btn-container" style={{marginTop:"35px"}}>
                        <div style={{marginBottom:"20px"}}>
                          <button class="btn glow-on-hover" id="reinvest" onClick={ reBake } role="button">
                            Compound Rewards
                          </button>
                        </div>
                        <div>
                          <button class="btn glow-on-hover" id="withdraw" onClick={ eatBeans } role="button">
                            Claim Rewards
                            <span class="cooldown" id="cooldown-timer"> in 00 : 00 : 00 </span>
                            <span class="tax" id="withdraw-tax">( 60% tax )</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 sub-section">
              If you compound without a withdraw for a week you get a 3% bonus of your TVL added, 2nd week 5%, 3rd week 7.5%, 4th week 9%, and we can cap it there at 9%.
            </div>
            {/* <div class="row">
              <div class="col-lg-12 referral-link">
                <i class="bi-check2-square"></i>
                Earn
                <span id="ref-percent">-%</span>
                <span>when someone uses your referral link!</span>
                <span>
                  <a id="reflink"></a>
                  <span onClick={copyRef}>
                    <i class="ri-file-copy-line"></i>
                    <span id="copied"></span>
                  </span>
                </span>
              </div>
            </div> */}
          </div>
        </div>
        {/* <div id="faq" class="bg faq section-bg">
          <div class="container" data-aos="fade-up">
            <h4 style={{color:"#fff", justifyContent:"center", fontFamily:"cursive", marginTop:"20px", textAlign:"center"}}><div class="busd">Frequently Asked Questions</div></h4>
            <div class="faq-list">
              <ul>
                <Accordion>
                  {faqData.map((item, index) => {
                      return (
                          // <Reveal key={index} className='onStep' keyframes={fadeInUp} delay={100 * index} duration={800}>
                          <li>
                            <div className='accordion-box'>
                              <Accordion.Item eventKey={{ index }} style={{background:"transparent", border:"none"}}>
                                <Accordion.Header>
                                  <HelpOutlineIcon/>
                                  &nbsp;&nbsp;
                                    {item.title}
                                </Accordion.Header>
                                <Accordion.Body className="p-3">
                                    {item.content}
                                </Accordion.Body>
                              </Accordion.Item>
                            </div>
                          </li>
                          // </Reveal>
                      )
                  }
                  )}
                </Accordion>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
