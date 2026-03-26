'use client';

import { useState } from 'react';
import ContentForm, { type FieldDef } from './ContentForm';
import DeleteConfirm from './DeleteConfirm';
import PageLocation from './PageLocation';
import { galleryCrud, generateId, type GalleryItem } from '@/lib/admin-store';

const CATEGORIES = ['공장', '위판장', '굴비', '제품'];

const FIELDS: FieldDef[] = [
  { key: 'label', label: '사진 설명', type: 'text', required: true },
  { key: 'category', label: '카테고리', type: 'select', options: CATEGORIES, required: true },
  { key: 'imageUrl', label: '이미지', type: 'image', imageFolder: 'gallery' },
  { key: 'sortOrder', label: '정렬순서', type: 'number' },
];

export default function GalleryTab({ items, refresh }: { items: GalleryItem[]; refresh: () => void }) {
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [filter, setFilter] = useState('전체');

  const filtered = filter === '전체' ? items : items.filter(i => i.category === filter);

  const handleSave = async (data: Record<string, unknown>) => {
    const item: GalleryItem = {
      id: editing?.id || generateId(),
      label: String(data.label || ''),
      category: String(data.category || '공장'),
      imageUrl: String(data.imageUrl || ''),
      sortOrder: Number(data.sortOrder || 0),
    };
    await galleryCrud.save(item);
    setShowForm(false);
    refresh();
  };

  const handleDelete = async (id: string) => {
    await galleryCrud.remove(id);
    setDeleteTarget(null);
    refresh();
  };

  return (
    <div>
      <PageLocation tab="gallery" />
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">갤러리 관리</h2>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">사진 추가</button>
      </div>

      {/* 카테고리 필터 */}
      <div className="mb-6 flex gap-2">
        {['전체', ...CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${filter === cat ? 'bg-ocean-500 text-white' : 'text-white/50 hover:bg-navy-800'}`}
          >
            {cat} {cat === '전체' ? `(${items.length})` : `(${items.filter(i => i.category === cat).length})`}
          </button>
        ))}
      </div>

      {showForm && (
        <ContentForm title={editing ? '사진 수정' : '사진 추가'} fields={FIELDS} initial={editing || { sortOrder: items.length, category: filter !== '전체' ? filter : '공장' }} contentType="gallery" onSave={handleSave} onCancel={() => setShowForm(false)} />
      )}
      {deleteTarget && <DeleteConfirm onConfirm={() => handleDelete(deleteTarget)} onCancel={() => setDeleteTarget(null)} />}

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-navy-700/30 py-12 text-center"><p className="text-white/60">사진이 없습니다.</p></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((g) => (
            <div key={g.id} className="group overflow-hidden rounded-xl border border-navy-700/30 bg-navy-900/80">
              <div className="relative aspect-video overflow-hidden">
                <img src={g.imageUrl} alt={g.label} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                <span className="absolute left-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white">{g.category}</span>
              </div>
              <div className="flex items-center justify-between p-3">
                <p className="truncate text-sm text-white/80">{g.label}</p>
                <div className="flex shrink-0 gap-1">
                  <button onClick={() => { setEditing(g); setShowForm(true); }} className="rounded px-2 py-1 text-xs text-ocean-400 hover:bg-navy-800">수정</button>
                  <button onClick={() => setDeleteTarget(g.id)} className="rounded px-2 py-1 text-xs text-red-400 hover:bg-navy-800">삭제</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
