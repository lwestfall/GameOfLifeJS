var rowCount = 50;
var colCount = 50;

var cells = [];
var aliveBuffer = [];

addEventListener("load", (ev) => {
    var tableBody = document.getElementById('gol-table-body');

    for (var i = 0; i < rowCount; i++) {
        aliveBuffer.push(new Array(colCount).fill(0));

        var cellArr = [];
        cells.push(cellArr);

        var row = tableBody.insertRow(i);

        for (var j = 0; j < colCount; j++) {
            var cell = row.insertCell(j);
            cellArr.push(cell);
            cell.onclick = (event) => handleCellClick(event);
        }
    }
});

function handleCellClick(event) {
    var cell = event.srcElement;
    var row = cell.parentElement;

    var i = row.rowIndex;
    var j = cell.cellIndex;

    var wasAlive = aliveBuffer[i][j];
    aliveBuffer[i][j] = wasAlive ? 0 : 1;
    console.log(wasAlive);
    cell.style.backgroundColor = wasAlive ? 'white': 'black';
}