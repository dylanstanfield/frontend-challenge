import { useState } from 'react';
import { Typography, TextField, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useSignUp } from "../hooks/useSignUp";
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { ContentWrapper } from '../components/ContentWrapper';
import { isValidName, isValidEmail, isValidPassword } from '../validators';

export const SignUpPage = () => {
  const navigate = useNavigate();

  const { name, setName, email, setEmail, password, setPassword } = useSignUp();
  const [ nameError, setNameError ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');

  const updateNameError = (newName) => {
    if (!newName) {
      setNameError('Your name is required.');
    } else if (!isValidName(newName)) {
      setNameError('Unfortunately we only support names less than 100 characters.');
    } else {
      setNameError('');
    }
  };

  const updateEmailError = (newEmail) => {
    if (!newEmail) {
      setEmailError('Your email is required.');
    } else if (!isValidEmail(newEmail)) {
      setEmailError('Please enter a valid email.');
    } else {
      setEmailError('');
    }
  };

  const updatePasswordError = (newPassword) => {
    if (!newPassword) {
      setPasswordError('A password is required.');
    } else if (!isValidPassword(newPassword)) {
      setPasswordError('Your password should include at least 8 characters, a number, a letter, and a special character.');
    } else {
      setPasswordError('');
    }
  };

  const onNext = () => {
    const nameValid = name && isValidName(name);
    const emailValid = email && isValidEmail(email);
    const passwordValid = password && isValidPassword(password);

    if (nameValid && emailValid && passwordValid) {
      navigate('/more-info');
    } else {
      updateNameError(name);
      updateEmailError(email);
      updatePasswordError(password);
    }
  };

  return (
    <Layout>
      <ContentWrapper>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography data-testid="sign-up-title" variant="h4" component="h1">Sign Up</Typography>
          <Typography>Welcome in, please provide your details.</Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            inputProps={{ 'aria-label': 'First Name' }}
            value={ name }
            onChange={ (e) => { setName(e.target.value); setNameError(''); } }
            onBlur={ (e) => updateNameError(e.target.value) }
            fullWidth
            label="First Name"
            helperText={ nameError }
            error={ !!nameError }
          />
          <TextField
            value={ email }
            onChange={ (e) => { setEmail(e.target.value); setEmailError(''); } }
            onBlur={ (e) => updateEmailError(e.target.value) }
            fullWidth
            label="Email"
            helperText={ emailError }
            error={ !!emailError }
          />
          <TextField
            value={ password }
            onChange={ (e) => { setPassword(e.target.value); setPasswordError(''); } }
            onBlur={ (e) => updatePasswordError(e.target.value) }
            fullWidth
            label="Password"
            type="password"
            helperText={ passwordError }
            error={ !!passwordError }
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={3}>
          <Button testId="next-button" onClick={ onNext } color="primary">Next</Button>
          <Typography>Already have an account? <Link href="https://en.wikipedia.org/w/index.php?title=Special:UserLogin&returnto=Terms+of+service">Log In</Link></Typography>
        </Box>
      </ContentWrapper>
    </Layout>
  )
};