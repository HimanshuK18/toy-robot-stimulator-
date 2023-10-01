import React, { type ReactNode, createContext, useReducer, type Dispatch } from 'react';
import { type RobotPosition } from '../config/constants';

export type Action =
  | { type: 'save', newPostion: RobotPosition }
  | { type: 'reset' };

interface ContextType {
  currentPosition: RobotPosition
  dispatch: Dispatch<Action>
}
const initialState: RobotPosition = { XPosition: -1, YPosition: -1 };

const robotPositionReducer = (state: RobotPosition, action: Action): RobotPosition => {
  switch (action.type) {
    case 'save':
      return { ...action.newPostion };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};
export const RobotContext = createContext<ContextType>({
  currentPosition: initialState,
  dispatch: () => { return initialState }
});

export const RobotPositionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPosition, dispatch] = useReducer(robotPositionReducer, initialState);
  return (
    <RobotContext.Provider value={{ currentPosition, dispatch }}>
      {children}
    </RobotContext.Provider>
  );
};
