import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../Components/CryptoContext'
import axios from 'axios';
import { SingleCoin } from './api';
import { useEffect } from 'react';
 import { useStyles } from './CoinPageCss';
 import CoinInfo from '../Components/CoinInfo';
import { Typography,Button } from '@material-ui/core';
import {doc,setDoc} from 'firebase/firestore';
  import {db} from '../Components/firebase';
  export default function CoinPage() {
  
   const {id}=useParams()
   
   const [coin,setCoin]=useState();
 

  const classes=useStyles()

   const {currency,symbol,user,watchlist,setAlert}=CryptoState()

const fetchCoin=async()=>{

  try{

const {data}=await axios.get(SingleCoin(id))
  setCoin(data);
  }catch(error)
  {
    console.error("An error is occured",error)
  }
}


useEffect(function(){
 fetchCoin()
},[])

const inWatchlist = watchlist.includes(coin?.id);
const AddToWatchList=async()=>{
const coinRef=doc(db,"watchlist",user.uid)
console.log(user);
try{
  await setDoc(coinRef,{
    coin:watchlist?[...watchlist,coin?.id]:[coin?.id]
  });
  setAlert({
    open:true,
    message:`${coin.name} Added to watchlist `,
    type:"success",

  })
 console.log("coin added",watchlist)
  
}catch(error){
  console.log("error occured"+error)
}

}
const removeFromWatchlist=async()=>{
  const coinRef = doc(db, "watchlist", user.uid);
  try {
    await setDoc(
      coinRef,
      { coin: watchlist.filter((wish) => wish !== coin?.id) },
      { merge: true }
    );
    console.log("coin removed",watchlist)
  
  } catch (error) {
    setAlert({
      open:true,
      message:`${coin.name} Remove to watchlist`,
      type:"success",
    })
     console.log("error")
  }
}



  return (
    <div className={classes.container}>
    <div className={classes.sidebar}>
      <img 
        src={coin?.image.large}
        alt={coin?.name}
        height="200"
        style={{marginBottom:20}}
         
      />
          <Typography className={classes.heading} variant='h3'>
           {coin?.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.description}>
           {(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {
                coin?.market_data.current_price[currency.toLowerCase()]
              }
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              }
              M
            </Typography>

          </span>
          {user &&(<Button
     variant='contained'
     style={{width:"100%",height:40,backgroundColor:inWatchlist?"#ff0000":"#EEBC1D"}}
     onClick={inWatchlist ? removeFromWatchlist :AddToWatchList}
    >
    {inWatchlist?"Remove from watchlist ": "Add to Watchlist"}

    </Button>)}
  
        </div>


      </div>

      <CoinInfo  coin={coin} />
       
    </div>
  )
}
