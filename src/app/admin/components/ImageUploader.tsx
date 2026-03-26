'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { uploadImage } from '@/lib/storage';

export default function ImageUploader({
  value,
  folder,
  onChange,
}: {
  value: string;
  folder: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하만 가능합니다.');
      return;
    }
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch {
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  }, [folder, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div>
      {value && (
        <div className="relative mb-3 h-32 w-full overflow-hidden rounded-lg border border-navy-700/50">
          <Image
            src={value}
            alt="미리보기"
            fill
            className="object-contain"
            sizes="300px"
            unoptimized
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white/80 hover:bg-black/80"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-4 text-center transition-colors ${
          dragOver
            ? 'border-ocean-400 bg-ocean-500/10'
            : 'border-navy-700/50 hover:border-navy-600'
        }`}
      >
        {uploading ? (
          <p className="text-sm text-ocean-400">업로드 중...</p>
        ) : (
          <div className="text-sm text-white/40">
            <p>이미지를 드래그하거나 클릭하여 업로드</p>
            <p className="mt-1 text-xs">최대 5MB · JPG, PNG, WebP</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />

      {!value && (
        <input
          type="text"
          placeholder="또는 이미지 URL 직접 입력 (예: /images/...)"
          className="mt-2 w-full rounded-lg border border-navy-700/50 bg-navy-800 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-ocean-500"
          onBlur={(e) => { if (e.target.value.trim()) onChange(e.target.value.trim()); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); const t = (e.target as HTMLInputElement); if (t.value.trim()) onChange(t.value.trim()); } }}
        />
      )}
    </div>
  );
}
