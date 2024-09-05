import { application } from "express";
import React, { useEffect , useState } from "react";
import { useParams } from "react-router-dom";
interface pollInfo{
  topic:string,
  created_by:number,
  questions:Array<Object>
}
const Poll = () => {
  const {pollId} = useParams();
  const [pollInfo,changePollInfo] = useState<pollInfo>({
    topic:'',
    created_by:0,
    questions:[{}]
  });
  useEffect(()=>{
    const getPollInfo = async () => {
      const pollInfo = await fetch(`/api/pollTest/${pollId}`).then(data=>data.json());
      changePollInfo(pollInfo);
    }

    getPollInfo();
  },[])
  console.log(pollInfo);
  const pollQuestions = pollInfo.questions;
  const displayOptions = (options:string[]) => {
    if(options){
      return options.map((string:string)=>(
        {string}
      ))
    }
  }
  return(
    pollInfo && (
    <>
    <h1>Topic:{pollInfo.topic}</h1>
    {pollQuestions.map((q:any, index) => {
      const displayOptions = (options:string[]) => {
        if(q.options){
          return(q.options.map((string:string,index:number)=>{
            console.log(string);
            return(<div key={index}>{string}</div>);
          }))
        }
      }
      return(
        <div key={index} style={{ marginBottom: '20px' }}>
            <div>{q.question}</div>
            {displayOptions(q.options)}
            <input type="text" placeholder="Input Answer" />
        </div>)
    })}
    <div></div>
    <button onClick={()=>{console.log('submitted')}}>Submit</button>
    </>
  ))
}

export default Poll;