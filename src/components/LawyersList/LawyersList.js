import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isInteger, validatorSameLawer, validatorDate } from '../../helpers/validation';
import './LawyersList.scss';

export const LawyersList = ({contacts}) => (  
  contacts.length > 0 &&
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
          {contacts                              
            .map((contact, i, array) => (
              <tr key = {contact.id}>
                <td className="table__row">{contact.id}</td>
                <td className="table__row">{contact.name}</td>
                <td
                    className={classNames({
                    "table__row": true,
                    "table__row--invalid": contact.phone === "Wrong phone number",
                  })}
                >{contact.phone}</td>

                <td 
                  className={classNames({
                    "table__row": true,
                    "table__row--invalid": !/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(contact.email),
                  })}
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

                <td 
                  className={classNames({
                    "table__row": true,
                    "table__row--invalid": (contact.states === 'Wrong states name' || contact.states === ''),
                  })}  
                >                    
                  {contact.states}
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
                    "table__row--invalid": (!/\w{6}/.test(contact.license) || contact.license.length !== 6),
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

LawyersList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone :PropTypes.string.isRequired,
      email :PropTypes.string.isRequired,      
      income :PropTypes.number,
      isChildren :PropTypes.string,
      states :PropTypes.string,
      expiration :PropTypes.string,
      license :PropTypes.string,
      id :PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
}
