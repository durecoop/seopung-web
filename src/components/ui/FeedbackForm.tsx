'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface FeedbackFormProps {
  /** 현재 보고 있는 데모 번호 */
  demoId: number;
  /** 데모 이름 */
  demoName: string;
}

export default function FeedbackForm({ demoId, demoName }: FeedbackFormProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (rating === null) return;
    setSending(true);
    try {
      await addDoc(collection(db, 'demo_feedback'), {
        demoId,
        demoName,
        rating,
        comment: comment.trim(),
        name: name.trim() || '익명',
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch {
      alert('전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <section className="bg-[#0a1628] py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="rounded-2xl border border-ocean-400/30 bg-ocean-500/10 px-8 py-12">
            <span className="text-5xl">&#10003;</span>
            <h3 className="mt-4 text-2xl font-bold text-white">의견이 전송되었습니다</h3>
            <p className="mt-2 text-ocean-200">소중한 피드백 감사합니다!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#0a1628] py-16">
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <h3 className="mb-2 text-center text-2xl font-bold text-white">
            이 디자인 어떠신가요?
          </h3>
          <p className="mb-8 text-center text-sm text-white/50">
            #{demoId} {demoName} 에 대한 의견을 남겨주세요
          </p>

          {/* Rating */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-white/70">선호도</label>
            <div className="flex justify-center gap-3">
              {[
                { value: 1, label: '별로', emoji: '\uD83D\uDE15' },
                { value: 2, label: '보통', emoji: '\uD83E\uDD14' },
                { value: 3, label: '괜찮음', emoji: '\uD83D\uDE42' },
                { value: 4, label: '좋음', emoji: '\uD83D\uDE0A' },
                { value: 5, label: '최고!', emoji: '\uD83D\uDE0D' },
              ].map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRating(r.value)}
                  className={`flex flex-col items-center gap-1 rounded-xl px-4 py-3 transition-all ${
                    rating === r.value
                      ? 'scale-110 border-2 border-ocean-400 bg-ocean-500/20'
                      : 'border border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="text-2xl">{r.emoji}</span>
                  <span className={`text-xs font-medium ${rating === r.value ? 'text-ocean-300' : 'text-white/50'}`}>
                    {r.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-white/70">
              의견 <span className="text-white/30">(선택)</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="수정했으면 하는 부분, 좋았던 점, 제안사항 등을 자유롭게 적어주세요"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-ocean-400 focus:outline-none focus:ring-1 focus:ring-ocean-400"
              rows={4}
            />
          </div>

          {/* Name */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-semibold text-white/70">
              이름 <span className="text-white/30">(선택)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해주세요"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-ocean-400 focus:outline-none focus:ring-1 focus:ring-ocean-400"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={rating === null || sending}
            className={`w-full rounded-full py-4 text-lg font-bold transition-all ${
              rating === null
                ? 'cursor-not-allowed bg-white/10 text-white/30'
                : 'bg-ocean-500 text-white shadow-lg shadow-ocean-500/30 hover:bg-ocean-400 hover:scale-[1.02]'
            }`}
          >
            {sending ? '전송 중...' : '의견 보내기'}
          </button>
        </div>
      </div>
    </section>
  );
}
