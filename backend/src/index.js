'use strict';

const WebSocket = require('ws');

module.exports = {
  register({ strapi }) {},

  bootstrap({ strapi }) {
    const server = strapi.server.httpServer;
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
      console.log('New WebSocket connection');

      ws.on('message', (message) => {
        const textMessage = Buffer.isBuffer(message) ? message.toString() : message;
        console.log('Received:', textMessage);
        
        ws.send(textMessage);
      });

      ws.on('close', () => {
        console.log('WebSocket connection closed');
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
      });
    });
  },
};
