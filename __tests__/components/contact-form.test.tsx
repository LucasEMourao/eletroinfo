import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/presentation/components/forms/ContactForm";

describe("ContactForm component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should render all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar mensagem/i })).toBeInTheDocument();
  });

  it("should show validation errors on empty submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/e-mail é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/mensagem é obrigatória/i)).toBeInTheDocument();
  });

  it("should validate email format", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/nome/i), "João");
    await user.type(screen.getByLabelText(/e-mail/i), "invalid-email");
    await user.type(screen.getByLabelText(/mensagem/i), "Mensagem longa o suficiente");
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    expect(await screen.findByText(/e-mail inválido/i)).toBeInTheDocument();
  });

  it("should validate message length", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/nome/i), "João");
    await user.type(screen.getByLabelText(/e-mail/i), "joao@example.com");
    await user.type(screen.getByLabelText(/mensagem/i), "Curta");
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    expect(await screen.findByText(/mensagem deve ter pelo menos 10 caracteres/i)).toBeInTheDocument();
  });

  it("should clear error on field change", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));
    expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/nome/i), "João");
    expect(screen.queryByText(/nome é obrigatório/i)).not.toBeInTheDocument();
  });

  it("should handle successful submission", async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ success: true, message: "Mensagem enviada com sucesso!" }),
    });

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/nome/i), "João");
    await user.type(screen.getByLabelText(/e-mail/i), "joao@example.com");
    await user.type(screen.getByLabelText(/mensagem/i), "Mensagem longa o suficiente para passar.");
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    await waitFor(() => {
      expect(screen.getByText(/mensagem enviada com sucesso/i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/contact", expect.objectContaining({
      method: "POST",
    }));

    // Fields should be cleared
    expect(screen.getByLabelText(/nome/i)).toHaveValue("");
    expect(screen.getByLabelText(/e-mail/i)).toHaveValue("");
  });

  it("should handle submission error", async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockRejectedValue(new Error("Network Error"));

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/nome/i), "João");
    await user.type(screen.getByLabelText(/e-mail/i), "joao@example.com");
    await user.type(screen.getByLabelText(/mensagem/i), "Mensagem longa o suficiente para passar.");
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    await waitFor(() => {
      expect(screen.getByText(/erro ao enviar mensagem/i)).toBeInTheDocument();
    });
  });
});
