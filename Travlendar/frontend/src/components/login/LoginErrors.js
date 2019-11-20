import React from 'react';

export const LoginErrors = ({loginErrors}) =>
  <div className='loginErrors'>
    {Object.keys(loginErrors).map((fieldName, i) => {
      if(loginErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {loginErrors[fieldName]}</p>
        )
      } else {
        return '';
      }
    })}
  </div>