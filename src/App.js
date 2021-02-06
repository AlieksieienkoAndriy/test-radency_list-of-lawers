import React, { useState, useRef } from 'react';
import {parse} from 'papaparse';
import './App.css';
import { LawersList } from './components/LawersList/LawersList';

function App() {  
  const [contacts, setContacts] = useState([]);
  const [validFile, setVaidFile] = useState(true);
  const inputFileRef = useRef(undefined);

  const handleChange = (event) => {
    const reader = new FileReader();
    
    console.log(event.target.files[0]);

    reader.onload = function () {
      const text = reader.result;
      
      // console.log((/[hone]/gi).test(text));     

      const result = parse(text, {header: true});

      console.log(result.data[0]);

      if (!result.data[0].hasOwnProperty('Full Name') 
        || !result.data[0].hasOwnProperty('Phone') 
        || !result.data[0].hasOwnProperty('Email')) {
        setVaidFile(false);
      } else {
          setVaidFile(true);
          
          setContacts(result.data
            .filter(list => (list['License states']))
            .map((lawer, index) => ({        
              name: lawer['Full Name'].trim(),
              phone: lawer['Phone'].trim().padStart(12, '+1'),
              email: lawer['Email'].trim(), 
              age: +lawer['Age'], 
              experience: +lawer['Experience'], 
              income: +lawer['Yearly Income'], 
              isChildren: (lawer['Has children'] === ' ' ? 'FALSE' : lawer['Has children'].trim()), 
              states: lawer['License states'].trim(), 
              expiration: lawer['Expiration date'].trim(),         
              license: lawer['License number'].trim(),  
              id: index + 1,      
          })));
        }          
    };

    reader.readAsText(event.target.files[0]);
  };  

  console.log(contacts);  

  return (
    <div className="App">      
      <h1>List of lawers</h1>     

      <input 
        type = "file"
        accept = ".csv"
        ref = {inputFileRef}
        style = {{display: "none"}}
        onChange = {handleChange}
      />      
      <br/>
      <button
        onClick = {() => {
          inputFileRef.current.click()
        }}
      >
        Import users
      </button>
      <br/>
        {validFile ? <LawersList contacts = {contacts}/> : <p>File format is not correct</p>}      
    </div>
  );
}

export default App;
