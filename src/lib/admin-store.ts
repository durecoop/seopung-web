// Types
export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string; // ISO string
  pinned: boolean;
}

export interface Inquiry {
  id: string;
  company: string;
  person: string;
  phone: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

// Firebase Auth login/logout
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

export async function adminLogin(email: string, password: string): Promise<boolean> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch {
    return false;
  }
}

export async function adminLogout(): Promise<void> {
  await signOut(auth);
}

// Notice CRUD
export function getNotices(): Notice[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('seopung_notices');
  return data ? JSON.parse(data) : [];
}

export function saveNotice(notice: Notice): void {
  const notices = getNotices();
  const idx = notices.findIndex(n => n.id === notice.id);
  if (idx >= 0) notices[idx] = notice;
  else notices.unshift(notice);
  localStorage.setItem('seopung_notices', JSON.stringify(notices));
}

export function deleteNotice(id: string): void {
  const notices = getNotices().filter(n => n.id !== id);
  localStorage.setItem('seopung_notices', JSON.stringify(notices));
}

// Inquiry management
export function getInquiries(): Inquiry[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('seopung_inquiries');
  return data ? JSON.parse(data) : [];
}

export function saveInquiry(inquiry: Inquiry): void {
  const inquiries = getInquiries();
  inquiries.unshift(inquiry);
  localStorage.setItem('seopung_inquiries', JSON.stringify(inquiries));
}

export function markInquiryRead(id: string): void {
  const inquiries = getInquiries();
  const inq = inquiries.find(i => i.id === id);
  if (inq) inq.read = true;
  localStorage.setItem('seopung_inquiries', JSON.stringify(inquiries));
}

export function deleteInquiry(id: string): void {
  const inquiries = getInquiries().filter(i => i.id !== id);
  localStorage.setItem('seopung_inquiries', JSON.stringify(inquiries));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
