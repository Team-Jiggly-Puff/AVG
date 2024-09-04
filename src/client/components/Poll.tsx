import React from "react";

const Poll = () => {
  return(
    <>
    <h1>Question:</h1>
    <div></div>
    <div></div>
    <input className="input" placeholder="Input Answer"></input>
    <div></div>
    <button onClick={()=>{console.log('submitted')}}>Submit</button>
    </>
  )
}

export default Poll;