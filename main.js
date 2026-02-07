// Star background
function createStars() {
  const stars = document.getElementById('stars');
  for(let i=0;i<50;i++){
    const star=document.createElement('div');
    star.className='star';
    star.style.width=star.style.height=Math.random()*3+1+'px';
    star.style.left=Math.random()*100+'%';
    star.style.top=Math.random()*100+'%';
    star.style.animationDelay=Math.random()*3+'s';
    stars.appendChild(star);
  }
}

// Screens
let currentScreen=1;

// Next screen
function nextScreen(){
  document.getElementById('screen'+currentScreen).classList.remove('active');
  currentScreen++;
  const nextScreenElement=document.getElementById('screen'+currentScreen);
  if(nextScreenElement){
    nextScreenElement.classList.add('active');
    if(currentScreen===3){startSlideshow();}
    if(currentScreen===4){resetGame();}
  }
}

// Slideshow (stops after last slide, then auto-moves to game)
function startSlideshow(){
  const slides = document.querySelectorAll('.slide');
  slides.forEach(sl => sl.style.display = 'none');
  let slideIndex = 0;
  slides[slideIndex].style.display = 'block';

  const slideshowInterval = setInterval(() => {
    slides[slideIndex].style.display = 'none';
    slideIndex++;
    if(slideIndex >= slides.length){
      clearInterval(slideshowInterval); // stop slideshow
      nextScreen(); // automatically go to game screen
      return;
    }
    slides[slideIndex].style.display = 'block';
  }, 2000); // change slide every 2 seconds
}

// Game
let chocolateFound=0;
const totalChocolates=3;

function resetGame(){
  chocolateFound=0;
  for(let i=1;i<=9;i++){
    const box=document.getElementById('box'+i);
    const content=document.getElementById('content'+i);
    box.classList.remove('opened','chocolate','x');
    content.textContent='?';
    box.style.cursor='pointer';
  }
  document.getElementById('gameMessage').textContent='Click a box to reveal it!';
  document.getElementById('nextGameButton').classList.add('hidden');
}

function openBox(boxNumber){
  const box=document.getElementById('box'+boxNumber);
  const content=document.getElementById('content'+boxNumber);
  if(box.classList.contains('opened')) return;
  box.classList.add('opened'); box.style.cursor='default';
  let isChocolate=false;
  if([1,5,9].includes(boxNumber)){
    content.textContent='🍫'; box.classList.add('chocolate'); isChocolate=true;
  } else {content.textContent='❌'; box.classList.add('x'); document.getElementById('gameMessage').textContent='Oops! Not here. Try another box!';}
  if(isChocolate){
    chocolateFound++;
    if(chocolateFound===totalChocolates){
      document.getElementById('gameMessage').innerHTML='🎉 Congratulations! You found all 3 chocolates! 🎉<br>You deserve them!';
      document.getElementById('nextGameButton').classList.remove('hidden');
    } else if(chocolateFound===1){
      document.getElementById('gameMessage').innerHTML='Good job! You found one chocolate! 🍫<br>Find the other 2!';
    } else if(chocolateFound===2){
      document.getElementById('gameMessage').innerHTML='Amazing! Two chocolates found! 🍫🍫<br>One more to go!';
    }
  }
}

function nextFromGame(){nextScreen();}

// Initialize
window.onload=function(){createStars();};