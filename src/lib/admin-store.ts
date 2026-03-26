import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  collection, doc, getDocs, getDoc, setDoc, deleteDoc, query, orderBy,
} from 'firebase/firestore';
import { auth, db } from './firebase';

/* ── ID 생성 ── */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ══════════════════════════════════════
   Types
   ══════════════════════════════════════ */

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
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

export interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  imageUrl: string;
  sortOrder: number;
}

export interface Certification {
  id: string;
  name: string;
  year: string;
  description: string;
  status: string;
  sortOrder: number;
}

export interface Equipment {
  id: string;
  name: string;
  desc: string;
  imageUrl: string;
  sortOrder: number;
}

export interface Investment {
  id: string;
  year: string;
  label: string;
  items: string;
  amount: string;
  highlight?: boolean;
  sortOrder: number;
}

export interface HistoryItem {
  id: string;
  year: string;
  text: string;
  sortOrder: number;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  label: string;
  category: string;
  sortOrder: number;
}

export interface CompanyInfo {
  companyName: string;
  ceo: string;
  address: string;
  bizNumber: string;
  phone: string;
}

export interface WebSettings {
  aiEndpoint?: string;
  aiApiKey?: string;
}

/* ══════════════════════════════════════
   Auth
   ══════════════════════════════════════ */

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

/* ══════════════════════════════════════
   제네릭 CRUD 팩토리
   ══════════════════════════════════════ */

interface CrudOps<T> {
  getAll: (orderField?: string, dir?: 'asc' | 'desc') => Promise<T[]>;
  save: (item: T) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

function createCrud<T extends { id: string }>(col: string): CrudOps<T> {
  return {
    getAll: async (orderField = 'sortOrder', dir: 'asc' | 'desc' = 'asc') => {
      try {
        const q = query(collection(db, col), orderBy(orderField, dir));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as T));
      } catch {
        const snap = await getDocs(collection(db, col));
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as T));
      }
    },
    save: async (item: T) => {
      const { id, ...data } = item;
      await setDoc(doc(db, col, id), data);
    },
    remove: async (id: string) => {
      await deleteDoc(doc(db, col, id));
    },
  };
}

/* ── 컬렉션별 CRUD 인스턴스 ── */
export const newsCrud = createCrud<NewsItem>('web_news');
export const certCrud = createCrud<Certification>('web_certifications');
export const equipCrud = createCrud<Equipment>('web_equipment');
export const investCrud = createCrud<Investment>('web_investments');
export const historyCrud = createCrud<HistoryItem>('web_history');
export const galleryCrud = createCrud<GalleryItem>('web_gallery');

/* ══════════════════════════════════════
   Notice CRUD (기존 - date 기반 정렬)
   ══════════════════════════════════════ */

export async function getNotices(): Promise<Notice[]> {
  try {
    const q = query(collection(db, 'web_notices'), orderBy('date', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Notice));
  } catch {
    const snap = await getDocs(collection(db, 'web_notices'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Notice));
  }
}

export async function saveNotice(notice: Notice): Promise<void> {
  await setDoc(doc(db, 'web_notices', notice.id), {
    title: notice.title,
    content: notice.content,
    date: notice.date,
    pinned: notice.pinned,
  });
}

export async function deleteNotice(id: string): Promise<void> {
  await deleteDoc(doc(db, 'web_notices', id));
}

/* ══════════════════════════════════════
   Company Info (단일 문서)
   ══════════════════════════════════════ */

export async function getCompanyInfo(): Promise<CompanyInfo | null> {
  const d = await getDoc(doc(db, 'web_company_info', 'main'));
  if (!d.exists()) return null;
  return d.data() as CompanyInfo;
}

export async function saveCompanyInfo(data: CompanyInfo): Promise<void> {
  await setDoc(doc(db, 'web_company_info', 'main'), data);
}

/* ══════════════════════════════════════
   Web Settings (AI 설정 등)
   ══════════════════════════════════════ */

export async function getWebSettings(): Promise<WebSettings> {
  const d = await getDoc(doc(db, 'web_settings', 'main'));
  if (!d.exists()) return {};
  return d.data() as WebSettings;
}

export async function saveWebSettings(data: Partial<WebSettings>): Promise<void> {
  await setDoc(doc(db, 'web_settings', 'main'), data, { merge: true });
}

/* ══════════════════════════════════════
   Inquiry (localStorage - 기존 유지)
   ══════════════════════════════════════ */

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
