'use client';

export default function DeleteConfirm({
  message,
  onConfirm,
  onCancel,
}: {
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-navy-700/50 bg-navy-900 p-6 shadow-2xl">
        <h3 className="mb-2 text-lg font-bold text-white">삭제 확인</h3>
        <p className="mb-6 text-sm text-white/60">
          {message || '이 항목을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.'}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-navy-700/50 py-2.5 text-sm text-white/60 transition-colors hover:bg-navy-800"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
