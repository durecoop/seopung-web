/**
 * Firebase Cloud Function - AI 글쓰기 보조 프록시
 *
 * 배포 방법:
 * 1. Firebase CLI 설치: npm install -g firebase-tools
 * 2. 로그인: firebase login
 * 3. 초기화 (이미 프로젝트가 있으면 스킵): firebase init functions
 * 4. 환경변수 설정: firebase functions:config:set anthropic.key="YOUR_ANTHROPIC_API_KEY"
 * 5. 배포: firebase deploy --only functions
 *
 * 또는 Vercel/Cloudflare Worker로 배포해도 됩니다.
 */

const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');

admin.initializeApp();

exports.aiAssist = onRequest({
  cors: true,
  region: 'asia-northeast3', // 서울 리전
}, async (req, res) => {
  // POST만 허용
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Firebase Auth 토큰 검증
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  try {
    await admin.auth().verifyIdToken(token);
  } catch {
    res.status(401).json({ error: '인증이 필요합니다.' });
    return;
  }

  const { systemPrompt, userPrompt } = req.body;

  if (!userPrompt) {
    res.status(400).json({ error: '프롬프트가 필요합니다.' });
    return;
  }

  // Firestore에서 API 키 읽기 또는 환경변수 사용
  let apiKey;
  try {
    const doc = await admin.firestore().doc('web_settings/main').get();
    apiKey = doc.data()?.aiApiKey;
  } catch {
    // fallback
  }

  if (!apiKey) {
    // firebase functions:config에서 읽기
    apiKey = process.env.ANTHROPIC_API_KEY;
  }

  if (!apiKey) {
    res.status(500).json({ error: 'AI API 키가 설정되지 않았습니다. Firestore web_settings 문서에 aiApiKey를 설정하거나 환경변수 ANTHROPIC_API_KEY를 설정하세요.' });
    return;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt || '수산물 OEM 전문기업 서풍의 콘텐츠를 전문적이고 자연스러운 한국어로 작성해주세요.',
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      res.status(response.status).json({ error: `AI API 오류: ${err}` });
      return;
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';

    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: `AI 요청 실패: ${err.message}` });
  }
});
