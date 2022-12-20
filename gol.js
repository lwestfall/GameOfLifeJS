var rowCount = 50;
var colCount = 50;

var rows = [];

addEventListener("load", (ev) => {
    var tableBody = document.getElementById('gol-table-body');

    for (var i = 0; i < rowCount; i++) {
        var row = document.createElement('tr');
        rows.push(row);

        tableBody.insertRow(row);

        for (var j = 0; j < colCount; j++) {
            row.insertCell(j);
        }
    }
});
