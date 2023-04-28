import React from 'react'

const Alert = (props) => {
  // return (
  //   <div className="alert alert-primary" role="alert">
  //   {props.message}
  //   </div>
  // )
  const capitalise = (word)=>{
    if(word === 'danger'){
      word = 'error';
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
      <div style={{height:'50px',marginBottom:'20px'}} >
      {props.alert && <div>
          <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
              <strong>{capitalise(props.alert.type)}: </strong>{props.alert.msg}
          </div>
      </div>}
      </div>
  )
}



export default Alert
