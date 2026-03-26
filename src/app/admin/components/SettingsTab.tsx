'use client';

import { useState, useEffect } from 'react';
import { getWebSettings, saveWebSettings, type WebSettings } from '@/lib/admin-store';
import { seedAllData } from '@/lib/seed-data';

export default function SettingsTab() {
  const [settings, setSettings] = useState<WebSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedResults, setSeedResults] = useState<string[]>([]);

  useEffect(() => {
    getWebSettings().then(data => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await saveWebSettings(settings);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSeed = async () => {
    if (!confirm('기존에 데이터가 없는 컬렉션에만 초기 데이터를 등록합니다. 진행하시겠습니까?')) return;
    setSeeding(true);
    setSeedResults([]);
    try {
      const results = await seedAllData();
      setSeedResults(results);
    } catch {
      setSeedResults(['시드 데이터 등록 중 오류가 발생했습니다.']);
    } finally {
      setSeeding(false);
    }
  };

  const inputCls = 'w-full rounded-lg border border-navy-700/50 bg-navy-800 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-ocean-500';

  if (loading) return <div className="py-12 text-center text-white/40">로딩 중...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-6 text-2xl font-bold text-white">설정</h2>

        {/* AI 설정 */}
        <div className="max-w-lg rounded-2xl border border-navy-700/30 bg-navy-900/80 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">AI 글쓰기 보조</h3>
          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-medium text-white/60">AI API 엔드포인트 URL</label>
            <input
              type="url"
              value={settings.aiEndpoint || ''}
              onChange={e => setSettings({ ...settings, aiEndpoint: e.target.value })}
              className={inputCls}
              placeholder="https://your-cloud-function-url/aiAssist"
            />
            <p className="mt-1.5 text-xs text-white/30">Firebase Cloud Function URL을 입력하세요.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-lg bg-ocean-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean-600 disabled:opacity-50"
          >
            {saving ? '저장 중...' : saved ? '저장 완료!' : '설정 저장'}
          </button>
        </div>
      </div>

      {/* 시드 데이터 */}
      <div className="max-w-lg rounded-2xl border border-navy-700/30 bg-navy-900/80 p-6">
        <h3 className="mb-2 text-lg font-semibold text-white">초기 데이터 등록</h3>
        <p className="mb-4 text-sm text-white/50">
          하드코딩된 기존 콘텐츠를 Firestore에 등록합니다. 이미 데이터가 있는 컬렉션은 건너뜁니다.
        </p>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="w-full rounded-lg bg-gold-500 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400 disabled:opacity-50"
        >
          {seeding ? '등록 중...' : '초기 데이터 등록'}
        </button>
        {seedResults.length > 0 && (
          <div className="mt-4 rounded-lg border border-navy-700/50 bg-navy-800 p-4">
            {seedResults.map((r, i) => (
              <p key={i} className="text-sm text-white/70">{r}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
