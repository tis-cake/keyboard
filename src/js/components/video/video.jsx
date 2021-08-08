import React, { useRef, useEffect } from 'react';

import { KeyCode } from '../../const';

const VOLUME_STEP = 0.1;
const VOLUME_MAX = 1;
const VOLUME_MIN = 0;

function Video() {
  const videoRef = useRef(null);

  const handleVideoPlayerClick = () => {
    const videoEl = videoRef.current;

    if (videoEl.paused) {
      videoEl.play();
    } else {
      videoEl.pause();
    }
  };

  const handleWindowKeyPress = (evt) => {
    if ((evt.keyCode === KeyCode.ENTER || evt.keyCode === KeyCode.SPACE) && evt.target.tagName !== 'BUTTON') {
      evt.preventDefault();
      handleVideoPlayerClick();
    }

    if (evt.keyCode === KeyCode.ARROW_UP) {
      evt.preventDefault();
      if (videoRef.current.volume >= VOLUME_MAX) {
        return;
      }

      videoRef.current.volume += VOLUME_STEP;
    }

    if (evt.keyCode === KeyCode.ARROW_DOWN) {
      evt.preventDefault();
      if (videoRef.current.volume < VOLUME_MIN) {
        return;
      }

      videoRef.current.volume -= VOLUME_STEP;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleWindowKeyPress);
    return () => { window.removeEventListener('keydown', handleWindowKeyPress); };
  }, []);

  return (
    <video
      className="hero__video video"
      preload="metadata"
      webkit-playsinline="true"
      playsInline
      loop
      ref={videoRef}
      onClick={handleVideoPlayerClick}
      // autoPlay
      // muted="muted"
    >
      <source src="assets/video/test.mp4" type="video/mp4" />
      <source src="assets/video/test.ogv" type="video/ogg; codecs='theora, vorbis'" />
      <source src="assets/video/test.webm" type="video/webm" />
    </video>
  );
}

export { Video };
