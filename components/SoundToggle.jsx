import React, { useEffect, useState } from 'react';
import { IoVolumeHigh, IoVolumeMute } from 'react-icons/io5';

import {
  dismissSoundHint,
  getSoundEnabled,
  initSounds,
  playSound,
  setSoundEnabled,
  subscribeSound,
  unlockAudio,
} from '../lib/sounds';

const SoundToggle = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    initSounds();
    setEnabled(getSoundEnabled());
    return subscribeSound(() => setEnabled(getSoundEnabled()));
  }, []);

  const handleToggle = () => {
    const next = !enabled;
    setSoundEnabled(next);
    dismissSoundHint();

    if (next) {
      unlockAudio();
      playSound('shortBeep');
    }
  };

  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={handleToggle}
      aria-label={enabled ? 'Mute sounds' : 'Enable sounds'}
      aria-pressed={enabled}
    >
      {enabled ? <IoVolumeHigh /> : <IoVolumeMute />}
    </button>
  );
};

export default SoundToggle;
