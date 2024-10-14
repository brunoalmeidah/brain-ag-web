import { render, screen } from "@testing-library/react";
import { Error } from "./error";
import "@testing-library/jest-dom";

describe("Error component test", () => {
  it("Should display error text", () => {
    render(<Error message="Mensagem de erro" />);
    const element = screen.getByText(/Mensagem de erro/i);
    expect(element).toBeInTheDocument();
  });
});
