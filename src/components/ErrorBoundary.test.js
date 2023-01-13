import { render, screen } from "@testing-library/react";

import { ErrorBoundary } from "./ErrorBoundary";

describe('ErrorBoundary', () => {
  it('should match snapshot', () => {
    const { container } = render(<ErrorBoundary>Hello World</ErrorBoundary>);
    expect(container).toMatchSnapshot();
  });

  it('should display generic error if caught', async () => {
    const Component = () => {
      throw new Error();
    }
    render(
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error-boundary')).not.toBeNull();
  });
});