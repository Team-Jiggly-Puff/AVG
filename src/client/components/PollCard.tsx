import React, {useEffect, useState} from "react";
interface PollCardProps {
  topic: string;
  pollId: string;
  delay: number;
}
const PollCard: React.FC<PollCardProps> = ({ pollId, topic, delay}) => {
   console.log('delay:', delay);
  const [animated, animate] = useState<boolean>(false);
  useEffect(() => {
    animate(true);
  }, []);
  return (
    <div style={cardStyle} className={`flex items-center justify-center transition-all duration-300 h-[80%] w-[80%] hover:bg-purple-700 hover:text-white hover:scale-125 text-center`}>
      <p>{topic}</p>
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