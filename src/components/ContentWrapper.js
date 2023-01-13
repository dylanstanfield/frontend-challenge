import { styled } from '@mui/material';

export const ContentWrapper = styled('div')(({ theme }) => `
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(4)};
`);