import React from 'react';

import { Layout } from './Layout';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Layout>
          <div data-testid="error-boundary">
            Something went wrong.
          </div>
        </Layout>
      );
    }

    return this.props.children; 
  }
}