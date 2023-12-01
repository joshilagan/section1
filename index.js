let currentMusic = 0;
const artistName = document.querySelector('.artist')
const music = document.querySelector('#audio')

const seekBar  = document.querySelector('.seek-bar')
const songName = document.querySelector('.song-name')

const currentTime = document.querySelector('.start-time')
const musicDuration = document.querySelector('.running-time')
const playBtn = document.querySelector('.play')
const forwardBtn = document.querySelector('.forwardButton')
const backwardBtn = document.querySelector('.backButton')

  
//toggles the play button to play and pause music onclick
playBtn.addEventListener('click', () => {
  if (playBtn.className.includes('pause')){
    music.play();
  } else{
    music.pause();
  }
  
  playBtn.classList.toggle('pause');
})

//fetch music data
fetch('./data.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    
//loads up the song data from data.json
const setMusic = (i) => {
  seekBar.value = 0; //set range slide value to 0
  let song = data[i];
  
  currentMusic = i;
  music.src = song.path; 
    //sets song details
  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
    //initialize current time
  currentTime.innerHTML = '00:00';
  setTimeout(() =>{
    seekBar.max = music.duration;
    
    musicDuration.innerHTML = formatTime(music.duration);
  }, 300)
}
//set initial song to index 0
setMusic(0)

const formatTime = (time) => {
  let min = Math.floor(time/60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor (time % 60);
  if(sec < 10) {
    sec = `0${sec}`;
  }
  return  `${min} : ${sec}`
}

//seek bar
setInterval(() =>{
  seekBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime)
}, 300)

//play next song when current song ends
music.addEventListener('ended', () => {    
    music.pause();
    if(currentMusic >= data.length -1)  {
        currentMusic = 0;
      } else {
        currentMusic ++;
      }
      setMusic(currentMusic);
    music.play();
  });

//moves the song currentTime if you move the seekbar
seekBar.addEventListener('change', () => {
  music.currentTime = seekBar.value;
})

//play the music and remove pause classname
const playMusic = () => {
  music.play();
  playBtn.classList.remove('pause');

}

//forward and backward button
forwardBtn.addEventListener('click', () => {
  if(currentMusic >= data.length -1)  {
    currentMusic = 0;
  } else {
    currentMusic ++;
  }
  setMusic(currentMusic);
  playMusic();
  }
)
backwardBtn.addEventListener('click', () => {
  if(currentMusic <= 0)  {
    currentMusic = data.length - 1;
  } else {
    currentMusic --;
  }
  setMusic(currentMusic);
  playMusic();
  }
)
});   

