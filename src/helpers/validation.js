export const isInteger = (num) => ((num ^ 0) === num);

export const validatorState = (state) => {
  const switchStates = (value) => {
    let result;

    switch(value) {
      case 'Alabama': result = 'AL';
        break;
      case 'Alaska': result = 'AK';
        break;
      case 'Arizona': result = 'AZ';
        break;
      case 'Arkansas': result = 'AR';
        break;
      case 'California': result = 'CA';
        break;
      case 'Colorado': result = 'CO';
        break;
      case 'Connecticut': result = 'CT';
        break;
      case 'Delaware': result = 'DE';
        break;
      case 'Florida': result = 'FL';
        break;
      case 'Georgia': result = 'GA';
        break;
      case 'Hawaii': result = 'HI';
        break;
      case 'Idaho': result = 'ID';
        break;
      case 'Illinois': result = 'IL';
        break;
      case 'Indiana': result = 'IN';
        break;
      case 'Iowa': result = 'IA';
        break;
      case 'Kansas': result = 'KS';
        break;
      case 'Kentucky': result = 'KY';
        break;
      case 'Louisiana': result = 'LA';
        break;
      case 'Maine': result = 'ME';
        break;
      case 'Maryland': result = 'MD';
        break;
      case 'Massachusetts': result = 'MA';
        break;
      case 'Michigan': result = 'MI';
        break;
      case 'Minnesota': result = 'MN';
        break;
      case 'Mississippi': result = 'MS';
        break;
      case 'Missouri': result = 'MO';
        break;
      case 'Montana': result = 'MT';
        break;
      case 'Nebraska': result = 'NE';
        break;
      case 'Nevada': result = 'NV';
        break;
      case 'New Hampshire': result = 'NH';
        break;
      case 'New Jersey': result = 'NJ';
        break;
      case 'New Mexico': result = 'NM';
        break;
      case 'New York': result = 'NY';
        break;
      case 'North Carolina': result = 'NC';
        break;
      case 'North Dakota': result = 'ND';
        break;
      case 'Ohio': result = 'OH';
        break;
      case 'Oklahoma': result = 'OK';
        break;
      case 'Oregon': result = 'OR';
        break;
      case 'Pennsylvania': result = 'PA';
        break;
      case 'Rhode Island': result = 'RI';
        break;
      case 'South Carolina': result = 'SC';
        break;
      case 'South Dakota': result = 'SD';
        break;
      case 'Tennessee': result = 'TN';
        break;
      case 'Texas': result = 'TX';
        break;
      case 'Utah': result = 'UT';
        break;
      case 'Vermont': result = 'VT';
        break;
      case 'Virginia': result = 'VA';
        break;
      case 'Washington ': result = 'WA';
        break;
      case 'West Virginia': result = 'WV';
        break;
      case 'Wisconsin': result = 'WI';
        break;
      case 'Wyoming': result = 'WY';
        break;

      default: result = state;
    }    
    return result;
  } 
  
  if(state.includes(',')){
    let states = state.split(',').map(state => state.trim());    

    let validatedStates = states
      .map(state => ((state.length > 2) ? switchStates(state) : state))
      .join(' | ');

    return validatedStates;
  }  

  if(state.length > 2) {
    return switchStates(state);    
  }      
};

export const validatorSameLawer = (arr, el) => {
  let result =
  (arr.findIndex(item => (
    (item.id === el.id) ? false : (item.phone === el.phone || item.email.toLowerCase() === el.email.toLowerCase())
  ))
  ) + 1;

 return (result === 0) ? '' : result;
}

export const validatorDate = (date) => {
  let currentDate = new Date();
  let someDate = new Date(date);

  const correctFormat = (/\d{2}[/]\d{2}[/]\d{4}/.test(date)) || (/\d{4}-\d{2}-\d{2}/.test(date));

  console.log(correctFormat);

  return ((someDate.getTime() > currentDate.getTime())) && correctFormat;
}