'use client';

import { useState } from 'react';
import ContentForm, { type FieldDef } from './ContentForm';
import DeleteConfirm from './DeleteConfirm';
import { newsCrud, generateId, type NewsItem } from '@/lib/admin-store';

const FIELDS: FieldDef[] = [
  { key: 'title', label: '제목', type: 'text', required: true, aiAssist: true },
  { key: 'summary', label: '요약', type: 'textarea', required: true, aiAssist: true, placeholder: '뉴스 요약 내용' },
  { key: 'category', label: '카테고리', type: 'select', options: ['설비투자', '인증', '사업확장', '기술', '수상', '기타'] },
  { key: 'date', label: '날짜', type: 'text', placeholder: '2026.01' },
  { key: 'imageUrl', label: '이미지', type: 'image', imageFolder: 'news' },
  { key: 'sortOrder', label: '정렬순서', type: 'number' },
];

export default function NewsTab({ items, refresh }: { items: NewsItem[]; refresh: () => void }) {
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const openNew = () => { setEditing(null); setShowForm(true); };
  const openEdit = (item: NewsItem) => { setEditing(item); setShowForm(true); };

  const handleSave = async (data: Record<string, unknown>) => {
    const item: NewsItem = {
      id: editing?.id || generateId(),
      title: String(data.title || ''),
      summary: String(data.summary || ''),
      category: String(data.category || '기타'),
      date: String(data.date || ''),
      imageUrl: String(data.imageUrl || ''),
      sortOrder: Number(data.sortOrder || 0),
    };
    await newsCrud.save(item);
    setShowForm(false);
    refresh();
  };

  const handleDelete = async (id: string) => {
    await newsCrud.remove(id);
    setDeleteTarget(null);
    refresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">뉴스 관리</h2>
        <button onClick={openNew} className="rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">새 뉴스</button>
      </div>

      {showForm && (
        <ContentForm
          title={editing ? '뉴스 수정' : '새 뉴스'}
          fields={FIELDS}
          initial={editing || { sortOrder: items.length }}
          contentType="news"
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {deleteTarget && <DeleteConfirm onConfirm={() => handleDelete(deleteTarget)} onCancel={() => setDeleteTarget(null)} />}

      {items.length === 0 ? (
        <div className="rounded-xl border border-navy-700/30 py-12 text-center"><p className="text-white/60">등록된 뉴스가 없습니다.</p></div>
      ) : (
        <div className="space-y-3">
          {items.map((n) => (
            <div key={n.id} className="flex items-center justify-between rounded-xl border border-navy-700/30 bg-navy-900/80 p-4">
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full bg-ocean-500/15 px-2 py-0.5 text-xs text-ocean-400">{n.category}</span>
                  <span className="font-montserrat text-xs text-white/40">{n.date}</span>
                </div>
                <p className="truncate font-semibold text-white">{n.title}</p>
                <p className="truncate text-sm text-white/50">{n.summary}</p>
              </div>
              <div className="ml-4 flex shrink-0 gap-2">
                <button onClick={() => openEdit(n)} className="rounded-lg px-3 py-1.5 text-sm text-ocean-400 hover:bg-navy-800">수정</button>
                <button onClick={() => setDeleteTarget(n.id)} className="rounded-lg px-3 py-1.5 text-sm text-red-400 hover:bg-navy-800">삭제</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
