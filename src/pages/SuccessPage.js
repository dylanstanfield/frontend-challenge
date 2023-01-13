import { Typography, Box, Link } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from "react-router-dom";

import { Layout } from "../components/Layout";
import { Button } from '../components/Button';
import { ContentWrapper } from '../components/ContentWrapper';
import { usePreventDirectNavigation } from "../hooks/usePreventDirectNavigation";

export const SuccessPage = () => {
  const navigate = useNavigate();
  usePreventDirectNavigation(['name', 'email', 'password', 'color', 'terms']);

  return (
    <Layout>
      <ContentWrapper>
        <Box display="flex" flexDirection="column" gap={1}>
          <Box display="flex" alignItems="center">
            <CheckCircleIcon fontSize="large" />
            &nbsp;&nbsp;
            <Typography data-testid="success-title" variant="h4" component="h1">Success</Typography>
          </Box>
          <Typography>Your account has been created! You should recieve an email confirmation soon.</Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={1.5}>
          <Button onClick={ () => navigate('/') } color="info">Restart</Button>
          <Typography>Already have an account? <Link href="https://en.wikipedia.org/w/index.php?title=Special:UserLogin&returnto=Terms+of+service">Log In</Link></Typography>
        </Box>
      </ContentWrapper>
    </Layout>
  );
};