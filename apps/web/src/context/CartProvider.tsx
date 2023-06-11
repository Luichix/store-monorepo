import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import reducer, { State, Action, initialState } from '@/utils/reducer';

type ContextType = [State, React.Dispatch<Action>];

// Prepares the dataLayer
export const StateContext = createContext<ContextType>([
  initialState,
  () => {},
]);

// Wrap our app and provide the Data layer
export const StateProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);
