import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "@/presentation/components/forms/ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders all form elements", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/Nome \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefone/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensagem \*/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enviar Mensagem/ })).toBeInTheDocument();
  });

  it("shows validation errors on submit with empty required fields", async () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByRole("button", { name: /Enviar Mensagem/ }));

    expect(await screen.findByText("Nome é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("E-mail é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Mensagem é obrigatória")).toBeInTheDocument();
  });

  it("shows error for invalid email format", async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Nome \*/), { target: { value: "Lucas" } });
    fireEvent.change(screen.getByLabelText(/E-mail \*/), { target: { value: "invalid-email" } });
    fireEvent.change(screen.getByLabelText(/Mensagem \*/), { target: { value: "Preciso de um orçamento de reparo de TV." } });

    fireEvent.click(screen.getByRole("button", { name: /Enviar Mensagem/ }));

    expect(await screen.findByText("E-mail inválido")).toBeInTheDocument();
  });

  it("shows error for too short message", async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Nome \*/), { target: { value: "Lucas" } });
    fireEvent.change(screen.getByLabelText(/E-mail \*/), { target: { value: "lucas@test.com" } });
    fireEvent.change(screen.getByLabelText(/Mensagem \*/), { target: { value: "Curto" } });

    fireEvent.click(screen.getByRole("button", { name: /Enviar Mensagem/ }));

    expect(await screen.findByText("Mensagem deve ter pelo menos 10 caracteres")).toBeInTheDocument();
  });

  it("submits successfully and clears fields", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true, message: "Mensagem enviada com sucesso!" }),
    });
    global.fetch = fetchMock;

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Nome \*/), { target: { value: "Lucas Mourão" } });
    fireEvent.change(screen.getByLabelText(/E-mail \*/), { target: { value: "lucas@example.com" } });
    fireEvent.change(screen.getByLabelText(/Telefone/), { target: { value: "(11) 98888-7777" } });
    fireEvent.change(screen.getByLabelText(/Mensagem \*/), { target: { value: "Olá, preciso consertar minha TV Samsung." } });

    fireEvent.click(screen.getByRole("button", { name: /Enviar Mensagem/ }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Mensagem enviada com sucesso!");
    });

    expect((screen.getByLabelText(/Nome \*/) as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText(/E-mail \*/) as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText(/Telefone/) as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText(/Mensagem \*/) as HTMLTextAreaElement).value).toBe("");
    expect(fetchMock).toHaveBeenCalledWith("/api/contact", expect.any(Object));
  });

  it("shows API errors if submission fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: false, message: "Erro ao enviar e-mail." }),
    });
    global.fetch = fetchMock;

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Nome \*/), { target: { value: "Lucas Mourão" } });
    fireEvent.change(screen.getByLabelText(/E-mail \*/), { target: { value: "lucas@example.com" } });
    fireEvent.change(screen.getByLabelText(/Mensagem \*/), { target: { value: "Olá, preciso consertar minha TV Samsung." } });

    fireEvent.click(screen.getByRole("button", { name: /Enviar Mensagem/ }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Erro ao enviar e-mail.");
    });
    expect(fetchMock).toHaveBeenCalled();
  });
});
