'use client';

import { useState, useEffect } from 'react';
import PageLocation from './PageLocation';
import { getCompanyInfo, saveCompanyInfo, type CompanyInfo } from '@/lib/admin-store';

export default function CompanyInfoTab() {
  const [info, setInfo] = useState<CompanyInfo>({
    companyName: '', ceo: '', address: '', bizNumber: '', phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getCompanyInfo().then(data => {
      if (data) setInfo(data);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await saveCompanyInfo(info);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputCls = 'w-full rounded-lg border border-navy-700/50 bg-navy-800 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-ocean-500';

  if (loading) return <div className="py-12 text-center text-white/40">로딩 중...</div>;

  return (
    <div>
      <PageLocation tab="company" />
      <h2 className="mb-6 text-2xl font-bold text-white">회사 정보 관리</h2>
      <div className="max-w-lg space-y-4 rounded-2xl border border-navy-700/30 bg-navy-900/80 p-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/60">회사명</label>
          <input type="text" value={info.companyName} onChange={e => setInfo({ ...info, companyName: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/60">대표</label>
          <input type="text" value={info.ceo} onChange={e => setInfo({ ...info, ceo: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/60">주소</label>
          <input type="text" value={info.address} onChange={e => setInfo({ ...info, address: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/60">사업자번호</label>
          <input type="text" value={info.bizNumber} onChange={e => setInfo({ ...info, bizNumber: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/60">전화번호</label>
          <input type="text" value={info.phone} onChange={e => setInfo({ ...info, phone: e.target.value })} className={inputCls} />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full rounded-lg bg-ocean-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean-600 disabled:opacity-50"
        >
          {saving ? '저장 중...' : saved ? '저장 완료!' : '저장'}
        </button>
      </div>
    </div>
  );
}
