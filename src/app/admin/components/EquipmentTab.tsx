'use client';

import { useState } from 'react';
import ContentForm, { type FieldDef } from './ContentForm';
import DeleteConfirm from './DeleteConfirm';
import { equipCrud, generateId, type Equipment } from '@/lib/admin-store';

const FIELDS: FieldDef[] = [
  { key: 'name', label: '장비명', type: 'text', required: true },
  { key: 'desc', label: '설명', type: 'textarea', aiAssist: true },
  { key: 'imageUrl', label: '이미지', type: 'image', imageFolder: 'equipment' },
  { key: 'sortOrder', label: '정렬순서', type: 'number' },
];

export default function EquipmentTab({ items, refresh }: { items: Equipment[]; refresh: () => void }) {
  const [editing, setEditing] = useState<Equipment | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleSave = async (data: Record<string, unknown>) => {
    const item: Equipment = {
      id: editing?.id || generateId(),
      name: String(data.name || ''),
      desc: String(data.desc || ''),
      imageUrl: String(data.imageUrl || ''),
      sortOrder: Number(data.sortOrder || 0),
    };
    await equipCrud.save(item);
    setShowForm(false);
    refresh();
  };

  const handleDelete = async (id: string) => {
    await equipCrud.remove(id);
    setDeleteTarget(null);
    refresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">설비/장비 관리</h2>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">새 장비</button>
      </div>

      {showForm && (
        <ContentForm title={editing ? '장비 수정' : '새 장비'} fields={FIELDS} initial={editing || { sortOrder: items.length }} contentType="equipment" onSave={handleSave} onCancel={() => setShowForm(false)} />
      )}
      {deleteTarget && <DeleteConfirm onConfirm={() => handleDelete(deleteTarget)} onCancel={() => setDeleteTarget(null)} />}

      {items.length === 0 ? (
        <div className="rounded-xl border border-navy-700/30 py-12 text-center"><p className="text-white/60">등록된 장비가 없습니다.</p></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((e) => (
            <div key={e.id} className="rounded-xl border border-navy-700/30 bg-navy-900/80 p-4">
              {e.imageUrl && (
                <div className="relative mb-3 h-32 overflow-hidden rounded-lg">
                  <img src={e.imageUrl} alt={e.name} className="h-full w-full object-cover" />
                </div>
              )}
              <p className="font-semibold text-white">{e.name}</p>
              <p className="mt-1 text-sm text-white/50">{e.desc}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => { setEditing(e); setShowForm(true); }} className="rounded-lg px-3 py-1.5 text-sm text-ocean-400 hover:bg-navy-800">수정</button>
                <button onClick={() => setDeleteTarget(e.id)} className="rounded-lg px-3 py-1.5 text-sm text-red-400 hover:bg-navy-800">삭제</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
