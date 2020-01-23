import React, {Component} from 'react';
// import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

import {getAllPersonQuery} from './queries/queries';
// const getAllPersonQuery=gql`
// {
// findAllPerson{  
//     skill  
//     vorname
//     nachname
//     }

// }
// `
class PersonList extends Component{    

    personShow(){
        var data =this.props.data;
        if(data.loading){
            return (<div>Personlist is loading</div>)
        }else{
            return data.findAllPerson.map(person=>{
                return (
                <li key={person.id}>{person.vorname} {person.nachname} {person.skill} {person.geburtsdatum}</li>           
                )
            })
        }
    }
    render(){
     
        return(
            <div>              
                <ul id="personl">                
                 {this.personShow()}
                </ul>
            </div>
        )
    }
}
export default graphql(getAllPersonQuery)(PersonList);