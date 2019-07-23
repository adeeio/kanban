function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function generateTemplate(name, data, basicElement) {
    var template = document.getElementById(name).innerHTML;
    var element = document.createElement(basicElement || 'div');

    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);

    return element;
}

function inputCheck(input){
    if(input == ""){
        alert('Input can not be left blank');
        return false;
    }
    return input;
}

var todoColumn = new Column('To do');
var doingColumn = new Column('doing');
var doneColumn = new Column('Done');



board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);


var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');


todoColumn.addCard(card1);
doingColumn.addCard(card2);
