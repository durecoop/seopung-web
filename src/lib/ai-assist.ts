import { auth } from './firebase';
import { getWebSettings } from './admin-store';

const PRESETS: Record<string, string> = {
  news: '수산물 OEM 기업 서풍의 뉴스 기사를 작성해주세요. 전문적이고 신뢰감 있는 톤으로 작성합니다.',
  notice: '공지사항을 명확하고 간결하게 작성해주세요.',
  certification: '수산물 관련 인증/수상 내역에 대한 설명을 전문적으로 작성해주세요.',
  equipment: '수산물 가공 설비/장비에 대한 기술적 설명을 작성해주세요.',
  investment: '설비 투자 계획에 대한 설명을 작성해주세요.',
  history: '회사 연혁 항목을 간결하게 작성해주세요.',
  gallery: '갤러리 사진 캡션을 작성해주세요.',
  general: '주어진 내용을 전문적이고 자연스러운 한국어로 작성해주세요.',
};

export function getPresetPrompt(contentType: string): string {
  return PRESETS[contentType] || PRESETS.general;
}

export async function generateContent(params: {
  contentType: string;
  prompt: string;
  existingText?: string;
}): Promise<string> {
  const settings = await getWebSettings();

  if (!settings.aiEndpoint) {
    throw new Error('AI 엔드포인트가 설정되지 않았습니다. 설정 탭에서 AI API 엔드포인트를 입력해주세요.');
  }

  const token = await auth.currentUser?.getIdToken();

  const systemPrompt = getPresetPrompt(params.contentType);
  const userPrompt = params.existingText
    ? `기존 내용:\n${params.existingText}\n\n요청: ${params.prompt}`
    : params.prompt;

  const res = await fetch(settings.aiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      systemPrompt,
      userPrompt,
      contentType: params.contentType,
    }),
  });

  if (!res.ok) {
    throw new Error(`AI 요청 실패 (${res.status})`);
  }

  const data = await res.json();
  return data.text || data.content || '';
}
