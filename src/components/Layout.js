import { styled, Typography, lighten } from '@mui/material';

// Design Credit https://dribbble.com/shots/17564792-Log-in-page-Untitled-UI?utm_source=Clipboard_Shot&utm_campaign=jordanhughes&utm_content=Log%20in%20page%20%E2%80%94%20Untitled%20UI&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=jordanhughes&utm_content=Log%20in%20page%20%E2%80%94%20Untitled%20UI&utm_medium=Social_Share

const Wrapper = styled('div')(({ theme }) => `
  width: 100vw;
  display: flex;
`);

const ContentWrapper = styled('div')(({ theme }) => `
  min-height: 100vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(8)};
  padding: ${theme.spacing(4)};

  @media (max-width: 800px) {
    width: 100vw;
  }
`);

const Title = styled(Typography)(({ theme }) => `
  font-weight: 800;
  font-size: 1.2rem;
`);

const ChildrenWrapper = styled('div')(({ theme }) => `
  flex: 1;
  width: 100%;
  max-width: 400px;
  align-self: center;
  display: flex;
  align-items: center;
`);

const HeroImageWrapper = styled('div')(({ theme }) => `
  min-height: 100vh;
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${lighten(theme.palette.primary.main, 0.95)};

  @media (max-width: 800px) {
    display: none;
  }
`);

const HeroImage = styled('div')(({ theme }) => `
  background-color: ${theme.palette.primary.main};
  height: 150px;
  width: 150px;
  border-radius: 50%;
  position: relative;

  &::after {
    content: ' ';
    position: absolute;
    top: 75px;
    left: -50px;
    right: -50px;
    bottom: -50px;
    backdrop-filter: blur(15px);
  }
`);

export const Layout = ({ children }) => (
  <Wrapper>
    <ContentWrapper>
      <Title>&#9679; Upgrade Challenge</Title>
      <ChildrenWrapper>
        { children }
      </ChildrenWrapper>
      <Typography variant="caption">&#169; Upgrade Challenge 2023</Typography>
    </ContentWrapper>
    <HeroImageWrapper>
      <HeroImage />
    </HeroImageWrapper>
  </Wrapper>
)