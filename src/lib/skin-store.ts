import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export type HeroSkinId = 0 | 1 | 2 | 3 | 4 | 5;

export interface SkinConfig {
  heroSkinId: HeroSkinId;
  updatedAt?: string;
}

export const HERO_SKINS: { id: HeroSkinId; name: string; desc: string }[] = [
  { id: 0, name: '음식사진', desc: '클립아트 음식사진 슬라이더 + 다크 오버레이' },
  { id: 1, name: 'CSS 폭풍 파도', desc: '4겹 폭풍 파도 + 번개 + 물보라 파티클' },
  { id: 2, name: '파티클 오션', desc: 'Canvas 입자 네트워크 + 마우스 인터랙션' },
  { id: 3, name: '바다 영상', desc: '실제 바다 영상 2개 교차 + 에너지 스캔라인' },
  { id: 4, name: '시네마틱 분할', desc: '좌측 거대 타이포 + 우측 바다 영상' },
  { id: 5, name: '대담한 타이포', desc: '초대형 서풍 + 바다 영상 배경 + 글로우' },
];

const DOC_PATH = 'web_settings/skin';

export async function getSkinConfig(): Promise<SkinConfig> {
  try {
    const snap = await getDoc(doc(db, DOC_PATH));
    if (snap.exists()) return snap.data() as SkinConfig;
  } catch {}
  return { heroSkinId: 0 };
}

export async function setSkinConfig(skinId: HeroSkinId): Promise<void> {
  await setDoc(doc(db, DOC_PATH), {
    heroSkinId: skinId,
    updatedAt: new Date().toISOString(),
  });
}
