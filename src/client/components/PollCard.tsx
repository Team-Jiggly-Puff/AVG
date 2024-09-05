import React from "react";
interface PollCardProps {
  topic: string;
  pollId: string;
}
const PollCard: React.FC<PollCardProps> = ({pollId,topic}) => {
  return (
    <div style={cardStyle}>
      {topic}
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