export interface StudentUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: StudentUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface CSITMaterialItem {
  id: string;
  type: 'syllabus' | 'notes' | 'question' | 'notice';
  title: string;
  subject?: string;
  code?: string;
  semester?: string;
  description?: string;
  content?: string;
  downloadLink?: string;
  author?: string;
  year?: string;
  date?: string;
  category?: string;
}
