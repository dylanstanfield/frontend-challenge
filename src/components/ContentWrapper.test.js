import { render } from "@testing-library/react";

import { ContentWrapper } from "./ContentWrapper";

describe('ContentWrapper', () => {
  it('should match snapshot', () => {
    const { container } = render(<ContentWrapper>Hello World</ContentWrapper>);
    expect(container).toMatchSnapshot();
  });
});