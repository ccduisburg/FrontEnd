import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import React, { FC, SFC } from "react";
import { BrowserRouter as Router,
    Route,
    Link,
    RouteComponentProps,
    match
   } from "react-router-dom";
import PersonUpdate from "../components/PersonUpdate";
import PersonAdd from "../components/PersonAdd";
import PersonList from "../components/PersonList";

interface PathVariables {
  ekfNummer: string;
}
interface Props extends RouteComponentProps{
  match: match<PathVariables>;
}

const Header2: SFC<Props> = ({match}) => {
    return (
        <>
          <Router>
          <Navbar bg="light" className="mb-2">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to={`${match.path}/personupdate`}>
                          Person update
                        </Nav.Link>
                        <Nav.Link as={Link} to={`${match.path}/personadd`}>
                         Person add
                        </Nav.Link>
                        <Nav.Link as={Link} to={`${match.path}/personlist`}>
                           Person List
                        </Nav.Link>                       
                    </Nav>
                </Navbar.Collapse>
                <Form inline>
    <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
    <Button type="submit">Suchen</Button>
  </Form>
            </Navbar>
            <Route path={`${match.path}/personupdate`} component={PersonUpdate} />
            <Route path={`${match.path}/personadd`} component={PersonAdd} />
            <Route path={`${match.path}/personlist`} component={PersonList} />
          </Router>
          
         
        </>
    );
};
export default Header2;
