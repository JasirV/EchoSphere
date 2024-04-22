import { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

export const useSocket = () => {
  if (!socket) {
    socket = io('http://localhost:3002');  

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }

  return socket;
};
