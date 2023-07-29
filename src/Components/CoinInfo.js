import React, { useEffect, useState } from 'react'
import { CryptoState } from '../Components/CryptoContext'
import { HistoricalChart } from '../Pages/api'
import axios from 'axios'
import { CircularProgress, createTheme,ThemeProvider } from '@material-ui/core'
import { useStyles } from '../Components/CoinInfoCss'
import {Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { chartDays } from '../Components/config/data'
import {CategoryScale} from 'chart.js'; 
import SelectButton from '../Components/SelectButton'
Chart.register(CategoryScale);


 const CoinInfo = ({coin}) => {

 const [historicalData,setHistoricalData]=useState([])
 const [days,setDays]=useState(1)
 const classes=useStyles()
 const {currency}=CryptoState()


 const fetchHistoricalData=async()=>{
    if(!coin)
    {
        console.log("late response from server !!wait")
    }
    else
    {
      const {data}=await axios.get(HistoricalChart(coin.id,days,currency))
      setHistoricalData(data.prices)
    }
 }

 
 useEffect(function(){
fetchHistoricalData()
 },[currency,days])
 

const darkTheme=createTheme({
    palette:{
        primary:{
            main:"#fff",
        },
        type:"dark",
    },
})
 



  return (
    <ThemeProvider theme={darkTheme}>
        <div className={classes.container} >
          {!historicalData?(<CircularProgress style={{color:"gold"}} size={250} thickness={1}   />):
          (<>
          
            <Line 
             data={{
                labels:historicalData.map((coin)=>{
                   let date=new Date(coin[0]);
                   let time=date.getHours()>12
                     ? `${date.getHours()-12}:${date.getMinutes()}PM`
                     : `${date.getHours()}:${date.getMinutes()}AM`

          return days==1?time:date.toLocaleDateString()


                }),

                datasets:[
                    {
                   data:historicalData.map((coin)=>coin[1]),
                    label:`Price (Past ${days} Days) in ${currency}`,
                    borderColor:'#EEBC1D'
                
                
                }]
                 
            
             }}
             options={{
                elements:{
                    point:{
                        radius:1,
                    },
                },
             }}
              
            
            />
            <div style={{display:'flex',marginTop:20,justifyContent:"space-around",width:'100%'}}>
              { chartDays.map((day)=>{
                return(
                 <SelectButton  key={day.value} onClick={()=>setDays(day.value)}
                  
                 >{day.label}</SelectButton>
                )
              })} 
            </div>
          
          
          
          </>)} 
     


            </div>

    </ThemeProvider>
  )
}

export default CoinInfo