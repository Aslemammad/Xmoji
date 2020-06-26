import React from 'react';
import GlobalInterface from './interfaces/GlobalInterface';
const electronStore = window.require('electron-store');
const path = window.require('path');
const startup = window.require('user-startup');

const execPath = `${path.join(path.resolve(), '/node_modules/.bin/electron')}`;
const execArgs = [`${path.join(path.resolve(), '/build/electron.js')}`];
const config = new electronStore();

const StateContext = React.createContext<GlobalInterface | undefined>(undefined);
const SetStateContext = React.createContext<any | undefined>(undefined);

if (!config.get('xmoji')) config.set('xmoji', { set: 'apple', darkMode: true, startup: true });

export const useGlobalState = () => {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a Provider');
  }
  return context;
};
export const useSetGlobaleState = () => {
  const context = React.useContext(SetStateContext);
  if (context === undefined) {
    throw new Error('useSetGlobalState must be used within a Provider');
  }
  return context;
};
export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = React.useState(config.get('xmoji'));
  React.useEffect(() => {
    config.set('xmoji', state);

    if (state.startup) {
      startup.add('Xmoji', execPath, execArgs);
    } else if (!state.startup) {
      startup.remove('Xmoji');
    }
  }, [state]);
  return (
    <StateContext.Provider value={state}>
      <SetStateContext.Provider value={setState}>{children}</SetStateContext.Provider>
    </StateContext.Provider>
  );
};
