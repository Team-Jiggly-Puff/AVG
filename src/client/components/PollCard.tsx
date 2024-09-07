import React, {useEffect, useState} from "react";
interface PollCardProps {
  topic: string;
  pollId: string;
  color:string;
}
const PollCard: React.FC<PollCardProps> = ({pollId,topic,color}) => {
  console.log(color);
  return (
    <div style={cardStyle} className={`flex items-center bg-blue-200 justify-center transition-all duration-300 h-[80%] w-[full] hover:bg-purple-700 hover:text-white hover:scale-125 text-center`}>
      <div style={{color:color}} className="hover:text-white" >{topic}</div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  border: '1px solid blue',
  padding: '10px',
  margin: '10px',
  borderRadius: '5px',
};

export default PollCard;