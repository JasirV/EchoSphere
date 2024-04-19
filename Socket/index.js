const io =require('socket.io')(3002,{
    cors:{
        origin:"http://localhost:3000"
    }
})
let acttiveUsers=[]
io.on('connection',(socket)=>{
    socket.on('new-user-add',(newUserId)=>{
        if(!acttiveUsers.some((user)=>user.userId===newUserId)){
            acttiveUsers.push({
                userId:newUserId,
                socketId:socket.id
            })
        }
        console.log("connect Usres",acttiveUsers);
        io.emit('get-user',acttiveUsers)
    })
    socket.on('disconnect',()=>{
        acttiveUsers=acttiveUsers.filter((user)=>user.socketId !==socket.id)
        console.log("User Disconnected",acttiveUsers);
        io.emit('get-users',acttiveUsers)
    })
})