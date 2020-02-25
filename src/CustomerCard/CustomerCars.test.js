import React from 'react';
import { render } from '@testing-library/react';
import CustomerCard from './CustomerCard';

test('display a div', () => {
  const {container} = render(<CustomerCard />);
  let wrapper = container.querySelector('.card');

  expect(wrapper).toBeInTheDocument();
})
