import React, { useState, useEffect } from 'react';

const BlackHoleCountdown = () => {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const targetDate = new Date("December 21, 2024 14:00:00 GMT+0000"); // BST is GMT+0 in winter

    const updateCountdown = () => {
      const now = new Date();
      const timeLeft = targetDate - now;

      if (timeLeft <= 0) {
        setTimeRemaining("The black hole has engulfed everything!");
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setTimeRemaining(`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds left until the end!`);
    };

    const intervalId = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'radial-gradient(circle, black, #1a1a1a, #000000, black)',
        color: 'white',
        fontFamily: "'Arial', sans-serif",
        overflow: 'hidden',
      }}
    >
      <div style={{ textAlign: 'center', animation: 'pulse 2s infinite' }}>
        <h1
          style={{
            fontSize: '4rem',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
          }}
        >
          Call to Arms!
        </h1>
        <div
          id="countdown"
          style={{
            marginTop: '1rem',
            fontSize: '1.5rem',
            color: '#ff6666',
            textShadow: '0 0 10px rgba(255, 102, 102, 0.8)',
          }}
        >
          {timeRemaining}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
          }
          50% {
            transform: scale(1.1);
            text-shadow: 0 0 40px rgba(255, 255, 255, 1);
          }
        }
      `}</style>
    </div>
  );
};

export default BlackHoleCountdown;
