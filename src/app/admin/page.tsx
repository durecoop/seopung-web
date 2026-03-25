'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';
import { getAnalytics, type DailyStats } from '@/lib/analytics';
import {
  checkPassword,
  getNotices,
  saveNotice,
  deleteNotice as removeNotice,
  getInquiries,
  markInquiryRead,
  deleteInquiry as removeInquiry,
  generateId,
  type Notice,
  type Inquiry,
} from '@/lib/admin-store';

/* ──────────────────────────────────────────────
   Pages data for 사이트 관리 tab
   ────────────────────────────────────────────── */
const SITE_PAGES = [
  { name: '메인 (홈)', url: '/' },
  { name: '회사 소개', url: '/about' },
  { name: '비전·미래', url: '/vision' },
  { name: '시설·설비', url: '/facilities' },
  { name: '생산 공정', url: '/process' },
  { name: '제품 소개', url: '/products' },
  { name: '인증·수상', url: '/certifications' },
  { name: '문의하기', url: '/contact' },
  { name: '관리자', url: '/admin' },
];

/* ──────────────────────────────────────────────
   Login Screen
   ────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkPassword(pw)) {
      sessionStorage.setItem('seopung_admin_auth', 'true');
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 font-pretendard">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-navy-700/50 bg-navy-900 p-10 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg">
            <Image src={getImagePath('/images/logo.png')} alt="서풍 로고" width={64} height={64} className="h-full w-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-white">서풍 관리자</h1>
          <p className="mt-2 text-sm text-white/60">관리자 비밀번호를 입력하세요</p>
        </div>

        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="비밀번호"
          className="mb-4 w-full rounded-xl border border-navy-700/50 bg-navy-800 px-5 py-3.5 text-white placeholder-white/30 outline-none transition-all focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500"
          autoFocus
        />

        {error && (
          <p className="mb-4 text-center text-sm text-red-400">비밀번호가 올바르지 않습니다.</p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-gold-500 px-6 py-3.5 font-semibold text-navy-950 transition-colors hover:bg-gold-400"
        >
          로그인
        </button>
      </form>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Dashboard Tab
   ────────────────────────────────────────────── */
