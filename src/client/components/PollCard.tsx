import React, {useEffect, useState} from "react";
interface PollCardProps {
  topic: string;
  boolean?:boolean;
}
const PollCard: React.FC<PollCardProps> = ({topic,boolean}) => {
  if(boolean){
    return(
    <div style={cardStyle} className={`flex items-center bg-green-200 justify-center transition-all duration-300 h-[80%] w-[full] hover:bg-green-700 hover:text-white hover:scale-125 text-center`}>
      <div>
        {topic}
        <div>Completed</div>
        </div>
    </div>
    )
  }else{
    return(
      <div style={cardStyle} className={`flex items-center bg-red-300 justify-center transition-all duration-300 h-[80%] w-[full] hover:bg-red-700 hover:text-white hover:scale-125 text-center`}>
        <div>
          {topic}
          <div>Not Completed</div>
          </div>
      </div>
    );
  }
};

const cardStyle: React.CSSProperties = {
  border: '1px solid blue',
  padding: '10px',
  margin: '10px',
  borderRadius: '5px',
};

export default PollCard;