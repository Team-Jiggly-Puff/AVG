import React from "react";
interface PollCardProps {
  topic: string;
  pollId: string;
  color:string;
}
const PollCard: React.FC<PollCardProps> = ({pollId,topic,color}) => {
  console.log(color);
  return (
    <div style={cardStyle}>
      <div style={{color:color}}>{topic}</div>
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