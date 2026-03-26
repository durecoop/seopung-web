'use client';

import { useState } from 'react';
import ContentForm, { type FieldDef } from './ContentForm';
import DeleteConfirm from './DeleteConfirm';
import { certCrud, generateId, type Certification } from '@/lib/admin-store';

const FIELDS: FieldDef[] = [
  { key: 'name', label: '인증명', type: 'text', required: true },
  { key: 'year', label: '취득년도', type: 'text', placeholder: '2024년' },
  { key: 'description', label: '설명', type: 'textarea', aiAssist: true },
  { key: 'status', label: '상태', type: 'select', options: ['유효', '준비중', '만료'] },
  { key: 'sortOrder', label: '정렬순서', type: 'number' },
];

export default function CertificationsTab({ items, refresh }: { items: Certification[]; refresh: () => void }) {
  const [editing, setEditing] = useState<Certification | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleSave = async (data: Record<string, unknown>) => {
    const item: Certification = {
      id: editing?.id || generateId(),
      name: String(data.name || ''),
      year: String(data.year || ''),
      description: String(data.description || ''),
      status: String(data.status || '유효'),
      sortOrder: Number(data.sortOrder || 0),
    };
    await certCrud.save(item);
    setShowForm(false);
    refresh();
  };

  const handleDelete = async (id: string) => {
    await certCrud.remove(id);
    setDeleteTarget(null);
    refresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">인증/수상 관리</h2>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">새 인증</button>
      </div>

      {showForm && (
        <ContentForm title={editing ? '인증 수정' : '새 인증'} fields={FIELDS} initial={editing || { sortOrder: items.length }} contentType="certification" onSave={handleSave} onCancel={() => setShowForm(false)} />
      )}
      {deleteTarget && <DeleteConfirm onConfirm={() => handleDelete(deleteTarget)} onCancel={() => setDeleteTarget(null)} />}

      {items.length === 0 ? (
        <div className="rounded-xl border border-navy-700/30 py-12 text-center"><p className="text-white/60">등록된 인증이 없습니다.</p></div>
      ) : (
        <div className="space-y-3">
          {items.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-xl border border-navy-700/30 bg-navy-900/80 p-4">
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${c.status === '유효' ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-400'}`}>{c.status}</span>
                  <span className="text-xs text-white/40">{c.year}</span>
                </div>
                <p className="font-semibold text-white">{c.name}</p>
                <p className="truncate text-sm text-white/50">{c.description}</p>
              </div>
              <div className="ml-4 flex shrink-0 gap-2">
                <button onClick={() => { setEditing(c); setShowForm(true); }} className="rounded-lg px-3 py-1.5 text-sm text-ocean-400 hover:bg-navy-800">수정</button>
                <button onClick={() => setDeleteTarget(c.id)} className="rounded-lg px-3 py-1.5 text-sm text-red-400 hover:bg-navy-800">삭제</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
