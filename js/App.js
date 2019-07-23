'use strict';


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

function setupColumns(colums) {
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



