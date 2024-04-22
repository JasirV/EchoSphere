const io = require('socket.io')(3002, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users = []; 

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    console.log(users);
    users.push({ userId, socketId });
    io.emit('getUsers', users); 
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = async (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  console.log('a user connected.');

  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    
  });

  socket.on('sendMessage', async ({ senderId, receiverId, text }) => {
    console.log(receiverId);
    const user = await getUser(receiverId);
    console.log(user); 
      io.to(user.socketId).emit('getMessage', {
        senderId,
        text,
      });
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users); 
  });
});
