import { styled, Button as MuiButton } from '@mui/material';

const CustomButton = styled(MuiButton)(({ theme }) => `
  text-transform: none;
  box-shadow: none;
  font-weight: 800;

  &:hover {
    box-shadow: none;
  }
`);

export const Button = ({ children, color, onClick, disabled, testId }) => (
  <CustomButton
    variant="contained"
    size="large"
    color={ color }
    onClick={ onClick }
    disabled={ disabled }
    data-testid={ testId }
  >
    { children }
  </CustomButton>
)