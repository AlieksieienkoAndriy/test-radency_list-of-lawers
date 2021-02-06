import React, { useState } from 'react';
import classNames from 'classnames';
import { validatorState, isInteger, validatorSameLawer, validatorDate } from '../../helpers/validation';
import './LawersList.scss';

export const LawersList = ({contacts}) => {

  return (
    <section className="list">
      <table className="table list__table">
        <thead>
          <tr >
            <th className="table__row">ID</th>
            <th className="table__row">Full Name</th>
            <th className="table__row">Phone</th>
            <th className="table__row">Email</th>
            <th className="table__row">Age</th>
            <th className="table__row">Experience</th>
            <th className="table__row">Yearly Income</th>
            <th className="table__row">Has children</th>
            <th className="table__row">License states</th>
            <th className="table__row">Expiration date</th>
            <th className="table__row">License number</th>
            <th className="table__row">Dublicate with</th>
          </tr>
        </thead>
        <tbody>            
          { contacts.length > 0 &&
            contacts                              
              .map((contact, index, array) => (
                <tr key = {contact.id}>
                  <td className="table__row">{contact.id}</td>
                  <td className="table__row">{contact.name}</td>
                  <td className="table__row">{contact.phone}</td>

                  <td 
                    className="table__row"
                  >
                    {contact.email}
                  </td>

                  <td 
                    className={classNames({
                      "table__row": true,
                      "table__row--invalid": (contact.age < 21 || !isInteger(contact.age)),
                    })}
                  >
                    {contact.age}
                  </td>

                  <td 
                  className={classNames({
                    "table__row": true,
                    "table__row--invalid": (contact.experience < 0 || contact.experience > contact.age) ,
                  })}  
                  >
                    {contact.experience}
                  </td>

                  <td 
                    className={classNames({
                      "table__row": true,
                      "table__row--invalid": (contact.income > 1000000 || contact.income < 0),
                    })}                      
                  >
                    {contact.income.toFixed(2)}
                  </td>

                  <td 
                    className={classNames({
                      "table__row": true,
                      "table__row--invalid": (contact.isChildren !== 'TRUE' && contact.isChildren !== 'FALSE'),
                    })}         
                  >
                    {contact.isChildren}
                  </td>

                  <td className="table__row">
                    {validatorState(contact.states)}
                  </td>

                  <td 
                    className={classNames({
                      "table__row": true,                        
                      "table__row--invalid": !validatorDate(contact.expiration),
                    })}  
                  >
                    {contact.expiration}
                  </td>

                  <td 
                    className={classNames({
                      "table__row": true,
                      "table__row--invalid":  !/\w{6}/.test(contact.license),
                    })}                     
                  >{contact.license}</td>

                  <td className="table__row">
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