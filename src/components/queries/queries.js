import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getAllPersonQuery=gql`
{
findAllPerson{  
    skill  
    vorname
    nachname
    }

}
`


export  {getAllPersonQuery};