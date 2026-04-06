'use client';

import { useState, useEffect } from 'react';
import { HERO_SKINS, getSkinConfig, setSkinConfig, type HeroSkinId } from '@/lib/skin-store';

const PREVIEW_URLS: Record<number, string> = {
  0: '/demo/0',
  1: '/demo/1',
  2: '/demo/2',
  3: '/demo/3',
  4: '/demo/4',
  5: '/demo/5',
};

export default function SkinTab() {
  const [current, setCurrent] = useState<HeroSkinId>(0);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getSkinConfig().then((c) => {
      setCurrent(c.heroSkinId);
      setLoaded(true);
    });
  }, []);

  const handleSelect = async (id: HeroSkinId) => {
    setSaving(true);
    try {
      await setSkinConfig(id);
      setCurrent(id);
    } catch {
      alert('저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) {
    return <div className="p-8 text-center text-gray-400">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">홈페이지 스킨 관리</h2>
        <p className="mt-1 text-sm text-gray-500">
          메인 페이지의 히어로 디자인을 선택하세요. 변경 즉시 적용됩니다.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HERO_SKINS.map((skin) => {
          const isActive = current === skin.id;
          return (
            <div
              key={skin.id}
              className={`relative rounded-xl border-2 p-5 transition-all ${
                isActive
                  ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {isActive && (
                <span className="absolute -top-2 -right-2 rounded-full bg-blue-500 px-2.5 py-0.5 text-xs font-bold text-white shadow">
                  현재 적용중
                </span>
              )}

              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-montserrat text-lg font-bold text-gray-600">
                  {skin.id}
                </span>
                <div>
                  <h3 className="font-bold text-gray-900">{skin.name}</h3>
                  <p className="text-xs text-gray-500">{skin.desc}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={PREVIEW_URLS[skin.id]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                >
                  미리보기
                </a>
                {!isActive && (
                  <button
                    onClick={() => handleSelect(skin.id)}
                    disabled={saving}
                    className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
                  >
                    {saving ? '적용 중...' : '이 스킨 적용'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
        <strong>참고:</strong> 스킨을 변경하면 메인 홈페이지의 히어로(첫 화면) 디자인만 교체됩니다.
        나머지 섹션(인증, 제품, 회사소개 등)은 동일하게 유지됩니다.
      </div>
    </div>
  );
}
