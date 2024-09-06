import React, { useEffect , useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
interface pollInfo{
  topic:string,
  created_by:number,
  questions:Array<Object>
}
interface Option {
  option: string;
  id: number;
}

interface Question {
  question: string;
  options: Option[];
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

  const [selectedOptions, setSelectedOptions] = useState<{ question: string, optionId: number }[]>([]);

  const handleOptionClick = (question: string, optionId: number) => {
    console.log('I AM BEING CLICKED');
    console.log(selectedOptions,'state');
    setSelectedOptions(prevState => {
      const updatedOptions = prevState.filter(opt => opt.question !== question); //opt is an object that looks like this {question:[question]:optionId:[optionId]} this removes the optionId from the question so we can change it to the new one selected
      return [...updatedOptions, { question, optionId }];
    });
  };

  const handleSubmit = () => {
    const getOptionIds = () => {
      const optionIds:number[] = [];
      selectedOptions.forEach((obj)=>{return optionIds.push(obj.optionId)});
      return optionIds;
    }
    const optionIds = getOptionIds();
    if(optionIds.length === pollQuestions.length){
      fetch('/api/polls/vote',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({option_ids:getOptionIds()})
      });
    }else alert('You need to respond to every question');
  }

  return(
    pollInfo && (
    <>
    <h1>Topic:{pollInfo.topic}</h1>
    {pollQuestions.map((q:any, index) => {
      const displayOptions = (options:Option) => {
        console.log('question',q.question);
        if(q.options){
          return(q.options.map((option:Option,index:number)=>{
            return(
              <div key={option.id}>
            <label key={option.id}>
            <input type="radio" name={q.question}onClick={()=>{handleOptionClick(q.question,option.id)}} key={index}></input>{option.option}</label></div>);
          }))
        }
      }
      return(
        <div key={index} style={{ marginBottom: '20px' }}>
            <div>{q.question}</div>
            {displayOptions(q.options)}
        </div>)
    })}
    <button onClick={handleSubmit}>Submit</button>
    </>
  ))
}

export default Poll;