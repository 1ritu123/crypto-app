import{BrowserRouter,Route, Routes}from "react-router-dom";
import './App.css';
import Header from './Components/Header';
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import useStyles from "./Pages/AppCss";
import {Alert } from "@material-ui/lab";

function App() {

  const classes = useStyles( )


  return (
      <BrowserRouter>
      <div className={classes.App}>
         <Header />  
    
      <Routes >
      <Route element={<Homepage />} path="/"  />
      <Route  element={<CoinPage/>}   path="/coins/:id" />
      </Routes>
      </div>
    
      </BrowserRouter>
   )      
}

export default App;
