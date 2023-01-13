import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isValidEmail, isValidName, isValidPassword } from "../validators";
import { useSignUp } from './useSignUp';

export const usePreventDirectNavigation = (required) => {
  const navigate = useNavigate();
  const { name, email, password, color, terms } = useSignUp();

  useEffect(() => {
    if (
      required.includes('name') && (!name || !isValidName(name)) ||
      required.includes('email') && (!email || !isValidEmail(email)) ||
      required.includes('password') && (!password || !isValidPassword(password)) ||
      required.includes('color') && !color ||
      required.includes('terms') && !terms
     ) {
      navigate('/');
    }
  });
}