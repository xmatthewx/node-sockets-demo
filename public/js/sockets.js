// this file runs in the browser


// this wrapper makes sure that all html, css, and js links are loaded
window.onload = function() {
     
    // connect client to server
	var socket = io.connect(window.location.hostname);
	
	// mouse listener
	$(document).on('click', function(e) { // mouse clicks
	// $(document).mousemove(function(e) { // mouse movement
	    
	    // grab location
		var posX = e.pageX,
			posY = e.pageY;

		// send movement to server	
        // console.log("sending: " + posX + ", " + posY); 
		socket.emit('mouse lion', { // player is a lion
			x: posX,
			y: posY
		});

		// listen for other user's mouse movement from server
		socket.on('mouse tigers', function(tiger) { // enemies
			// console.log(tiger.x, tiger.y, tiger.id );
			
			$('#' + tiger.id).css( { 'top':tiger.y, 'left':tiger.x } );
			
		});
		
		$('.me').css( { 'top':posY,'left':posX });
		
		
	});
	
	// user ready link
	$('#ready').on('click', function(){
	    console.log('i am ready');
	    socket.emit('ready', 'user is ready');  
	    $(this).fadeOut('slow');  
	});
	
	// receive general messages from server
	socket.on('message',function(data){
	    console.log(data);
	});
	
	
	// setup users
	var usertemplate = $('.template');
	var userspace = $('.container');
	
	// create new user
	socket.on('users', function(data){
	    console.log(data);

	    // clone template
        var newuser = usertemplate.clone();
        newuser.removeClass('template');
        newuser.attr('id', data); // add user id

        // add user to html
        userspace.append(newuser); 
	    
	});
	
}

