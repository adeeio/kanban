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

// document.ondragstart = function(event) {  //porozmawiamty o tym na rozmowie
//     var lol = event.target;
//     console.log(lol);
// }

// document.ondrop = function(event) {
//     var trol = event.target.parentNode.parentNode.id;
//     console.log(trol);
//     var trol = '';
// }


document.querySelector('#board .create-column').addEventListener('click', function () {
    var name = inputCheck(prompt('Enter a column name'));
    if(!name){
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