import { getByLabelText, getByRole, render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { SWRConfig } from 'swr';

import { SignUpProvider } from '../hooks/useSignUp';
import { SignUpPage } from "./SignUpPage";

const App = ({ name, email, password }) => {
  const router = createMemoryRouter([{
    path: "/",
    element: <SignUpPage />,
  }, {
    path: "/more-info",
    element: <div data-testid="more-info" />,
  }], {
    initialEntries: ['/'],
    initialIndex: 0,
  });

  return (
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      <SignUpProvider name={ name } email={ email } password={ password }>
        <RouterProvider router={ router } />
      </SignUpProvider>
    </SWRConfig>
  );
};

describe("SignUpPage", () => {
  it("should render without crashing", async () => {
    render(<App />);

    await act(async () => {
      const found = await screen.findAllByTestId('sign-up-title');
      expect(found.length).toBe(1);
    });
  });

  it("should update name error on blur", async () => {
    render(<App />);

    await UserEvent.click(await screen.findByTestId('next-button'));
    const text1 = await screen.findByText('Your name is required.', {}, { timeout: 2000 });

    expect(text1).not.toBeNull();

    await UserEvent.type(screen.getByLabelText('First Name'), Array.from({ length: 101 }, () => 'a').join(''));
    await UserEvent.click(await screen.findByTestId('next-button'));
    const text2 = await screen.findByText('Unfortunately we only support names less than 100 characters.', {}, { timeout: 2000 });

    expect(text2).not.toBeNull();
  });

  it("should have empty name error on blur if name is valid", async () => {
    render(<App />);

    await UserEvent.type(screen.getByLabelText('First Name'), 'Dylan');
    await UserEvent.click(await screen.findByTestId('next-button'));
    const text = screen.queryByText('Unfortunately we only support names less than 100 characters.', {}, { timeout: 2000 });

    expect(text).toBeNull();
  });

  it("should update email error on blur", async () => {
    render(<App />);

    await UserEvent.click(await screen.findByTestId('next-button'));
    const text1 = await screen.findByText('Your email is required.', {}, { timeout: 2000 });

    expect(text1).not.toBeNull();

    await UserEvent.type(screen.getByLabelText('Email'), 'not an email');
    await UserEvent.click(await screen.findByTestId('next-button'));
    const text2 = await screen.findByText('Please enter a valid email.', {}, { timeout: 2000 });

    expect(text2).not.toBeNull();
  });

  it("should have empty email error on blur if name is valid", async () => {
    render(<App />);

    await UserEvent.type(screen.getByLabelText('Email'), 'dylan@dstanfield.com');
    await UserEvent.click(await screen.findByTestId('next-button'));
    const text = screen.queryByText('Please enter a valid email.', {}, { timeout: 2000 });

    expect(text).toBeNull();
  });

  it("should update password error on blur", async () => {
    render(<App />);

    await UserEvent.click(await screen.findByTestId('next-button'));
    const text1 = await screen.findByText('A password is required.', {}, { timeout: 2000 });

    expect(text1).not.toBeNull();

    await UserEvent.type(screen.getByLabelText('Password'), 'abc');
    await UserEvent.click(await screen.findByTestId('next-button'));
    const text2 = await screen.findByText('Your password should include at least 8 characters, a number, a letter, and a special character.', {}, { timeout: 2000 });

    expect(text2).not.toBeNull();
  });

  it("should have empty password error on blur if name is valid", async () => {
    render(<App />);

    await UserEvent.type(screen.getByLabelText('Password'), 'abc123!!');
    await UserEvent.click(await screen.findByTestId('next-button'));
    const text = screen.queryByText('Your password should include at least 8 characters, a number, a letter, and a special character.', {}, { timeout: 2000 });

    expect(text).toBeNull();
  });

  it("should navigate to additional info if state is valid", async () => {
    render(<App name="Foo" email="foo@bar.com" password="123qwe!!" />);

    await UserEvent.click(await screen.findByTestId('next-button'));
    const found = await screen.findAllByTestId('more-info');

    expect(found.length).toBe(1);
  });
});