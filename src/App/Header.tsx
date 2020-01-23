import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation
} from "react-router-dom";
import PersonList from "../components/PersonList";
import PersonUpdate from "../components/PersonUpdate";
import PersonAdd from "../components/PersonAdd";

// Params are placeholders in the URL that begin
// with a colon, like the `:id` param defined in
// the route in this example. A similar convention
// is used for matching dynamic segments in other
// popular web frameworks like Rails and Express.

export default function Header() {
  return (
 
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/updateperson">Update</Link>
            </li>
            <li>
              <Link to="/personadd">Person add</Link>
            </li>
             <li>
              <Link to="/will-not-match">Will Not Match</Link>
            </li>
            {/* <li>
              <Link to="/also/will/not/match">Also Will Not Match</Link>
            </li>  */}
          </ul>
  
          <Switch>
            <Route exact path="/">
              <PersonList />
            </Route>
            <Route path="/personadd">
       <PersonAdd/>
            </Route>
            <Route path="/updateperson">
              <PersonUpdate />
            </Route>
             <Route path="*">
              <NoMatch />
            </Route> 
          </Switch>
        </div>
      </Router>
    );
  }
  
//   function Home() {
//     return <h3>Home</h3>;
//   }
  
//   function WillMatch() {
//     return <h3>Matched!</h3>;
//   }
  
  function NoMatch() {
    let location = useLocation();
  
    return (
      <div>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </div>
    );
}
