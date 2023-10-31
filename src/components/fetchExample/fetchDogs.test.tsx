import React, { render, act, screen } from '@testing-library/react';
import FetchDogs from './fetchDogs';
import { jest } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';

/**
1. Import the module you want to mock into your test file.
2. jest.mock() the module. jest.mock() used to replace the implementation of an entire module or dependency with a mocked version. This is typically used to isolate the code you're testing from external dependencies
3. Use .mockResolvedValue(<mocked response>) to mock the response.
 
jest.spyOn: It is used to create a spy on an individual function or method within an object. Spies allow you to track function calls and behavior while still executing the original function.
 when you want to observe and control the behavior of specific functions or methods within your code
 */


const catsData = [{
  text: 'Owning a cat can reduce the risk of stroke and heart attack by a third.',
  source: 'user',
  type: 'cat',
  used: false,
}, {
  text: 'The frequency of a domestic cat\'s purr is the same at which muscles and bones repair themselves.',
  source: 'user',
  type: 'cat',
  used: false,
}];

const apiUrl = 'https://cat-fact.herokuapp.com/facts/';
(global as any).fetch = jest.fn();


describe('FetchDogs', () => {

  it('should data is fetching', async () => {
    const response: unknown = {
      json: () => { return catsData },
      status: 200,
      statusText: 'OK',
      ok: true,
      headers: { 'Content-type': 'application/json' },
    };

    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce(response as Response);
    let component: any;
    await act(async () => {
      component = render(<FetchDogs />);
    });
    expect(component.getByText('Fetch Data Example')).toBeInTheDocument();
    expect(component.getByText('Owning a cat can reduce the risk of stroke and heart attack by a third.')).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledWith(apiUrl);
  });

  it('error in data fetching', async () => {
    const response: unknown = {
      json: () => { return {} },
      status: 200,
      statusText: 'OK',
      ok: false,
      headers: { 'Content-type': 'application/json' },
    };
    const consoleErrorSpy = jest.spyOn(console, 'log');
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce(response as Response);
    let component: any;
    await act(async () => {
      component = render(<FetchDogs />);
    });
    expect(component.getByText('Fetch Data Example')).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledWith(apiUrl);
    expect(consoleErrorSpy).toHaveBeenCalledWith('There was a problem fetching the data:');

  });
});