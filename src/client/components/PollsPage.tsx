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
  error?:{
    log:string,
    message:string,
    status:string
  } | any
}

const PollsPage = () => {
  const [topics,changeTopics] = useState<Topic[]>([]);
  const [responses,changeResponses] = useState<Response[]>([]);
  const [commonTopics,changeCommonTopics] = useState<string[]>([]);
  useEffect(() => {
    (async function fetchData(){
      try {
        const [topicsResponse, responsesResponse] = await Promise.all([
          fetch('/api/polls/topics').then(response => response.json() as Promise<Topic[]>),
          fetch('/api/users/responses').then(response => response.json() as Promise<Response[]>),
        ]);
        console.log(responsesResponse);
        if(!Object.keys(topicsResponse).includes('error')) changeTopics(topicsResponse);

        if(!Object.keys(responsesResponse).includes('error') && !Object.keys(topicsResponse).includes('error')){
          changeResponses(responsesResponse);
          const common = topicsResponse.map(topicItem => topicItem.topic).filter(topic => responsesResponse.some(responseItem => responseItem.topic === topic));
          changeCommonTopics(common);
          console.log(common);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-400 to-gray-800 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Available Polls
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topics.map((topic) => {
          const isCommon = commonTopics.includes(topic.topic);

          return (
            <Link key={topic._id} to={`/poll/${topic._id}`}>
              <PollCard
                key={topic._id}
                pollId={topic._id}
                topic={topic.topic}
                color={isCommon ? "gray" : "black"}
                className={`p-4 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 ${
                  isCommon ? "bg-blue-200" : "bg-white"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PollsPage;