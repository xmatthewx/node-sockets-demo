
var users = [];
var myID;

var block = {
    
    template : $('.block.template'),
    create : function(userid){
        console.log('create a block')
        var newblock = block.template.clone(); 
        newblock.attr('id',userid);
        newblock.removeClass('template');
        $('.container').append(newblock);
        
        console.log(userid,myID);
        
        if( userid == myID ) {
            console.log('true');

            var myblock = $('#' + userid);
            myblock.addClass('myblock');
        }
    },
    update : function(movement){
        var thisblock = $('#' + movement.user);
        var x = movement.location.x;
        var y = movement.location.y;
        thisblock.css('left',x);
        thisblock.css('top',y);
    }

}


function addUser(id){    
    var html = '<li>' + id + '</li>';
    $('#users').append(html); 
    block.create(id);
}
