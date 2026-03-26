'use client';

import { useState } from 'react';
import ContentForm, { type FieldDef } from './ContentForm';
import DeleteConfirm from './DeleteConfirm';
import { investCrud, generateId, type Investment } from '@/lib/admin-store';

const FIELDS: FieldDef[] = [
  { key: 'year', label: '연도', type: 'text', required: true, placeholder: '2026' },
  { key: 'label', label: '표시명', type: 'text', placeholder: '2026년' },
  { key: 'items', label: '투자 항목', type: 'textarea', aiAssist: true, placeholder: 'AI 엑스레이(2억), AI 초분광(2.5억) ...' },
  { key: 'amount', label: '총액', type: 'text', placeholder: '약 9억원' },
  { key: 'highlight', label: '강조', type: 'checkbox', placeholder: '올해 투자 강조 표시' },
  { key: 'sortOrder', label: '정렬순서', type: 'number' },
];

export default function InvestmentsTab({ items, refresh }: { items: Investment[]; refresh: () => void }) {
  const [editing, setEditing] = useState<Investment | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleSave = async (data: Record<string, unknown>) => {
    const item: Investment = {
      id: editing?.id || generateId(),
      year: String(data.year || ''),
      label: String(data.label || ''),
      items: String(data.items || ''),
      amount: String(data.amount || ''),
      highlight: Boolean(data.highlight),
      sortOrder: Number(data.sortOrder || 0),
    };
    await investCrud.save(item);
    setShowForm(false);
    refresh();
  };

  const handleDelete = async (id: string) => {
    await investCrud.remove(id);
    setDeleteTarget(null);
    refresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">투자 타임라인 관리</h2>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">새 항목</button>
      </div>

      {showForm && (
        <ContentForm title={editing ? '투자 수정' : '새 투자'} fields={FIELDS} initial={editing || { sortOrder: items.length }} contentType="investment" onSave={handleSave} onCancel={() => setShowForm(false)} />
      )}
      {deleteTarget && <DeleteConfirm onConfirm={() => handleDelete(deleteTarget)} onCancel={() => setDeleteTarget(null)} />}

      {items.length === 0 ? (
        <div className="rounded-xl border border-navy-700/30 py-12 text-center"><p className="text-white/60">등록된 투자 항목이 없습니다.</p></div>
      ) : (
        <div className="space-y-3">
          {items.map((inv) => (
            <div key={inv.id} className={`flex items-center justify-between rounded-xl border p-4 ${inv.highlight ? 'border-gold-500/30 bg-gold-500/5' : 'border-navy-700/30 bg-navy-900/80'}`}>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-montserrat text-sm font-bold text-white">{inv.label}</span>
                  {inv.amount && <span className="rounded-full bg-ocean-500/15 px-2 py-0.5 text-xs text-ocean-400">{inv.amount}</span>}
                  {inv.highlight && <span className="rounded-full bg-gold-500/15 px-2 py-0.5 text-xs text-gold-400">강조</span>}
                </div>
                <p className="text-sm text-white/50">{inv.items}</p>
              </div>
              <div className="ml-4 flex shrink-0 gap-2">
                <button onClick={() => { setEditing(inv); setShowForm(true); }} className="rounded-lg px-3 py-1.5 text-sm text-ocean-400 hover:bg-navy-800">수정</button>
                <button onClick={() => setDeleteTarget(inv.id)} className="rounded-lg px-3 py-1.5 text-sm text-red-400 hover:bg-navy-800">삭제</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
