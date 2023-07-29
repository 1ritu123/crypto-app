import React, { createContext, useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { CoinList } from '../Pages/api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth ,db} from './firebase';
 import {doc,onSnapshot} from 'firebase/firestore';

const Crypto=createContext();

const CryptoContext = ({children}) => {

const[currency,setCurrency] =useState("INR");
const[symbol,setSymbol]  =useState("₹");
const [coins,setCoins]=useState([])
const [loading,setLoading]=useState(false);
const [user,setUser]=useState(null);
const [watchlist,setWatchList]=useState([]);
const[alert,setAlert]=useState({
  open:false,
  message:'',
  type:"success",
});

useEffect(() => {
  if (user) {
    const coinRef = doc(db, "watchlist", user?.uid);
    var unsubscribe = onSnapshot(coinRef, (coin) => {
       console.log("coin data",coin.data())
      if (coin.exists()) {
         setWatchList(coin.data().coin);
         console.log("cooin daata"+JSON.stringify(coin.data()))
      } else {
        console.log("No Items in Watchlist");
      }
    });

    return () => {
      unsubscribe();
    };
  }
}, [user]);

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user);
    else setUser(null);
    console.log(user)
  });
}, []);

const fetchCoins=async()=>{
  try{
      
  setLoading(true)
  const {data}=await axios.get(CoinList(currency))
  setCoins(data)
  setLoading(false)
  }catch(error)
  {
      console.error("An error is occured"+error)
  }
}


useEffect(()=>{
    if (currency==="INR")setSymbol("₹");
    else if(currency==="USD")setSymbol("$")
},[])
console.log("uselogin",user)

  return (
    <Crypto.Provider value={{currency,symbol,setCurrency,coins,loading,fetchCoins,alert,setAlert,user,watchlist}}>
        {children}
    </Crypto.Provider>
  )
};

export default CryptoContext;

export const CryptoState =()=>{
    return useContext(Crypto);
};