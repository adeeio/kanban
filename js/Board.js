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

    Sortable.create(el, {
        group: 'share-card',
        sort: true,
        animation: 150
    });
}

function moveKart() {

    var cardId;

    document.ondragstart = function foo() {
        cardId = event.target.id;
        event.stopPropagation();
    }


    document.ondrop = function foo2() {

        var trol = event.target.parentNode.parentNode.id;

        var data = new FormData();
        data.append('id', cardId);
        data.append('bootcamp_kanban_column_id', trol);
        console.log(trol);
        console.log(cardId);
        fetch(prefix + baseUrl + '/card', {
            method: 'PUT',
            headers: myHeaders,
            body: data
        });

    }
}

moveKart();

document.querySelector('#board .create-column').addEventListener('click', function () {
    var name = inputCheck(prompt('Enter a column name'));
    if (!name) {
        return false;
    }
    var data = new FormData();
    data.append('name', name);

    fetch(prefix + baseUrl + '/column', {
        method: 'POST',
        headers: myHeaders,
        body: data,
    })
        .then(function (resp) {
            return resp.json();
        })
        .then(function (resp) {
            var column = new Column(resp.id, name);
            board.addColumn(column);
        });

});