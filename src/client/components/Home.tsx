import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router';


const Home = () => {
const navigate = useNavigate();

  return (
  <div className="bg-gradient-to-b from-gray-400 to-gray-800  max-h-full h-screen flex pt-10 items-center">
    <div className="flex-1 flex h-full flex-column items-center ">
      <h1 className='font-sans font-bold mx-auto text-7xl'>Welcome to Average</h1>
      <p className='mt-2 font-sans font-bold mx-auto text-2xl'>A modern polling and data aggregation platform</p>
      <div className='h-10'></div>
      <p className='w-2/3 mt-2 font-sans font-bold mx-auto text-lg'>
        Collection of accurate, representative data is the driving force of
        many industries. Average is a curated platform for gathering and marketing
        data for the modern day. Most top polling organizations continue to get most 
        of their datapoints from phone calls and door-to-door surveys. Average is a
        fully online solution that guarentees highly representative data at a volume
        that cannot be matched by non-digital methods.
      </p>
      <div className='w-full flex flex-row items-center align-center'>
        <button className='text-xl h-20 w-50 mt-10 mx-auto transition-all duration-500 bg-blue-500
        hover:bg-green-600 hover:scale-150 text-white font-bold py-2 px-4 rounded'
        onClick={()=>{navigate('/login')}}>
          Sign up to get started
        </button>
      </div>
      <div className='h-15'></div>
      <h1 className='mt-10 font-sans font-bold mx-auto text-4xl'>Already have an account?</h1>
      <div className='w-full flex flex-row items-center align-center'>
        <button className='text-xl h-20px w-80px mt-10 mx-auto transition-all duration-500 bg-gray-500 
        hover:bg-gray-200 hover:scale-150 text-white font-bold py-2 px-4 rounded'
        onClick={()=>{navigate('/polls')}}>
          Browse polls
        </button>
      </div>
      
    </div>
  </div>
);
}

export default Home;