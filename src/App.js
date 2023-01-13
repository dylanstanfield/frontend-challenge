import React, { Component } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { SWRConfig } from "swr";

import { theme } from './theme';
import { router } from './router';
import { SignUpProvider } from "./hooks/useSignUp";
import { ErrorBoundary } from "./components/ErrorBoundary";

class App extends Component {
  render() {
    return (
      <div data-testid="app">
        <ErrorBoundary>
          <CssBaseline />
          <ThemeProvider theme={ theme }>
            <SWRConfig value={{ provider: () => new Map() }}>
              <SignUpProvider>
                <RouterProvider router={ router } />
              </SignUpProvider>
            </SWRConfig>
          </ThemeProvider>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
