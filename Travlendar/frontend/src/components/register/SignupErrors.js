import React from 'react';

export const SignupErrors = ({signupErrors}) =>
  <div className='signupErrors'>
    {Object.keys(signupErrors).map((fieldName, i) => {
      if(signupErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {signupErrors[fieldName]}</p>
        )
      } else {
        return '';
      }
    })}
  </div>