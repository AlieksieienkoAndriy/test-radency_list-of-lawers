import React, { useState, useRef } from 'react';
import {parse} from 'papaparse';
import './App.scss';
import { LawersList } from './components/LawersList/LawersList';

function App() {  
  const [contacts, setContacts] = useState([]);
  const [validFile, setVaidFile] = useState(true);
  const inputFileRef = useRef(undefined);

  const handleChange = (event) => {
    const reader = new FileReader();
    
    reader.onload = function () {
      const text = reader.result;        

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
        <h1 className="main__title">List of lawers</h1>     

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
          ? <LawersList contacts = {contacts}/> 
          : <p className="main__invalid">File format is not correct</p>
        }    
      </main>      
    </div>
  );
}

export default App;
