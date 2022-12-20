var rowCount = 20;
var colCount = 20;

var cells = [];
addEventListener("load", (ev) => {
    var tableBody = document.getElementById('gol-table-body');

    for (var i = 0; i < rowCount; i++) {
        var cellArr = [];
        cells.push(cellArr);

        var row = tableBody.insertRow(i);

        for (var j = 0; j < colCount; j++) {
            var cell = row.insertCell(j);
            cellArr.push(cell);
        }
    }
});