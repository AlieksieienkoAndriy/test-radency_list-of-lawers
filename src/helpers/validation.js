export const isInteger = (num) => ((num ^ 0) === num);

export const validatorState = (state) => {
  const switchStates = (value) => {
    let result;

    switch(value) {
      case 'alabama': result = 'AL';
        break;
      case 'alaska': result = 'AK';
        break;
      case 'arizona': result = 'AZ';
        break;
      case 'arkansas': result = 'AR';
        break;
      case 'california': result = 'CA';
        break;
      case 'colorado': result = 'CO';
        break;
      case 'connecticut': result = 'CT';
        break;
      case 'delaware': result = 'DE';
        break;
      case 'florida': result = 'FL';
        break;
      case 'georgia': result = 'GA';
        break;
      case 'hawaii': result = 'HI';
        break;
      case 'idaho': result = 'ID';
        break;
      case 'illinois': result = 'IL';
        break;
      case 'indiana': result = 'IN';
        break;
      case 'iowa': result = 'IA';
        break;
      case 'kansas': result = 'KS';
        break;
      case 'kentucky': result = 'KY';
        break;
      case 'louisiana': result = 'LA';
        break;
      case 'maine': result = 'ME';
        break;
      case 'maryland': result = 'MD';
        break;
      case 'massachusetts': result = 'MA';
        break;
      case 'michigan': result = 'MI';
        break;
      case 'minnesota': result = 'MN';
        break;
      case 'mississippi': result = 'MS';
        break;
      case 'missouri': result = 'MO';
        break;
      case 'montana': result = 'MT';
        break;
      case 'nebraska': result = 'NE';
        break;
      case 'nevada': result = 'NV';
        break;
      case 'new hampshire': result = 'NH';
        break;
      case 'new jersey': result = 'NJ';
        break;
      case 'new mexico': result = 'NM';
        break;
      case 'new york': result = 'NY';
        break;
      case 'north carolina': result = 'NC';
        break;
      case 'north dakota': result = 'ND';
        break;
      case 'ohio': result = 'OH';
        break;
      case 'oklahoma': result = 'OK';
        break;
      case 'oregon': result = 'OR';
        break;
      case 'pennsylvania': result = 'PA';
        break;
      case 'rhode island': result = 'RI';
        break;
      case 'south carolina': result = 'SC';
        break;
      case 'south dakota': result = 'SD';
        break;
      case 'tennessee': result = 'TN';
        break;
      case 'texas': result = 'TX';
        break;
      case 'utah': result = 'UT';
        break;
      case 'vermont': result = 'VT';
        break;
      case 'virginia': result = 'VA';
        break;
      case 'washington ': result = 'WA';
        break;
      case 'west virginia': result = 'WV';
        break;
      case 'wisconsin': result = 'WI';
        break;
      case 'wyoming': result = 'WY';
        break;

      default: result = "Wrong states name";
    }    
    return result;
  } 
  
  if(state.includes(',')){
    let states = state.split(',').map(state => state.trim());    

    let validatedStates = states
      .map(state => ((state.length > 2) ? switchStates(state) : state.toUpperCase()))
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
    item.id === el.id 
      ? false 
      : (item.phone === el.phone) || (item.email.toLowerCase() === el.email.toLowerCase())
  ))
  ) + 1;

 return (result === 0) ? '' : result;
}

export const validatorDate = (date) => {
  let currentDate = new Date();
  let someDate = new Date(date);

  const correctFormat = (/\d{2}[/]\d{2}[/]\d{4}/.test(date)) || (/\d{4}-\d{2}-\d{2}/.test(date));  

  return ((someDate.getTime() > currentDate.getTime())) && correctFormat;
}