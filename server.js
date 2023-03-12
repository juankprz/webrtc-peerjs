const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');
//const { Pool } = require('pg');

/*const pool = new Pool({
  user: 'your-username',
  host: 'your-hostname',
  database: 'your-database-name',
  password: 'your-password',
  port: 5432,
});*/

const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use('/peerjs', peerServer);
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', async () => {
    console.log('User disconnected:', socket.id);
    /*const query = {
      text: 'DELETE FROM users WHERE id = $1',
      values: [socket.id],
    };*/
    //await pool.query(query);
  });

  socket.on('register', async (data) => {
    console.log('User registered:', data);
    /*const query = {
      text: 'INSERT INTO users (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = $2',
      values: [socket.id, data.name],
    };*/
    //await pool.query(query);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});