'use client';

import { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import AiAssistButton from './AiAssistButton';

export interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'image' | 'checkbox';
  options?: string[];
  required?: boolean;
  aiAssist?: boolean;
  placeholder?: string;
  imageFolder?: string;
}

export default function ContentForm({
  title,
  fields,
  initial,
  contentType,
  onSave,
  onCancel,
}: {
  title: string;
  fields: FieldDef[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initial: any;
  contentType: string;
  onSave: (data: Record<string, unknown>) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const init: Record<string, unknown> = {};
    const src = initial as Record<string, unknown> | null;
    fields.forEach(f => {
      init[f.key] = src?.[f.key] ?? (f.type === 'number' ? 0 : f.type === 'checkbox' ? false : '');
    });
    setValues(init);
  }, [initial, fields]);

  const set = (key: string, val: unknown) => setValues(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const f of fields) {
      if (f.required && !values[f.key] && values[f.key] !== 0) return;
    }
    onSave(values);
  };

  const inputCls = 'w-full rounded-lg border border-navy-700/50 bg-navy-800 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-ocean-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-navy-700/50 bg-navy-900 p-6 shadow-2xl">
        <h3 className="mb-5 text-lg font-bold text-white">{title}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((f) => (
            <div key={f.key}>
              <div className="mb-1.5 flex items-center gap-2">
                <label className="text-sm font-medium text-white/60">{f.label}</label>
                {f.aiAssist && (
                  <AiAssistButton
                    contentType={contentType}
                    existingText={String(values[f.key] || '')}
                    onApply={(text) => set(f.key, text)}
                  />
                )}
              </div>

              {f.type === 'text' && (
                <input
                  type="text"
                  value={String(values[f.key] || '')}
                  onChange={(e) => set(f.key, e.target.value)}
                  className={inputCls}
                  placeholder={f.placeholder}
                  required={f.required}
                />
              )}

              {f.type === 'textarea' && (
                <textarea
                  value={String(values[f.key] || '')}
                  onChange={(e) => set(f.key, e.target.value)}
                  rows={4}
                  className={inputCls}
                  placeholder={f.placeholder}
                  required={f.required}
                />
              )}

              {f.type === 'number' && (
                <input
                  type="number"
                  value={Number(values[f.key] || 0)}
                  onChange={(e) => set(f.key, Number(e.target.value))}
                  className={inputCls}
                />
              )}

              {f.type === 'select' && (
                <select
                  value={String(values[f.key] || '')}
                  onChange={(e) => set(f.key, e.target.value)}
                  className={inputCls}
                >
                  <option value="">선택</option>
                  {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              )}

              {f.type === 'image' && (
                <ImageUploader
                  value={String(values[f.key] || '')}
                  folder={f.imageFolder || contentType}
                  onChange={(url) => set(f.key, url)}
                />
              )}

              {f.type === 'checkbox' && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={Boolean(values[f.key])}
                    onChange={(e) => set(f.key, e.target.checked)}
                    className="h-4 w-4 rounded border-navy-700/50 bg-navy-800 text-ocean-500"
                  />
                  <span className="text-sm text-white/60">{f.placeholder || '활성화'}</span>
                </label>
              )}
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-lg border border-navy-700/50 py-3 text-sm text-white/60 transition-colors hover:bg-navy-800"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-ocean-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean-600"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
