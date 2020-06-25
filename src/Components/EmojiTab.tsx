import React, { useEffect, useState } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { useGlobalState, useSetGlobaleState } from '../Store';
import { useClipboard } from 'use-clipboard-copy';
const { remote } = window.require('electron');
const EmojiTab = () => {
  const [state, setState] = [useGlobalState(), useSetGlobaleState()];
  const [emojis, setEmojis] = useState<any>([]);
  const clipboard = useClipboard();
  const handleEsc = (event: any) => {
    if (event.keyCode === 27) {
      const currentWindow = remote.getCurrentWindow();

      currentWindow.close();
    }
  };
  const handleSelect = (emoji: any) => {
    setEmojis([...emojis, emoji.native]);
    clipboard.copy(emojis.join(''));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc, false);

    return () => {
      document.removeEventListener('keydown', handleEsc, false);
    };
  }, []);

  return (
    <div className="">
      <Picker
        set={state.set}
        theme={state.darkMode ? 'dark' : 'light'}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default EmojiTab;
