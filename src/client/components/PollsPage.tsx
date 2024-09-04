import React from "react";
import { useEffect,useState } from "react";

interface Topic{
  topic:String
}

const PollsPage = () => {
  const [topics,changeTopics] = useState<Topic[]>([]);
  useEffect(() => {
    const fetchTopics = async () => {
      const data = await fetch('/api/topicsTest').then(response => response.json());
      changeTopics(data);
    };

    fetchTopics();
  }, []);
  console.log(topics);
  return(
    <>
    {topics.map((topic)=>{})}
    </>
  )
}
export default PollsPage;