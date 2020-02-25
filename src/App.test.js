import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from './App'

afterEach(() => {
  jest.resetAllMocks()
})

  test('loads some data on mount while showing a loader', async () => {
    const fakeResponse = {data: [{ ref:{'@ref':{id: 1}}}, {ref: {'@ref': {id:2}}}, {ref: {'@ref': {id: 3}}}] };

    jest.spyOn(window, "fetch").mockImplementation(() => {
      const fetchResponse = {
        json: () => Promise.resolve(fakeResponse)
      };
      return Promise.resolve(fetchResponse);
    });

    const { getAllByText, getByText} = render(<App />);
    // verify display loader
    const loader = getByText(/loading/i);
    expect(loader).toBeInTheDocument();
    // after async callback verify that the DOM updated
    let c = await waitForElement(() => getAllByText('customer'));
    expect(c.length).toBe(3)
  })

