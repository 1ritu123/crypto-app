import React from 'react'
import {AppBar ,Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from "@material-ui/core";
import { useNavigate } from 'react-router';
import {useStyles} from './HeaderCss';
import { CryptoState } from '../Components/CryptoContext';
import AuthModal from './Authentication/AuthModal';
import Usersidebar from'./Authentication/Usersidebar';
const Header = () => {

  const classes =useStyles();
  
  const navigate=useNavigate();

  const { currency,setCurrency,user} = CryptoState()
  
  console.log(currency);
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
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography onClick={() => navigate("/")} className={classes.title} variant="h6">
            Crypto Hunter
          </Typography>

          <Select
            variant="outlined"
            style={{ width: 100, height: 40, marginRight: 15,color:'#fff' }}
            value={currency}
            onChange={(e)=> setCurrency(e.target.value)}
                   
        >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
          { user?<Usersidebar/>:<AuthModal/>}  
        </Toolbar>
      </Container>
    </AppBar>

    </ThemeProvider>
  );
  
}

export default Header;
