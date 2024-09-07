import React, { useEffect , useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
interface pollInfo{
  topic:string,
  created_by:number,
  questions:Array<Object>
}

interface statsInfo{
  options:Array<Object>
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
  const navigate = useNavigate();
  const {pollId} = useParams();

   const [animated, animate] = useState(false);

  const [pollInfo,changePollInfo] = useState<pollInfo>({
    topic:'',
    created_by:0,
    questions:[{}]
  });

  const [statsInfo,changeStatsInfo] = useState<statsInfo>({

    options:[]
  });
  
  useEffect(()=>{
    console.log('pollId:', pollId);

    const getPollInfo = async () => {
      const pollInfo = await fetch(`/api/polls/poll/${pollId}`).then(data=>data.json());
      changePollInfo(pollInfo);
    }
    const getStatsInfo = async () => {
      const statsInfo = await fetch(`/api/polls/stats/${pollId}`).then(data=>data.json());
      console.log('statsInfo:', statsInfo);
      changeStatsInfo(statsInfo);
    };
    animate(true);
    getPollInfo();
    // getStatsInfo();

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
    <div className={`flex flex-column min-h-screen items-center bg-gradient-to-b from-purple-100 to-blue-600 pt-10`}>
    <h1 className= {`font-sans text-7xl font-bold transition-all ${animated ? 'translate-x-4' : '-translate-x-4'} duration-300`}>{pollInfo.topic}</h1>
    <div className="mt-5 flex flex-row h-full">
      <div className="flex flex-column max-h-[340px] w-1/3 min-w-10 ml-10 mr-10 border border-black rounded ">
          <p className="font-bold text-center text-lg mt-10 ml-10 mr-10"
            >It looks like you're ready to vote! You'll notice that the stats are hidden...
            Once you complete a poll, you'll gain access to the current worldwide results!
          </p>
          <button className="w-60 mt-3 mx-auto h-15 rounded bg-blue-500 px-4 py-2 text-md font-bold text-white transition-all duration-500 hover:scale-105 hover:bg-purple-600"
          onClick={()=>{navigate('/polls')}}
            >Return to browse polls
          </button>
          
      </div>
      <div>
        {pollQuestions.map((q:any, index) => {
          const displayOptions = (options:Option) => {
            console.log('question',q.question);
            if(q.options){
              return(q.options.map((option:Option,index:number)=>{
                return(
                  <div key={option.id} onClick={()=>{handleOptionClick(q.question,option.id)}}>
                    <label className="flex flex-row" key={option.id}>
                      <input className="hidden peer" type="radio" name={q.question} key={index}/>
                      <div className="w-4 h-4 border-2 border-blue-200 rounded-full peer-checked:bg-purple-700"></div>
                        &nbsp; {option.option}
                    </label>
                  </div>);
              }))
            }
          }
          return(
            <div key={index} style={{ marginBottom: '20px' }}>
                <div>{q.question}</div>
                {displayOptions(q.options)}
            </div>)
        })}
      </div>
      
    </div>
    
    <button onClick={handleSubmit}>Submit</button>
    </div>
    

  ))
}

export default Poll