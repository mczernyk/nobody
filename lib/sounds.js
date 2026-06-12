const SOUND_FILES = {
  shortBeep: '/sounds/shortBeep.wav',
  shortClick: '/sounds/shortClick.wav',
  click1: '/sounds/click1.wav',
  click2: '/sounds/click2.wav',
  click3: '/sounds/click3.wav',
  add: '/sounds/add.wav',
  remove: '/sounds/remove.wav',
};

const STORAGE_KEY = 'nobody-sounds-enabled';
const HINT_KEY = 'nobody-sounds-hint-seen';

const cache = {};
const hoverLastPlayed = {};
const listeners = new Set();
const HOVER_DEBOUNCE_MS = 100;

let initialized = false;
let soundEnabled = false;
let soundEnabledOnInit = false;
let unlocked = false;

function getAudio(name) {
  if (!cache[name]) {
    const audio = new Audio(SOUND_FILES[name]);
    audio.volume = 0.35;
    cache[name] = audio;
  }
  return cache[name];
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function initSounds() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  soundEnabled = localStorage.getItem(STORAGE_KEY) === 'true';
  soundEnabledOnInit = soundEnabled;
}

export function getSoundEnabled() {
  return soundEnabled;
}

export function wasSoundEnabledOnInit() {
  initSounds();
  return soundEnabledOnInit;
}

export function isAudioUnlocked() {
  return unlocked;
}

export function setSoundEnabled(enabled) {
  if (typeof window === 'undefined') return;
  initSounds();
  soundEnabled = enabled;
  localStorage.setItem(STORAGE_KEY, String(enabled));
  notify();
}

export function shouldShowSoundHint() {
  if (typeof window === 'undefined') return false;
  initSounds();
  return localStorage.getItem(HINT_KEY) !== 'true';
}

export function dismissSoundHint() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(HINT_KEY, 'true');
  notify();
}

export function subscribeSound(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function unlockAudio() {
  if (!soundEnabled || unlocked || typeof window === 'undefined') return;

  const audio = getAudio('shortClick');
  const prevVolume = audio.volume;
  audio.volume = 0;
  const playPromise = audio.play();

  if (!playPromise) return;

  playPromise
    .then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = prevVolume;
      unlocked = true;
      notify();
    })
    .catch(() => {
      audio.volume = prevVolume;
    });
}

export function playSound(name, { debounce = false } = {}) {
  if (!soundEnabled || typeof window === 'undefined' || !SOUND_FILES[name]) return;

  if (debounce) {
    const now = Date.now();
    if (hoverLastPlayed[name] && now - hoverLastPlayed[name] < HOVER_DEBOUNCE_MS) return;
    hoverLastPlayed[name] = now;
  }

  const audio = getAudio(name);
  audio.currentTime = 0;
  audio.play().catch(() => {});
}
