
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {Avatar} from '@material-ui/core';
import  { CryptoState } from '../CryptoContext';
import Button from '@material-ui/core/Button';
import { signOut } from 'firebase/auth';
import {auth} from "../firebase";
// import{numberWithCommas}from '../Banner/Carousel';
import {doc,setDoc} from 'firebase/firestore';
import {db} from '../firebase';
import{AiFillDelete} from 'react-icons/ai'
const useStyles = makeStyles({
 container:{
  width:350,
  padding:25,
  height:"100%",
  display:"flex",
  flexDirection:"column",
  fontFamily:"monospace",
 },
 profile:{
  flex:1,
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  gap:"20px",
  height:"92%",
 },
 picture:{
  width:200,
  height:200,
  cursor:"pointer",
  backgroundColor:"#EEBC1D",
  objectFit:"contain",
 },
 logout:{
  height:"8%",
  width:"100%",
  backgroundColor:"#EEBC1D",
  marginTop:20,
 },
 watchlist:{
  width:"100%",
  flex:1,
  backgroundColor:"grey",
  borderRadius:10,
  padding:15,
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  gap:12,
  overflowY:"scroll",
 },
 coin:{
  padding:10,
  borderRadius:5,
  color:"black",
  width:"100%",
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  backgroundColor:"#EEBC1D",
  boxShadow:"0 0 3px black",
 },
});

export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    
    right: false,
  });
  const {user,setAlert,watchlist,coins,symbol}=CryptoState();
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  }
  const removeFromWatchlist=async(coin)=>{
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
  const logout=()=>{
    signOut(auth);
    
    setAlert({
      open:true,
      type:"success",
      mesaage:"Logout Sucessfully",
    });
    toggleDrawer();
      };

  return (
    <div>
      {[ 'right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor, true)}
          style={{
            height:38,
            width:38,
            cursor:"pointer",
            backgroundColor:"#EEBC1D"
          }}
          src={user.photoURL}
          alt={user.displayName||user.email}
          />
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>

           <div className={classes.container}>
            <div className={classes.profile}>
              <Avatar 
              className={classes.picture}
              src={user.photoURL}
              allt={user.displayName||user.email}
              />
              <span
                 style={{
                  width:"100%",
                  fontSize:25,
                  textAlign:"center",
                  fontWeight:"bolder",
                  wordWrap:"break-word",
                }}
                >
                  {user.display||user.email}
              </span>
              <div className={classes.watchlist}>
                 <span style={{fontsize:15,textShadow:" 0 0 5px black"}}>
                   Watchlist
                 </span>
                 {coins.map(coin=>{
                  if(watchlist.includes(coin.id))
                  return(
                    <div className={classes.coin}>
                      <span>{coin.name}</span>
                      <span style={{display:"flex",gap:8}}>
                        {symbol}
                        {(coin.current_price.toFixed(2))}
                        <AiFillDelete
                        style={{cursor:"pointer"}}
                        fontSize='16'
                        onClick={()=>removeFromWatchlist(coin)}
                        />
                      </span>
                    </div>
                 )
                 })}
              </div>
            </div>
            <Button 
              variant="contained"
              className={classes.logout}
              onClick={logout}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
