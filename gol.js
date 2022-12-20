var rowCount = 0;
var colCount = 0
var timeStepSeconds = 1;

var cells;
var aliveBuffer;

var tableBody;
var rowCountInput;
var colCountInput;
var timeStepSecondsInput;

var intervalId;

addEventListener("load", (ev) => {
    tableBody = document.getElementById('gol-table-body');
    rowCountInput = document.getElementById('row-count');
    colCountInput = document.getElementById('col-count');
    timeStepSecondsInput = document.getElementById('time-step');
    handleSettingsChange();
    initTable();
});

function initTable()
{
    tableBody.innerHTML = '';
    cells = [];
    aliveBuffer = [];

    for (var i = 0; i < rowCount; i++) {
        aliveBuffer.push(new Array(colCount).fill(0));

        var cellArr = [];
        cells.push(cellArr);

        var row = tableBody.insertRow(i);

        for (var j = 0; j < colCount; j++) {
            var cell = row.insertCell(j);
            cellArr.push(cell);
            cell.onmousedown = (event) => handleCellClick(event);
            cell.onmouseover = (event) => handleDrag(event);
        }
    }
}

function handleCellClick(event) {
    if (event.buttons == 1) {
        var cell = event.srcElement;
        var row = cell.parentElement;

        var i = row.rowIndex;
        var j = cell.cellIndex;

        var wasAlive = aliveBuffer[i][j];
        aliveBuffer[i][j] = wasAlive ? 0 : 1;
        cell.style.backgroundColor = wasAlive ? 'white': 'black';
    }
}

function handleDrag(event) {
    if (event.buttons == 1) {
        var cell = event.srcElement;
        var row = cell.parentElement;

        var i = row.rowIndex;
        var j = cell.cellIndex;

        aliveBuffer[i][j] = 1;
        cell.style.backgroundColor = 'black';
    }
}

function handleSettingsChange() {
    rowCount = rowCountInput.value;
    colCount = colCountInput.value;
    timeStepSeconds = timeStepSecondsInput.value;

    var wasPlaying = intervalId != null;

    if (wasPlaying)
    {
        handlePauseClick();
        handlePlayClick();
    }
}

function tick() {
    var nextState = [];

    for (var i = 0; i < rowCount; i++) {
        var row = tableBody.rows.item(i);
        nextState.push(new Array(colCount).fill(0));

        for (var j = 0; j < colCount; j++) {
            nextState[i][j] = getNextState(i, j);
            var cell = row.cells.item(j);
            cell.style.backgroundColor = nextState[i][j] ? 'black': 'white';
        }
    }

    aliveBuffer = nextState;
}

function getNextState(rowIndex, colIndex) {
    var currentlyAlive = aliveBuffer[rowIndex][colIndex];
    var livingNeighbors = 0;

    for (var i = rowIndex - 1; i <= rowIndex + 1; i++)
    {
        if (i < 0 || i > rowCount - 1) continue;

        for (var j = colIndex - 1; j <= colIndex + 1; j++)
        {
            if (j < 0 || j > colCount - 1 || (i == rowIndex && j == colIndex)) continue;

            if (aliveBuffer[i][j]) {
                livingNeighbors++;
                if (livingNeighbors > 3) return 0;
            }
        }
    }

    if (livingNeighbors < 2 || livingNeighbors > 3) {
        return 0;
    }

    if (livingNeighbors == 3 || (livingNeighbors == 2 && currentlyAlive))
    {
        return 1;
    }

    return 0;
}

function handlePlayClick() {
    if (intervalId == null) {
        tick();
        intervalId = setInterval(() => tick(), timeStepSeconds * 1000);
    }
}

function handlePauseClick() {
    if (intervalId != null)
    {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function handleStepClick() {
    if (intervalId == null)
    {
        tick();
    }
}