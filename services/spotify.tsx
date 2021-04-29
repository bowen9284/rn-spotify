import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const getAuthToken = () => {
  const context = useContext(AuthContext);
  return context?.token;
};

export const fetchRecentlyPlayed = async () => {
  try {
    let response = await fetch(
      'https://api.spotify.com/v1/me/player/recently-played?limit=6',
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      }
    );
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
