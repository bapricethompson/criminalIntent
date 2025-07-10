import { render } from "@testing-library/react-native";
import { Text } from "react-native";

describe("theme test", () => {
  it("renders", () => {
    const { getByText } = render(<Text>Test</Text>);
    expect(getByText("Test")).toBeTruthy();
  });
});
