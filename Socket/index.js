const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

server.listen(3002, () => {
  console.log('Socket server is running on port 3002');
});

let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
    io.emit('getUsers', users);
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  console.log('A user connected.');

  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
  });

  socket.on('sendMessage', ({ sender, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit('getMessage', {
        sender,
        text,
      });
    } else {
      console.log('User not found for sendMessage:', receiverId);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
