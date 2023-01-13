import { render, screen } from "@testing-library/react";
import { useEffect } from "react";

import { SignUpProvider, useSignUp } from './useSignUp';

const Wrapper = ({ children }) => (
  <SignUpProvider name="Foo" email="foo@bar.com" password="123qwe!!" color="black" terms={ true }>
    { children }
  </SignUpProvider>
);

describe('useSignUp', () => {
  it('should support initial data', () => {
    expect.assertions(5);

    const Component = () => {
      const { name, email, password, color, terms } = useSignUp();

      expect(name).toBe('Foo');
      expect(email).toBe('foo@bar.com');
      expect(password).toBe('123qwe!!');
      expect(color).toBe('black');
      expect(terms).toBe(true);
    };

    render(<Component />, { wrapper: Wrapper });
  });

  it('should support updating data', async () => {
    const Component = () => {
      const { name, setName, email, setEmail, password, setPassword, color, setColor, terms, setTerms } = useSignUp();

      useEffect(() => {
        setName('Dylan');
        setEmail('dylan@dstanfield.com');
        setPassword('dylanpw'),
        setColor('red');
        setTerms(false);
      });

      return (
        <>
          <div>{ name }</div>
          <div>{ email }</div>
          <div>{ password }</div>
          <div>{ color }</div>
          <div>{ terms + '' }</div>
        </>
      )
    };

    render(<Component />, { wrapper: Wrapper });

    expect(await screen.findByText('Dylan')).not.toBeNull();
    expect(await screen.findByText('dylan@dstanfield.com')).not.toBeNull();
    expect(await screen.findByText('dylanpw')).not.toBeNull();
    expect(await screen.findByText('red')).not.toBeNull();
    expect(await screen.findByText('false')).not.toBeNull();
  });
});