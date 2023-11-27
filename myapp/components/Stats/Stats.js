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
        <div className='flex justify-between flex-wrap gap-6'>
          <div
          className='bg-orange-300 rounded-2xl px-16 py-4 mt-8'
          >User: {stats.userCount}</div>
          <div
          className='bg-purple-300 rounded-2xl px-16 py-4 mt-8'
          >Store: {stats.storeCount}</div>
          <div
          className='bg-green-300 rounded-2xl px-16 py-4 mt-8'
         
          >Product: {stats.productCount}</div>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
    </section>
  );
}

export default Stats;
