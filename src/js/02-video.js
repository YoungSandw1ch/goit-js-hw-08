import Vimeo from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);

player.on('timeupdate', saveTimeUpdateToLS);
player.setCurrentTime(getTimeFromLS());
player.on('pause', logPausedTime);

function saveTimeUpdateToLS(data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}

function getTimeFromLS() {
  return localStorage.getItem(STORAGE_KEY);
}

function logPausedTime({ seconds: s }) {
  s = parseInt(s);
  const toTime = n => (n >= 10 ? n : '0' + n);

  const time =
    toTime(Math.floor(s / 3600)) +
    ':' +
    toTime(Math.floor((s / 60) % 60)) +
    ':' +
    toTime(s % 60);

  console.log('Video paused on: ', time);
}
