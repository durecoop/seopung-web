import { doc, getDoc, setDoc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';

export async function trackPageView() {
  const today = new Date().toISOString().slice(0, 10);
  const docId = `web_${today}`;
  const ref = doc(db, 'analytics_daily', docId);
  try {
    const snap = await getDoc(ref);
    if (snap.exists()) {
      await updateDoc(ref, { views: (snap.data().views || 0) + 1 });
    } else {
      await setDoc(ref, { site: 'web', date: today, views: 1 });
    }
  } catch { /* 무시 */ }
}

export interface DailyStats { date: string; views: number; }

export async function getAnalytics(site: 'web' | 'shop', days = 30) {
  const snap = await getDocs(collection(db, 'analytics_daily'));
  const all = snap.docs
    .map(d => ({ ...d.data() } as { site: string; date: string; views: number }))
    .filter(d => d.site === site)
    .sort((a, b) => b.date.localeCompare(a.date));

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayData = all.find(d => d.date === todayStr);
  const total = all.reduce((s, d) => s + (d.views || 0), 0);
  const daily = all.slice(0, days).map(d => ({ date: d.date, views: d.views }));

  return { daily, total, today: todayData?.views || 0 };
}
