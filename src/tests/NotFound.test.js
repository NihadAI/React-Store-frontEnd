import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('NotFound component', () => {
  test('renders correctly', () => {
    const { getByText } = render(<NotFound />);
    const heading = getByText('404');
    const message = getByText('Page not found');
    expect(heading).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
});
