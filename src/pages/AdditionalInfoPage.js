import { useEffect, useState } from "react";
import { Typography, Box, FormControl, InputLabel, Select, MenuItem, Link, FormControlLabel, Checkbox, FormHelperText, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

import { Layout } from "../components/Layout";
import { Button } from '../components/Button';
import { ContentWrapper } from '../components/ContentWrapper';
import { useSignUp } from "../hooks/useSignUp";
import { usePreventDirectNavigation } from "../hooks/usePreventDirectNavigation";

const fetcher = (...args) => fetch(...args).then(res => res.json());

export const AdditionalInfoPage = () => {
  const navigate = useNavigate();
  const colorsResponse = useSWR('http://localhost:3001/api/colors', fetcher);
  const { color, setColor, terms, setTerms } = useSignUp();
  usePreventDirectNavigation(['name', 'email', 'password']);

  const [ colorError, setColorError ] = useState('');
  const [ termsError, setTermsError ] = useState('');

  useEffect(() => {
    if (colorsResponse.error) {
      navigate('/error');
    }
  }, [ colorsResponse.error ]);

  const updateColorError = (newColor) => {
    if (!newColor) {
      setColorError('Your favorite color is required.');
    } else {
      setColorError('');
    }
  };

  const updateTermsError = (newTerms) => {
    if (!newTerms) {
      setTermsError('You must agree to terms and conditions.');
    } else {
      setTermsError('');
    }
  };

  const onNext = () => {
    if (color && terms) {
      navigate('/confirmation');
    } else {
      updateColorError(color);
      updateTermsError(terms);
    }
  };

  return (
    <Layout>
      <ContentWrapper>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography data-testid="additional-info-title" variant="h4" component="h1">Additional Information</Typography>
          <Typography>Please review the following and choose carefully.</Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <FormControl fullWidth error={ !!colorError }>
            <InputLabel id="favorite-color-label">Favorite Color</InputLabel>
            <Select
              startAdornment={ colorsResponse.isLoading ? <CircularProgress size={ 26 } /> : '' }
              data-testid="favorite-color-select"
              labelId="favorite-color-label"
              label={ 'Favorite Color' }
              value={ color }
              onChange={ (e) => { setColor(e.target.value); setColorError(''); } }
              onBlur={ (e) => updateColorError(e.target.value) }
              sx={{ textTransform: 'capitalize' }}
            >
              { Array.isArray(colorsResponse.data) && colorsResponse.data.map((color) => (
                <MenuItem key={ color } sx={{ textTransform: 'capitalize' }} value={ color }>{ color }</MenuItem>
              )) }
            </Select>
            <FormHelperText>{ colorError }</FormHelperText>
          </FormControl>
          <FormControl fullWidth error={ !!termsError }>
            <FormControlLabel
              control={(
                <Checkbox
                  data-testid="terms-checkbox"
                  checked={ terms }
                  onChange={ (e) => { setTerms(e.target.checked); updateTermsError(e.target.checked); } }
                />
              )}
              label={(<>I agree to <Link href="https://en.wikipedia.org/wiki/Terms_of_service" target="_blank">Terms & Conditions</Link></>)}
            />
            <FormHelperText>{ termsError }</FormHelperText>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" gap={1.5}>
          <Button testId="next-button" onClick={ onNext } color="primary">Next</Button>
          <Button onClick={ () => navigate('/') } color="info">Back</Button>
          <Typography>Already have an account? <Link href="https://en.wikipedia.org/w/index.php?title=Special:UserLogin&returnto=Terms+of+service">Log In</Link></Typography>
        </Box>
      </ContentWrapper>
    </Layout>
  );
};