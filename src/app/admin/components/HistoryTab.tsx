'use client';

import { useState } from 'react';
import ContentForm, { type FieldDef } from './ContentForm';
import DeleteConfirm from './DeleteConfirm';
import { historyCrud, generateId, type HistoryItem } from '@/lib/admin-store';

const FIELDS: FieldDef[] = [
  { key: 'year', label: '연도', type: 'text', required: true, placeholder: '2026' },
  { key: 'text', label: '내용', type: 'textarea', required: true, aiAssist: true, placeholder: '연혁 내용' },
  { key: 'sortOrder', label: '정렬순서', type: 'number' },
];

export default function HistoryTab({ items, refresh }: { items: HistoryItem[]; refresh: () => void }) {
  const [editing, setEditing] = useState<HistoryItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleSave = async (data: Record<string, unknown>) => {
    const item: HistoryItem = {
      id: editing?.id || generateId(),
      year: String(data.year || ''),
      text: String(data.text || ''),
      sortOrder: Number(data.sortOrder || 0),
    };
    await historyCrud.save(item);
    setShowForm(false);
    refresh();
  };

  const handleDelete = async (id: string) => {
    await historyCrud.remove(id);
    setDeleteTarget(null);
    refresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">회사 연혁 관리</h2>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">새 연혁</button>
      </div>

      {showForm && (
        <ContentForm title={editing ? '연혁 수정' : '새 연혁'} fields={FIELDS} initial={editing || { sortOrder: items.length }} contentType="history" onSave={handleSave} onCancel={() => setShowForm(false)} />
      )}
      {deleteTarget && <DeleteConfirm onConfirm={() => handleDelete(deleteTarget)} onCancel={() => setDeleteTarget(null)} />}

      {items.length === 0 ? (
        <div className="rounded-xl border border-navy-700/30 py-12 text-center"><p className="text-white/60">등록된 연혁이 없습니다.</p></div>
      ) : (
        <div className="relative ml-4 border-l-2 border-navy-700/50 pl-6">
          {items.map((h) => (
            <div key={h.id} className="relative mb-4 rounded-xl border border-navy-700/30 bg-navy-900/80 p-4">
              <div className="absolute -left-[31px] top-5 h-3 w-3 rounded-full border-2 border-ocean-400 bg-navy-950" />
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-montserrat text-sm font-bold text-ocean-400">{h.year}</span>
                  <p className="mt-1 text-white/80">{h.text}</p>
                </div>
                <div className="ml-4 flex shrink-0 gap-2">
                  <button onClick={() => { setEditing(h); setShowForm(true); }} className="rounded-lg px-3 py-1.5 text-sm text-ocean-400 hover:bg-navy-800">수정</button>
                  <button onClick={() => setDeleteTarget(h.id)} className="rounded-lg px-3 py-1.5 text-sm text-red-400 hover:bg-navy-800">삭제</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
