import {  render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./header";
import { MemoryRouter } from "react-router-dom";

describe("Header component test", () => {
  it("Should display Início Menu", () => {
    render(
      <MemoryRouter>
        <Header userName="usuário" onSignOut={() => {}} />
      </MemoryRouter>
    );
    const element = screen.getByText(/Início/i);
    expect(element).toBeInTheDocument();
  });

  it("Should display Produtores Menu", () => {
    render(
      <MemoryRouter>
        <Header userName="usuário" onSignOut={() => {}} />
      </MemoryRouter>
    );
    const element = screen.getByText(/Produtores/i);
    expect(element).toBeInTheDocument();
  });

  it("Should display user name dropdown", () => {
    render(
      <MemoryRouter>
        <Header userName="usuário" onSignOut={() => {}} />
      </MemoryRouter>
    );
    const element = screen.getByText(/usuário/i);
    expect(element).toBeInTheDocument();
  });

  
});
