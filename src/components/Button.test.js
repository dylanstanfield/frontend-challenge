import { render } from "@testing-library/react";

import { Button } from "./Button";

describe('Button', () => {
  it('should match snapshot', () => {
    const { container } = render(<Button>Hello World</Button>);
    expect(container).toMatchSnapshot();
  });
});