import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { SWRConfig } from 'swr';

import { SignUpProvider } from '../hooks/useSignUp';
import { SuccessPage } from "./SuccessPage";

const App = ({ name, email, password, color, terms }) => {
  const router = createMemoryRouter([{
    path: "/",
    element: <div data-testid="root" />,
  }, {
    path: '/success',
    element: <SuccessPage />,
  }], {
    initialEntries: ['/', '/success'],
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

describe("SuccessPage", () => {
  it("should render without crashing", async () => {
    render(<App name="Foo" email="foo@bar.com" password="123qwe!!" color="red" terms={ true } />);

    await act(async () => {
      const found = await screen.findAllByTestId('success-title');
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