import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center font-pretendard">
      <span className="font-montserrat text-8xl font-bold text-ocean-500">404</span>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">페이지를 찾을 수 없습니다</h1>
      <p className="mt-3 text-gray-600">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Link href="/" className="mt-8 rounded-full bg-ocean-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean-600">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
