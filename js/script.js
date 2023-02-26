const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timer = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#00c4ff', '#fc95ff', '#ff95d3', '#ffe08e', '#ffff9a', '#ff40df', '#096fae', '#f69e49', '#3a2c4d', '#0aab37', '#0FF28C'];

let time = 0;
let score = 0;

startBtn.addEventListener('click', event => {
	event.preventDefault();
	screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('screen__time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'));
		screens[1].classList.add('up');
		startGame();
	}
});

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++;
		event.target.remove();
		createRandomCircle();
	}
});

function startGame() {
	setInterval(decreaseTime, 1000);
	createRandomCircle();
	setTime(time);
}

function decreaseTime() {
	if (time === 0) {
		finishGame();
	} else {
		let current = --time;
		if (current < 10) {
			current = `0${current}`;
		}
		setTime(current);
	}
}

function setTime(value) {
	timer.innerHTML = `00:${value}`;
}

function finishGame() {
	timer.parentNode.classList.add('hide');
	board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;

	const repeat = document.createElement('a');
	repeat.classList.add('repeat-btn');
	repeat.innerHTML = 'Repeat';
	repeat.style.padding = '.5rem 3rem';
	repeat.style.fontSize = '1rem';
	repeat.style.color = '#fff';
	repeat.style.borderRadius = '60px';
	repeat.style.background = 'rgb(255,60,145)';
	repeat.style.background = 'linear-gradient(90deg, rgba(255,60,145,1) 0%, rgba(97,0,200,1) 100%)';
	repeat.style.letterSpacing = '1px';
	repeat.style.cursor = 'pointer';
	board.append(repeat);

	repeat.addEventListener('click', () => {
		location.reload();
	});
}

function createRandomCircle() {
	const circle = document.createElement('div');
	const size = getRandomNumber(10, 60); 
	const {width,height} = board.getBoundingClientRect();
	const x = getRandomNumber(0, width - size);
	const y = getRandomNumber(0, height - size);
	const color = getRandomColor();
	circle.style.background = color;
	circle.classList.add('circle');
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	board.append(circle);
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
	const index = Math.floor(Math.random() * colors.length);
	return colors[index];
}