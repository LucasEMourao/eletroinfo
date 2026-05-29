export interface WhatsAppIntent {
  phone: string;
  message: string;
}

export interface WhatsAppLink {
  url: string;
  intent: WhatsAppIntent;
}
