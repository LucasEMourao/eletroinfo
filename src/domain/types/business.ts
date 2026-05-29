export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Phone {
  ddd: string;
  number: string;
  raw: string;
}

export interface OpeningHours {
  weekdays: string;
  saturday: string;
  sunday?: string;
}

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
}

export interface BusinessProfile {
  name: string;
  tagline: string;
  description: string;
  phone: Phone;
  whatsappPhone: Phone;
  email: string;
  address: Address;
  openingHours: OpeningHours;
  socialMedia: SocialMedia;
  foundedYear: number;
  siteUrl: string;
}
