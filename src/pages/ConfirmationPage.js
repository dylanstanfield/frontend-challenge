import { Typography, Box, Link, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useSignUp } from '../hooks/useSignUp';
import { Layout } from "../components/Layout";
import { Button } from '../components/Button';
import { ContentWrapper } from '../components/ContentWrapper';
import { usePreventDirectNavigation } from "../hooks/usePreventDirectNavigation";
import { useState } from "react";

const ConfirmationField = ({ label, value, capitalize }) => (
  <Box display="flex" justifyContent="space-between">
    <Typography sx={{ fontWeight: 800 }}>{ label }</Typography>
    <Typography sx={{ textTransform: capitalize ? 'capitalize' : 'none' }}>{ value }</Typography>
  </Box>
);

export const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { name, email, password, color, terms } = useSignUp();
  usePreventDirectNavigation(['name', 'email', 'password', 'color', 'terms']);

  const [ submitting, setSubmitting ] = useState(false);

  const onSubmit = async () => {
    setSubmitting(true);

    const response = await fetch('http://localhost:3001/api/submit', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, color, terms }),
    });

    if (response.status < 300) {
      navigate('/success');
    } else if (response.status >= 400) {
      navigate('/error');
    }

    setSubmitting(false);
  };

  return (
    <Layout>
      <ContentWrapper>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography data-testid="confirmation-title" variant="h4" component="h1">Confirmation</Typography>
          <Typography>Let&apos;s just double check your information.</Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          <ConfirmationField
            label="First Name"
            value={ name }
          />
          <ConfirmationField
            label="Email"
            value={ email.toLowerCase() }
          />
          <ConfirmationField
            label="Password"
            value={ new Array(password.length + 1).join('*') }
          />
          <ConfirmationField
            capitalize
            label="Favorite Color"
            value={ color }
          />
          <ConfirmationField
            label="Terms & Conditions"
            value="Agreed"
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={1.5}>
          <Button
            testId="submit-button"
            disabled={ submitting }
            onClick={ onSubmit }
            color="primary"
          >
            { submitting ? <CircularProgress size={ 26 } /> : 'Submit' }
          </Button>
          <Button onClick={ () => navigate('/more-info') } color="info">Back</Button>
          <Typography>Already have an account? <Link href="https://en.wikipedia.org/w/index.php?title=Special:UserLogin&returnto=Terms+of+service">Log In</Link></Typography>
        </Box>
      </ContentWrapper>
    </Layout>
  );
};