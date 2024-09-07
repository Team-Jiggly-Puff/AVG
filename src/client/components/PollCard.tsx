import React from "react";
interface PollCardProps {
  topic: string;
  pollId: string;
  color:string;
  className?:string;
}
const PollCard: React.FC<PollCardProps> = ({pollId,topic,color,className}) => {
  console.log(color);
  return (
    <div className={`p-4 border rounded-lg ${className}`}>
      <div className={`text-lg font-semibold`} style={{ color }}>
        {topic}
      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  padding: '10px',
  margin: '10px',
  borderRadius: '5px',
  display: 'inline-block',
};

export default PollCard;