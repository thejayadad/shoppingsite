'use client'
import React, { useState, useEffect } from 'react';

const Stats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          console.error('Error fetching stats:', response.status);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section>
      {stats ? (
        <div className='flex justify-between flex-wrap gap-6 font-medium text-gray-500 uppercase tracking-wider'>
          <div
          className='font-medium text-orange-500 uppercase tracking-wider border border-orange-500  px-16 py-4 mt-8 hover:bg-orange-500 hover:text-white'
          >User: {stats.userCount}</div>
          <div
          className='font-medium text-purple-500 uppercase tracking-wider border border-purple-500 px-16 py-4 mt-8 hover:bg-purple-500 hover:text-white'
          >Store: {stats.storeCount}</div>
          <div
          className='font-medium text-blue-500 uppercase tracking-wider border border-blue-500 px-16 py-4 mt-8 hover:bg-blue-500 hover:text-white'
         
          >Product: {stats.productCount}</div>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
    </section>
  );
}

export default Stats;
