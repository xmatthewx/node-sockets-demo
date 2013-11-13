// this file runs in terminal or on the server

var http = require('http');
var util = require('util');

var connect = require('connect');

// This is the syntax for Heroku to understand what port is requested
var port = process.env.PORT || 5000; // defaults to localhost:5000 when run locally

var app = connect.createServer(
	connect.static(__dirname + "/public")
).listen(port);

util.log("server running at port: " + port);

var io = require("socket.io").listen(app);
// if .listen() is set to another port then that means the socket is listening on another port...

var onlineUser = []; // count the users

io.set('log level', 2); // showing only significant log such as handshaking and data transmission
io.sockets.on('connection', function(socket) { // when a user, "socket" connects

	onlineUser++; // increment user count
	util.log('hola server, the user #' + socket.id + ' has just connected');
	util.log('number of user: ' + onlineUser);

	// listening to mouse position signal and transmit to every users
	socket.on('mouse lion', function(data) {
	    
		socket.broadcast.emit('mouse tigers', { // send it to everyone else
			x: data.x,
			y: data.y,
			id: socket.id
		});
		
	});

	// when user disconnects
	socket.on('disconnect', function() {
		onlineUser--; // reduce user count
		util.log('the user #' + socket.id + ' has just disconnected');
		util.log('number of user: ' + onlineUser);
	});

    // listen for ready
    socket.on('ready', function(data){
        util.log('ready: ' + data);
        socket.emit('message', 'thanks ' + socket.id ); // reply to user
        io.sockets.emit('message', 'total users: ' + onlineUser); // emit to all
        
        // tell everyone which user is ready
        socket.broadcast.emit('users', socket.id); // emit to everyone else
        
    });




});


// target certain users:
// 
// // send to current request socket client
// socket.emit('message', "this is a test");
// 
// // sending to all clients, include sender
// io.sockets.emit('message', "this is a test");
// 
// // sending to all clients except sender
// socket.broadcast.emit('message', "this is a test");
// 
// // sending to individual socketid
// io.sockets.socket(socketid).emit('message', 'for your eyes only');
//



