import { Typography, Box, Link } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from "react-router-dom";

import { Layout } from "../components/Layout";
import { Button } from '../components/Button';
import { ContentWrapper } from '../components/ContentWrapper';
import { usePreventDirectNavigation } from "../hooks/usePreventDirectNavigation";

export const ErrorPage = () => {
  const navigate = useNavigate();
  usePreventDirectNavigation(['name', 'email', 'password']);

  return (
    <Layout>
      <ContentWrapper>
        <Box display="flex" flexDirection="column" gap={1}>
          <Box display="flex" alignItems="center">
            <ErrorIcon fontSize="large" />
            &nbsp;&nbsp;
            <Typography data-testid="error-title" variant="h4" component="h1">Error</Typography>
          </Box>
          <Typography>Uh oh, something went wrong. Please try again later.</Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={1.5}>
          <Button onClick={ () => navigate('/') } color="info">Restart</Button>
          <Typography>Already have an account? <Link href="https://en.wikipedia.org/w/index.php?title=Special:UserLogin&returnto=Terms+of+service">Log In</Link></Typography>
        </Box>
      </ContentWrapper>
    </Layout>
  );
};