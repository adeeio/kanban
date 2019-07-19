'use strict';

document.addEventListener('DOMContentLoaded', function() {

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

    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.element = generateTemplate('column-template', { name: this.name, id: this.id });


        this.element.querySelector('.column').addEventListener('click', function (event) {
            if (event.target.classList.contains('btn-delete')) {
                self.removeColumn();
            }

            if (event.target.classList.contains('add-card')) {
                var checkContent = inputCheck(prompt("Enter the name of the card"));
                if(checkContent){
                self.addCard(new Card(checkContent));
                }
                return false;
                
            }
        })

    }

    function inputCheck(input){
        if(input == ""){
            alert('Input can not be left blank');
            return false;
        }
        return input;
    }

    Column.prototype = {
        addCard: function (card) {
            this.element.querySelector('ul').appendChild(card.element);
        },
        removeColumn: function () {
            this.element.parentNode.removeChild(this.element);
        }
    };

    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.element = generateTemplate('card-template', { description: this.description }, 'li');

        this.element.querySelector('.card').addEventListener('click', function (event) {
            event.stopPropagation();

            if (event.target.classList.contains('btn-delete')) {
                self.removeCard();
            }
        });
    }

    Card.prototype = {
        removeCard: function () {
            this.element.parentNode.removeChild(this.element);
        }
    }

    var board = {
        name: "Kanban",
        addColumn: function (column) {
            this.element.appendChild(column.element);
            initSortable(column.id);
        },
        element: document.querySelector('#board .column-container')
    };

    function initSortable(id) {
        var el = document.getElementById(id);
        var el2 = document.querySelector(".column-container");
        Sortable.create(el2, {
            group: 'share-column',
            sort: true,
            animation: 100
        });
        Sortable.create(el, {
            group: 'share-card',
            sort: true,
            animation: 150
        });
        
    }

    document.querySelector('#board .create-column').addEventListener('click', function () {
        var name = prompt('Enter a column name');
        var column = new Column(name);
        if(inputCheck(name)){
            board.addColumn(column);
        }
        return false;
        
    });


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


});
