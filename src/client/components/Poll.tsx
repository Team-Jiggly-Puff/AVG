import React from "react";

const Poll = () => {
  return(
    <>
    <h1>Question:</h1>
    <div></div>
    <div></div>
    <input className="input" placeholder="Put your answer to the question here"></input>
    <button onClick={()=>{console.log('submitted')}}></button>
    </>
  )
}

export default Poll;