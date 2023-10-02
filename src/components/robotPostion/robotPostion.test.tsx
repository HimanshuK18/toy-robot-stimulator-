import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RobotPosition from './robotPostion';
import { RobotContext } from '../../state/robotState';

describe('RobotPosition Component', () => {
  it('renders with initial values', () => {
    const mockContextValue = {
      currentPosition: { XPosition: 0, YPosition: 0 },
      dispatch: jest.fn()
    };
    jest.spyOn(React, 'useContext').mockReturnValue(mockContextValue);

    const { getByLabelText, getByText } = render(<RobotPosition />);
    const xInput = getByLabelText('X Value:');
    const yInput = getByLabelText('Y Value:');
    const setUserPositionButton = getByText('Set Robot Position');
    const resetPositionButton = getByText('Reset Position');

    expect(xInput).toBeTruthy();
    expect(yInput).toBeTruthy();
    expect(setUserPositionButton).toBeTruthy();
    expect(resetPositionButton).toBeTruthy();
  });

  it('handles user input and form submission', async () => {
    const mockDispatch = jest.fn();
    const mockContextValue = {
      currentPosition: { XPosition: 0, YPosition: 0 },
      dispatch: mockDispatch
    };
    jest.spyOn(React, 'useContext').mockReturnValue(mockContextValue);

    const { getByTestId, getByText } = render(
      <RobotContext.Provider value={mockContextValue}>
        <RobotPosition />
      </RobotContext.Provider>
    );
   
    const xInput = getByTestId('xInput-input') as HTMLInputElement;
    const yInput = getByTestId('yInput-input') as HTMLInputElement;
    
    fireEvent.change(xInput, { target: { value: '2' } });
    fireEvent.change(yInput, { target: { value: '3' } });
    
    expect(xInput).toHaveValue(2);
    expect(yInput).toHaveValue(3);
    const setUserPositionButton = getByTestId('Button-Position');
    const resetPositionButton = getByTestId('Button-Reset');

    fireEvent.click(setUserPositionButton);
    expect(mockDispatch).toHaveBeenCalled();

    fireEvent.click(resetPositionButton);
    expect(mockDispatch).toHaveBeenCalled();

  });
});
