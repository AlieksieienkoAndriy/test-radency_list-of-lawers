import React, { useState } from 'react';
import classNames from 'classnames';
import { validatorState, isInteger, validatorSameLawer, validatorDate } from '../../helpers/validation';
import './LawersList.scss';

export const LawersList = ({contacts}) => {

  return (
    <section className = "contant">
      <table className = "table">
        <thead>
          <tr >
            <th className = "row">ID</th>
            <th className = "row">Full Name</th>
            <th className = "row">Phone</th>
            <th className = "row">Email</th>
            <th className = "row">Age</th>
            <th className = "row">Experience</th>
            <th className = "row">Yearly Income</th>
            <th className = "row">Has children</th>
            <th className = "row">License states</th>
            <th className = "row">Expiration date</th>
            <th className = "row">License number</th>
            <th className = "row">Dublicate with</th>
          </tr>
        </thead>
        <tbody>            
          { contacts.length > 0 &&
            contacts                              
              .map((contact, index, array) => (
                <tr key = {contact.id}>
                  <td className = "row">{contact.id}</td>
                  <td className = "row">{contact.name}</td>
                  <td className = "row">{contact.phone}</td>

                  <td 
                    className = "row"
                  >
                    {contact.email}
                  </td>

                  <td 
                    className = {classNames({
                      "row": true,
                      "invalid": (contact.age < 21 || !isInteger(contact.age)),
                    })}
                  >
                    {contact.age}
                  </td>

                  <td 
                  className = {classNames({
                    "row": true,
                    "invalid": (contact.experience < 0 || contact.experience > contact.age) ,
                  })}  
                  >
                    {contact.experience}
                  </td>

                  <td 
                    className = {classNames({
                      "row": true,
                      "invalid": (contact.income > 1000000 || contact.income < 0),
                    })}                      
                  >
                    {contact.income.toFixed(2)}
                  </td>

                  <td 
                    className = {classNames({
                      "row": true,
                      "invalid": (contact.isChildren !== 'TRUE' && contact.isChildren !== 'FALSE'),
                    })}         
                  >
                    {contact.isChildren}
                  </td>

                  <td className = "row">
                    {validatorState(contact.states)}
                  </td>

                  <td 
                    className = {classNames({
                      "row": true,                        
                      "invalid": !validatorDate(contact.expiration),
                    })}  
                  >
                    {contact.expiration}
                  </td>

                  <td 
                    className = {classNames({
                      "row": true,
                      "invalid":  !/\w{6}/.test(contact.license),
                    })}                     
                  >{contact.license}</td>

                  <td className = "row">
                    {validatorSameLawer(array, contact)}
                  </td>
                </tr>
              ))            
          }            
        </tbody>
      </table>
    </section>    
  );
}