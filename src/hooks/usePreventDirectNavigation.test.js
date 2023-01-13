import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { SignUpProvider } from "./useSignUp";
import { usePreventDirectNavigation } from './usePreventDirectNavigation';

const Component = ({ required, name, email, password, color, terms }) => {
  const Foo = () => {
    usePreventDirectNavigation(required);
    return <div data-testid="foo" />;
  };

  const router = createMemoryRouter([{
    path: "/",
    element: <div data-testid="root" />,
  }, {
    path: '/foo',
    element: <Foo />,
  }], {
    initialEntries: ['/', '/foo'],
    initialIndex: 1,
  });

  return (
    <SignUpProvider name={ name } email={ email } password={ password } color={ color } terms={ terms }>
      <RouterProvider router={ router } />
    </SignUpProvider>
  );
};

describe("usePreventDirectNavigation", () => {
  it("should not redirect if required list is empty", async () => {
    render(<Component required={[]} />);

    const found = await screen.findAllByTestId('foo');

    expect(found.length).toBe(1);
  });

  // Name

  it("should redirect if name is missing and is a required property", async () => {
    render(<Component required={['name']} />);

    const found = await screen.findAllByTestId('root');

    expect(found.length).toBe(1);
  });

  it("should not redirect if name is valid and required", async () => {
    render(<Component required={['name']} name={ 'Dylan' } />);

    const found = await screen.findAllByTestId('foo');

    expect(found.length).toBe(1);
  });

  // Email

  it("should redirect if email is missing and is a required property", async () => {
    render(<Component required={['email']} />);

    const found = await screen.findAllByTestId('root');

    expect(found.length).toBe(1);
  });

  it("should not redirect if email is valid and required", async () => {
    render(<Component required={['email']} email={ 'dylan@dstanfield.com' } />);

    const found = await screen.findAllByTestId('foo');

    expect(found.length).toBe(1);
  });

  // Password

  it("should redirect if password is missing and is a required property", async () => {
    render(<Component required={['password']} />);

    const found = await screen.findAllByTestId('root');

    expect(found.length).toBe(1);
  });

  it("should not redirect if password is valid and required", async () => {
    render(<Component required={['password']} password={ '123qwe!!' } />);

    const found = await screen.findAllByTestId('foo');

    expect(found.length).toBe(1);
  });

  // Color

  it("should redirect if color is missing and is a required property", async () => {
    render(<Component required={['color']} />);

    const found = await screen.findAllByTestId('root');

    expect(found.length).toBe(1);
  });

  it("should not redirect if color is valid and required", async () => {
    render(<Component required={['color']} color={ 'black' } />);

    const found = await screen.findAllByTestId('foo');

    expect(found.length).toBe(1);
  });

  // Terms

  it("should redirect if terms is missing and is a required property", async () => {
    render(<Component required={['terms']} />);

    const found = await screen.findAllByTestId('root');

    expect(found.length).toBe(1);
  });

  it("should not redirect if terms is valid and required", async () => {
    render(<Component required={['terms']} terms={ true } />);

    const found = await screen.findAllByTestId('foo');

    expect(found.length).toBe(1);
  });
});