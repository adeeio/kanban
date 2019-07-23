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