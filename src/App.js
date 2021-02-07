import React, { useState, useRef } from 'react';
import {parse} from 'papaparse';
import './App.scss';
import { LawyersList } from './components/LawyersList/LawyersList';
import { validatorState } from './helpers/validation';

function App() {  
  const [contacts, setContacts] = useState([]);
  const [validFile, setVaidFile] = useState(true);
  const inputFileRef = useRef(undefined);

  const handleChange = (event) => {
    if (Object.keys(event.target.files).length === 0) return; 

    const reader = new FileReader();
    
    reader.onload = function () {      
      const text = reader.result.toLowerCase();
      const result = parse(text, {header: true});
      
      const columns = Object.keys(result.data[0]);
      let amountNeededColumns = columns.reduce((prev, item) => (
        prev + (((item === 'full name') || (item === 'phone') || (item === 'email')) ? 1 : 0) 
      ), 0);

      if (amountNeededColumns < 3) {
        setVaidFile(false);
      } else {
          setVaidFile(true);

          setContacts(result.data
            .filter(list => (list['full name']))
            .map((lawer, index) => ({        
              name: lawer['full name'].trim().toUpperCase(),
              phone: (lawer['phone'].trim().length >=10) ? lawer['phone'].trim().padStart(12, '+1') : "Wrong phone number",
              email: lawer['email'].trim(), 
              age: lawer['age'] ? +lawer['age'] : '', 
              experience: lawer['experience'] ? +lawer['experience'] : '', 
              income: lawer['yearly income'] ? +lawer['yearly income'] : 0, 
              isChildren: lawer['has children'] ? lawer['has children'].trim().toUpperCase() : 'FALSE',               
              states: lawer['license states'] ? validatorState(lawer['license states'].trim()) : '',             
              expiration: lawer['expiration date'] ? lawer['expiration date'].trim() : '',         
              license: lawer['license number'] ? lawer['license number'].trim() : '',  
              id: index + 1,      
          })));
        }          
    };

    reader.readAsText(event.target.files[0]);
  };  

  return (
    <div className="App">
      <header className="header">
        <a className="header__logo" href="https://www.radency.com/">
          <img 
            src="logo.png"
            alt="radency"
        ></img>
        </a>
        <p className="header__title">software engineering</p>
      </header>

      <main className="main">
        <h1 className="main__title">List of lawyers</h1>     

        <input 
          type="file"
          accept=".csv"
          ref={inputFileRef}
          style={{display: "none"}}
          onChange={handleChange}
        />      
        <br/>
        <button
          className="main__file-selector"
          onClick={() => {
            inputFileRef.current.click()
          }}
        >
          Import users
        </button>
        
        {validFile 
          ? <LawyersList contacts = {contacts}/> 
          : <p className="main__invalid">File format is not correct</p>
        }    
      </main>      
    </div>
  );
}

export default App;
