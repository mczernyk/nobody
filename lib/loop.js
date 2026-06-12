const LOOP_SRC = '/sounds/loop.mp3';
const LOOP_VOLUME = 0.2;
const STORAGE_KEY = 'nobody-loop-enabled';
const LOOP_ENCODER_DELAY_SAMPLES = 528;
const LOOP_END_PADDING_SAMPLES = 2718;

function getGaplessLoopPoints(audioBuffer) {
  const { sampleRate, duration } = audioBuffer;
  const loopStart = LOOP_ENCODER_DELAY_SAMPLES / sampleRate;
  const loopEnd = duration - (LOOP_END_PADDING_SAMPLES / sampleRate);
  return { loopStart, loopEnd };
}

const listeners = new Set();

let initialized = false;
let loopEnabled = false;
let playing = false;
let audioContext = null;
let gainNode = null;
let sourceNode = null;
let buffer = null;
let bufferPromise = null;

function notify() {
  listeners.forEach((listener) => listener());
}

async function ensureContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
  return audioContext;
}

function loadBuffer() {
  if (buffer) return Promise.resolve(buffer);
  if (bufferPromise) return bufferPromise;

  bufferPromise = fetch(LOOP_SRC)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => ensureContext().then((ctx) => ctx.decodeAudioData(arrayBuffer)))
    .then((decoded) => {
      buffer = decoded;
      return buffer;
    })
    .catch((error) => {
      bufferPromise = null;
      throw error;
    });

  return bufferPromise;
}

export function initLoop() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  loopEnabled = localStorage.getItem(STORAGE_KEY) === 'true';
}

export function preloadLoop() {
  if (typeof window === 'undefined') return;
  loadBuffer().catch(() => {});
}

export function getLoopEnabled() {
  return loopEnabled;
}

export function isLoopPlaying() {
  return playing;
}

export function subscribeLoop(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function stopLoop() {
  if (sourceNode) {
    try {
      sourceNode.stop();
    } catch (_) {
      // already stopped
    }
    sourceNode.disconnect();
    sourceNode = null;
  }
  playing = false;
}

async function startLoop() {
  const ctx = await ensureContext();
  const audioBuffer = await loadBuffer();

  stopLoop();

  const { loopStart, loopEnd } = getGaplessLoopPoints(audioBuffer);

  sourceNode = ctx.createBufferSource();
  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  sourceNode.loopStart = loopStart;
  sourceNode.loopEnd = loopEnd;

  if (!gainNode) {
    gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);
  }
  gainNode.gain.value = LOOP_VOLUME;

  sourceNode.connect(gainNode);
  sourceNode.start(0, loopStart);
  playing = true;
}

export function setLoopEnabled(enabled) {
  if (typeof window === 'undefined') return;
  initLoop();
  loopEnabled = enabled;
  localStorage.setItem(STORAGE_KEY, String(enabled));

  if (enabled) {
    startLoop()
      .then(() => notify())
      .catch(() => {
        playing = false;
        notify();
      });
    return;
  }

  stopLoop();
  notify();
}

export function toggleLoop() {
  if (getLoopEnabled() && isLoopPlaying()) {
    setLoopEnabled(false);
    return;
  }

  setLoopEnabled(true);
}