function DashboardTab({
  notices,
  inquiries,
  setActiveTab,
}: {
  notices: Notice[];
  inquiries: Inquiry[];
  setActiveTab: (tab: string) => void;
}) {
  const unreadCount = inquiries.filter((i) => !i.read).length;

  const [webStats, setWebStats] = useState<{ daily: DailyStats[]; total: number; today: number }>({ daily: [], total: 0, today: 0 });
  const [shopStats, setShopStats] = useState<{ daily: DailyStats[]; total: number; today: number }>({ daily: [], total: 0, today: 0 });

  useEffect(() => {
    getAnalytics('web', 7).then(setWebStats).catch(() => {});
    getAnalytics('shop', 7).then(setShopStats).catch(() => {});
  }, []);

  const statCards = [
    {
      label: '공지사항',
      value: `${notices.length}건`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
        </svg>
      ),
      color: 'text-ocean-400',
      bg: 'bg-ocean-500/10',
    },
    {
      label: '문의 접수',
      value: `${inquiries.length}건`,
      badge: unreadCount > 0 ? `미확인 ${unreadCount}` : undefined,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      color: 'text-gold-400',
      bg: 'bg-gold-500/10',
    },
    {
      label: '페이지 수',
      value: '9개',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    },
    {
      label: '이미지',
      value: '83장+',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
        </svg>
      ),
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
  ];

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-white">대시보드</h2>

      {/* 방문자 통계 */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5">
          <p className="text-xs font-medium text-emerald-300">홈페이지 오늘 방문</p>
          <p className="mt-1 font-montserrat text-3xl font-bold text-emerald-400">{webStats.today.toLocaleString()}</p>
          <p className="mt-1 text-xs text-white/40">누적 {webStats.total.toLocaleString()}회</p>
        </div>
        <div className="rounded-xl border border-ocean-500/20 bg-ocean-500/10 p-5">
          <p className="text-xs font-medium text-ocean-300">쇼핑몰 오늘 방문</p>
          <p className="mt-1 font-montserrat text-3xl font-bold text-ocean-400">{shopStats.today.toLocaleString()}</p>
          <p className="mt-1 text-xs text-white/40">누적 {shopStats.total.toLocaleString()}회</p>
        </div>
        <div className="rounded-xl border border-navy-700/50 bg-navy-900/80 p-5">
          <p className="text-xs text-white/40">홈페이지 최근 7일</p>
          <div className="mt-2 flex items-end gap-1" style={{ height: 36 }}>
            {(webStats.daily.length > 0 ? webStats.daily.slice(0, 7).reverse() : Array(7).fill({ views: 0 })).map((d, i) => {
              const max = Math.max(...webStats.daily.map(x => x.views), 1);
              return <div key={i} className="flex-1 rounded-sm bg-emerald-400" style={{ height: `${Math.max((d.views / max) * 100, 6)}%` }} title={`${d.date || ''}: ${d.views}회`} />;
            })}
          </div>
        </div>
        <div className="rounded-xl border border-navy-700/50 bg-navy-900/80 p-5">
          <p className="text-xs text-white/40">쇼핑몰 최근 7일</p>
          <div className="mt-2 flex items-end gap-1" style={{ height: 36 }}>
            {(shopStats.daily.length > 0 ? shopStats.daily.slice(0, 7).reverse() : Array(7).fill({ views: 0 })).map((d, i) => {
              const max = Math.max(...shopStats.daily.map(x => x.views), 1);
              return <div key={i} className="flex-1 rounded-sm bg-ocean-400" style={{ height: `${Math.max((d.views / max) * 100, 6)}%` }} title={`${d.date || ''}: ${d.views}회`} />;
            })}
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-navy-700/50 bg-navy-900/80 p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className={`rounded-lg ${card.bg} p-2.5 ${card.color}`}>{card.icon}</div>
              {card.badge && (
                <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-medium text-red-400">
                  {card.badge}
                </span>
              )}
            </div>
            <p className="text-sm text-white/60">{card.label}</p>
            <p className="mt-1 text-2xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => setActiveTab('notices')}
          className="rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
        >
          공지사항 작성
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className="rounded-lg border border-ocean-500/50 bg-ocean-500/10 px-5 py-2.5 text-sm font-semibold text-ocean-400 transition-colors hover:bg-ocean-500/20"
        >
          문의 확인
        </button>
      </div>

      {/* Recent items */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent notices */}
        <div className="rounded-xl border border-navy-700/50 bg-navy-900/80 p-5">
          <h3 className="mb-4 text-lg font-semibold text-white">최근 공지사항</h3>
          {notices.length === 0 ? (
            <p className="text-sm text-white/60">등록된 공지사항이 없습니다.</p>
          ) : (
            <div className="space-y-3">
              {notices.slice(0, 3).map((n) => (
                <div key={n.id} className="flex items-center justify-between rounded-lg bg-navy-800/50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    {n.pinned && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-gold-400">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                    <span className="text-sm text-white/80">{n.title}</span>
                  </div>
                  <span className="text-xs text-white/60">{new Date(n.date).toLocaleDateString('ko-KR')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent inquiries */}
        <div className="rounded-xl border border-navy-700/50 bg-navy-900/80 p-5">
          <h3 className="mb-4 text-lg font-semibold text-white">최근 문의</h3>
          {inquiries.length === 0 ? (
            <p className="text-sm text-white/60">접수된 문의가 없습니다.</p>
          ) : (
            <div className="space-y-3">
              {inquiries.slice(0, 3).map((inq) => (
                <div key={inq.id} className="flex items-center justify-between rounded-lg bg-navy-800/50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    {!inq.read && <span className="h-2 w-2 rounded-full bg-ocean-400" />}
                    <div>
                      <span className="text-sm text-white/80">{inq.company || '미입력'}</span>
                      <span className="ml-2 text-xs text-white/60">{inq.person}</span>
                    </div>
                  </div>
                  <span className="text-xs text-white/60">{new Date(inq.date).toLocaleDateString('ko-KR')}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Notices Tab
   ────────────────────────────────────────────── */
function NoticesTab({
  notices,
  refresh,
}: {
  notices: Notice[];
  refresh: () => void;
}) {
  const [editing, setEditing] = useState<Notice | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pinned, setPinned] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const openNew = () => {
    setEditing(null);
    setTitle('');
    setContent('');
    setPinned(false);
    setShowForm(true);
  };

  const openEdit = (n: Notice) => {
    setEditing(n);
    setTitle(n.title);
    setContent(n.content);
    setPinned(n.pinned);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!title.trim()) return;
    const notice: Notice = {
      id: editing?.id || generateId(),
      title: title.trim(),
      content: content.trim(),
      date: editing?.date || new Date().toISOString(),
      pinned,
    };
    saveNotice(notice);
    setShowForm(false);
    refresh();
  };

  const handleDelete = (id: string) => {
    removeNotice(id);
    setDeleteTarget(null);
    refresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">공지사항 관리</h2>
        <button
          onClick={openNew}
          className="rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
        >
          새 공지사항
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-navy-700/50 bg-navy-900 p-6 shadow-2xl">
            <h3 className="mb-5 text-lg font-bold text-white">
              {editing ? '공지사항 수정' : '새 공지사항'}
            </h3>
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-white/60">제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-navy-700/50 bg-navy-800 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-ocean-500"
                placeholder="공지사항 제목"
                autoFocus
              />
            </div>
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-white/60">내용</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full resize-none rounded-lg border border-navy-700/50 bg-navy-800 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-ocean-500"
                placeholder="공지사항 내용을 입력하세요"
              />
            </div>
            <label className="mb-6 flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
                className="h-4 w-4 rounded border-navy-700 bg-navy-800 text-gold-500 focus:ring-gold-500"
              />
              상단 고정
            </label>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-navy-700/50 px-5 py-2.5 text-sm text-white/60 transition-colors hover:bg-navy-800"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-navy-700/50 bg-navy-900 p-6 shadow-2xl">
            <h3 className="mb-3 text-lg font-bold text-white">삭제 확인</h3>
            <p className="mb-6 text-sm text-white/60">이 공지사항을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-navy-700/50 px-5 py-2.5 text-sm text-white/60 transition-colors hover:bg-navy-800"
              >
                취소
              </button>
              <button
                onClick={() => handleDelete(deleteTarget)}
                className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notices list */}
      {notices.length === 0 ? (
        <div className="rounded-xl border border-navy-700/30 bg-navy-900/50 p-12 text-center">
          <p className="text-white/60">등록된 공지사항이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notices.map((n) => (
            <div
              key={n.id}
              className="flex items-center justify-between rounded-xl border border-navy-700/30 bg-navy-900/60 px-5 py-4 transition-colors hover:bg-navy-800/60"
            >
              <div className="flex items-center gap-3">
                {n.pinned && (
                  <span className="rounded bg-gold-500/20 px-2 py-0.5 text-xs font-medium text-gold-400">
                    고정
                  </span>
                )}
                <span className="text-white/90">{n.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/60">
                  {new Date(n.date).toLocaleDateString('ko-KR')}
                </span>
                <button
                  onClick={() => openEdit(n)}
                  className="rounded-lg p-2 text-white/60 transition-colors hover:bg-navy-700 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </button>
                <button
                  onClick={() => setDeleteTarget(n.id)}
                  className="rounded-lg p-2 text-white/60 transition-colors hover:bg-red-500/20 hover:text-red-400"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Inquiries Tab
   ────────────────────────────────────────────── */
function InquiriesTab({
  inquiries,
  refresh,
}: {
  inquiries: Inquiry[];
  refresh: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleMarkRead = (id: string) => {
    markInquiryRead(id);
    refresh();
  };

  const handleDelete = (id: string) => {
    removeInquiry(id);
    setDeleteTarget(null);
    setExpanded(null);
    refresh();
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-white">문의 접수</h2>

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-navy-700/50 bg-navy-900 p-6 shadow-2xl">
            <h3 className="mb-3 text-lg font-bold text-white">삭제 확인</h3>
            <p className="mb-6 text-sm text-white/60">이 문의를 삭제하시겠습니까?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-navy-700/50 px-5 py-2.5 text-sm text-white/60 transition-colors hover:bg-navy-800"
              >
                취소
              </button>
              <button
                onClick={() => handleDelete(deleteTarget)}
                className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {inquiries.length === 0 ? (
        <div className="rounded-xl border border-navy-700/30 bg-navy-900/50 p-12 text-center">
          <p className="text-white/60">접수된 문의가 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {inquiries.map((inq) => (
            <div key={inq.id} className="rounded-xl border border-navy-700/30 bg-navy-900/60 transition-colors hover:bg-navy-800/60">
              {/* Header row */}
              <button
                onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  {!inq.read && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ocean-400" />}
                  <div>
                    <span className="font-medium text-white/90">{inq.company || '회사명 미입력'}</span>
                    <span className="ml-3 text-sm text-white/60">{inq.person || '이름 미입력'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {!inq.read && (
                    <span className="rounded-full bg-ocean-500/20 px-2.5 py-0.5 text-xs font-medium text-ocean-400">
                      미확인
                    </span>
                  )}
                  <span className="text-sm text-white/60">
                    {new Date(inq.date).toLocaleDateString('ko-KR')}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className={`h-4 w-4 text-white/60 transition-transform ${expanded === inq.id ? 'rotate-180' : ''}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </button>

              {/* Expanded detail */}
              {expanded === inq.id && (
                <div className="border-t border-navy-700/30 px-5 py-5">
                  <div className="mb-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <span className="text-xs font-medium text-white/60">연락처</span>
                      <p className="mt-0.5 text-sm text-white/80">{inq.phone || '-'}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-white/60">이메일</span>
                      <p className="mt-0.5 text-sm text-white/80">{inq.email || '-'}</p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <span className="text-xs font-medium text-white/60">문의 내용</span>
                    <p className="mt-1 whitespace-pre-wrap rounded-lg bg-navy-800/50 p-4 text-sm leading-relaxed text-white/80">
                      {inq.message || '-'}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {!inq.read && (
                      <button
                        onClick={() => handleMarkRead(inq.id)}
                        className="rounded-lg bg-ocean-500/20 px-4 py-2 text-sm font-medium text-ocean-400 transition-colors hover:bg-ocean-500/30"
                      >
                        확인 처리
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteTarget(inq.id)}
                      className="rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Site Management Tab
   ────────────────────────────────────────────── */
function SiteTab() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-white">사이트 관리</h2>

      <div className="space-y-6">
        {/* Pages */}
        <div className="rounded-xl border border-navy-700/50 bg-navy-900/80 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">페이지 구조</h3>
          <div className="space-y-2">
            {SITE_PAGES.map((page) => (
              <div
                key={page.url}
                className="flex items-center justify-between rounded-lg bg-navy-800/50 px-4 py-3"
              >
                <span className="text-sm text-white/80">{page.name}</span>
                <code className="rounded bg-navy-700/50 px-2 py-0.5 text-xs text-ocean-400">
                  {page.url}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Update instructions */}
        <div className="rounded-xl border border-navy-700/50 bg-navy-900/80 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">자료 업데이트 방법</h3>
          <div className="rounded-lg bg-navy-800/50 p-4">
            <p className="text-sm leading-relaxed text-white/80">
              이미지나 PDF를 추가하려면 <code className="rounded bg-navy-700/60 px-1.5 py-0.5 text-ocean-300">public/</code> 폴더에 파일을 추가하고 GitHub에 push하세요.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-gold-400">1.</span>
                <span>이미지: <code className="rounded bg-navy-700/60 px-1 text-xs text-ocean-300">public/images/</code> 폴더에 추가</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-gold-400">2.</span>
                <span>PDF: <code className="rounded bg-navy-700/60 px-1 text-xs text-ocean-300">public/docs/</code> 폴더에 추가</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-gold-400">3.</span>
                <span>git add, commit, push 실행</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Deploy status */}
        <div className="rounded-xl border border-navy-700/50 bg-navy-900/80 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">배포 상태</h3>
          <div className="flex items-start gap-3 rounded-lg bg-navy-800/50 p-4">
            <div className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-green-400" />
            <div>
              <p className="text-sm font-medium text-white/80">GitHub Pages로 배포됩니다</p>
              <p className="mt-1 text-sm text-white/60">
                main 브랜치에 push하면 자동 빌드됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Sidebar Menu Item
   ────────────────────────────────────────────── */
function MenuItem({
  icon,
  label,
  active,
  onClick,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
        active
          ? 'bg-ocean-500/15 text-ocean-400'
          : 'text-white/60 hover:bg-navy-800 hover:text-white/80'
      }`}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}

/* ──────────────────────────────────────────────
   Main Admin Page
   ────────────────────────────────────────────── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const refreshData = useCallback(() => {
    setNotices(getNotices());
    setInquiries(getInquiries());
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('seopung_admin_auth') === 'true') {
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) refreshData();
  }, [authed, refreshData]);

  const handleLogout = () => {
    sessionStorage.removeItem('seopung_admin_auth');
    setAuthed(false);
  };

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  const unreadCount = inquiries.filter((i) => !i.read).length;

  const menuItems = [
    {
      id: 'dashboard',
      label: '대시보드',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
    },
    {
      id: 'notices',
      label: '공지사항',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
        </svg>
      ),
    },
    {
      id: 'inquiries',
      label: '문의 접수',
      badge: unreadCount,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      id: 'site',
      label: '사이트 관리',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-navy-950 font-pretendard">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-navy-700/30 bg-navy-900 transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-navy-700/30 px-6 py-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg">
            <Image src={getImagePath('/images/logo.png')} alt="서풍 로고" width={40} height={40} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">서풍</p>
            <p className="text-xs text-white/60">관리자</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              badge={item.badge}
            />
          ))}
        </nav>

        {/* Bottom links */}
        <div className="border-t border-navy-700/30 px-3 py-4 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition-colors hover:bg-navy-800 hover:text-white/80"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            홈페이지 보기
          </a>
          <a
            href="https://shop.seopung.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition-colors hover:bg-navy-800 hover:text-white/80"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            서풍몰 쇼핑몰
          </a>
          <a
            href="https://shop.seopung.co.kr/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition-colors hover:bg-navy-800 hover:text-white/80"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            쇼핑몰 관리자
          </a>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 border-b border-navy-700/30 bg-navy-900/50 px-6 py-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-white/60 hover:bg-navy-800 lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-white/80">
            {menuItems.find((m) => m.id === activeTab)?.label || '대시보드'}
          </h1>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <DashboardTab notices={notices} inquiries={inquiries} setActiveTab={setActiveTab} />
          )}
          {activeTab === 'notices' && <NoticesTab notices={notices} refresh={refreshData} />}
          {activeTab === 'inquiries' && <InquiriesTab inquiries={inquiries} refresh={refreshData} />}
          {activeTab === 'site' && <SiteTab />}
        </main>
      </div>
    </div>
  );
}
