
import React, { FC, useState } from 'react';

// import {addPersonMutation} from './queries/queries';
import {useRegisterPersonMutation} from '../data/schema.generated'

// const addPersonMutation=gql`

// mutation RegisterMutation($vorname:String!,$nachname:String!,$skill:String!,$geburtsdatum:String!){
//     savePerson(vorname:$vorname,nachname:$nachname, skill:$skill, geburtsdatum:$geburtsdatum){
//         vorname
//         name
//         skill
//         geburtsdatum
//     }
// }

// `

//  class PersonAdd extends Component{
// constructor(props){
//     super(props)
//     this.state={
//         vorname:'',
//         name:'',
//         skils:'',
//         geburtsdatum:''

//     }
// }
// sendForm(e) { 
//  e.preventDefault();   
// // this.props.RegisterMutation({
// //     variables:{
// //         vorname:this.state.vorname,
// //         name:this.state.name,
// //         skill:this.state.skils,
// //         geburtsdatum:this.state.geburtsdatum
// //     }
// // });

// }


const PersonAdd:FC=()=>{
const [vorname,setVorname]=useState<string|any>();
const [nachname,setNachname]=useState<string|any>();
const [skill,setSkill]=useState<string|any>();
const [geburtsdatum,setGeburtsdatum]=useState<string|any>();
const [registerPersonMutation, { data, loading, error }] = useRegisterPersonMutation({
    variables: {
        vorname:vorname,
        nachname:nachname,
        skill:skill,
        geburtsdatum:geburtsdatum
     },
   });
     
   

        return (
            <form id="add-person"  onSubmit={e => {
                e.preventDefault();
                registerPersonMutation({  variables: {
                    vorname:vorname,
                    nachname:nachname,
                    skill:skill,
                    geburtsdatum:geburtsdatum
                 }});
             console.log(data);
                }}
            >
                <div className="field">
                    <label>Vorname:</label>
                    <input type="text" onChange={(e)=>(setVorname(e.target.value))}/>
                </div>

                <div className="field">
                    <label>Name :</label>
                    <input type="text" onChange={(e)=>(setNachname(e.target.value))}/>
                </div>
                <div className="field">
                    <label>Skills :</label>
                    <input type="text" onChange={(e)=>(setSkill(e.target.value))}/>
                </div>
                <div className="field">
                    <label>Geburtsdatum :</label>
                    <input type="text" onChange={(e)=>(setGeburtsdatum(e.target.value))}/>
                </div>                               
                  
                <button>Add</button>
            </form>
             
        )
    }

export default PersonAdd;