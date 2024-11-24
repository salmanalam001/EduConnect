export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  isSubmitting: boolean;
}