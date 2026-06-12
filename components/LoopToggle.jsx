import React, { useEffect, useState } from 'react';
import { IoMusicalNotes } from 'react-icons/io5';

import {
  getLoopEnabled,
  initLoop,
  isLoopPlaying,
  preloadLoop,
  subscribeLoop,
  toggleLoop,
} from '../lib/loop';

const LoopToggle = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    initLoop();
    preloadLoop();
    setActive(getLoopEnabled() && isLoopPlaying());

    const update = () => {
      setActive(getLoopEnabled() && isLoopPlaying());
    };

    return subscribeLoop(update);
  }, []);

  const handleToggle = () => {
    toggleLoop();
  };

  return (
    <button
      type="button"
      className="loop-toggle"
      onClick={handleToggle}
      onMouseEnter={preloadLoop}
      onFocus={preloadLoop}
      aria-label={active ? 'Stop background music' : 'Play background music'}
      aria-pressed={active}
    >
      <IoMusicalNotes />
    </button>
  );
};

export default LoopToggle;
