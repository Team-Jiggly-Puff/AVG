import React from "react";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import PollCard from "./PollCard";
interface Topic{
  topic:string;
  _id:string;
}

const PollsPage = () => {
  const [topics,changeTopics] = useState<Topic[]>([]);
  useEffect(() => {
    const fetchTopics = async () => {
      const data = await fetch('/api/polls/topics').then(response => response.json());
      console.log(data,'data');
      changeTopics(data);
    };

    fetchTopics();
  }, []);
  console.log(topics);
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', // Responsive columns
    gap: '10px', // Space between grid items
  };
  return(
    <div style={gridStyle}>
    {topics.map((topic)=>{
      {console.log('pollcard generated')}
      return <Link key={topic._id} style={{color:'black'}}to={`/poll/${topic._id}`}><PollCard key={topic._id} pollId={topic._id} topic={topic.topic}/></Link>
    })}
    </div>
  )
}

export default PollsPage;