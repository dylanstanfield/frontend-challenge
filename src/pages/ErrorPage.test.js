import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { SWRConfig } from 'swr';

import { SignUpProvider } from '../hooks/useSignUp';
import { ErrorPage } from "./ErrorPage";

const App = ({ name, email, password, color, terms }) => {
  const router = createMemoryRouter([{
    path: "/",
    element: <div data-testid="root" />,
  }, {
    path: '/error',
    element: <ErrorPage />,
  }], {
    initialEntries: ['/', '/error'],
    initialIndex: 1,
  });

  return (
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      <SignUpProvider name={ name } email={ email } password={ password } color={ color } terms={ terms }>
        <RouterProvider router={ router } />
      </SignUpProvider>
    </SWRConfig>
  );
};

describe("ErrorPage", () => {
  it("should render without crashing", async () => {
    render(<App name="Foo" email="foo@bar.com" password="123qwe!!" />);

    await act(async () => {
      const found = await screen.findAllByTestId('error-title');
      expect(found.length).toBe(1);
    });
  });

  it("should redirect to root if valid state does not exist", async () => {
    render(<App />);

    await act(async () => {
      const found = await screen.findAllByTestId('root');

      expect(found.length).toBe(1);
    });
  });
});