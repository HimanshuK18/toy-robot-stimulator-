import React from 'react';
import { render, act } from '@testing-library/react';
import { RobotPositionProvider, RobotContext } from './robotState';
describe('RobotPositionProvider', () => {
  it('should render the provider and provide the initial state', () => {
    let component;
    act(() => {
      component = render(
        <RobotPositionProvider>
          <RobotContext.Consumer>
            {({ currentPosition }) => (
              <div data-testid="position">{currentPosition.XPosition}, {currentPosition.YPosition}</div>
            )}
          </RobotContext.Consumer>
        </RobotPositionProvider>
      );
    });

    const positionElement = component.getByTestId('position');
    expect(positionElement.textContent).toBe('-1, -1');
  });

  it('should update the context when dispatch is called', () => {
    let component;
    act(() => {
      component = render(
        <RobotPositionProvider>
          <RobotContext.Consumer>
            {({ currentPosition, dispatch }) => (
              <div>
                <div data-testid="position">{currentPosition.XPosition}, {currentPosition.YPosition}</div>
                <button data-testid="dispatch-button" onClick={() => dispatch({ type: 'save', newPostion: { XPosition: 1, YPosition: 2 } })}>Update</button>
              </div>
            )}
          </RobotContext.Consumer>
        </RobotPositionProvider>
      );
    });

    const positionElement = component.getByTestId('position');
    const dispatchButton = component.getByTestId('dispatch-button');

    expect(positionElement.textContent).toBe('-1, -1');

    act(() => {
      dispatchButton.click();
    });

    expect(positionElement.textContent).toBe('1, 2');
  });
});
