import React from "react";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import PollCard from "./PollCard";

interface Topic{
  topic:string;
  _id:string;
}

interface Response{
  topic:string;
  questions:{}[]
}

const PollsPage = () => {
  const [topics,changeTopics] = useState<Topic[]>([]);
  const [animated, animate] = useState<boolean>(false);
    
  const [responses,changeResponses] = useState<Response[]>([]);
  const [commonTopics,changeCommonTopics] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsResponse, responsesResponse] = await Promise.all([
          fetch('/api/polls/topics').then(response => response.json() as Promise<Topic[]>),
          fetch('/api/users/responses').then(response => response.json() as Promise<Response[]>)
        ]);
        console.log('topicsResponse:', topicsResponse);
        console.log('responsesResponse:', responsesResponse);

        changeTopics(topicsResponse);

        changeResponses(responsesResponse);

        const common = topicsResponse.map(topicItem => topicItem.topic).filter(topic => responsesResponse.some(responseItem => responseItem.topic === topic));

        changeCommonTopics(common);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    animate(true);
  }, []);

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', // Responsive columns
    
    gap: '10px', // Space between grid items
  };
  return(
    <div className={`flex flex-column min-h-screen items-center bg-gradient-to-b from-purple-100 to-blue-600 pt-10`}>
      <h1 className= {`mx-auto font-sans text-7xl font-bold transition-all ${animated ? 'translate-x-4' : '-translate-x-4'} duration-300`} >The Polls are open...</h1>
      <div className="flex flex-row">
        <div className="flex flex-column w-1/3 mt-10 ml-10 mr-10 border border-black rounded ">
          <p className="font-bold text-center text-lg mt-10 ml-10 mr-10">There are lots of topics to choose from! If you haven't already, please create and account or sign in </p>
          <button className="w-50 mt-1 mx-auto h-15 rounded bg-blue-500 px-4 py-2 text-xl font-bold text-white transition-all duration-500 hover:scale-105 hover:bg-green-600">Sign In</button>
          <p className="font-bold text-center text-lg mt-4 ml-10 mr-10">Click on a poll you'd like to participate in and you'll be taken to the polling page where you'll be given a series of questions to fill out</p>
        </div>
        <div style={gridStyle}>
          {topics.map((topic)=>{
            const isCommon = commonTopics.includes(topic.topic);
            console.log(commonTopics,'common');
            console.log(topic.topic,'topic');
            {console.log('pollcard generated')}
            return <Link className={` w-full h-[15vh]`} key={topic._id} to={`/poll/${topic._id}`}><PollCard key={topic._id} pollId={topic._id} topic={topic.topic} color={isCommon ? 'grey':'black'}/></Link>
          })}
        
        </div>
      </div>
    </div>
    
  )
}

export default PollsPage;