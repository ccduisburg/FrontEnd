import React,{ FC } from "react"
import Header2 from "./Header2"
import { BrowserRouter as Router, Route } from "react-router-dom";

const Home:FC=()=>{
return(
   
    <Router>
    <Route path="/header2" component={Header2} />     
    </Router>
);
}
export default Home; 