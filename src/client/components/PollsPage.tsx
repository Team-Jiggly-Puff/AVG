import React from "react";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import PollCard from "./PollCard";
import { useLocation } from "react-router-dom";

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
  const [responses,changeResponses] = useState<Response[]>([]);
  const [commonTopics,changeCommonTopics] = useState<string[]>([]);
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsResponse, responsesResponse] = await Promise.all([
          fetch('/api/polls/topics').then(response => response.json() as Promise<Topic[]>),
          fetch('/api/users/responses').then(response => response.json() as Promise<Response[]>)
        ]);
        console.log(topicsResponse,'topics');
        if(topicsResponse) changeTopics(topicsResponse);

        if(responsesResponse) changeResponses(responsesResponse);
        if(topicsResponse && responsesResponse){
          const common = topicsResponse.map(topicItem => topicItem.topic).filter(topic => responsesResponse.some(responseItem => responseItem.topic === topic));
          changeCommonTopics(common);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location.state?.data]);

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', // Responsive columns
    gap: '10px', // Space between grid items
  };
  return(
    <div style={gridStyle}>
    {topics.map((topic)=>{
      const isCommon = commonTopics.includes(topic.topic);
      console.log(commonTopics,'common');
      console.log(topic.topic,'topic');
      {console.log('pollcard generated')}
      return <Link key={topic._id} to={`/poll/${topic._id}`}><PollCard key={topic._id} pollId={topic._id} topic={topic.topic} color={isCommon ? 'grey':'black'}/></Link>
    })}
    </div>
  )
}

export default PollsPage;