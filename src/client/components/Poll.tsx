import { application } from "express";
import React, { useEffect , useState } from "react";
import { useParams } from "react-router-dom";

interface pollInfo{
  topic:string,
  created_by:number,
  questions:Array<Object>
}
interface option {
  option:string;
  id:number;
}
const Poll = () => {
  const {pollId} = useParams();
  const [pollInfo,changePollInfo] = useState<pollInfo>({
    topic:'',
    created_by:0,
    questions:[{}]
  });
  
  useEffect(()=>{
    console.log('pollId:', pollId);
    const getPollInfo = async () => {
      const pollInfo = await fetch(`/api/polls/poll/${pollId}`).then(data=>data.json());
      changePollInfo(pollInfo);
    }

    getPollInfo();
  },[])

  console.log('pollInfo', pollInfo);
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
      const displayOptions = (options:option[]) => {
        if(q.options){
          return(q.options.map((option:option,index:number)=>{
            console.log('option: ',option.option);
            return(<div key={index}>{option.option}</div>);
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