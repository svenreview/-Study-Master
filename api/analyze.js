function extractResponseText(data) {
  if (typeof data?.output_text === 'string') return data.output_text;
  const chunks = [];
  for (const item of data?.output || []) {
    for (const part of item?.content || []) {
      if (typeof part?.text === 'string') chunks.push(part.text);
    }
  }
  return chunks.join('\n');
}

function parseJsonText(raw) {
  const clean = String(raw || '')
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  try { return JSON.parse(clean); } catch {}
  const first = clean.indexOf('{');
  const last = clean.lastIndexOf('}');
  if (first >= 0 && last > first) return JSON.parse(clean.slice(first, last + 1));
  throw new Error('AI 응답을 JSON으로 읽지 못했습니다.');
}

function buildPrompt(task, payload) {
  const start = Number(payload.startPage) || 1;
  const end = Number(payload.endPage) || start;
  const sourceMode = payload.sourceMode === 'images' ? 'images' : 'text';
  const source = String(payload.text || '').slice(0, 60000);
  const context = sourceMode === 'images'
    ? `자료명: ${payload.materialName || '학습자료'}\nPDF 페이지 범위: ${start}~${end}\n첨부된 페이지 이미지를 직접 읽으세요.`
    : `자료명: ${payload.materialName || '학습자료'}\n페이지 범위: ${start}~${end}\n\n[원문 시작]\n${source}\n[원문 끝]`;

  const common = sourceMode === 'images'
    ? `당신은 스캔 교재 이미지에 근거하는 학습 도우미입니다. 반드시 첨부된 페이지 이미지에서 실제로 읽을 수 있는 내용만 사용하세요. 이미지에 없는 사실을 보충하거나 일반지식으로 교정하지 마세요. 글자가 불명확하면 "이미지에서 확인 불가"라고 표시하세요. 각 이미지 직전에 PDF 페이지 번호가 제공됩니다. 응답은 설명 없이 유효한 JSON 하나만 출력하세요.`
    : `당신은 학습자료 근거형 학습 도우미입니다. 반드시 제공된 원문에만 근거하세요. 원문에 없는 사실을 보충하지 마세요. 모호하면 "원문에서 확인 불가"라고 표시하세요. 원문에는 [p.N] 형태의 페이지 표지가 포함될 수 있으므로 근거 페이지를 정확히 추적하세요. 응답은 설명 없이 유효한 JSON 하나만 출력하세요.`;

  if (task === 'summary') {
    return `${common}\n${context}\n\n다음 JSON 형식으로 학습 요약을 만드세요:\n{\n  "title":"짧은 범위 제목",\n  "summary":["핵심 1","핵심 2","핵심 3"],\n  "keywords":["키워드"],\n  "confusions":["헷갈리기 쉬운 대조 또는 확인 불가"],\n  "sourceNotes":[{"point":"근거가 되는 요점","excerpt":"이미지/원문의 매우 짧은 근거 구절","sourcePage":${start}}]\n}`;
  }

  if (task === 'ox') {
    const count = Math.max(3, Math.min(30, Number(payload.count || 10)));
    return `${common}\n${context}\n\n선택 범위만 사용하여 OX 학습문제 ${count}개를 만드세요. 핵심 개념 판별 문제를 우선하고, 틀린 문항은 실제 문장의 핵심 요소 하나를 최소한으로 바꾸는 방식으로 만드세요. sourcePage는 반드시 근거가 실제 등장하는 PDF 페이지 번호를 사용하고 ${start}~${end} 범위를 벗어나면 안 됩니다. sourceExcerpt는 정답 판정 근거가 되는 짧은 원문만 넣으세요.\nJSON 형식:\n{\n  "questions":[\n    {"text":"문장","answer":true,"explanation":"자료 근거 해설","sourceExcerpt":"매우 짧은 근거","sourcePage":${start}}\n  ]\n}`;
  }

  if (task === 'cards') {
    const count = Math.max(3, Math.min(40, Number(payload.count || 12)));
    return `${common}\n${context}\n\n선택 범위만 사용하여 학습카드 ${count}개를 만드세요. 질문과 답은 모두 자료에서 직접 확인할 수 있어야 하며, 자료 밖의 일반지식·추론·보충설명으로 답을 완성하지 마세요. sourcePage는 근거가 실제 등장하는 ${start}~${end} 사이 PDF 페이지 번호여야 합니다. sourceExcerpt는 카드 정답을 직접 뒷받침하는 짧은 원문만 넣으세요.\nJSON 형식:\n{\n  "cards":[\n    {"front":"짧은 질문 또는 개념 확인","back":"자료에서 확인되는 짧은 정답","sourceExcerpt":"짧은 근거","sourcePage":${start}}\n  ]\n}`;
  }

  if (task === 'blanks') {
    const count = Math.max(3, Math.min(30, Number(payload.count || 10)));
    return `${common}\n${context}\n\n선택 범위만 사용하여 빈칸 학습문제 ${count}개를 만드세요. 반드시 자료에 실제로 등장하는 핵심 용어·수치·개념 표현 하나만 빈칸으로 바꾸고, prompt에는 빈칸을 정확히 ____ 로 표시하세요. answer는 원문에 실제로 있는 표현이어야 합니다. 자료 밖의 동의어·일반지식으로 정답을 만들지 마세요. sourcePage는 실제 근거가 등장하는 ${start}~${end} 사이 PDF 페이지 번호여야 합니다. sourceExcerpt는 정답이 포함된 짧은 원문 근거를 넣으세요.\nJSON 형식:\n{\n  "blanks":[\n    {"prompt":"원문 기반 문장 ____","answer":"원문 표현","explanation":"자료 근거 해설","sourceExcerpt":"정답을 포함한 짧은 근거","sourcePage":${start}}\n  ]\n}`;
  }

  if (task === 'mcq') {
    const count = Math.max(3, Math.min(20, Number(payload.count || 10)));
    return `${common}\n${context}\n\n선택 범위만 사용하여 객관식 학습문제 ${count}개를 만드세요. 질문과 정답은 자료에서 직접 확인할 수 있어야 합니다. 각 문제의 choices는 4개를 목표로 하되, 선택지의 용어·표현도 가능한 한 같은 자료 범위에 실제 등장하는 표현을 재사용하세요. 자료에 근거한 선택지 4개를 만들 수 없으면 문제 수를 줄이고 사실을 새로 만들어내지 마세요. answerIndex는 0부터 시작합니다. sourcePage는 실제 근거가 등장하는 ${start}~${end} 사이 PDF 페이지 번호여야 하며 sourceExcerpt는 정답 판정 근거가 되는 짧은 원문이어야 합니다.\nJSON 형식:\n{\n  "questions":[\n    {"question":"자료 근거 질문","choices":["선택지1","선택지2","선택지3","선택지4"],"answerIndex":0,"explanation":"자료 근거 해설","sourceExcerpt":"짧은 근거","sourcePage":${start}}\n  ]\n}`;
  }

  if (task === 'tutor') {
    const q = String(payload.userPrompt || '').slice(0, 4000);
    const mode = String(payload.mode || 'explain');
    const allowOutside = Boolean(payload.allowOutside);
    const rule = allowOutside
      ? `먼저 자료에 근거해 답하고, 자료만으로 충분하지 않은 보충 지식은 supplementary 배열에만 별도로 적으세요. 보충 내용을 자료 원문처럼 표현하지 마세요.`
      : `반드시 제공된 자료 범위만 사용하세요. 자료에서 확인되지 않는 내용은 추측하지 말고 "자료에서 확인되지 않음"이라고 답하세요. supplementary는 빈 배열로 두세요.`;
    return `${common}\n${context}\n\n[사용자 요청]\n${q}\n[학습 방식] ${mode}\n\n${rule}\n응답 JSON:\n{\n  "answer":"학습 답변",\n  "sourceNotes":[{"point":"답변을 뒷받침하는 요점","excerpt":"짧은 자료 근거","sourcePage":${start}}],\n  "supplementary":[]\n}`;
  }

  if (task === 'structure') {
    return `${common}\n${context}\n\n이 범위의 실제 PART/CHAPTER/절 제목과 주제 전환을 기준으로 구조를 분석하세요. 이미지에 없는 장/절을 만들어내지 마세요. 각 unit의 page는 제목이나 해당 주제가 시작되는 실제 PDF 페이지 번호를 사용하고 ${start}~${end} 범위를 벗어나면 안 됩니다.\nJSON 형식:\n{\n  "detectedType":"이론서|문제집|이론+문제|노트",\n  "units":[{"title":"단원명","page":${start}}],\n  "learningPoints":["자료에서 직접 확인되는 핵심 학습 포인트"]\n}`;
  }

  throw new Error('지원하지 않는 AI 작업입니다.');
}

