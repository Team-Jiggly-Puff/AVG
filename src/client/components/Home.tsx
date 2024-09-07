import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen max-h-full items-center bg-gradient-to-b from-purple-100 to-blue-600 pt-10">
      <div className="flex-column flex h-full flex-1 items-center">
        <h1 className="mx-auto font-sans text-7xl font-bold">
          Welcome to Average
        </h1>
        <p className="mx-auto mt-2 font-sans text-2xl font-bold">
          A modern polling and data aggregation platform
        </p>
        <div className="h-10"></div>
        <p className="mx-auto mt-2 w-2/3 font-sans text-lg font-bold text-center">
          Collection of accurate, representative data is the driving force of
          many industries. Average is a curated platform for gathering and
          marketing data for the modern day. Most top polling organizations
          continue to get most of their datapoints from phone calls and
          door-to-door surveys. Average is a fully online solution that
          guarentees highly representative data at a volume that cannot be
          matched by non-digital methods.
        </p>
        <div className="align-center flex w-full flex-row items-center">
          <button
            className="w-50 mx-auto mt-10 h-20 rounded bg-blue-700 px-4 py-2 text-xl font-bold text-white transition-all duration-500 hover:scale-150 hover:bg-purple-600"
            onClick={() => {
              navigate('/login');
            }}
          >
            Sign up to get started
          </button>
        </div>
        <div className="h-15"></div>
        <h1 className="mx-auto mt-10 font-sans text-4xl font-bold">
          Already have an account?
        </h1>
        <div className="align-center flex w-full flex-row items-center">
          <button
            className="h-20px w-80px mx-auto mt-10 rounded bg-purple-200 px-4 py-2 text-xl font-bold text-black transition-all duration-500 hover:scale-150 hover:text-white hover:bg-purple-600"
            onClick={() => {
              navigate('/polls');
            }}
          >
            Browse polls
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
