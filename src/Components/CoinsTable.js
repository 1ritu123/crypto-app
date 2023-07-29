import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { CryptoState } from '../Components/CryptoContext';
// import { CoinList } from '../Pages/api';
import { useEffect } from 'react';
import { Container, Table, TableHead, TextField, ThemeProvider, Typography, createTheme ,TableRow, TableCell, Paper, TableBody} from '@material-ui/core';
import TableContainer from '@mui/material/TableContainer';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router';
 import { useStyles } from './CoinsTableCss';
 import Pagination from "@material-ui/lab/Pagination";


const CoinsTable = () => {

    
    const [search,setSearch]=useState('')
    const [page,setPage]=useState(1)

    const navigate=useNavigate()

    const classes=useStyles()

    const {currency,symbol,coins,loading,fetchCoins}=CryptoState()

 
    useEffect(function(){
    fetchCoins()
    },[currency])


    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark",
        },
    })
const handleSearch=()=>{
    return coins.filter((coin)=>{
        return coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    })
    
}



  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign:'center'}}>
       <Typography
          variant='h4'
          style={{margin:18,fontFamily:"Montserrat"}}
       
       >
        Cryptocurrency Prices by Market Cap

       </Typography>
       <TextField 
          label="Search For a Crypto Currency.."
          variant='outlined'
          style={{marginBottom:20,width:"100%"}}
      onChange={(e)=>setSearch(e.target.value)}
       /> 

       <TableContainer >
           {loading ? (<LinearProgress style={{backgroundColor:"yellow"}} />):(
          <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: "#EEBC1D" }}>
            <TableRow>
              {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                <TableCell
                  style={{
                    color: "black",
                    fontWeight: "700",
                    fontFamily: "Montserrat",
                  }}
                  key={head}
                  align={head === "Coin" ? "" : "right"}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
                {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                
                   
                    const profit = row.price_change_percentage_24h > 0; //true or false

                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          {symbol}{" "}{row.current_price.toFixed(2)}

                        </TableCell>
                        <TableCell
                         align='right'
                         style={{color:profit>0?"green":"red",fontWeight:500}}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                          
                        </TableCell>
                        <TableCell
                         align='right'
                        >
                          {symbol}
                          {row.market_cap.toString().slice(0,-6)}M
                          

                        </TableCell>
                        
                        
                      </TableRow>
                    );
                  })}
              </TableBody>


          </Table>

           )}
           
             </TableContainer>
      <Pagination 
       style={{padding:20,width:"100%",display:'flex',justifyContent:'center',color:'yellow'}}
       count={(handleSearch().length/10).toFixed(0)} 
    onChange={(_,value)=>{
      setPage(value)
      window.scroll(0,450)

    }}
      
      
      />


        </Container>

    </ThemeProvider>
      
  )
}

export default CoinsTable