function buildInput(prompt, payload) {
  if (payload.sourceMode !== 'images') return prompt;
  const images = Array.isArray(payload.images) ? payload.images.slice(0, 5) : [];
  if (!images.length) throw new Error('스캔 PDF 페이지 이미지가 없습니다.');
  const content = [{ type: 'input_text', text: prompt }];
  for (const img of images) {
    const page = Number(img?.page);
    const dataUrl = String(img?.dataUrl || '');
    if (!page || !dataUrl.startsWith('data:image/')) continue;
    content.push({ type: 'input_text', text: `다음 이미지는 PDF p.${page} 입니다.` });
    content.push({ type: 'input_image', image_url: dataUrl, detail: 'high' });
  }
  if (content.length < 3) throw new Error('유효한 페이지 이미지가 없습니다.');
  return [{ role: 'user', content }];
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST만 지원합니다.' });
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: 'OPENAI_API_KEY가 설정되지 않았습니다.' });

  try {
    const { task, ...payload } = req.body || {};
    const prompt = buildPrompt(task, payload);
    const input = buildInput(prompt, payload);
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
        input,
        max_output_tokens: ['ox','cards','blanks','mcq','tutor'].includes(task) ? 6000 : 4000
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || `AI 요청 실패 (${response.status})`);
    const raw = extractResponseText(data);
    const result = parseJsonText(raw);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error?.message || 'AI 분석 중 오류가 발생했습니다.' });
  }
}
