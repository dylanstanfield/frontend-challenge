import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { SWRConfig } from 'swr';

import { SignUpProvider } from '../hooks/useSignUp';
import { AdditionalInfoPage } from "./AdditionalInfoPage";

const App = ({ name, email, password, color, terms }) => {
  const router = createMemoryRouter([{
    path: "/",
    element: <div data-testid="root" />,
  }, {
    path: '/more-info',
    element: <AdditionalInfoPage />,
  }, {
    path: '/error',
    element: <div data-testid="error" />,
  }, {
    path: '/confirmation',
    element: <div data-testid="confirmation" />,
  }], {
    initialEntries: ['/', '/more-info'],
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

describe("AdditionalInfoPage", () => {
  it("should render without crashing", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(['red']),
    });

    render(<App name="Foo" email="foo@bar.com" password="123qwe!!" />);

    await act(async () => {
      const found = await screen.findAllByTestId('additional-info-title');
      expect(found.length).toBe(1);
    });
  });

  it("should redirect to root if valid state does not exist", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(['red']),
    });

    render(<App />);

    await act(async () => {
      const found = await screen.findAllByTestId('root');
      expect(found.length).toBe(1);
    });
  });

  it("should redirect to error if color call fails", async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue({ err: true });

    render(<App name="Foo" email="foo@bar.com" password="123qwe!!" />);

    const found = await screen.findAllByTestId('error');
    expect(found.length).toBe(1);
  });

  it("should update color error on blur", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(['red']),
    });
  
    render(<App name="Foo" email="foo@bar.com" password="123qwe!!" />);

    await UserEvent.click(await screen.findByTestId('next-button'));
    const text = await screen.findByText('Your favorite color is required.', {}, { timeout: 2000 });

    expect(text).not.toBeNull();
  });

  it("should have empty color error on blur if color is valid", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(['red']),
    });
  
    render(<App name="Foo" email="foo@bar.com" password="123qwe!!" color="red" />);

    await UserEvent.click(await screen.findByTestId('next-button'));
    const text = screen.queryByText('Your favorite color is required.', {}, { timeout: 2000 });

    expect(text).toBeNull();
  });

  it("should update terms error on blur", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(['red']),
    });
  
    render(<App name="Foo" email="foo@bar.com" password="123qwe!!" />);

    await UserEvent.click(await screen.findByTestId('next-button'));
    const text = await screen.findByText('You must agree to terms and conditions.', {}, { timeout: 2000 });

    expect(text).not.toBeNull();
  });

  it("should have empty terms error on blur if terms are accepted", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(['red']),
    });
  
    render(<App name="Foo" email="foo@bar.com" password="123qwe!!" terms={ true } />);

    await UserEvent.click(await screen.findByTestId('next-button'));
    const text = screen.queryByText('You must agree to terms and conditions.', {}, { timeout: 2000 });

    expect(text).toBeNull();
  });

  it("should navigate to confirmation if state is valid", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(['red']),
    });

    render(<App name="Foo" email="foo@bar.com" password="123qwe!!" color="red" terms={ true } />);

    await UserEvent.click(await screen.findByTestId('next-button'));
    const found = await screen.findAllByTestId('confirmation');

    expect(found.length).toBe(1);
  });
});