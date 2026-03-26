'use client';

import { useState } from 'react';
import { generateContent, getPresetPrompt } from '@/lib/ai-assist';

export default function AiAssistButton({
  contentType,
  existingText,
  onApply,
}: {
  contentType: string;
  existingText?: string;
  onApply: (text: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    setResult('');
    try {
      const text = await generateContent({
        contentType,
        prompt: prompt.trim(),
        existingText,
      });
      setResult(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const presetHint = getPresetPrompt(contentType);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300 transition-colors hover:bg-purple-500/20"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
        AI 글쓰기
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-navy-700/50 bg-navy-900 p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">AI 글쓰기 보조</h3>
          <button onClick={() => { setOpen(false); setResult(''); setPrompt(''); setError(''); }} className="text-white/40 hover:text-white/80">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="mb-3 text-xs text-white/40">{presetHint}</p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="AI에게 요청할 내용을 입력하세요 (예: ASC 인증 취득 소식을 뉴스 기사로 작성해줘)"
          rows={3}
          className="mb-3 w-full rounded-lg border border-navy-700/50 bg-navy-800 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-ocean-500"
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="mb-4 w-full rounded-lg bg-purple-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-600 disabled:opacity-50"
        >
          {loading ? '생성 중...' : '생성하기'}
        </button>

        {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

        {result && (
          <div>
            <div className="mb-3 max-h-48 overflow-y-auto rounded-lg border border-navy-700/50 bg-navy-800 p-4">
              <p className="whitespace-pre-line text-sm text-white/80">{result}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex-1 rounded-lg border border-navy-700/50 py-2 text-sm text-white/60 hover:bg-navy-800"
              >
                재생성
              </button>
              <button
                onClick={() => { onApply(result); setOpen(false); setResult(''); setPrompt(''); }}
                className="flex-1 rounded-lg bg-ocean-500 py-2 text-sm font-semibold text-white hover:bg-ocean-600"
              >
                적용하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
