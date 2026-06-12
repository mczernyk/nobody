import React, { useEffect, useState } from 'react';
import { IoVolumeMute } from 'react-icons/io5';

import {
  dismissSoundHint,
  getSoundEnabled,
  initSounds,
  isAudioUnlocked,
  shouldShowSoundHint,
  subscribeSound,
  wasSoundEnabledOnInit,
} from '../lib/sounds';

const SoundHint = () => {
  const [hint, setHint] = useState(null);
  const [unlockHintDismissed, setUnlockHintDismissed] = useState(false);

  useEffect(() => {
    initSounds();

    const updateHint = () => {
      if (shouldShowSoundHint() && !getSoundEnabled()) {
        setHint('first-visit');
        return;
      }

      if (
        !unlockHintDismissed
        && wasSoundEnabledOnInit()
        && getSoundEnabled()
        && !isAudioUnlocked()
      ) {
        setHint('unlock');
        return;
      }

      setHint(null);
    };

    updateHint();
    return subscribeSound(updateHint);
  }, [unlockHintDismissed]);

  useEffect(() => {
    if (hint !== 'first-visit') return undefined;

    const timeout = setTimeout(() => {
      dismissSoundHint();
    }, 6000);

    return () => clearTimeout(timeout);
  }, [hint]);

  useEffect(() => {
    if (hint !== 'unlock') return undefined;

    const timeout = setTimeout(() => {
      setUnlockHintDismissed(true);
    }, 8000);

    return () => clearTimeout(timeout);
  }, [hint]);

  if (!hint) return null;

  return (
    <div className="sound-hint" role="status">
      {hint === 'first-visit' ? (
        <>
          sound available — tap the speaker
          {' '}
          <IoVolumeMute className="sound-hint-icon" aria-hidden="true" />
          {' '}
          to turn on
        </>
      ) : (
        'tap anywhere to activate sound'
      )}
    </div>
  );
};

export default SoundHint;
