import type { ContactFormData, ContactFormResult } from "@/domain";

export async function POST(request: Request): Promise<Response> {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    const errors: string[] = [];

    if (!body.name || body.name.trim().length < 2) {
      errors.push("Nome é obrigatório e deve ter pelo menos 2 caracteres.");
    }

    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      errors.push("E-mail válido é obrigatório.");
    }

    if (!body.message || body.message.trim().length < 10) {
      errors.push(
        "Mensagem é obrigatória e deve ter pelo menos 10 caracteres."
      );
    }

    if (errors.length > 0) {
      const result: ContactFormResult = {
        success: false,
        message: errors.join(" "),
      };
      return Response.json(result, { status: 400 });
    }

    // Mock: log the contact form submission
    // In production, integrate with Resend or another email service
    console.log("[Contact Form]", {
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || "",
      message: body.message.trim(),
      timestamp: new Date().toISOString(),
    });

    const result: ContactFormResult = {
      success: true,
      message:
        "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    };

    return Response.json(result, { status: 200 });
  } catch {
    const result: ContactFormResult = {
      success: false,
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    };
    return Response.json(result, { status: 500 });
  }
}
