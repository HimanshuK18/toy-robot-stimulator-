import React, { createContext, useContext, useReducer } from 'react';

// Create a context for the toy factory
interface ToyFactoryContextType {
  toys: string[]
  makeToy: (name: string) => void
  customizeToy: (index: number, color: string) => void
}

const ToyFactoryContext = createContext<ToyFactoryContextType | undefined>(
  undefined
);

// Define the initial state and reducer for toy factory
type Action = { type: 'MAKE_TOY', name: string } | { type: 'CUSTOMIZE_TOY', index: number, color: string };

const toyFactoryReducer = (state: string[], action: Action): string[] => {
  switch (action.type) {
    case 'MAKE_TOY':
      return [...state, action.name];
    case 'CUSTOMIZE_TOY':
      // eslint-disable-next-line no-case-declarations
      const newState = [...state];
      newState[action.index] = action.color;
      return newState;
    default:
      return state;
  }
};

// Create the ToyFactoryProvider component
export const ToyFactoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toys, dispatch] = useReducer(toyFactoryReducer, []);

  const makeToy = (name: string): void => {
    dispatch({ type: 'MAKE_TOY', name });
  };

  const customizeToy = (index: number, color: string): void => {
    dispatch({ type: 'CUSTOMIZE_TOY', index, color });
  };

  return (
    <ToyFactoryContext.Provider value={{ toys, makeToy, customizeToy }}>
      {children}
    </ToyFactoryContext.Provider>
  );
};

// Custom hook to access the toy factory context
export const useToyFactory = (): ToyFactoryContextType => {
  const context = useContext(ToyFactoryContext);
  if (context === undefined) {
    throw new Error('useToyFactory must be used within a ToyFactoryProvider');
  }
  return context;
};
