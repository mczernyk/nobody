import { useEffect } from 'react';

import { getSoundEnabled, initSounds, playSound, unlockAudio } from '../lib/sounds';

const MAIN_IMAGE_SELECTOR = '.product-image, .product-detail-image';
const THUMB_SELECTOR = '.small-image';
const HOVER_SELECTOR = 'button, a, select, .minus, .plus, .sound-click1';
const CLICK1_SELECTOR = 'button, a, select, .remove-item, .sound-click1';

function findHoverTarget(target) {
  return (
    target.closest(MAIN_IMAGE_SELECTOR)
    || target.closest(THUMB_SELECTOR)
    || target.closest(HOVER_SELECTOR)
  );
}

const SoundEffects = () => {
  useEffect(() => {
    initSounds();

    const unlockOnFirstInteraction = () => {
      if (getSoundEnabled()) unlockAudio();
    };
    window.addEventListener('pointerdown', unlockOnFirstInteraction, { once: true });

    let hoverTarget = null;

    const handleMouseOver = (e) => {
      if (!getSoundEnabled()) return;

      const el = findHoverTarget(e.target);
      if (!el || el === hoverTarget) return;

      hoverTarget = el;

      if (el.matches(MAIN_IMAGE_SELECTOR)) {
        playSound('shortBeep', { debounce: true });
      } else {
        playSound('shortClick', { debounce: true });
      }
    };

    const handleMouseOut = (e) => {
      if (!hoverTarget) return;
      if (!hoverTarget.contains(e.relatedTarget)) {
        hoverTarget = null;
      }
    };

    const handleClick = (e) => {
      if (!getSoundEnabled()) return;
      if (e.target.closest('.sound-toggle, .loop-toggle')) return;

      unlockAudio();

      const labeled = e.target.closest('[data-sound]');
      if (labeled) {
        playSound(labeled.dataset.sound);
        return;
      }

      if (e.target.closest(MAIN_IMAGE_SELECTOR)) {
        playSound('click2');
        return;
      }

      if (e.target.closest(CLICK1_SELECTOR)) {
        playSound('click1');
      }
    };

    const handleChange = (e) => {
      if (!getSoundEnabled()) return;
      if (e.target.matches('select')) {
        unlockAudio();
        playSound('click1');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('change', handleChange, true);

    return () => {
      window.removeEventListener('pointerdown', unlockOnFirstInteraction);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('change', handleChange, true);
    };
  }, []);

  return null;
};

export default SoundEffects;
