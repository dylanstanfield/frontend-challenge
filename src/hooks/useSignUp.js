import React, { createContext, useState, useContext } from "react";

const SignUpContext = createContext({});

export const SignUpProvider = ({
  children,
  name: initialName,
  email: initialEmail,
  password: initialPassword,
  color: initialColor,
  terms: initialTerms,
}) => {
  const [ name, setName ] = useState(initialName ?? '');
  const [ email, setEmail ] = useState(initialEmail ?? '');
  const [ password, setPassword ] = useState(initialPassword ?? '');
  const [ color, setColor ] = useState(initialColor ?? '');
  const [ terms, setTerms ] = useState(!!initialTerms);

  return (
    <SignUpContext.Provider value={{
      name,
      setName,
      email,
      setEmail,
      password,
      setPassword,
      color,
      setColor,
      terms,
      setTerms,
    }}>
      { children }
    </SignUpContext.Provider>
  );
};

export const useSignUp = () => {
  const state = useContext(SignUpContext);
  return state;
};