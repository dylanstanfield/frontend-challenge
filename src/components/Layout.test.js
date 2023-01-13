import { render } from "@testing-library/react";

import { Layout } from "./Layout";

describe('Layout', () => {
  it('should match snapshot', () => {
    const { container } = render(<Layout>Hello World</Layout>);
    expect(container).toMatchSnapshot();
  });
});