import io from 'socket.io-client';

const socket = io('http://localhost:5000'); 

export default {
  connect() {
    socket.connect();
  },
  disconnect() {
    socket.disconnect();
  },
  listenForNotifications(callback) {
    socket.on('notification', (data) => {
      callback(data);
    });
  },
};
