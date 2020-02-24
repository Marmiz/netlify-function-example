import React from 'react';
import { render, wait } from '@testing-library/react';
import App from './App';

test('renders a loader', async () => {
  const { getByText } = render(<App />);
  const loadingElement = getByText(/loading/i);
  expect(loadingElement).toBeInTheDocument();
});
