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
const Poll = () => {
  const navigate = useNavigate();
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
    const getStatsInfo = async () => {
      const statsInfo = await fetch(`/api/polls/stats/${pollId}`).then(data=>data.json());
      console.log('statsInfo:', statsInfo);
      
    };
    
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

  const isOptionSelected = (question:string, id:number) => {
    return selectedOptions.some(
      option => option.question === question && option.optionId === id
    );
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
      navigate('/polls', { state: { refresh: true } });
    }else alert('You need to respond to every question');
  }

  const topic = {topic:pollInfo.topic}

  return((
    <div className="flex flex-col items-center min-h-screen p-4 bg-gradient-to-b from-gray-400 to-gray-800 p-4">
      {pollInfo && (
        <>
          <div className="text-2xl font-bold mb-6">
            Topic: {pollInfo.topic}
          </div>
          
          <div className="w-full max-w-lg">
            {pollQuestions.map((q: any, index: number) => {
              const displayOptions = (options: Option) => {
                if (q.options) {
                  return q.options.map((option: Option, optionIndex: number) => (
                    <div
                      key={option.id}
                      className={`inline-block p-4 border border-black rounded cursor-pointer text-center relative text-base
                        ${isOptionSelected(q.question, option.id) ? 'bg-customBlue text-white' : 'bg-white text-black'}
                      `}
                      onClick={() => handleOptionClick(q.question, option.id)}
                    >
                      {option.option}
                    </div>
                  ));
                }
              };
  
              return (
                <div key={index} className="mb-6">
                  <div className="text-lg mb-2">{q.question}</div>
                  <div className="flex flex-col gap-2">
                    {displayOptions(q.options)}
                  </div>
                </div>
              );
            })}
          </div>
          <button 
            onClick={handleSubmit} 
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </>
      )}
    </div>
))
}

export default Poll