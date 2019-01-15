let start = document.querySelector('#start')
let restart = document.querySelector('#restart')
let timer_game = document.querySelector('#timer')
let game_table = document.querySelector('#game_table')

let timer
let time = 30
let restTime = time
let rows = 5
let columns = 5
let paused = false
let now = 0

start.addEventListener('click', GameStart)
restart.addEventListener('click',GameRestart)

function GameStart(){
    start.style.display = 'none'
    restart.style.display = 'block'
    create()
    timer_game.innerHTML = 'Времени осталось: ' + restTime
    timer = setInterval(timeStep, 1000)
}

function GameRestart() {
    restTime = time
    now = 0
    clearInterval(timer)
    GameStart()
}

function timeStep() {
    restTime--
    if (restTime > 0) {
        timer_game.innerHTML = 'Времени осталось: ' + restTime
    } else {
        clearInterval(timer)
        timer_game.innerHTML = 'Вы проиграли'
        paused = true
    }
}


function create() {
    start.style.display = 'none'
    let numbers = getNumbers()
    let html = ''
    for (i = 0; i < rows; i++) {
        html += '<tr>'
            for (j = 0; j < columns; j++) {
                html += '<td class="td" style="' 
                    + getRandomStyle() + '">' 
                    + getRandomNumber(); + '</td>'
            }
        html += '</tr>'
    }
    game_table.innerHTML = html
    function getRandomNumber() {
        let n = randomInterval(0, numbers.length - 1)
        let res = numbers[n]
        numbers.splice(n, 1)
        return res
    }
}
function getRandomStyle() {
    return 'font-size:' + randomInterval(14, 40) + 'px;'
        + 'color:' + getRandomColor()
}
function getNumbers() {
    let numbers = []
    for ( i = 0; i < rows*columns; i++) {
        numbers[i] = i + 1
    }
    return numbers;
}
function randomInterval(min, max) {
    return Math.round(Math.random() * (max - min) + min)
} 
function getRandomColor() {
  return 'rgb(' + randomInterval(0, 255) + ',' + 
    randomInterval(0, 255) + ',' + randomInterval(0, 255) + ')'
}

game_table.addEventListener('click', init)

function init(event) {
   let targ = event.target //элемент, на котором произошло событие
   let check = targ.classList.contains('td') &&
        !targ.classList.contains('select') && !paused
    if (check) {
        let val = +targ.innerHTML
        console.log(val, now)
        if (val === now + 1) {
            now += 1;
            targ.classList.add('select')
            if (val === rows * columns) {
                timer_game.innerHTML = 'Вы выиграли'
                clearInterval(timer)
            }
        }	
    }
}
