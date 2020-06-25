import React from 'react';
import GlobalInterface from './interfaces/GlobalInterface';
const electronStore = window.require('electron-store');
const config = new electronStore();
const StateContext = React.createContext<GlobalInterface | undefined>(undefined);
const SetStateContext = React.createContext<any | undefined>(undefined);

if (!config.get('xmoji')) config.set('xmoji', { set: 'apple', darkMode: true, startup: true });

export const useGlobalState = () => {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
};
export const useSetGlobaleState = () => {
  const context = React.useContext(SetStateContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
};
export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = React.useState(config.get('xmoji'));
  React.useEffect(() => {
    config.set('xmoji', state);
  }, [state]);
  return (
    <StateContext.Provider value={state}>
      <SetStateContext.Provider value={setState}>{children}</SetStateContext.Provider>
    </StateContext.Provider>
  );
};
