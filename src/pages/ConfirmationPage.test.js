import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { SWRConfig } from 'swr';

import { SignUpProvider } from '../hooks/useSignUp';
import { ConfirmationPage } from "./ConfirmationPage";

const App = ({ name, email, password, color, terms }) => {
  const router = createMemoryRouter([{
    path: "/",
    element: <div data-testid="root" />,
  }, {
    path: '/confirmation',
    element: <ConfirmationPage />,
  }, {
    path: '/error',
    element: <div data-testid="error" />,
  }, {
    path: '/success',
    element: <div data-testid="success" />,
  }], {
    initialEntries: ['/', '/confirmation'],
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

describe("ConfirmationPage", () => {
  it("should render without crashing", async () => {
    render(<App name="Foo" email="foo@bar.com" password="123qwe!!" color="red" terms={ true } />);

    await act(async () => {
      const found = await screen.findAllByTestId('confirmation-title');
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

  it("should navigate to success", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ status: 200 });
  
    render(<App name="Foo" email="foo@bar.com" password="123qwe!!" color="red" terms={ true } />);

    await UserEvent.click(await screen.findByTestId('submit-button'));
    const found = await screen.findAllByTestId('success');

    expect(found.length).toBe(1);
  });

  it("should navigate to error", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ status: 400 });
  
    render(<App name="Foo" email="foo@bar.com" password="123qwe!!" color="red" terms={ true } />);

    await UserEvent.click(await screen.findByTestId('submit-button'));
    const found = await screen.findAllByTestId('error');

    expect(found.length).toBe(1);
  });
});