'use strict';


function generateTemplate(name, data, basicElement = 'div') {
    var template = document.getElementById(name).innerHTML;
    var element = document.createElement(basicElement);

    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);

    return element;
}

function inputCheck(input){
    if(input === ""){
        return "No name given";
    }
    else if(input === null){
       return false;
    }
    else 
    return input;
}

function checkNull (input){
    if(!input){
        return false;
    }
}

var prefix = "https://cors-anywhere.herokuapp.com/";
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '4261',
    'X-Auth-Token': 'efcc1087a099d1c93a91fbfb9497f9d3'
};


fetch(prefix + baseUrl + '/board', { headers: myHeaders})
.then(function(resp) {
    return resp.json();
})
.then(function(resp) {
    setupColumns(resp.columns);
});

function setupColumns(columns) {
    columns.forEach(function(column){
        var col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
    cards.forEach(function(card) {
        var cardObj = new Card(card.id, card.name);
        col.addCard(cardObj);
    });
}




