import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const app = screen.getByTestId('app');
  expect(app).not.toBeNull();
});
