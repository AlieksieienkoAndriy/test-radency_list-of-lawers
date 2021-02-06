import React, { useState } from 'react';
import {parse} from 'papaparse';
import './App.css';
import { LawersList } from './components/LawersList/LawersList';

function App() {  
  const [contacts, setContacts] = useState([]);

  const handleChange = (event) => {
    const reader = new FileReader();    

    reader.onload = function () {
      const text = reader.result;
      const result = parse(text, {header: true});
                 
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
    };

    reader.readAsText(event.target.files[0]);
  };  

  console.log(contacts);  

  return (
    <div className="App">      
      <h1>List of lawers</h1>     

      <input 
        type = "file"
        onChange = {handleChange}
      />
      <br/>
      <br/>

      <LawersList contacts = {contacts}/>
    </div>
  );
}

export default App;
