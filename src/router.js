import { createBrowserRouter } from "react-router-dom";

import { SignUpPage } from './pages/SignUpPage';
import { AdditionalInfoPage } from './pages/AdditionalInfoPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { SuccessPage } from './pages/SuccessPage';
import { ErrorPage } from './pages/ErrorPage';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUpPage />,
  },
  {
    path: "/more-info",
    element: <AdditionalInfoPage />,
  },
  {
    path: "/confirmation",
    element: <ConfirmationPage />,
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
]);