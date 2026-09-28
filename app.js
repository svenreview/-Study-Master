const STORAGE_KEY='study-os-v19';
const LEGACY_STORAGE_KEYS=['study-os-v18','study-os-v17','study-os-v16','study-os-v15','study-os-v14','study-os-v13','study-os-v12','study-os-v11','study-os-v10','study-os-v9','study-os-v8','study-os-v7','study-os-v6','study-os-v5','study-os-v4','study-os-v3','study-os-v2','study-os-v1'];
const seed={
  projects:[{
    id:'p1',name:'공인중개사 통합',goal:'1·2차 자료 기반 개인 학습',createdAt:new Date().toISOString(),
    materials:[{
      id:'m1',name:'샘플 이론 메모',type:'text',sourceRole:'theory',
      content:'제1장 계약\n계약은 당사자 사이의 의사표시가 합치되어 성립한다.\n\n제2장 학습 예시\n틀린 문제는 오답 목록에 누적하여 반복 학습한다.',
      analysisStatus:'ready',analysis:{detectedType:'이론서',units:['제1장 계약','제2장 학습 예시'],chars:76,lines:5,stage:'구조화 완료'},createdAt:new Date().toISOString()
    }],
    questions:[
      {id:'q1',text:'샘플: 계약은 당사자 사이의 의사표시가 합치되어 성립한다.',answer:true,explanation:'샘플 자료의 첫 문장을 그대로 확인하는 OX 예시입니다.',source:'샘플 이론 메모 · 제1장 계약',attempts:0,wrong:0,streak:0,lastResult:null},
      {id:'q2',text:'샘플: 학습 중 틀린 문제는 오답 목록에 누적하지 않는다.',answer:false,explanation:'Study OS에서는 틀린 문제를 오답 목록에 자동 누적하고 반복 학습합니다.',source:'Study OS 사용 예시',attempts:0,wrong:0,streak:0,lastResult:null},
      {id:'q3',text:'샘플: 같은 문제를 자주 틀리면 취약문제로 분류할 수 있다.',answer:true,explanation:'오답 횟수와 최근 결과를 바탕으로 취약문제를 분리하는 구조입니다.',source:'Study OS 사용 예시',attempts:0,wrong:0,streak:0,lastResult:null}
    ],
    notes:[],outputs:[],studyFocus:'오늘 가장 중요한 학습 한 가지',progress:[
      {id:'u1',unit:'제1장 계약',theory:60,practice:35,review:10,sourceMaterialId:'m1'},
      {id:'u2',unit:'제2장 학습 예시',theory:20,practice:0,review:0,sourceMaterialId:'m1'}
    ],sessions:[],dailyGoal:{minutes:50,pages:20,questions:30}
  }],activeProjectId:'p1'
};



// v8: 스캔 이미지형 PDF를 위한 학습자료 프리셋.
// 원문 자체를 내장하지 않고 공개적인 목차/단원명과 PDF 내부 시작 페이지만 기록합니다.
const KNOWN_SOURCE_PROFILES=[
  {
    match:/공인중개사\s*1차\s*기출지문/i,
    name:'에듀윌 공인중개사 1차 기출지문 정리노트',
    role:'problem', printedPageOffset:0,
    coverage:'부동산학개론 + 민법 및 민사특별법 · PDF 45p',
    units:[
      ['부동산학개론 · PART 1 부동산학 총론 · CH01 부동산학 서설',2],
      ['부동산학개론 · PART 1 부동산학 총론 · CH02 부동산의 개념과 분류',3],
      ['부동산학개론 · PART 1 부동산학 총론 · CH03 부동산의 특성',4],
      ['부동산학개론 · PART 2 부동산학 각론 · CH01 부동산경제론',5],
      ['부동산학개론 · PART 2 부동산학 각론 · CH02 부동산시장론',6],
      ['부동산학개론 · PART 2 부동산학 각론 · CH03 부동산정책론',8],
      ['부동산학개론 · PART 2 부동산학 각론 · CH04 부동산투자론',10],
      ['부동산학개론 · PART 2 부동산학 각론 · CH05 부동산금융론',12],
      ['부동산학개론 · PART 2 부동산학 각론 · CH06 부동산개발 및 관리론',13],
      ['부동산학개론 · PART 3 부동산 감정평가론 · CH01 감정평가의 기초이론',16],
      ['부동산학개론 · PART 3 부동산 감정평가론 · CH02 부동산가격이론',17],
      ['부동산학개론 · PART 3 부동산 감정평가론 · CH03 감정평가의 방식',19],
      ['부동산학개론 · PART 3 부동산 감정평가론 · CH04 부동산가격공시제도',21],
      ['민법 및 민사특별법 · PART 1 민법총칙 · CH01 권리변동 일반',22],
      ['민법 및 민사특별법 · PART 1 민법총칙 · CH02 법률행위',23],
      ['민법 및 민사특별법 · PART 1 민법총칙 · CH03 의사표시',24],
      ['민법 및 민사특별법 · PART 1 민법총칙 · CH04 법률행위의 대리',25],
      ['민법 및 민사특별법 · PART 1 민법총칙 · CH05 무효와 취소',26],
      ['민법 및 민사특별법 · PART 1 민법총칙 · CH06 조건과 기한',27],
      ['민법 및 민사특별법 · PART 2 물권법 · CH01 물권법 일반',28],
      ['민법 및 민사특별법 · PART 2 물권법 · CH02 물권의 변동',29],
      ['민법 및 민사특별법 · PART 2 물권법 · CH03 점유권',30],
      ['민법 및 민사특별법 · PART 2 물권법 · CH04 소유권',31],
      ['민법 및 민사특별법 · PART 2 물권법 · CH05 용익물권',33],
      ['민법 및 민사특별법 · PART 2 물권법 · CH06 담보물권',34],
      ['민법 및 민사특별법 · PART 3 계약법 · CH01 계약법 총론',36],
      ['민법 및 민사특별법 · PART 3 계약법 · CH02 매매',37],
      ['민법 및 민사특별법 · PART 3 계약법 · CH03 교환',39],
      ['민법 및 민사특별법 · PART 3 계약법 · CH04 임대차',39],
      ['민법 및 민사특별법 · PART 4 민사특별법 · CH01 주택임대차보호법',41],
      ['민법 및 민사특별법 · PART 4 민사특별법 · CH02 상가건물 임대차보호법',42],
      ['민법 및 민사특별법 · PART 4 민사특별법 · CH03 집합건물의 소유 및 관리에 관한 법률',43],
      ['민법 및 민사특별법 · PART 4 민사특별법 · CH04 가등기담보 등에 관한 법률',44],
      ['민법 및 민사특별법 · PART 4 민사특별법 · CH05 부동산 실권리자명의 등기에 관한 법률',45]
    ]
  },
  {
    match:/^1차(?:\(\d+\))?\.pdf$/i,
    name:'2023 에듀윌 공인중개사 기초입문서 1차 · 업로드본',
    role:'theory', printedPageOffset:12,
    coverage:'업로드본: 부동산학개론 · 교재 p.23~162',
    units:[
      ['부동산학개론 · PART 1 부동산학 총론 · CH01 부동산학 서설',11],
      ['부동산학개론 · PART 1 부동산학 총론 · CH02 부동산의 개념과 속성',14],
      ['부동산학개론 · PART 1 부동산학 총론 · CH03 부동산의 특성',24],
      ['부동산학개론 · PART 1 확인문제',30],
      ['부동산학개론 · PART 2 부동산학 각론 · CH01 부동산경제론',32],
      ['부동산학개론 · PART 2 부동산학 각론 · CH02 부동산시장론',52],
      ['부동산학개론 · PART 2 부동산학 각론 · CH03 부동산정책론',66],
      ['부동산학개론 · PART 2 부동산학 각론 · CH04 부동산투자론',77],
      ['부동산학개론 · PART 2 부동산학 각론 · CH05 부동산금융론',94],
      ['부동산학개론 · PART 2 부동산학 각론 · CH06 부동산개발 및 관리론',102],
      ['부동산학개론 · PART 2 확인문제',121],
      ['부동산학개론 · PART 3 부동산 감정평가론 · CH01 감정평가의 기초',125],
      ['부동산학개론 · PART 3 부동산 감정평가론 · CH02 부동산의 가격(가치)이론',128],
      ['부동산학개론 · PART 3 부동산 감정평가론 · CH03 감정평가의 3방식',136],
      ['부동산학개론 · PART 3 부동산 감정평가론 · CH04 부동산가격공시제도',146]
    ]
  },
  {
    match:/^2차(?:\(\d+\))?\.pdf$/i,
    name:'2023 에듀윌 공인중개사 기초입문서 2차 · 업로드본',
    role:'theory', printedPageOffset:12,
    coverage:'업로드본: SUBJECT 1 공인중개사법령 및 중개실무 · 교재 p.25~162',
    units:[
      ['공인중개사법령 및 중개실무 · PART 1 공인중개사법령 · CH01 총칙',13],
      ['공인중개사법령 및 중개실무 · PART 1 공인중개사법령 · CH02 공인중개사제도',18],
      ['공인중개사법령 및 중개실무 · PART 1 공인중개사법령 · CH03 중개사무소 개설등록 및 결격사유',21],
      ['공인중개사법령 및 중개실무 · PART 1 공인중개사법령 · CH04 중개업무',26],
      ['공인중개사법령 및 중개실무 · PART 1 공인중개사법령 · CH05 중개계약 및 부동산거래정보망',37],
      ['공인중개사법령 및 중개실무 · PART 1 공인중개사법령 · CH06 개업공인중개사의 의무 및 책임',43],
      ['공인중개사법령 및 중개실무 · PART 1 공인중개사법령 · CH07 손해배상책임과 반환채무이행보장',47],
      ['공인중개사법령 및 중개실무 · PART 1 공인중개사법령 · CH08 중개보수',50],
      ['공인중개사법령 및 중개실무 · PART 1 공인중개사법령 · CH09 공인중개사협회 및 교육·분칙·신고센터 등',53],
      ['공인중개사법령 및 중개실무 · PART 1 공인중개사법령 · CH10 지도·감독 및 행정처분',62],
      ['공인중개사법령 및 중개실무 · PART 1 공인중개사법령 · CH11 벌칙(행정벌)',68],
      ['공인중개사법령 및 중개실무 · PART 1 공인중개사법령 · CH12 부동산 거래신고 등에 관한 법률',72],
      ['공인중개사법령 및 중개실무 · PART 1 확인문제',92],
      ['공인중개사법령 및 중개실무 · PART 2 중개실무 · CH01 중개실무 총설 및 중개의뢰 접수',96],
      ['공인중개사법령 및 중개실무 · PART 2 중개실무 · CH02 중개대상물 조사 및 확인',105],
      ['공인중개사법령 및 중개실무 · PART 2 중개실무 · CH03 거래계약의 체결',116],
      ['공인중개사법령 및 중개실무 · PART 2 중개실무 · CH04 개별적 중개실무',119]
    ]
  }
];
function knownProfileFor(name,pageCount=null){
  const n=String(name||'');
  const direct=KNOWN_SOURCE_PROFILES.find(p=>p.match.test(n));
  if(direct)return direct;
  const pc=Number(pageCount||0);
  // 파일명이 바뀌어도 대표 샘플과 페이지 수/키워드가 함께 맞을 때만 보조 매칭합니다.
  if(pc===45 && /공인중개사|기출|지문/i.test(n))return KNOWN_SOURCE_PROFILES[0];
  if(pc===150 && /공인중개사|1차|기초|입문/i.test(n))return KNOWN_SOURCE_PROFILES[1];
  if(pc===150 && /공인중개사|2차|중개실무|중개사법/i.test(n))return KNOWN_SOURCE_PROFILES[2];
  return null;
}
function displayPageLabel(m,page){
  const p=Math.max(1,Number(page||1));
  const off=Number(m?.printedPageOffset||0);
  return off?`PDF p.${p} · 교재 p.${p+off}`:`p.${p}`;
}


// v19: 실제 업로드한 2023 에듀윌 1차 기초입문서의 CH01(부동산학 서설)
// PDF p.11~13 / 교재 p.23~25를 근거로 만든 검증용 SOURCE ONLY 스타터 세트입니다.
// 원문 전체를 복제하지 않고 핵심 학습 포인트만 짧게 구조화합니다.
const BUILTIN_STARTER_VERSION='realestate-2023-1st-ch01-v1';
const BUILTIN_STARTER_SET={
  startPage:11,endPage:13,
  cards:[
    {front:'김영진 교수의 정의에서 부동산학의 학문 성격은?',back:'종합응용과학',sourcePage:11,sourceExcerpt:'종합응용과학'},
    {front:'조주현 교수 정의의 세 가지 접근 측면은?',back:'법적·경제적·기술적 측면',sourcePage:11,sourceExcerpt:'법적·경제적·기술적 측면'},
    {front:'부동산학은 인간과 부동산의 상호작용을 연구하는 어떤 과학인가?',back:'사회과학',sourcePage:11,sourceExcerpt:'사회과학'},
    {front:'현실의 사회문제 해결을 지향하는 부동산학의 성격은?',back:'응용과학',sourcePage:11,sourceExcerpt:'응용과학'},
    {front:'부동산학의 두 가지 연구대상은?',back:'부동산현상과 부동산활동',sourcePage:12,sourceExcerpt:'부동산현상 · 부동산활동'},
    {front:'부동산의 복합개념을 이루는 3대 측면은?',back:'법률적·경제적·기술적 측면',sourcePage:12,sourceExcerpt:'법률·경제·기술의 3대 측면'},
    {front:'능률성의 원칙과 관련된 대표 이용 원칙은?',back:'최유효이용의 원칙',sourcePage:13,sourceExcerpt:'최유효이용의 원칙'},
    {front:'안전성의 원칙에서 함께 고려하는 세 측면은?',back:'법률적·경제적·기술적 안전성',sourcePage:13,sourceExcerpt:'법률적 안전성·경제적 안전성·기술적 안전성'},
    {front:'경제성의 원칙이 지향하는 기준은?',back:'최소의 비용으로 최대의 효과',sourcePage:13,sourceExcerpt:'최소의 비용으로 최대의 효과'}
  ],
  ox:[
    {text:'부동산학은 종합응용과학으로 정의될 수 있다.',answer:true,explanation:'김영진 교수의 정의에서 부동산학을 종합응용과학으로 설명한다.',sourcePage:11,sourceExcerpt:'종합응용과학'},
    {text:'조주현 교수의 정의는 부동산을 법적·경제적·기술적 측면에서 접근한다.',answer:true,explanation:'조주현 교수의 정의에 세 측면이 함께 제시된다.',sourcePage:11,sourceExcerpt:'법적·경제적·기술적 측면'},
    {text:'부동산학의 연구대상은 부동산현상뿐이며 부동산활동은 제외된다.',answer:false,explanation:'교재는 부동산현상과 부동산활동을 모두 연구대상으로 제시한다.',sourcePage:12,sourceExcerpt:'부동산현상 · 부동산활동'},
    {text:'부동산의 복합개념은 법률적·경제적·기술적 측면을 복합적으로 본다.',answer:true,explanation:'복합개념은 세 측면을 함께 이해하는 틀로 설명된다.',sourcePage:12,sourceExcerpt:'법률·경제·기술의 3대 측면'},
    {text:'능률성의 원칙은 최유효이용의 원칙 및 거래질서 확립과 관련된다.',answer:true,explanation:'교재는 능률성의 원칙에서 최유효이용과 거래질서 확립을 함께 제시한다.',sourcePage:13,sourceExcerpt:'최유효이용의 원칙 · 거래질서 확립의 원칙'},
    {text:'안전성의 원칙은 법률적 안전성만 고려하면 충분하다고 본다.',answer:false,explanation:'법률적·경제적·기술적 안전성을 함께 고려해야 한다고 설명한다.',sourcePage:13,sourceExcerpt:'법률적 안전성·경제적 안전성·기술적 안전성'},
    {text:'경제성의 원칙은 최소의 비용으로 최대의 효과를 얻는 것을 지향한다.',answer:true,explanation:'교재의 경제성 설명과 일치한다.',sourcePage:13,sourceExcerpt:'최소의 비용으로 최대의 효과'}
  ],
  blanks:[
    {prompt:'김영진 교수의 정의에서 부동산학은 ____이다.',answer:'종합응용과학',sourcePage:11,sourceExcerpt:'종합응용과학'},
    {prompt:'조주현 교수는 부동산을 법적·경제적·____ 측면에서 접근한다.',answer:'기술적',sourcePage:11,sourceExcerpt:'법적·경제적·기술적 측면'},
    {prompt:'부동산학의 연구대상은 부동산현상과 ____이다.',answer:'부동산활동',sourcePage:12,sourceExcerpt:'부동산현상 · 부동산활동'},
    {prompt:'부동산의 복합개념은 법률적·경제적·____ 측면의 복합이다.',answer:'기술적',sourcePage:12,sourceExcerpt:'법률·경제·기술의 3대 측면'},
    {prompt:'능률성의 원칙과 관련된 대표 원칙은 ____의 원칙이다.',answer:'최유효이용',sourcePage:13,sourceExcerpt:'최유효이용의 원칙'},
    {prompt:'경제성의 원칙은 최소의 비용으로 ____의 효과를 지향한다.',answer:'최대',sourcePage:13,sourceExcerpt:'최소의 비용으로 최대의 효과'}
  ],
  mcq:[
    {question:'교재가 제시한 부동산학의 두 연구대상은?',choices:['부동산현상과 부동산활동','법률적 측면과 기술적 측면','최유효이용과 거래질서','안전성과 경제성'],answerIndex:0,explanation:'부동산현상과 부동산활동을 연구대상으로 구분한다.',sourcePage:12,sourceExcerpt:'부동산현상 · 부동산활동'},
    {question:'부동산의 복합개념을 이루는 3대 측면으로 맞는 것은?',choices:['법률적·경제적·기술적','사회적·법률적·안전적','경제적·능률적·안전적','법률적·거래적·이용적'],answerIndex:0,explanation:'교재는 법률·경제·기술의 세 측면을 제시한다.',sourcePage:12,sourceExcerpt:'법률·경제·기술의 3대 측면'},
    {question:'능률성의 원칙과 가장 직접적으로 연결되는 것은?',choices:['최유효이용의 원칙','법률적 안전성','최소 비용·최대 효과','부동산현상'],answerIndex:0,explanation:'능률성의 원칙에서 최유효이용이 대표적으로 제시된다.',sourcePage:13,sourceExcerpt:'최유효이용의 원칙'},
    {question:'안전성의 원칙에서 함께 고려하는 조합은?',choices:['법률적·경제적·기술적 안전성','법률적·능률적·거래적 안전성','사회적·기술적·이용적 안전성','경제적·최유효·거래질서 안전성'],answerIndex:0,explanation:'교재는 세 가지 안전성을 함께 고려하도록 설명한다.',sourcePage:13,sourceExcerpt:'법률적 안전성·경제적 안전성·기술적 안전성'},
    {question:'경제성의 원칙을 가장 잘 나타내는 표현은?',choices:['최소의 비용으로 최대의 효과','최유효이용을 통한 이용 증대','법률적 안전성의 우선','부동산현상만을 연구'],answerIndex:0,explanation:'경제성은 비용과 효과의 합리적 관계로 설명된다.',sourcePage:13,sourceExcerpt:'최소의 비용으로 최대의 효과'}
  ],
  summary:{
    title:'CH01 부동산학 서설 · 핵심요약',
    summary:[
      '부동산학은 종합응용과학 또는 종합응용사회과학의 성격으로 설명된다.',
      '부동산을 이해할 때 법률적·경제적·기술적 측면을 함께 보는 복합개념이 중요하다.',
      '부동산학의 연구대상은 부동산현상과 부동산활동이다.',
      '일반원칙의 핵심 축은 능률성·안전성·경제성이다.',
      '능률성은 최유효이용과 거래질서 확립, 안전성은 법률·경제·기술의 안전, 경제성은 최소 비용·최대 효과와 연결된다.'
    ],
    sourceNotes:[
      {point:'정의',excerpt:'종합응용과학',sourcePage:11},
      {point:'복합개념',excerpt:'법률·경제·기술의 3대 측면',sourcePage:12},
      {point:'연구대상',excerpt:'부동산현상 · 부동산활동',sourcePage:12},
      {point:'능률성',excerpt:'최유효이용의 원칙',sourcePage:13},
      {point:'경제성',excerpt:'최소의 비용으로 최대의 효과',sourcePage:13}
    ]
  }
};

function ensureBuiltInStarterSets(p){
  if(!p?.materials?.length)return;
  for(const m of p.materials){
    const profile=knownProfileFor(m.name,m.pageCount);
    if(!profile || profile.role!=='theory' || Number(m.pageCount)!==150 || profile!==KNOWN_SOURCE_PROFILES[1])continue;
    if(m.builtinStarterVersion===BUILTIN_STARTER_VERSION)continue;
    const s=BUILTIN_STARTER_SET;
    const existing=(p.sourceArtifacts||[]).some(a=>a.materialId===m.id&&Number(a.startPage)===s.startPage&&Number(a.endPage)===s.endPage);
    if(existing){m.builtinStarterVersion=BUILTIN_STARTER_VERSION;continue}

    const cardIds=[];
    for(const x of s.cards){const c={id:uid(),front:x.front,back:x.back,materialId:m.id,materialName:m.name,sourcePage:x.sourcePage,sourceExcerpt:x.sourceExcerpt,rangeStart:s.startPage,rangeEnd:s.endPage,createdAt:new Date().toISOString(),known:0,missed:0,lastRating:null,builtin:true};p.flashcards.push(c);cardIds.push(c.id)}
    saveSourceArtifact(p,m,'cards',s.startPage,s.endPage,{cardIds,builtin:true});

    const questionIds=[];
    const unit='부동산학개론 · PART 1 부동산학 총론 · CH01 부동산학 서설';
    for(const x of s.ox){const q={id:uid(),text:x.text,answer:x.answer,explanation:x.explanation,source:`${m.name} · ${displayPageLabel(m,x.sourcePage)} · ${unit}`,sourceExcerpt:x.sourceExcerpt,materialId:m.id,unit,sourcePage:x.sourcePage,attempts:0,wrong:0,streak:0,lastResult:null,builtin:true};p.questions.push(q);questionIds.push(q.id)}
    saveSourceArtifact(p,m,'ox',s.startPage,s.endPage,{questionIds,builtin:true});

    const blankIds=[];
    for(const x of s.blanks){const q={id:uid(),prompt:x.prompt,answer:x.answer,explanation:'선택한 교재 범위의 실제 표현을 회상합니다.',sourceExcerpt:x.sourceExcerpt,materialId:m.id,materialName:m.name,sourcePage:x.sourcePage,rangeStart:s.startPage,rangeEnd:s.endPage,attempts:0,wrong:0,known:0,lastResult:null,createdAt:new Date().toISOString(),builtin:true};p.blankQuestions.push(q);blankIds.push(q.id)}
    saveSourceArtifact(p,m,'blanks',s.startPage,s.endPage,{blankIds,builtin:true});

    const mcqIds=[];
    for(const x of s.mcq){const q={id:uid(),question:x.question,choices:x.choices,answerIndex:x.answerIndex,explanation:x.explanation,sourceExcerpt:x.sourceExcerpt,materialId:m.id,materialName:m.name,sourcePage:x.sourcePage,rangeStart:s.startPage,rangeEnd:s.endPage,attempts:0,wrong:0,correct:0,lastResult:null,createdAt:new Date().toISOString(),builtin:true};p.mcqQuestions.push(q);mcqIds.push(q.id)}
    saveSourceArtifact(p,m,'mcq',s.startPage,s.endPage,{mcqIds,builtin:true});
    saveSourceArtifact(p,m,'summary',s.startPage,s.endPage,{result:s.summary,builtin:true});

    m.builtinStarterVersion=BUILTIN_STARTER_VERSION;
    m.analysis=m.analysis||{};
    m.analysis.starterSet=`CH01 부동산학 서설 · ${displayPageLabel(m,s.startPage)}~${displayPageLabel(m,s.endPage)}`;
  }
}

let state=load();
let currentView='dashboard';
const SIMPLE_MODE_KEY='study-os-simple-mode';
let simpleMode=localStorage.getItem(SIMPLE_MODE_KEY)!=='false';
let oxMode='all';
let oxQueue=[];
let oxIndex=0;
let focusTimerId=null;
let focusRemaining=0;
let focusPlannedMinutes=25;
let activeMaterialDialogId=null;
let aiConfigured=null;
let oxUnitFilter=null;
let oxUnitFilterLabel='';

const MATERIAL_DB_NAME='study-os-materials-v1';
const MATERIAL_STORE='payloads';
function openMaterialDB(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open(MATERIAL_DB_NAME,1);
    req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains(MATERIAL_STORE))db.createObjectStore(MATERIAL_STORE,{keyPath:'id'})};
    req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
  });
}
async function putMaterialPayload(id,payload){
  const db=await openMaterialDB();
  return new Promise((resolve,reject)=>{const tx=db.transaction(MATERIAL_STORE,'readwrite');tx.objectStore(MATERIAL_STORE).put({id,...payload});tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)});
}
async function getMaterialPayload(id){
  const db=await openMaterialDB();
  return new Promise((resolve,reject)=>{const tx=db.transaction(MATERIAL_STORE,'readonly');const req=tx.objectStore(MATERIAL_STORE).get(id);req.onsuccess=()=>resolve(req.result||null);req.onerror=()=>reject(req.error)});
}
async function deleteMaterialPayload(id){
  const db=await openMaterialDB();
  return new Promise((resolve,reject)=>{const tx=db.transaction(MATERIAL_STORE,'readwrite');tx.objectStore(MATERIAL_STORE).delete(id);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)});
}


function load(){
  try{
    const own=localStorage.getItem(STORAGE_KEY);if(own)return JSON.parse(own);
    for(const key of LEGACY_STORAGE_KEYS){const legacy=localStorage.getItem(key);if(legacy){const parsed=JSON.parse(legacy);localStorage.setItem(STORAGE_KEY,JSON.stringify(parsed));return parsed}}
    return structuredClone(seed);
  }catch{return structuredClone(seed)}
}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));renderProjectSelect();updateBadges()}
function project(){const p=state.projects.find(p=>p.id===state.activeProjectId)||state.projects[0]; if(!p)return null; p.materials=p.materials||[];p.questions=p.questions||[];p.notes=p.notes||[];p.outputs=p.outputs||[];p.progress=p.progress||[];p.sessions=p.sessions||[];p.dailyGoal=p.dailyGoal||{minutes:50,pages:20,questions:30};p.studyFocus=p.studyFocus||'오늘 가장 중요한 학습 한 가지';p.guidedSessions=p.guidedSessions||[];p.flashcards=p.flashcards||[];p.blankQuestions=p.blankQuestions||[];p.mcqQuestions=p.mcqQuestions||[];p.sourceArtifacts=p.sourceArtifacts||[];p.toolLocks=p.toolLocks||{};p.setStudySessions=p.setStudySessions||[];p.reviewPlans=p.reviewPlans||[];ensureBuiltInStarterSets(p);return p}
function esc(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function pct(n,d){return d?Math.round(n/d*100):0}
function uid(){return Math.random().toString(36).slice(2)+Date.now().toString(36)}
function studySessions(p){return (p.sessions||[]).filter(s=>s.kind==='study'||(!s.questionId&&s.minutes))}
function localDateKey(d=new Date()){const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${day}`}
function todayKey(){return localDateKey(new Date())}
function weekStart(){const d=new Date();const day=(d.getDay()+6)%7;d.setHours(0,0,0,0);d.setDate(d.getDate()-day);return d}
function sum(a,fn){return a.reduce((t,x)=>t+(fn(x)||0),0)}
function sessionStats(p){
  const all=studySessions(p), today=all.filter(s=>s.date===todayKey()), ws=weekStart();
  const week=all.filter(s=>new Date(s.createdAt||s.date)>=ws);
  return {
    all,today,week,
    todayMinutes:sum(today,s=>s.minutes), todayPages:sum(today,s=>s.pages), todayQuestions:sum(today,s=>s.questions),
    weekMinutes:sum(week,s=>s.minutes),
    avgMinutes:all.length?Math.round(sum(all,s=>s.minutes)/all.length):0,
    avgPages:all.length?Math.round(sum(all,s=>s.pages)/all.length):0,
    avgQuestions:all.length?Math.round(sum(all,s=>s.questions)/all.length):0
  }
}
function learningRhythm(p){
  const all=studySessions(p).filter(s=>s.minutes>0);
  const withPlan=all.filter(s=>Number(s.expectedMinutes)>0);
  const avgPlanError=withPlan.length?Math.round(sum(withPlan,s=>Math.abs((s.minutes||0)-(s.expectedMinutes||0))/s.expectedMinutes*100)/withPlan.length):0;
  const focused=all.filter(s=>Number(s.focusRating)>0);
  const buckets={};
  focused.forEach(s=>{const h=new Date(s.createdAt||s.date).getHours();const label=h<12?'오전':h<18?'오후':'저녁';(buckets[label]??=[]).push(Number(s.focusRating));});
  let best='기록 필요',bestAvg=-1;Object.entries(buckets).forEach(([k,v])=>{const a=sum(v,x=>x)/v.length;if(a>bestAvg){bestAvg=a;best=k}});
  return {avgPlanError,bestFocus:best,bestFocusScore:bestAvg>0?bestAvg.toFixed(1):'-'};
}
function goalBar(value,target){const n=target?Math.min(100,Math.round(value/target*100)):0;return `<div class="goal-line"><div class="row"><span>${value} / ${target}</span><strong>${n}%</strong></div><div class="progress-track"><div class="progress-bar" style="width:${n}%"></div></div></div>`}
function titleFor(v){return({dashboard:'오늘 학습',session:'자동 학습 세션',materials:'학습자료',progress:'진도 관리',history:'학습 기록',theory:'이론 학습',recall:'회상·설명 학습',summary:'핵심 요약',sets:'학습세트',setStudy:'세트 학습',ox:'OX 반복학습',flashcards:'카드 학습',blanks:'빈칸 학습',mcq:'객관식 학습',aiStudy:'AI 학습',wrong:'오답 복습',weak:'취약문제',notes:'이론·내 노트'})[v]||'Study OS'}
function roleLabel(role){return({auto:'자동분류',theory:'이론서',problem:'문제집',mixed:'이론+문제',note:'노트'})[role]||'자동분류'}
function weakLevel(q){
  const w=Number(q?.wrong||0),streak=Number(q?.streak||0);
  if(w>=3&&streak>=2)return {key:'recovered',label:'안정화',className:'good'};
  if(w>=3)return {key:'weak',label:'취약',className:'bad'};
  if(w===2)return {key:'watch',label:'주의',className:'warn'};
  if(w===1)return {key:'wrong',label:'오답',className:'warn'};
  return {key:'new',label:'신규',className:''};
}
function isWeakCurrent(q){return Number(q?.wrong||0)>=3&&Number(q?.streak||0)<2}
function materialUnits(m){return (m?.analysis?.units||[]).map((u,i)=>typeof u==='string'?{title:u,page:1,index:i}:{...u,index:i})}
function curriculumKey(title=''){
  const raw=String(title||'');
  const subject=/부동산학개론/.test(raw)?'re':(/민법|민사특별법/.test(raw)?'civil':'');
  const part=(raw.match(/PART\s*0*(\d+)/i)||[])[1]||'';
  const ch=(raw.match(/(?:CH(?:APTER)?)\s*0*(\d+)/i)||[])[1]||'';
  if(subject&&part&&ch)return `${subject}:p${Number(part)}:c${Number(ch)}`;
  return raw.toLowerCase().replace(/부동산학개론|민법\s*및\s*민사특별법|part\s*\d+|chapter\s*\d+|ch\s*\d+/gi,'').replace(/[·:()\[\]{}\s\-–—_]/g,'').trim();
}
function materialRole(m){
  if(['theory','problem','mixed','note'].includes(m?.sourceRole))return m.sourceRole;
  const t=String(m?.analysis?.detectedType||'');
  if(/문제집/.test(t))return 'problem';
  if(/이론\+문제|혼합/.test(t))return 'mixed';
  if(/이론서/.test(t))return 'theory';
  return 'auto';
}
function relatedUnitFor(p,sourceMaterialId,unitTitle,targetKind='theory'){
  const key=curriculumKey(unitTitle);if(!key)return null;
  const source=p.materials.find(m=>m.id===sourceMaterialId);
  const candidates=p.materials.filter(m=>m.id!==sourceMaterialId).filter(m=>{
    const r=materialRole(m);
    return targetKind==='theory'?(r==='theory'||r==='mixed'):(r==='problem'||r==='mixed');
  });
  for(const m of candidates){
    const u=materialUnits(m).find(x=>curriculumKey(x.title)===key);
    if(u)return {material:m,unit:u,range:getUnitRange(m,u.title)};
  }
  // 역할이 명확하지 않아도 같은 교육과정 키가 있으면 마지막 보조 매칭
  for(const m of p.materials.filter(m=>m.id!==sourceMaterialId)){
    const u=materialUnits(m).find(x=>curriculumKey(x.title)===key);
    if(u)return {material:m,unit:u,range:getUnitRange(m,u.title)};
  }
  return null;
}
function relatedTheoryForQuestion(p,q){
  if(!q?.materialId)return null;
  let unit=q.unit||'';
  if(!unit){
    const m=p.materials.find(x=>x.id===q.materialId);
    const sp=Number(q.sourcePage||0);
    if(m&&sp)unit=materialUnits(m).filter(u=>Number(u.page||1)<=sp).slice(-1)[0]?.title||'';
  }
  return unit?relatedUnitFor(p,q.materialId,unit,'theory'):null;
}
function unitTitleForQuestion(p,q){
  if(q?.unit)return q.unit;
  if(!q?.materialId)return '';
  const m=p.materials.find(x=>x.id===q.materialId);const sp=Number(q.sourcePage||0);
  if(!m||!sp)return '';
  return materialUnits(m).filter(u=>Number(u.page||1)<=sp).slice(-1)[0]?.title||'';
}
function questionMatchesUnit(p,q,unitKey){
  if(!unitKey)return true;
  return curriculumKey(unitTitleForQuestion(p,q))===unitKey;
}
function guidedTarget(p){
  const rows=(p.progress||[]).map(u=>{
    const st=unitQuestionStats(p,u);const avg=Math.round(((u.theory||0)+(u.practice||0)+(u.review||0))/3);
    const score=st.weak*40+st.wrong*25+(100-avg);
    return {u,st,avg,score};
  }).filter(x=>x.u?.unit);
  rows.sort((a,b)=>b.score-a.score);
  if(rows[0])return rows[0];
  const q=(p.questions||[]).find(isWeakCurrent)||(p.questions||[]).find(x=>x.lastResult===false)||(p.questions||[])[0];
  if(q)return {u:{id:'virtual',unit:unitTitleForQuestion(p,q)||'현재 문제',sourceMaterialId:q.materialId||'',sourcePage:q.sourcePage||null,theory:0,practice:0,review:0},st:{total:1,wrong:q.lastResult===false?1:0,weak:isWeakCurrent(q)?1:0},avg:0,score:1};
  return null;
}
function guidedRecommendation(p){
  const target=guidedTarget(p);const goal=p.dailyGoal||{minutes:50,pages:20,questions:30};
  if(!target)return {unit:'자료를 먼저 등록해 주세요',reason:'학습자료나 진도 데이터가 아직 없습니다.',minutes:Math.max(25,goal.minutes||50),phases:[{type:'materials',label:'학습자료 등록',detail:'기본서·문제집 PDF를 + 칸에 넣고 단원을 생성합니다.',minutes:5}]};
  const unit=target.u.unit,key=curriculumKey(unit),source=p.materials.find(m=>m.id===target.u.sourceMaterialId);
  let theoryRel=null,problemRel=null;
  if(source){
    const sr=materialRole(source);
    if(sr==='theory'||sr==='mixed')theoryRel={material:source,unit:materialUnits(source).find(x=>curriculumKey(x.title)===key)||{title:unit,page:target.u.sourcePage||1},range:getUnitRange(source,unit)};
    else theoryRel=relatedUnitFor(p,source.id,unit,'theory');
    if(sr==='problem'||sr==='mixed')problemRel={material:source,unit:materialUnits(source).find(x=>curriculumKey(x.title)===key)||{title:unit,page:target.u.sourcePage||1},range:getUnitRange(source,unit)};
    else problemRel=relatedUnitFor(p,source.id,unit,'problem');
  }
  const unitQs=(p.questions||[]).filter(q=>questionMatchesUnit(p,q,key));
  const wrong=unitQs.filter(q=>q.lastResult===false),weak=unitQs.filter(isWeakCurrent);
  const totalMinutes=Math.max(25,Math.min(120,Number(goal.minutes||50)));
  const phases=[];
  const theoryMinutes=Math.max(8,Math.round(totalMinutes*.30));
  const practiceMinutes=Math.max(10,Math.round(totalMinutes*.36));
  const reviewMinutes=Math.max(7,Math.round(totalMinutes*.22));
  if(theoryRel)phases.push({type:'theory',label:'이론 예열',detail:`${theoryRel.material.name} · ${unit}`,minutes:theoryMinutes,materialId:theoryRel.material.id,range:theoryRel.range,unit});
  else if(source)phases.push({type:'source',label:'단원 원문 확인',detail:`${source.name} · ${unit}`,minutes:theoryMinutes,materialId:source.id,range:getUnitRange(source,unit),unit});
  if(unitQs.length){
    phases.push({type:'ox',label:'OX 실전',detail:`현재 단원 문제 ${unitQs.length}개 중 ${Math.min(Math.max(10,Number(goal.questions||20)),unitQs.length)}개 목표`,minutes:practiceMinutes,count:Math.min(Math.max(10,Number(goal.questions||20)),unitQs.length),unit,unitKey:key});
    if(wrong.length||weak.length)phases.push({type:weak.length?'weak':'wrong',label:weak.length?'취약·오답 압축':'오답 압축',detail:`현재 오답 ${wrong.length}개 · 취약 ${weak.length}개`,minutes:reviewMinutes,count:Math.max(wrong.length,weak.length),unit,unitKey:key});
  }else if(problemRel){
    phases.push({type:'generate',label:'문제 만들기',detail:`${problemRel.material.name}의 해당 단원 범위에서 OX를 생성합니다.`,minutes:practiceMinutes,materialId:problemRel.material.id,range:problemRel.range,unit});
  }else{
    phases.push({type:'generate',label:'문제 만들기',detail:'현재 단원에 연결된 문제가 없습니다. 자료 범위를 열어 OX를 생성하세요.',minutes:practiceMinutes,materialId:source?.id||'',range:source?getUnitRange(source,unit):null,unit});
  }
  phases.push({type:'feedback',label:'PAFI 마무리',detail:'막힌 원인 한 줄 + 다음 세션에서 바꿀 행동 한 줄',minutes:Math.max(5,totalMinutes-phases.reduce((t,x)=>t+x.minutes,0)),unit});
  const reason=target.st.weak?`취약문제 ${target.st.weak}개가 남아 있어 이 단원을 우선합니다.`:target.st.wrong?`현재 오답 ${target.st.wrong}개가 남아 있어 이 단원을 먼저 보강합니다.`:`진도 평균 ${target.avg}%로, 현재 진도가 가장 필요한 단원 중 하나입니다.`;
  return {unit,unitKey:key,reason,minutes:phases.reduce((t,x)=>t+x.minutes,0),phases,targetProgressId:target.u.id};
}
function activeGuidedSession(p){
  return (p.guidedSessions||[]).find(x=>x.status==='active')||null;
}
function createGuidedSession(){
  const p=project();const existing=activeGuidedSession(p);
  if(existing&&!confirm('진행 중인 자동 학습 세션을 종료하고 새 계획을 만들까요?'))return;
  if(existing){existing.status='abandoned';existing.endedAt=new Date().toISOString()}
  const rec=guidedRecommendation(p);const now=new Date().toISOString();
  const gs={id:uid(),status:'active',createdAt:now,startedAt:now,unit:rec.unit,unitKey:rec.unitKey||'',reason:rec.reason,plannedMinutes:rec.minutes,targetProgressId:rec.targetProgressId||'',phases:rec.phases.map((x,i)=>({...x,id:uid(),index:i,status:'pending'})),feedback:'',improvement:''};
  p.guidedSessions.unshift(gs);save();setView('session');
}
function markGuidedPhase(index,done=true){
  const gs=activeGuidedSession(project());if(!gs)return;
  const ph=gs.phases[Number(index)];if(!ph)return;ph.status=done?'done':'pending';ph.completedAt=done?new Date().toISOString():null;save();render();
}
async function runGuidedPhase(index){
  const p=project(),gs=activeGuidedSession(p);if(!gs)return;const ph=gs.phases[Number(index)];if(!ph)return;
  if(['theory','source','generate'].includes(ph.type)){
    if(!ph.materialId)return setView('materials');
    await openMaterialDialog(ph.materialId,ph.range||null);return;
  }
  if(['ox','wrong','weak'].includes(ph.type)){
    oxUnitFilter=ph.unitKey||gs.unitKey||'';oxUnitFilterLabel=ph.unit||gs.unit||'';oxQueue=[];setView(ph.type==='ox'?'ox':ph.type);return;
  }
  if(ph.type==='materials')return setView('materials');
  if(ph.type==='feedback')document.querySelector('#guidedFeedback')?.focus();
}
function guidedQuestionCount(p,gs){
  const start=new Date(gs.startedAt||gs.createdAt||0).getTime();
  return (p.sessions||[]).filter(s=>s.kind==='question'&&new Date(s.createdAt||0).getTime()>=start&&(!gs.unitKey||questionMatchesUnit(p,p.questions.find(q=>q.id===s.questionId)||{},gs.unitKey))).length;
}
function finishGuidedSession(){
  const p=project(),gs=activeGuidedSession(p);if(!gs)return;
  const feedback=document.querySelector('#guidedFeedback')?.value.trim()||gs.feedback||'';
  const improvement=document.querySelector('#guidedImprove')?.value.trim()||gs.improvement||'';
  const incomplete=gs.phases.filter(x=>x.status!=='done'&&x.type!=='feedback');
  if(incomplete.length&&!confirm(`아직 ${incomplete.length}단계가 완료 처리되지 않았습니다. 그래도 세션을 마칠까요?`))return;
  gs.feedback=feedback;gs.improvement=improvement;gs.status='completed';gs.endedAt=new Date().toISOString();
  const elapsed=Math.max(1,Math.round((new Date(gs.endedAt)-new Date(gs.startedAt))/60000));
  const qcount=guidedQuestionCount(p,gs);
  p.sessions.push({id:uid(),kind:'study',date:todayKey(),materialName:'자동 학습 세션',unit:gs.unit,expectedMinutes:gs.plannedMinutes,minutes:elapsed,questions:qcount,focusRating:0,plan:gs.phases.map(x=>x.label).join(' → '),feedback,improvement,note:'Study OS 자동 학습 세션 완료',createdAt:gs.endedAt});
  save();render();
}
function guidedSessionView(p){
  const gs=activeGuidedSession(p);const latest=(p.guidedSessions||[])[0];
  if(!gs){
    const rec=guidedRecommendation(p);
    return `<div class="guided-hero card"><div><span class="pill good">Study OS v10</span><h2>오늘 공부를 한 번에 시작하세요.</h2><p class="muted">현재 진도·오답·취약문제를 보고 Study OS가 한 세션의 순서를 자동으로 구성합니다. 최종 선택과 학습은 사용자가 합니다.</p></div><button id="createGuidedBtn" class="primary big-action">▶ 오늘 공부 시작</button></div>
      <div class="grid two" style="margin-top:16px"><div class="card"><div class="eyebrow">추천 단원</div><h2>${esc(rec.unit)}</h2><p>${esc(rec.reason)}</p><div class="meta-row"><span>약 ${rec.minutes}분</span><span>${rec.phases.length}단계</span></div></div><div class="card"><h2>예정 순서</h2><div class="guided-mini-list">${rec.phases.map((x,i)=>`<div><b>${i+1}</b><span><strong>${esc(x.label)}</strong><small>${esc(x.detail)} · ${x.minutes}분</small></span></div>`).join('')}</div></div></div>${latest&&latest.status==='completed'?`<div class="card" style="margin-top:16px"><div class="row"><h2>직전 자동 세션</h2><span class="pill good">완료</span></div><p><strong>${esc(latest.unit)}</strong></p><div class="muted small">${new Date(latest.endedAt||latest.createdAt).toLocaleString('ko-KR')}</div></div>`:''}`;
  }
  const done=gs.phases.filter(x=>x.status==='done').length,total=gs.phases.length,qcount=guidedQuestionCount(p,gs);const prog=total?Math.round(done/total*100):0;
  return `<div class="card guided-session-head"><div class="row"><div><span class="eyebrow">진행 중인 자동 학습 세션</span><h2>${esc(gs.unit)}</h2><p class="muted">${esc(gs.reason)}</p></div><div class="guided-score"><strong>${prog}%</strong><span>${done}/${total} 단계</span></div></div><div class="progress-track"><div class="progress-bar" style="width:${prog}%"></div></div><div class="meta-row" style="margin-top:10px"><span>계획 ${gs.plannedMinutes}분</span><span>현재 문제풀이 ${qcount}회</span><span>시작 ${new Date(gs.startedAt).toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})}</span></div></div>
    <div class="guided-steps">${gs.phases.map((ph,i)=>`<div class="card guided-step ${ph.status==='done'?'done':''}"><div class="guided-step-num">${ph.status==='done'?'✓':i+1}</div><div class="guided-step-body"><div class="row"><div><span class="eyebrow">${ph.minutes}분 권장</span><h3>${esc(ph.label)}</h3></div><span class="pill ${ph.status==='done'?'good':''}">${ph.status==='done'?'완료':'대기'}</span></div><p class="muted small">${esc(ph.detail)}</p>${ph.type==='feedback'?`<label class="block-label">Feedback · 오늘 막힌 원인<textarea id="guidedFeedback" class="textarea-large mini" placeholder="예: 수요의 변화와 수요량의 변화를 혼동했다.">${esc(gs.feedback||'')}</textarea></label><label class="block-label">Improve · 다음 행동<textarea id="guidedImprove" class="textarea-large mini" placeholder="예: 다음 시작 전 비교표를 3분 회상하고 OX 5개를 먼저 푼다.">${esc(gs.improvement||'')}</textarea></label>`:''}<div class="question-toolbar"><button class="${ph.type==='feedback'?'ghost':'primary'}" data-run-guided="${i}">${ph.type==='feedback'?'작성 위치로':'학습 열기'}</button><button class="ghost" data-toggle-guided="${i}">${ph.status==='done'?'완료 취소':'완료 처리'}</button></div></div></div>`).join('')}</div>
    <div class="card guided-finish"><div><h2>세션 마무리</h2><p class="muted small">모든 단계를 꼭 채울 필요는 없습니다. 실제로 한 만큼 기록하고 다음 추천에 반영합니다.</p></div><div class="question-toolbar"><button id="finishGuidedBtn" class="primary">세션 완료·기록</button><button id="replanGuidedBtn" class="ghost">새 계획 만들기</button></div></div>`;
}
function pairingStats(p){
  const problems=p.materials.filter(m=>materialRole(m)==='problem'||materialRole(m)==='mixed');
  const theories=p.materials.filter(m=>materialRole(m)==='theory'||materialRole(m)==='mixed');
  const keys=new Set();
  let linked=0;
  for(const pm of problems){
    for(const u of materialUnits(pm)){
      const key=curriculumKey(u.title);if(!key||keys.has(`${pm.id}:${key}`))continue;
      keys.add(`${pm.id}:${key}`);
      if(theories.some(tm=>tm.id!==pm.id&&materialUnits(tm).some(tu=>curriculumKey(tu.title)===key)))linked++;
    }
  }
  return {linked,problemBooks:problems.length,theoryBooks:theories.length};
}
function getUnitRange(m,title){
  const units=materialUnits(m);const idx=units.findIndex(u=>u.title===title);if(idx<0)return {start:1,end:Math.min(Number(m?.pageCount||1),5)};
  const start=Math.max(1,Number(units[idx].page||1));const next=units[idx+1];const max=Number(m?.pageCount||start);
  const end=next?Math.max(start,Math.min(max,Number(next.page||start+1)-1)):Math.min(max,Math.max(start,start+9));
  return {start,end};
}
function unitQuestionStats(p,u){
  const m=(p.materials||[]).find(x=>x.id===u.sourceMaterialId);const r=m?getUnitRange(m,u.unit):{start:Number(u.sourcePage||1),end:Number(u.sourcePage||1)};
  const qs=(p.questions||[]).filter(q=>q.materialId===u.sourceMaterialId && (q.unit===u.unit || (Number(q.sourcePage||0)>=r.start&&Number(q.sourcePage||0)<=r.end)));
  return {total:qs.length,wrong:qs.filter(q=>q.lastResult===false).length,weak:qs.filter(isWeakCurrent).length};
}
function statusLabel(m){
  if(m.analysisStatus==='ready')return ['분석 완료','good'];
  if(m.analysisStatus==='processing')return ['분석 중','warn'];
  if(m.analysisStatus==='extracting')return ['원문 추출 중','warn'];
  if(m.analysisStatus==='scan-ready')return ['스캔 PDF 준비','good'];
  if(m.analysisStatus==='engine-needed')return ['원문 추출 연결 필요','warn'];
  return ['분석 대기',''];
}

function renderProjectSelect(){
  const el=document.querySelector('#projectSelect');
  el.innerHTML=state.projects.map(p=>`<option value="${p.id}" ${p.id===state.activeProjectId?'selected':''}>${esc(p.name)}</option>`).join('');
}
function updateBadges(){
  const p=project();
  document.querySelector('#wrongBadge').textContent=p.questions.filter(q=>q.wrong>0&&q.lastResult===false).length;
}
function setView(v){
  currentView=v;
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===v));
  document.querySelector('#pageTitle').textContent=simpleMode?({dashboard:'오늘은 이렇게 시작하세요',materials:'자료 넣기',sets:'공부하기',wrong:'다시 보기'}[v]||titleFor(v)):titleFor(v);
  render();
}
function render(){
  const p=project();
  document.body.classList.toggle('simple-mode',simpleMode);
  const toggle=document.querySelector('#modeToggle');
  toggle.textContent=simpleMode?'상세 기능 보기':'간편 화면으로';
  toggle.setAttribute('aria-pressed',String(simpleMode));
  document.querySelector('#pageTitle').textContent=simpleMode?({dashboard:'오늘은 이렇게 시작하세요',materials:'자료 넣기',sets:'공부하기',wrong:'다시 보기'}[currentView]||titleFor(currentView)):titleFor(currentView);
  document.querySelector('#projectLabel').textContent=`${p.name} · ${p.goal||'개인 학습'}`;
  const c=document.querySelector('#content');
  if(vmap[currentView])c.innerHTML=simpleMode&&currentView==='dashboard'?simpleDashboard(p):simpleMode&&currentView==='materials'?simpleMaterials(p):setStudyRibbon(p)+vmap[currentView](p);
  bindView();
  updateBadges();
}

function simpleDashboard(p){
  const due=dueReviewPlans(p).length;
  const recent=p.materials.slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,3);
  return `<div class="simple-intro"><span class="simple-kicker">Study OS v19 · 간편 화면</span><h2>자료를 넣고, 범위를 골라 공부하세요.</h2><p>처음이라면 아래 순서대로 누르시면 됩니다.</p></div>
    <div class="simple-steps" aria-label="학습 순서"><span><b>1</b> 자료 넣기</span><span><b>2</b> 단원 고르기</span><span><b>3</b> 공부하기</span><span><b>4</b> 다시 보기</span></div>
    <div class="simple-main card"><div><span class="simple-kicker">첫 번째 단계</span><h2>${p.materials.length?'이어서 공부할까요?':'학습 PDF를 넣어주세요'}</h2><p>${p.materials.length?'등록한 자료에서 공부할 범위를 고르세요.':'PDF를 선택하면 페이지와 단원을 찾아 보여드립니다.'}</p></div>${uploadBox('quick')}</div>
    ${recent.length?`<section class="simple-section"><div class="simple-section-head"><h2>내 자료 · 눌러서 문제 만들기</h2><button data-go="materials" class="simple-link">전체 보기</button></div><div class="simple-material-list">${recent.map(m=>`<button class="simple-material" data-open-material="${esc(m.id)}"><span class="simple-file">${esc((m.type||'자료').toUpperCase())}</span><span><strong>${esc(m.name)}</strong><small>${esc(statusLabel(m)[0])} · ${materialUnits(m).length}개 단원 · 범위 고르기 → 문제 만들기</small></span><b aria-hidden="true">→</b></button>`).join('')}</div></section>`:''}
    <div class="simple-actions"><button class="simple-action" data-go="sets"><span>▦</span><strong>공부하기</strong><small>만든 카드와 문제를 한 곳에서</small></button><button class="simple-action" data-go="wrong"><span>↺</span><strong>다시 보기</strong><small>${due?`예약된 복습 ${due}개`:'틀린 문제와 복습 확인'}</small></button></div>
    <p class="simple-privacy">🔒 자료는 이 브라우저에 저장됩니다. 다른 기기에서 쓰려면 백업 파일을 옮겨야 합니다.</p>`;
}

function simpleMaterials(p){
  const materials=p.materials.slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  return `<div class="simple-intro"><span class="simple-kicker">1단계 · 자료 넣기</span><h2>공부할 PDF를 골라주세요.</h2><p>등록한 파일을 누르고 단원 또는 페이지를 고른 뒤, 카드·OX·빈칸·객관식 중 원하는 문제를 만드세요.</p></div>
    <div class="card simple-upload">${uploadBox('main')}</div>
    <section class="simple-section"><div class="simple-section-head"><h2>등록한 자료 <small>${materials.length}개</small></h2></div>
    ${materials.length?`<div class="simple-material-list">${materials.map(m=>`<button class="simple-material" data-open-material="${esc(m.id)}"><span class="simple-file">${esc((m.type||'자료').toUpperCase())}</span><span><strong>${esc(m.name)}</strong><small>${esc(statusLabel(m)[0])} · ${materialUnits(m).length}개 단원 · 눌러서 문제 만들기</small></span><b aria-hidden="true">→</b></button>`).join('')}</div>`:'<div class="card empty">아직 자료가 없습니다. 위 버튼으로 PDF를 추가해 주세요.</div>'}</section>
    <p class="simple-privacy">스캔 자료의 이미지 읽기와 새 카드·문제 생성은 AI 키 설정 후 사용할 수 있습니다.</p>`;
}

function uploadBox(idPrefix='main'){
  return `<div id="${idPrefix}Dropzone" class="dropzone upload-plus" tabindex="0">
    <div class="plus-box">+</div>
    <strong>학습자료를 여기에 넣으세요</strong>
    <p class="muted small">파일을 끌어놓거나 + 버튼으로 선택하면 자동 분석 흐름이 시작됩니다.</p>
    <div class="file-types">PDF · TXT · Markdown · JSON <span>텍스트 PDF + 스캔 PDF 자동 판별 · DOCX/HWP는 추후 확장</span></div>
    <label class="primary upload-label">+ 파일 추가<input id="${idPrefix}FileInput" type="file" multiple accept=".pdf,.txt,.md,.json,.docx,.hwp" /></label>
  </div>`;
}

const vmap={
  dashboard:p=>{
    const attempts=p.questions.reduce((a,q)=>a+q.attempts,0),wrong=p.questions.reduce((a,q)=>a+q.wrong,0),correct=attempts-wrong,acc=pct(correct,attempts),weak=p.questions.filter(isWeakCurrent).length;
    const recent=p.materials.slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))[0];
    const st=sessionStats(p), goal=p.dailyGoal||{minutes:50,pages:20,questions:30};
    return `
      <div class="hero-ingest card">
        <div class="hero-copy"><span class="pill">Study OS v16</span><h2>인풋을 학습 행동으로 바꾸고, 피드백으로 다시 개선합니다.</h2><p class="muted">자료 인식 → 진도 → 회상/문제풀이 → 오답 → 피드백 → 노트 → 다음 학습</p></div>
        ${uploadBox('quick')}
      </div>
      <div class="pipeline card">
        ${['자료 인식','유형 분류','목차·단원','문제·이론 연결','학습 시작'].map((x,i)=>`<div class="pipe-step"><span>${i+1}</span><strong>${x}</strong></div>`).join('')}
      </div>
      <div class="knowledge-flow card">
        <div><span>INPUT</span><strong>기본서 · 문제집 · 글</strong><small>자료를 넣습니다</small></div>
        <b>→</b><div><span>OUTPUT</span><strong>회상 · OX · 설명</strong><small>기억에서 꺼냅니다</small></div>
        <b>→</b><div><span>FEEDBACK</span><strong>오답 · 원인 분석</strong><small>왜 막혔는지 봅니다</small></div>
        <b>→</b><div><span>NOTE</span><strong>이론 · 내 메모</strong><small>다음 복습으로 연결</small></div>
      </div>

      <div class="card focus-goal-card">
        <div class="row"><div><span class="eyebrow">오늘의 Goal Laser</span><h2>${esc(p.studyFocus)}</h2><p class="muted small">오늘 여러 가지를 다 하려 하지 않고, 가장 중요한 학습 한 가지를 먼저 잡습니다.</p></div><button id="editFocusGoalBtn" class="ghost">한 문장 목표 수정</button></div>
      </div>
      <div class="card guided-launch-card">
        <div><span class="eyebrow">자동 학습 세션</span><h2>진도·오답·취약을 보고 오늘 순서를 자동 구성합니다.</h2><p class="muted small">이론 → OX → 오답/취약 → PAFI 마무리를 한 흐름으로 진행합니다.</p></div>
        <button id="startGuidedFromDashboard" class="primary big-action">▶ 오늘 공부 시작</button>
      </div>
      ${(()=>{const due=dueReviewPlans(p),pending=pendingReviewPlans(p),next=pending[0];return `<div class="card review-queue-card"><div><span class="eyebrow">SOURCE-LOCKED REVIEW</span><h2>${due.length?`오늘 복습할 학습세트 ${due.length}개`:'오늘 예약 복습 없음'}</h2><p class="muted small">새 AI 생성 없이 이미 잠근 카드·OX·빈칸·객관식을 그대로 다시 돌립니다.${!due.length&&next?` · 다음 예정 ${esc(next.dueDate)}`:''}</p></div><div class="review-queue-action"><strong>${due.length}</strong><span>복습 대기</span><button data-go="sets" class="${due.length?'primary':'ghost'}">${due.length?'복습세트 열기':'학습세트 보기'}</button></div></div>`})()}

      <div class="grid two dashboard-top">
        <div class="card goal-card">
          <div class="row"><div><h2>오늘의 학습 목표</h2><p class="muted small">작게 정하고, 실제 기록으로 채웁니다.</p></div><button id="editGoalBtn" class="ghost">목표 수정</button></div>
          <div class="goal-grid">
            <div><span class="goal-label">집중 시간</span>${goalBar(st.todayMinutes,goal.minutes)}<span class="muted small">분</span></div>
            <div><span class="goal-label">진도</span>${goalBar(st.todayPages,goal.pages)}<span class="muted small">페이지</span></div>
            <div><span class="goal-label">문제</span>${goalBar(st.todayQuestions,goal.questions)}<span class="muted small">문제</span></div>
          </div>
          <div class="goal-actions"><button data-go="history" class="primary">+ 학습 기록</button><button id="startFocus25" class="ghost">25분 집중</button><button id="startFocus40" class="ghost">40분 집중</button><button id="startFocus50" class="ghost">50분 집중</button></div>
          <div id="focusPanel" class="focus-panel ${focusTimerId?'running':''}"><span>집중 타이머</span><strong id="focusTimerText">${focusTimerId?formatTime(focusRemaining):'대기 중'}</strong><button id="stopFocusBtn" class="ghost small-btn" ${focusTimerId?'':'disabled'}>종료</button></div>
        </div>
        <div class="card"><div class="row"><div><h2>내 공부 리듬</h2><p class="muted small">계획과 실행의 차이, 집중이 잘 되는 시간대를 같이 봅니다.</p></div><span class="pill">누적 ${st.all.length}세션</span></div>
          ${(()=>{const lr=learningRhythm(p);return `<div class="rhythm-grid"><div><span>이번 주</span><strong>${st.weekMinutes}분</strong></div><div><span>1회 평균 시간</span><strong>${st.avgMinutes}분</strong></div><div><span>예상↔실제 평균 오차</span><strong>${lr.avgPlanError}%</strong></div><div><span>집중이 좋은 시간대</span><strong>${lr.bestFocus}</strong></div></div>`})()}
          <button data-go="history" class="ghost full" style="margin-top:14px">PAFI 학습 기록 보기</button>
        </div>
      </div>

      <div class="grid stats" style="margin-top:16px">
        <div class="card stat"><div class="label">오늘 집중</div><div class="value">${st.todayMinutes}<small>분</small></div><div class="sub">${st.today.length}개 학습 세션</div></div>
        <div class="card stat"><div class="label">누적 정답률</div><div class="value">${acc}%</div><div class="sub">${attempts}회 문제풀이</div></div>
        <div class="card stat"><div class="label">현재 오답</div><div class="value">${p.questions.filter(q=>q.lastResult===false).length}</div><div class="sub">다시 복습할 문제</div></div>
        <div class="card stat"><div class="label">취약문제</div><div class="value">${weak}</div><div class="sub">3회 이상 오답</div></div>
      </div>
      <div class="grid two" style="margin-top:16px">
        <div class="card"><div class="row"><h2>오늘 추천 학습</h2><span class="pill">반수동</span></div>
          <div class="list">
            <div class="list-item row"><div><strong>1. 진도 확인</strong><div class="muted small">현재 단원과 남은 범위를 먼저 확인합니다.</div></div><button data-go="progress" class="ghost">열기</button></div>
            <div class="list-item row"><div><strong>2. OX 반복</strong><div class="muted small">새 문제 + 직전 오답을 섞어 풉니다.</div></div><button data-go="ox" class="ghost">시작</button></div>
            <div class="list-item row"><div><strong>3. 오답만 다시</strong><div class="muted small">틀린 문제만 0개가 될 때까지 반복합니다.</div></div><button data-go="wrong" class="ghost">복습</button></div>
          </div>
        </div>
        <div class="card">${(()=>{const ps=pairingStats(p);return `<div class="row"><div><h2>교재 연결</h2><p class="muted small">기본서와 문제집의 같은 PART·CHAPTER를 자동으로 묶습니다.</p></div><span class="pill ${ps.linked?'good':'warn'}">${ps.linked}단원 연결</span></div><div class="rhythm-grid"><div><span>이론 자료</span><strong>${ps.theoryBooks}</strong></div><div><span>문제 자료</span><strong>${ps.problemBooks}</strong></div><div><span>연결 단원</span><strong>${ps.linked}</strong></div><div><span>연결 방식</span><strong>PART·CH</strong></div></div><div class="footer-hint">기출/OX를 틀리면 같은 단원의 기본서로 바로 이동할 수 있습니다.</div>`})()}<div style="margin-top:14px"><h3>최근 자료</h3>${recent?materialMini(recent):'<div class="empty compact">아직 자료가 없습니다.</div>'}<button data-go="materials" class="ghost" style="margin-top:12px">전체 자료 보기</button></div></div>
      </div>
      <div class="card pafi-card" style="margin-top:16px"><div class="row"><div><h2>PAFI 학습 루프</h2><p class="muted small">계획 → 실행 → 피드백 → 개선을 매 학습 세션에 반복합니다.</p></div><button data-go="history" class="ghost">기록하기</button></div>
        <div class="pafi-grid"><div><span>P</span><strong>Plan</strong><small>범위·예상시간</small></div><div><span>A</span><strong>Action</strong><small>실제 학습량</small></div><div><span>F</span><strong>Feedback</strong><small>막힌 원인</small></div><div><span>I</span><strong>Improve</strong><small>다음 행동</small></div></div>
      </div>
      <div class="card" style="margin-top:16px"><div class="row"><h2>학습법 바로가기</h2><span class="muted small">AI 추천 또는 직접 선택</span></div>
        <div class="method-grid">
          <button class="method" data-go="sets"><strong>▦ 학습세트</strong><span class="muted small">같은 범위의 도구를 한 묶음으로</span></button>
          <button class="method" data-go="theory"><strong>▤ 이론 학습</strong><span class="muted small">원문과 내 메모를 함께 보기</span></button>
          <button class="method" data-go="recall"><strong>🗣 회상·설명</strong><span class="muted small">보지 않고 먼저 설명하기</span></button>
          <button class="method" data-go="ox"><strong>○× OX 반복</strong><span class="muted small">틀린 것만 계속 반복</span></button>
          <button class="method" data-go="flashcards"><strong>▱ 카드 학습</strong><span class="muted small">저장된 카드 세트 반복</span></button>
          <button class="method" data-go="blanks"><strong>▭ 빈칸 학습</strong><span class="muted small">핵심 표현 직접 회상</span></button>
          <button class="method" data-go="mcq"><strong>④ 객관식</strong><span class="muted small">자료 안 선택지로 판별</span></button>
          <button class="method" data-go="wrong"><strong>↺ 오답 복습</strong><span class="muted small">오답만 따로 모아 복습</span></button>
          <button class="method" data-go="weak"><strong>⚑ 취약 집중</strong><span class="muted small">자주 틀리는 문제 우선</span></button>
          <button class="method" data-go="summary"><strong>✦ 핵심 요약</strong><span class="muted small">자료 근거 기반 요약</span></button>
          <button class="method" data-go="notes"><strong>✎ 내 노트</strong><span class="muted small">이론·오답·메모 연결</span></button>
        </div>
      </div>`;
  },

  session:p=>guidedSessionView(p),
  materials:p=>`<div class="grid two materials-top">
      <div class="card"><div class="row"><div><h2>자료 자동 인식</h2><p class="muted">대표님이 원하신 + 네모칸입니다. 넣는 순간 분석 흐름을 시작합니다.</p></div><span class="pill">자동 모드</span></div>${uploadBox('main')}</div>
      <div class="card"><div class="row"><h2>글 직접 넣기</h2><span class="pill">파일 없이도 가능</span></div><input id="pasteTitle" class="text-input" placeholder="자료 이름"><textarea id="pasteText" class="textarea-large" placeholder="이론, 강의 노트, 문제, 메모 등을 붙여넣으세요."></textarea><button id="savePaste" class="primary" style="margin-top:10px">붙여넣고 자동 분석</button><div class="footer-hint">직접 입력한 글도 파일과 동일하게 자료 유형과 단원 후보를 분석합니다.</div></div>
    </div>
    <div class="card" style="margin-top:16px"><div class="row"><div><h2>자료 → 학습 변환 흐름</h2><p class="muted">INPUT 자료를 그대로 쌓아두지 않고 OUTPUT 학습과 복습으로 연결합니다.</p></div><span class="pill warn">원문 기반 학습 엔진</span></div>
      <div class="pipeline wide">${['① 파일/글 인식','② 이론서·문제집 분류','③ 목차·단원 나누기','④ 이론↔문제 연결','⑤ 요약/학습법 추천','⑥ 진도 생성'].map(x=>`<div class="pipe-card">${x}</div>`).join('')}</div>
      <div class="notice" style="margin-top:12px">현재 PDF는 텍스트형/스캔형을 자동 판별합니다. 스캔 PDF는 페이지 이미지를 브라우저에 보관하고 AI Vision이 선택한 페이지를 읽도록 연결합니다. 자동 단원 인식 결과는 사용자가 수정하거나 AI 정밀 구조화로 보완할 수 있습니다.</div>
    </div>
    <div class="card" style="margin-top:16px"><div class="row"><h2>등록 자료</h2><span class="pill">${p.materials.length}개</span></div>${p.materials.length?`<div class="material-grid">${p.materials.slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(materialCard).join('')}</div>`:'<div class="empty">등록된 자료가 없습니다.</div>'}</div>
    <div class="card" style="margin-top:16px"><div class="row"><div><h2>학습도구 보관함</h2><p class="muted small">도구별 보관함입니다. 같은 범위를 한 묶음으로 보려면 학습세트를 여세요.</p></div><div class="row"><span class="pill good">🔒 ${(p.sourceArtifacts||[]).filter(a=>p.toolLocks?.[a.key]?.locked).length}개 잠금</span><button data-go="sets" class="ghost small-btn">학습세트 보기</button></div></div>${sourceArtifactShelf(p)}</div>`,

  sets:p=>learningSetsView(p),
  setStudy:p=>setStudyView(p),

  progress:p=>`<div class="card"><div class="row"><div><h2>진도 관리</h2><p class="muted">진도는 앞으로 나아가는 축입니다. 각 단원에서 바로 원문 범위 학습으로 들어갈 수 있습니다.</p></div><button id="addUnitBtn" class="primary">+ 단원 추가</button></div>${p.progress.length?`<table class="table"><thead><tr><th>단원</th><th>위치</th><th>이론</th><th>문제</th><th>복습</th><th>오답/취약</th><th>교재 연결</th><th></th></tr></thead><tbody>${p.progress.map(u=>{const total=Math.round(((u.theory||0)+(u.practice||0)+(u.review||0))/3);const st=unitQuestionStats(p,u);return `<tr><td><strong>${esc(u.unit)}</strong><div class="progress-track mini-track"><div class="progress-bar" style="width:${total}%"></div></div></td><td>${u.sourcePage?`p.${u.sourcePage}`:'-'}</td><td>${u.theory||0}%</td><td>${u.practice||0}%</td><td>${u.review||0}%</td><td><span class="pill ${st.weak?'bad':st.wrong?'warn':'good'}">${st.wrong} / ${st.weak}</span></td><td>${(()=>{const rel=u.sourceMaterialId?relatedUnitFor(p,u.sourceMaterialId,u.unit,materialRole(p.materials.find(m=>m.id===u.sourceMaterialId))==='problem'?'theory':'problem'):null;return rel?`<button class="ghost small-btn" data-open-related-progress="${u.id}">${materialRole(rel.material)==='problem'?'문제집':'기본서'}</button>`:'<span class="muted small">-</span>'})()}</td><td>${u.sourceMaterialId?`<button class="ghost small-btn" data-study-unit="${u.id}">학습</button>`:''}</td></tr>`}).join('')}</tbody></table>`:'<div class="empty">자료를 넣으면 단원 후보가 자동 생성됩니다.</div>'}<div class="footer-hint">오답/취약은 ‘현재 다시 풀어야 할 문제 / 현재 취약문제’ 순서입니다.</div></div>`,


  history:p=>{
    const st=sessionStats(p);
    const materialOpts=p.materials.map(m=>`<option value="${m.id}">${esc(m.name)}</option>`).join('');
    const unitOpts=p.progress.map(u=>`<option value="${esc(u.unit)}">${esc(u.unit)}</option>`).join('');
    return `<div class="grid two history-layout">
      <div class="card"><div class="row"><div><h2>학습 세션 기록</h2><p class="muted">어디까지, 얼마나, 무엇을 했는지 남기면 학습속도가 자동 계산됩니다.</p></div><span class="pill">반자동</span></div>
        <div class="form-grid">
          <label>학습자료<select id="sessionMaterial" class="text-input"><option value="">직접/기타</option>${materialOpts}</select></label>
          <label>단원<select id="sessionUnit" class="text-input"><option value="">선택 안 함</option>${unitOpts}</select></label>
          <label>시작 페이지<input id="sessionStartPage" type="number" min="0" class="text-input" placeholder="예: 121"></label>
          <label>마지막 페이지<input id="sessionEndPage" type="number" min="0" class="text-input" placeholder="예: 146"></label>
          <label>예상 시간(분)<input id="sessionExpectedMinutes" type="number" min="1" class="text-input" placeholder="예: 25"></label>
          <label>실제 학습 시간(분)<input id="sessionMinutes" type="number" min="1" class="text-input" placeholder="예: 28"></label>
          <label>푼 문제 수<input id="sessionQuestions" type="number" min="0" class="text-input" placeholder="예: 20"></label>
          <label>집중도<select id="sessionFocusRating" class="text-input"><option value="">선택 안 함</option><option value="1">1 · 매우 낮음</option><option value="2">2 · 낮음</option><option value="3">3 · 보통</option><option value="4">4 · 좋음</option><option value="5">5 · 매우 좋음</option></select></label>
        </div>
        <label class="block-label">Plan · 오늘 하려던 것<textarea id="sessionPlan" class="textarea-large mini" placeholder="예: 민법 계약 파트 20페이지 + OX 20문제"></textarea></label>
        <label class="block-label">Feedback · 막힌 원인<textarea id="sessionFeedback" class="textarea-large mini" placeholder="추상적인 감정보다 원인 중심: 어디서 오래 걸렸는지, 왜 틀렸는지"></textarea></label>
        <label class="block-label">Improve · 다음에는 이렇게<textarea id="sessionImprove" class="textarea-large mini" placeholder="예: 계산 문제는 먼저 공식 카드 5분 복습 후 시작"></textarea></label>
        <label class="block-label">한 줄 메모<textarea id="sessionNote" class="textarea-large mini" placeholder="오늘 헷갈린 것, 다음에 이어볼 위치 등"></textarea></label>
        <button id="saveSessionBtn" class="primary full">PAFI 학습 기록 저장</button>
      </div>
      <div class="card"><h2>메타인지 요약</h2>${(()=>{const lr=learningRhythm(p);return `<div class="rhythm-grid large"><div><span>이번 주</span><strong>${st.weekMinutes}분</strong></div><div><span>평균 실제 시간</span><strong>${st.avgMinutes}분</strong></div><div><span>예상↔실제 오차</span><strong>${lr.avgPlanError}%</strong></div><div><span>집중 최고 구간</span><strong>${lr.bestFocus}</strong></div></div>`})()}<div class="notice neutral" style="margin-top:14px">예상시간과 실제시간, 집중도, 피드백을 쌓아 ‘내가 언제·어떻게 공부할 때 효율이 좋은지’를 찾습니다.</div></div>
    </div>
    <div class="card" style="margin-top:16px"><div class="row"><h2>최근 학습 기록</h2><span class="pill">${st.all.length}회</span></div>${st.all.length?`<div class="session-list">${st.all.slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,30).map(sessionRow).join('')}</div>`:'<div class="empty">아직 학습 세션 기록이 없습니다.</div>'}</div>`;
  },

  theory:p=>`<div class="grid two"><div class="card"><h2>이론 원문</h2>${p.materials.filter(m=>m.content).length?p.materials.filter(m=>m.content).map(m=>`<div class="note-card" style="margin-bottom:10px"><div class="row"><strong>${esc(m.name)}</strong><span class="pill">${esc(m.analysis?.detectedType||roleLabel(m.sourceRole))}</span></div><p class="small" style="white-space:pre-wrap">${esc((m.content||'').slice(0,1500))}${(m.content||'').length>1500?'…':''}</p></div>`).join(''):'<div class="empty">먼저 학습자료를 넣어주세요.</div>'}</div><div class="card"><h2>내 메모</h2><p class="muted small">이론을 보면서 직접 정리한 메모를 쌓습니다.</p><button id="theoryNoteBtn" class="primary">+ 메모 작성</button><div class="list" style="margin-top:12px">${p.notes.slice().reverse().map(n=>`<div class="note-card"><strong>${esc(n.title)}</strong><p class="small">${esc(n.body)}</p></div>`).join('')}</div></div></div>`,

  recall:p=>{
    const materialOpts=p.materials.map(m=>`<option value="${m.id}">${esc(m.name)}</option>`).join('');
    const unitOpts=p.progress.map(u=>`<option value="${esc(u.unit)}">${esc(u.unit)}</option>`).join('');
    return `<div class="grid two"><div class="card recall-card"><div class="row"><div><h2>회상·설명 학습</h2><p class="muted">원문을 다시 보기 전에 기억나는 내용을 먼저 꺼내 적습니다.</p></div><span class="pill">OUTPUT</span></div>
      <div class="form-grid"><label>자료<select id="recallMaterial" class="text-input"><option value="">선택 안 함</option>${materialOpts}</select></label><label>단원<select id="recallUnit" class="text-input"><option value="">선택 안 함</option>${unitOpts}</select></label></div>
      <label class="block-label">질문/주제<input id="recallPrompt" class="text-input" placeholder="예: 수요의 변화와 수요량의 변화를 설명해보세요"></label>
      <label class="block-label">보지 않고 설명하기<textarea id="recallBody" class="textarea-large" placeholder="기억나는 내용을 먼저 적은 뒤 저장하세요. 이후 원문/요약과 비교합니다."></textarea></label>
      <button id="saveRecallBtn" class="primary full">내 설명 저장</button></div>
      <div class="card"><h2>최근 OUTPUT</h2>${p.outputs.length?`<div class="list">${p.outputs.slice().reverse().slice(0,20).map(o=>`<div class="note-card"><div class="row"><strong>${esc(o.prompt||o.unit||'회상 학습')}</strong><span class="pill">${esc(o.materialName||'직접')}</span></div><p class="small" style="white-space:pre-wrap">${esc(o.body)}</p><div class="muted small">${new Date(o.createdAt).toLocaleString('ko-KR')}</div></div>`).join('')}</div>`:'<div class="empty">아직 저장한 설명이 없습니다.</div>'}<div class="notice neutral" style="margin-top:14px">다음 단계에서 AI가 업로드 원문과 내 설명을 비교해 ‘빠진 핵심 / 잘못 이해한 부분 / 잘 설명한 부분’을 나눠 보여주도록 연결합니다.</div></div></div>`;
  },

  summary:p=>`<div class="card"><div class="row"><div><h2>AI 핵심요약</h2><p class="muted">업로드 자료만 근거로 요약하고 원문 위치를 함께 보여주는 영역입니다.</p></div><span class="pill good">범위형 AI</span></div><div class="grid two" style="margin-top:16px"><div class="note-card"><strong>① 원문 근거</strong><p class="muted small">파일명 · 단원 · 페이지/위치 · 원문 인용 범위</p></div><div class="note-card"><strong>② AI 학습노트</strong><p class="muted small">핵심 개념 · 암기포인트 · 비교 · 시험/학습 포인트</p></div></div><div class="notice" style="margin-top:16px">자료 근거 모드를 기본값으로 사용합니다. 학습자료에서 ‘범위 학습’을 열고 페이지를 선택한 뒤 AI 요약을 실행하세요.</div></div>`,

  ox:p=>oxView(p,'all'),
  wrong:p=>oxView(p,'wrong'),
  weak:p=>oxView(p,'weak'),
  flashcards:p=>flashcardView(p),
  blanks:p=>blankView(p),
  mcq:p=>mcqView(p),
  aiStudy:p=>`<div class="card"><div class="row"><div><h2>AI 학습</h2><p class="muted">자료 기반 카드·OX·빈칸·객관식 같은 학습도구와 AI 튜터링을 분리했습니다.</p></div><span class="pill">명시적 실행</span></div><div class="grid two" style="margin-top:16px"><div class="note-card"><strong>자료 학습도구</strong><p class="muted small">카드·OX·빈칸·객관식·요약은 선택한 파일 범위만 근거로 만들고 생성 즉시 잠급니다.</p><button data-go="materials" class="ghost">자료에서 만들기</button></div><div class="note-card"><strong>AI 학습</strong><p class="muted small">설명·질문·튜터링은 사용자가 AI 학습 버튼을 눌렀을 때만 실행합니다.</p><button id="openAiStudyFromView" class="primary">AI 학습 열기</button></div></div><div class="notice neutral" style="margin-top:16px">AI 학습도 기본은 업로드 자료만 사용합니다. 외부지식 보충은 AI 학습창에서 별도로 허용할 수 있습니다.</div></div>`,
  notes:p=>`<div class="card"><div class="row"><div><h2>이론·내 노트</h2><p class="muted">일반 메모, 오답 메모, AI 요약을 한 곳에 모으는 공간입니다.</p></div><button id="newNoteBtn" class="primary">+ 새 노트</button></div>${p.notes.length?`<div class="grid two" style="margin-top:14px">${p.notes.slice().reverse().map(n=>`<div class="note-card"><div class="row"><strong>${esc(n.title)}</strong><span class="pill">${esc(n.kind||'내 메모')}</span></div><p class="small" style="white-space:pre-wrap">${esc(n.body)}</p><div class="muted small">${new Date(n.createdAt).toLocaleString('ko-KR')}</div></div>`).join('')}</div>`:'<div class="empty">아직 노트가 없습니다. 공부 중 중요 내용을 저장해보세요.</div>'}</div>`
};

function materialMini(m){
  const [sl,sc]=statusLabel(m);
  return `<div class="material-mini"><div class="row"><strong>${esc(m.name)}</strong><span class="pill ${sc}">${sl}</span></div><div class="muted small" style="margin-top:7px">${esc(m.analysis?.detectedType||roleLabel(m.sourceRole))} · ${m.analysis?.units?.length||0}개 단원 후보</div></div>`;
}
function materialCard(m){
  const [sl,sc]=statusLabel(m);
  const units=m.analysis?.units||[];
  const chars=Number(m.contentChars ?? (m.content||'').length);
  return `<div class="material-card">
    <div class="row"><div class="file-icon">${m.type==='pdf'?'PDF':m.type.toUpperCase()}</div><span class="pill ${sc}">${sl}</span></div>
    <h3>${esc(m.name)}</h3>
    <div class="meta-row"><span>${esc(m.analysis?.detectedType||roleLabel(m.sourceRole))}</span><span>${m.scanMode?'스캔 이미지형':chars.toLocaleString()+'자'}</span>${m.pageCount?`<span>${m.pageCount}p</span>`:''}<span>${units.length}단원</span></div>
    ${m.analysis?.profileCoverage?`<div class="small muted" style="margin-top:7px">인식 범위: ${esc(m.analysis.profileCoverage)}</div>`:''}
    ${m.extractProgress&&m.analysisStatus==='extracting'?`<div class="progress-track"><div class="progress-bar" style="width:${m.extractProgress}%"></div></div><div class="small muted" style="margin-top:5px">PDF 원문 추출 ${m.extractProgress}%</div>`:''}
    ${units.length?`<div class="unit-chips">${units.slice(0,4).map(x=>`<span>${esc(typeof x==='string'?x:x.title)}</span>`).join('')}${units.length>4?`<span>+${units.length-4}</span>`:''}</div>`:''}
    <label class="small role-row">자료 성격 <select data-role-select="${m.id}"><option value="auto" ${m.sourceRole==='auto'?'selected':''}>AI 자동</option><option value="theory" ${m.sourceRole==='theory'?'selected':''}>이론서</option><option value="problem" ${m.sourceRole==='problem'?'selected':''}>문제집</option><option value="mixed" ${m.sourceRole==='mixed'?'selected':''}>이론+문제</option><option value="note" ${m.sourceRole==='note'?'selected':''}>내 노트</option></select></label>
    <div class="question-toolbar"><button class="ghost" data-open-material="${m.id}">범위 학습</button>${chars?`<button class="ghost" data-reanalyze="${m.id}">다시 구조화</button>`:''}<button class="ghost danger-text" data-delete-material="${m.id}">삭제</button></div>
  </div>`;
}


let flashcardIndex=0;
let flashcardFlipped=false;
let flashcardQueue=[];
let activeFlashcardArtifactId=null;
let blankIndex=0;
let blankQueue=[];
let activeBlankArtifactId=null;
let blankFeedback=null;
let mcqIndex=0;
let mcqQueue=[];
let activeMcqArtifactId=null;
let mcqFeedback=null;
let activeSetStudySessionId=null;
const sourceToolBusy=new Set();
function activeFlashcards(p){
  const all=p.flashcards||[];
  if(!flashcardQueue.length)return all;
  const byId=new Map(all.map(c=>[c.id,c]));
  const filtered=flashcardQueue.map(id=>byId.get(id)).filter(Boolean);
  if(!filtered.length){flashcardQueue=[];activeFlashcardArtifactId=null;return all}
  return filtered;
}
function artifactCount(a){
  if(a?.type==='cards')return (a.data?.cardIds||[]).length;
  if(a?.type==='ox')return (a.data?.questionIds||[]).length;
  if(a?.type==='blanks')return (a.data?.blankIds||[]).length;
  if(a?.type==='mcq')return (a.data?.mcqIds||[]).length;
  if(a?.type==='summary')return 1;
  return 0;
}
function learningSetGroups(p){
  const groups=new Map();
  for(const a of (p.sourceArtifacts||[])){
    const key=`${a.materialId}:${Number(a.startPage)}-${Number(a.endPage)}`;
    if(!groups.has(key))groups.set(key,{key,materialId:a.materialId,startPage:Number(a.startPage),endPage:Number(a.endPage),artifacts:{},createdAt:a.createdAt});
    const g=groups.get(key);g.artifacts[a.type]=a;
    if(new Date(a.createdAt||0)>new Date(g.createdAt||0))g.createdAt=a.createdAt;
  }
  return [...groups.values()].sort((a,b)=>new Date(b.createdAt||0)-new Date(a.createdAt||0));
}
function learningSetProgress(p,g){
  const arts=g.artifacts||{};let attempts=0,correct=0,wrong=0;
  const cards=(arts.cards?.data?.cardIds||[]).map(id=>(p.flashcards||[]).find(x=>x.id===id)).filter(Boolean);
  cards.forEach(x=>{attempts+=(x.known||0)+(x.missed||0);correct+=(x.known||0);wrong+=(x.missed||0)});
  const ox=(arts.ox?.data?.questionIds||[]).map(id=>(p.questions||[]).find(x=>x.id===id)).filter(Boolean);
  ox.forEach(x=>{attempts+=x.attempts||0;correct+=(x.attempts||0)-(x.wrong||0);wrong+=x.wrong||0});
  const blanks=(arts.blanks?.data?.blankIds||[]).map(id=>(p.blankQuestions||[]).find(x=>x.id===id)).filter(Boolean);
  blanks.forEach(x=>{attempts+=x.attempts||0;correct+=x.known||0;wrong+=x.wrong||0});
  const mcqs=(arts.mcq?.data?.mcqIds||[]).map(id=>(p.mcqQuestions||[]).find(x=>x.id===id)).filter(Boolean);
  mcqs.forEach(x=>{attempts+=x.attempts||0;correct+=x.correct||0;wrong+=x.wrong||0});
  return {attempts,correct,wrong,accuracy:pct(correct,attempts)};
}


function dateKeyPlus(days){
  const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+Number(days||0));return localDateKey(d);
}
function reviewPlanForGroup(p,groupKey){
  return (p.reviewPlans||[]).filter(x=>x.groupKey===groupKey&&x.status!=='done').sort((a,b)=>String(a.dueDate).localeCompare(String(b.dueDate)))[0]||null;
}
function dueReviewPlans(p){
  const today=todayKey();return (p.reviewPlans||[]).filter(x=>x.status!=='done'&&String(x.dueDate||'')<=today).sort((a,b)=>String(a.dueDate).localeCompare(String(b.dueDate)));
}
function pendingReviewPlans(p){return (p.reviewPlans||[]).filter(x=>x.status!=='done').sort((a,b)=>String(a.dueDate).localeCompare(String(b.dueDate)))}
function reviewSuggestion(s){
  const attempts=Number(s?.attempts||0),wrong=Number(s?.wrong||0),accuracy=pct(Number(s?.correct||0),attempts);
  if(!attempts)return {days:1,label:'내일 다시 보기',reason:'응답 기록이 적어 짧은 간격으로 한 번 더 확인합니다.'};
  if(wrong>=5||accuracy<70)return {days:1,label:'내일 복습',reason:`정답률 ${accuracy}% · 오답 ${wrong}회라 짧은 간격 복습을 권합니다.`};
  if(wrong>0||accuracy<85)return {days:2,label:'2일 뒤 복습',reason:`정답률 ${accuracy}% · 오답 ${wrong}회라 2일 뒤 재확인을 권합니다.`};
  return {days:4,label:'4일 뒤 복습',reason:`정답률 ${accuracy}%로 비교적 안정적이라 간격을 조금 늘립니다.`};
}
function setStudyWrongItems(p,s){
  const out=[],seen=new Set();
  const push=(kind,id,label,answer,materialId,sourcePage)=>{const k=`${kind}:${id}`;if(seen.has(k))return;seen.add(k);out.push({kind,id,label,answer,materialId,sourcePage})};
  for(const st of (s?.stages||[])){
    if(!['cards','ox','blanks','mcq'].includes(st.key))continue;
    for(const id of (st.wrongIds||[])){
      if(st.key==='cards'){
        const x=(p.flashcards||[]).find(q=>q.id===id);if(x)push('카드',id,x.front,x.back,x.materialId,x.sourcePage);
      }else if(st.key==='ox'){
        const x=(p.questions||[]).find(q=>q.id===id);if(x)push('OX',id,x.text,x.answer?'O':'X',x.materialId,x.sourcePage);
      }else if(st.key==='blanks'){
        const x=(p.blankQuestions||[]).find(q=>q.id===id);if(x)push('빈칸',id,x.prompt,x.answer,x.materialId,x.sourcePage);
      }else if(st.key==='mcq'){
        const x=(p.mcqQuestions||[]).find(q=>q.id===id);if(x)push('객관식',id,x.question,(x.choices||[])[Number(x.answerIndex)]||'',x.materialId,x.sourcePage);
      }
    }
  }
  return out;
}
function saveReviewPlanForSession(sessionId){
  const p=project(),s=(p.setStudySessions||[]).find(x=>x.id===sessionId);if(!s)return;
  const sug=reviewSuggestion(s),due=dateKeyPlus(sug.days);let plan=(p.reviewPlans||[]).find(x=>x.setStudySessionId===s.id&&x.status!=='done');
  if(plan){plan.dueDate=due;plan.reason=sug.reason;plan.updatedAt=new Date().toISOString()}
  else{plan={id:uid(),groupKey:s.groupKey,setStudySessionId:s.id,materialId:s.materialId,startPage:s.startPage,endPage:s.endPage,dueDate:due,status:'pending',reason:sug.reason,createdAt:new Date().toISOString()};p.reviewPlans.unshift(plan)}
  save();render();
}
function completeReviewPlan(groupKey){
  const p=project();const plan=reviewPlanForGroup(p,groupKey);if(plan){plan.status='done';plan.completedAt=new Date().toISOString();save()}
}
function setStudyReportHtml(p,s,g,m){
  const attempts=Number(s.attempts||0),accuracy=pct(Number(s.correct||0),attempts),items=setStudyWrongItems(p,s),sug=reviewSuggestion(s),plan=reviewPlanForGroup(p,s.groupKey);
  const stageRows=(s.stages||[]).filter(st=>st.status!=='skipped').map(st=>{const a=Number(st.attempts||0),ac=pct(Number(st.correct||0),a);return `<div class="report-stage"><span>${esc(st.label)}</span><strong>${a?`${ac}%`:'완료'}</strong><small>${a?`정답 ${st.correct||0} · 오답 ${st.wrong||0}`:'응답 없음'}</small></div>`}).join('');
  const itemRows=items.length?items.slice(0,8).map(x=>{const mm=p.materials.find(z=>z.id===x.materialId);return `<div class="report-miss"><span class="pill warn">${esc(x.kind)}</span><div><strong>${esc(String(x.label||'').slice(0,110))}</strong><small>${x.sourcePage&&mm?`${esc(displayPageLabel(mm,x.sourcePage))} · `:''}정답: ${esc(String(x.answer||'').slice(0,90))}</small></div></div>`}).join(''):'<div class="notice neutral">이번 세션에서 새로 기록된 오답 항목이 없습니다.</div>';
  return `<div class="card set-study-report"><div class="row"><div><span class="eyebrow">SESSION REPORT · AI 재호출 없음</span><h2>이번 세트 학습 리포트</h2><p class="muted small">저장된 응답 기록만 계산합니다. 자료 내용이나 문제를 새로 생성하지 않습니다.</p></div><div class="report-score"><strong>${accuracy}%</strong><span>${attempts}회 응답</span></div></div><div class="report-metrics"><div><span>정답</span><strong>${s.correct||0}</strong></div><div><span>오답</span><strong>${s.wrong||0}</strong></div><div><span>다시 볼 항목</span><strong>${items.length}</strong></div><div><span>학습 범위</span><strong>${Math.max(0,(s.endPage||0)-(s.startPage||0)+1)}p</strong></div></div><div class="report-stage-grid">${stageRows}</div><div class="report-section"><div class="row"><h3>이번에 막힌 항목</h3>${items.length>8?`<span class="pill">외 ${items.length-8}개</span>`:''}</div><div class="report-miss-list">${itemRows}</div></div><div class="review-recommend"><div><span class="eyebrow">다음 복습</span><strong>${plan?`${esc(plan.dueDate)} 예약됨`:esc(sug.label)}</strong><p>${esc(plan?.reason||sug.reason)}</p></div>${plan?'<span class="pill good">✓ 복습 예약</span>':`<button id="scheduleSetReviewBtn" class="primary">${esc(sug.label)} 예약</button>`}</div></div>`;
}
function activeSetStudySession(p){
  p.setStudySessions=p.setStudySessions||[];
  let s=activeSetStudySessionId?p.setStudySessions.find(x=>x.id===activeSetStudySessionId):null;
  if(!s)s=p.setStudySessions.find(x=>!x.endedAt)||null;
  if(s)activeSetStudySessionId=s.id;
  return s;
}
function setStudyGroup(p,s){return s?learningSetGroups(p).find(g=>g.key===s.groupKey)||null:null}
function setStageIds(g,key){
  if(key==='cards')return [...(g?.artifacts?.cards?.data?.cardIds||[])];
  if(key==='ox')return [...(g?.artifacts?.ox?.data?.questionIds||[])];
  if(key==='blanks')return [...(g?.artifacts?.blanks?.data?.blankIds||[])];
  if(key==='mcq')return [...(g?.artifacts?.mcq?.data?.mcqIds||[])];
  return [];
}
function buildSetStudyStages(g){
  const defs=[['cards','카드 빠른 회상'],['ox','OX 전체 확인'],['oxWrong','틀린 OX 정복'],['blanks','빈칸 회상'],['mcq','객관식 확인']];
  return defs.map(([key,label])=>{
    const base=key==='oxWrong'?[]:setStageIds(g,key);
    const available=key==='oxWrong'?Boolean(g?.artifacts?.ox):base.length>0;
    return {key,label,status:available?'pending':'skipped',itemIds:base,seenIds:[],wrongIds:[],attempts:0,correct:0,wrong:0};
  });
}
function startLearningSetStudy(groupKey){
  const p=project(),g=learningSetGroups(p).find(x=>x.key===groupKey);if(!g)return;
  completeReviewPlan(groupKey);
  let s=(p.setStudySessions||[]).find(x=>x.groupKey===groupKey&&!x.endedAt);
  if(!s){
    s={id:uid(),groupKey,materialId:g.materialId,startPage:g.startPage,endPage:g.endPage,startedAt:new Date().toISOString(),endedAt:null,stages:buildSetStudyStages(g),attempts:0,correct:0,wrong:0};
    p.setStudySessions.unshift(s);
  }
  activeSetStudySessionId=s.id;save();setView('setStudy');
}
function currentSetStage(p){
  const s=activeSetStudySession(p);if(!s||s.endedAt)return {session:s,stage:null,index:-1};
  let i=(s.stages||[]).findIndex(x=>x.status==='in_progress');
  if(i<0)i=(s.stages||[]).findIndex(x=>x.status==='pending');
  return {session:s,stage:i>=0?s.stages[i]:null,index:i};
}
function stageProgress(st){
  const total=(st?.itemIds||[]).length;
  const seen=(st?.seenIds||[]).length;
  if(st?.key==='oxWrong'){const remaining=(st?.remainingIds||st?.itemIds||[]).length;return {seen:Math.max(0,total-remaining),total,percent:total?Math.round((total-remaining)/total*100):100}}
  return {seen,total,percent:total?Math.round(seen/total*100):(st?.status==='skipped'?100:0)};
}
function recordSetStudyAttempt(stageKey,itemId,correct){
  const p=project(),{session:s,stage}=currentSetStage(p);if(!s||!stage||stage.key!==stageKey||stage.status!=='in_progress')return null;
  if(!stage.seenIds.includes(itemId))stage.seenIds.push(itemId);
  stage.attempts=(stage.attempts||0)+1;s.attempts=(s.attempts||0)+1;
  if(correct){stage.correct=(stage.correct||0)+1;s.correct=(s.correct||0)+1}else{stage.wrong=(stage.wrong||0)+1;s.wrong=(s.wrong||0)+1;if(!stage.wrongIds.includes(itemId))stage.wrongIds.push(itemId)}
  return stage;
}
function completeSetStage(key){
  const p=project(),s=activeSetStudySession(p);if(!s||s.endedAt)return;
  const i=s.stages.findIndex(x=>x.key===key);if(i<0)return;const st=s.stages[i];st.status='done';st.completedAt=new Date().toISOString();
  if(key==='ox'){
    const wr=s.stages.find(x=>x.key==='oxWrong');if(wr){wr.itemIds=[...(st.wrongIds||[])];wr.remainingIds=[...(st.wrongIds||[])];if(!wr.itemIds.length)wr.status='skipped'}
  }
  const next=s.stages.find(x=>x.status==='pending');
  if(!next)finishSetStudySession(false);
  else save();
}
function finishSetStudySession(manual=true){
  const p=project(),s=activeSetStudySession(p);if(!s||s.endedAt)return;
  s.endedAt=new Date().toISOString();s.manualFinish=Boolean(manual);
  const mins=Math.max(1,Math.round((new Date(s.endedAt)-new Date(s.startedAt))/60000));
  p.sessions.push({id:uid(),kind:'study',date:todayKey(),minutes:mins,pages:Math.max(0,(s.endPage||0)-(s.startPage||0)+1),questions:s.attempts||0,note:`학습세트 ${manual?'종료':'완료'}`,setStudySessionId:s.id,createdAt:s.endedAt});
  save();
}
function runSetStudyStage(key=null){
  const p=project(),s=activeSetStudySession(p);if(!s||s.endedAt)return;let st=key?s.stages.find(x=>x.key===key):currentSetStage(p).stage;if(!st||st.status==='skipped'||st.status==='done')return;
  const g=setStudyGroup(p,s);if(!g)return;st.status='in_progress';st.startedAt=st.startedAt||new Date().toISOString();
  if(st.key==='cards'){flashcardQueue=[...st.itemIds];activeFlashcardArtifactId=g.artifacts.cards?.id||null;flashcardIndex=0;flashcardFlipped=false;save();setView('flashcards');return}
  if(st.key==='ox'){oxUnitFilter=null;oxUnitFilterLabel='';oxQueue=[...st.itemIds];oxIndex=0;oxMode='all';save();setView('ox');return}
  if(st.key==='oxWrong'){st.remainingIds=(st.remainingIds||st.itemIds||[]).filter(id=>p.questions.some(q=>q.id===id));if(!st.remainingIds.length){st.status='skipped';completeSetStage('oxWrong');setView('setStudy');return}oxUnitFilter=null;oxUnitFilterLabel='';oxQueue=[...st.remainingIds];oxIndex=0;oxMode='wrong';save();setView('ox');return}
  if(st.key==='blanks'){blankQueue=[...st.itemIds];activeBlankArtifactId=g.artifacts.blanks?.id||null;blankIndex=0;blankFeedback=null;save();setView('blanks');return}
  if(st.key==='mcq'){mcqQueue=[...st.itemIds];activeMcqArtifactId=g.artifacts.mcq?.id||null;mcqIndex=0;mcqFeedback=null;save();setView('mcq');return}
}
function setStudyView(p){
  const s=activeSetStudySession(p);if(!s)return `<div class="card"><h2>세트 학습</h2><div class="empty">진행 중인 세트 학습이 없습니다.<br>학습세트에서 ‘세트 공부 시작’을 눌러 주세요.</div><button data-go="sets" class="primary">학습세트 보기</button></div>`;
  const g=setStudyGroup(p,s),m=p.materials.find(x=>x.id===s.materialId);if(!g||!m)return `<div class="card"><div class="empty">학습세트를 찾을 수 없습니다.</div></div>`;
  const elapsed=Math.max(0,Math.round((new Date(s.endedAt||Date.now())-new Date(s.startedAt))/60000));const done=s.stages.filter(x=>x.status==='done'||x.status==='skipped').length;const cur=currentSetStage(p).stage;
  return `<div class="card set-study-hero"><div class="row"><div><span class="eyebrow">ONE-SET STUDY</span><h2>${esc(m.name)}</h2><p class="muted">${esc(displayPageLabel(m,s.startPage))} ~ ${esc(displayPageLabel(m,s.endPage))} · 저장된 학습도구만 사용 · AI 재호출 없음</p></div><div class="set-score"><strong>${done}/${s.stages.length}</strong><span>단계 완료</span></div></div><div class="set-meter"><div style="width:${done/s.stages.length*100}%"></div></div></div>
  <div class="set-study-steps">${s.stages.map((st,i)=>{const pr=stageProgress(st);const label=st.status==='done'?'완료':st.status==='skipped'?'건너뜀':st.status==='in_progress'?'진행 중':'대기';return `<div class="card set-study-step ${st.status}"><div class="set-study-num">${i+1}</div><div class="set-study-body"><div class="row"><div><strong>${esc(st.label)}</strong><div class="muted small">${st.key==='oxWrong'?(st.itemIds.length?`${st.itemIds.length}개 오답을 모두 맞을 때까지 반복`:'OX에서 틀린 문제가 생기면 자동 활성화'):`${st.itemIds.length}개 항목`}</div></div><span class="pill ${st.status==='done'?'good':st.status==='in_progress'?'warn':''}">${label}</span></div><div class="progress-track mini-track-wide"><div class="progress-bar" style="width:${pr.percent}%"></div></div>${st.status==='pending'&&st===cur?`<button class="primary small-btn set-stage-start" data-start-set-stage="${st.key}">이 단계 시작</button>`:''}${st.status==='in_progress'?`<button class="primary small-btn set-stage-start" data-start-set-stage="${st.key}">계속하기</button>`:''}</div></div>`}).join('')}</div>
  <div class="card set-study-summary"><div class="row"><div><h3>${s.endedAt?'세트 학습 완료':'현재 세션'}</h3><p class="muted small">${elapsed}분 · 응답 ${s.attempts||0}회 · 정답 ${s.correct||0} · 오답 ${s.wrong||0}</p></div>${s.endedAt?'<span class="pill good">✓ 완료</span>':`<button id="finishSetStudyBtn" class="ghost">여기서 종료</button>`}</div>${s.endedAt?`<div class="question-toolbar"><button data-go="sets" class="primary">학습세트로 돌아가기</button><button class="ghost" data-restart-set="${g.key}">같은 세트 다시 공부</button></div>`:''}</div>${s.endedAt?setStudyReportHtml(p,s,g,m):''}`;
}
function setStudyRibbon(p){
  const {session:s,stage}=currentSetStage(p);if(!s||!stage||s.endedAt||stage.status!=='in_progress')return '';
  const map={cards:'flashcards',ox:'ox',oxWrong:'ox',blanks:'blanks',mcq:'mcq'};if(map[stage.key]!==currentView)return '';
  const m=p.materials.find(x=>x.id===s.materialId),pr=stageProgress(stage);return `<div class="set-study-ribbon"><div><strong>▶ 세트 학습 중 · ${esc(stage.label)}</strong><span>${esc(m?.name||'')} · ${pr.total?`${pr.seen}/${pr.total}`:'반복 정복'}</span></div><button id="returnSetStudyBtn" class="ghost small-btn">세트 진행표</button></div>`;
}
function learningSetToolCell(p,g,type){
  const a=g.artifacts?.[type];
  if(!a)return `<div class="set-tool missing"><div><strong>${esc(sourceToolLabel(type))}</strong><span>아직 만들지 않음</span></div><button class="ghost small-btn" data-build-set-tool="${g.key}">만들기</button></div>`;
  const locked=Boolean(p.toolLocks?.[a.key]?.locked);const count=artifactCount(a);
  return `<div class="set-tool"><div><strong>${esc(sourceToolLabel(type))}</strong><span>${type==='summary'?'저장됨':`${count}개`} · ${locked?'🔒 잠금':'잠금 해제'}</span></div><button class="ghost small-btn" data-open-set-artifact="${a.id}">열기</button></div>`;
}
function learningSetsView(p){
  const groups=learningSetGroups(p);
  if(!groups.length)return `<div class="card"><div class="row"><div><h2>학습세트</h2><p class="muted">한 파일의 한 범위를 카드·OX·빈칸·객관식·요약 묶음으로 관리합니다.</p></div><span class="pill">0세트</span></div><div class="empty">아직 만든 학습세트가 없습니다.<br>학습자료에서 범위를 선택해 도구 하나를 만들면 자동으로 세트가 시작됩니다.</div><button data-go="materials" class="primary">학습자료에서 만들기</button></div>`;
  return `<div class="card set-intro"><div class="row"><div><span class="eyebrow">SOURCE-LOCKED SETS</span><h2>한 범위 = 한 학습세트</h2><p class="muted">같은 파일·같은 페이지 범위의 카드/OX/빈칸/객관식/요약을 한 묶음으로 보고, 이미 만든 도구는 잠근 채 반복 사용합니다.</p></div><span class="pill good">${groups.length}세트</span></div></div><div class="learning-set-grid">${groups.map(g=>{
    const m=p.materials.find(x=>x.id===g.materialId);if(!m)return '';
    const built=['cards','ox','blanks','mcq','summary'].filter(t=>g.artifacts?.[t]).length;const st=learningSetProgress(p,g);const rp=reviewPlanForGroup(p,g.key);const due=rp&&String(rp.dueDate)<=todayKey();
    return `<div class="card learning-set-card ${due?'review-due':''}"><div class="row set-head"><div><span class="eyebrow">${esc(m.analysis?.detectedType||roleLabel(m.sourceRole))}</span><h3>${esc(m.name)}</h3><div class="muted small">${esc(displayPageLabel(m,g.startPage))} ~ ${esc(displayPageLabel(m,g.endPage))}</div></div><div class="set-score"><strong>${built}/5</strong><span>도구 생성</span></div></div><div class="set-meter"><div style="width:${built/5*100}%"></div></div><div class="set-tools">${['cards','ox','blanks','mcq','summary'].map(t=>learningSetToolCell(p,g,t)).join('')}</div><div class="set-stats"><span>학습 ${st.attempts}회</span><span>정답률 ${st.attempts?st.accuracy:'-'}${st.attempts?'%':''}</span><span>누적 오답 ${st.wrong}</span>${rp?`<span class="${due?'due-text':''}">${due?'복습 예정일 도착':`다음 복습 ${esc(rp.dueDate)}`}</span>`:''}</div><div class="question-toolbar"><button class="primary" data-start-set-study="${g.key}">${due?'↺ 예약 복습 시작':'▶ 세트 공부 시작'}</button><button class="ghost" data-open-set-range="${g.key}">이 범위 열기</button><button class="ghost" data-ai-set="${g.key}">✧ AI 학습</button></div></div>`;
  }).join('')}</div>`;
}
function sourceArtifactShelf(p){
  const list=(p.sourceArtifacts||[]).slice().sort((a,b)=>new Date(b.createdAt||0)-new Date(a.createdAt||0));
  if(!list.length)return '<div class="empty">아직 만들어 둔 학습도구가 없습니다. 자료 범위를 열고 카드·OX·빈칸·객관식·요약을 한 번 생성해 보세요.</div>';
  return `<div class="artifact-shelf">${list.map(a=>{
    const m=p.materials.find(x=>x.id===a.materialId);if(!m)return '';
    const lock=p.toolLocks?.[a.key];const locked=Boolean(lock?.locked);const count=artifactCount(a);
    return `<div class="artifact-item"><div class="row"><div><strong>${esc(sourceToolLabel(a.type))}</strong><div class="muted small">${esc(m.name)} · ${esc(displayPageLabel(m,a.startPage))}~${esc(displayPageLabel(m,a.endPage))}</div></div><span class="pill ${locked?'good':'warn'}">${locked?'🔒 잠금':'잠금 해제'}</span></div><div class="meta-row"><span>${a.type==='summary'?'저장 요약':`${count}개`}</span><span>${new Date(a.createdAt).toLocaleDateString('ko-KR')}</span></div><button class="ghost full" data-open-shelf-artifact="${a.id}">기존 학습도구 열기</button></div>`
  }).join('')}</div>`;
}
function sourceRangeKey(m,type,start,end){return `${m.id}:${type}:${Number(start)}-${Number(end)}`}
function sourceArtifact(p,m,type,start,end){const key=sourceRangeKey(m,type,start,end);return (p.sourceArtifacts||[]).find(a=>a.key===key)||null}
function isToolLocked(p,m,type,start,end){return Boolean(p.toolLocks?.[sourceRangeKey(m,type,start,end)]?.locked)}
function lockTool(p,m,type,start,end,artifactId=null){p.toolLocks=p.toolLocks||{};p.toolLocks[sourceRangeKey(m,type,start,end)]={locked:true,artifactId,createdAt:new Date().toISOString()}}
function unlockTool(p,m,type,start,end){if(!p.toolLocks)return;delete p.toolLocks[sourceRangeKey(m,type,start,end)]}
function saveSourceArtifact(p,m,type,start,end,data){
  p.sourceArtifacts=p.sourceArtifacts||[];const key=sourceRangeKey(m,type,start,end);const old=p.sourceArtifacts.find(a=>a.key===key);
  const artifact={id:old?.id||uid(),key,materialId:m.id,type,startPage:start,endPage:end,data,createdAt:new Date().toISOString()};
  p.sourceArtifacts=p.sourceArtifacts.filter(a=>a.key!==key);p.sourceArtifacts.unshift(artifact);lockTool(p,m,type,start,end,artifact.id);return artifact;
}
function sourceToolLabel(type){return ({cards:'학습카드',ox:'OX',blanks:'빈칸',mcq:'객관식',summary:'핵심요약'})[type]||type}
async function refreshSourceToolButtons(){
  const box=document.querySelector('#sourceToolButtons');if(!box)return;
  const r=await getSelectedMaterialRange();if(!r)return;const p=project();
  const types=[['cards','▱ 학습카드 1회 생성'],['ox','○× OX 1회 생성'],['blanks','▭ 빈칸 1회 생성'],['mcq','④ 객관식 1회 생성'],['summary','✦ 핵심요약 1회 생성']];
  box.innerHTML=types.map(([type,label])=>{
    const key=sourceRangeKey(r.m,type,r.startPage,r.endPage);const busy=sourceToolBusy.has(key);const locked=isToolLocked(p,r.m,type,r.startPage,r.endPage);const artifact=sourceArtifact(p,r.m,type,r.startPage,r.endPage);
    const primaryLabel=busy?'⏳ 생성 중':locked?'🔒 생성 잠금':artifact?`↻ ${sourceToolLabel(type)} 재생성`:label;
    return `<div class="source-tool-item"><button class="${locked||busy?'locked-tool':'ghost'}" data-source-tool="${type}" ${locked||busy?'disabled':''}>${primaryLabel}</button>${artifact?`<button class="ghost small-btn" data-open-artifact="${type}">기존 열기</button>`:''}${locked?`<button class="ghost small-btn" data-unlock-tool="${type}">잠금 해제</button>`:!busy?`<span class="muted small">${artifact?'재생성 허용됨 · 완료 시 기존 세트 교체':'파일 근거만 · 생성 직후 자동잠금'}</span>`:''}${artifact?`<span class="pill good">${esc(displayPageLabel(r.m,r.startPage))}~${esc(displayPageLabel(r.m,r.endPage))}</span>`:''}</div>`
  }).join('');
  box.querySelectorAll('[data-source-tool]').forEach(b=>b.onclick=()=>runSourceTool(b.dataset.sourceTool));
  box.querySelectorAll('[data-unlock-tool]').forEach(b=>b.onclick=async()=>{const type=b.dataset.unlockTool;if(!confirm(`${sourceToolLabel(type)} 잠금을 해제할까요?\n재생성하면 AI 호출이 한 번 더 발생하며, 새 생성이 성공하면 기존 세트와 그 세트의 학습기록이 교체됩니다.`))return;unlockTool(p,r.m,type,r.startPage,r.endPage);save();await refreshSourceToolButtons()});
  box.querySelectorAll('[data-open-artifact]').forEach(b=>b.onclick=()=>openSourceArtifact(b.dataset.openArtifact,r));
}
function openSourceArtifact(type,r){
  const a=sourceArtifact(project(),r.m,type,r.startPage,r.endPage);if(!a)return;
  if(type==='cards'){document.querySelector('#materialDialog').close();flashcardQueue=(a.data?.cardIds||[]).filter(id=>project().flashcards.some(c=>c.id===id));activeFlashcardArtifactId=a.id;flashcardIndex=0;flashcardFlipped=false;setView('flashcards');return}
  if(type==='ox'){document.querySelector('#materialDialog').close();oxUnitFilter=null;oxQueue=(a.data?.questionIds||[]).filter(id=>project().questions.some(q=>q.id===id));oxIndex=0;setView('ox');return}
  if(type==='blanks'){document.querySelector('#materialDialog').close();blankQueue=(a.data?.blankIds||[]).filter(id=>project().blankQuestions.some(q=>q.id===id));activeBlankArtifactId=a.id;blankIndex=0;blankFeedback=null;setView('blanks');return}
  if(type==='mcq'){document.querySelector('#materialDialog').close();mcqQueue=(a.data?.mcqIds||[]).filter(id=>project().mcqQuestions.some(q=>q.id===id));activeMcqArtifactId=a.id;mcqIndex=0;mcqFeedback=null;setView('mcq');return}
  if(type==='summary'){renderStoredSummary(a,r)}
}
function renderStoredSummary(a,r){
  const result=a.data?.result||{};const points=(result.summary||[]).map(x=>`<li>${esc(x)}</li>`).join('');const notes=(result.sourceNotes||[]).map(x=>`<div class="source-box"><strong>${esc(x.point||'근거')}</strong><div class="small muted">${x.sourcePage?`${esc(displayPageLabel(r.m,x.sourcePage))} · `:''}“${esc(x.excerpt||'')}”</div></div>`).join('');
  document.querySelector('#aiResultBox').innerHTML=`<div class="card ai-result-card"><div class="row"><h3>${esc(result.title||'자료 기반 요약')}</h3><span class="pill good">🔒 저장됨</span></div><ul>${points}</ul>${notes}</div>`;
}
async function runSourceTool(type){
  const r=await getSelectedMaterialRange();if(!r)return;const p=project();const status=document.querySelector('#aiStatusBox');const key=sourceRangeKey(r.m,type,r.startPage,r.endPage);
  if(sourceToolBusy.has(key))return;
  if(isToolLocked(p,r.m,type,r.startPage,r.endPage)){status.className='notice warn';status.textContent=`이 범위의 ${sourceToolLabel(type)}은 이미 생성되어 잠겨 있습니다. 기존 결과를 열거나 잠금 해제 후 다시 생성하세요.`;return}
  const configured=await checkAiStatus();if(!configured){status.className='notice warn';status.innerHTML='자료 기반 생성 엔진을 사용하려면 Vercel 환경변수 <b>OPENAI_API_KEY</b>가 필요합니다. 키는 브라우저에 노출하지 않습니다.';return}
  sourceToolBusy.add(key);await refreshSourceToolButtons();
  status.className='notice neutral';status.textContent=`${sourceToolLabel(type)} 생성 중 · 버튼은 즉시 잠겨 중복 호출을 막습니다. 선택한 파일 범위 밖의 내용은 사용하지 않습니다…`;
  try{
    const task=type;const count=type==='cards'?12:type==='summary'?0:10;const body={task,materialName:r.m.name,startPage:r.startPage,endPage:r.endPage,count,sourceMode:r.scanMode?'images':'text',strictSource:true};
    if(r.scanMode)body.images=await selectedScanImages(r,5);else{if(!r.text.trim())throw new Error('선택 범위에서 읽을 수 있는 원문이 없습니다.');body.text=r.text.slice(0,55000)}
    const res=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const data=await res.json();if(!res.ok)throw new Error(data.error||'자료 기반 생성 실패');
    if(type==='cards')importSourceCards(data.result,r);else if(type==='ox')importSourceOx(data.result,r);else if(type==='blanks')importSourceBlanks(data.result,r);else if(type==='mcq')importSourceMcq(data.result,r);else storeSourceSummary(data.result,r);
    status.className='notice good';status.textContent=`${sourceToolLabel(type)} 생성 완료 · 이 범위는 자동 잠금되었습니다. 이후 복습은 저장된 도구를 재사용하므로 AI 호출이 없습니다.`;save();
  }catch(err){status.className='notice warn';status.textContent=`처리 오류: ${err.message}`}
  finally{sourceToolBusy.delete(key);await refreshSourceToolButtons()}
}
function importSourceCards(result,r){
  const p=project();const old=sourceArtifact(p,r.m,'cards',r.startPage,r.endPage);const oldIds=new Set(old?.data?.cardIds||[]);
  if(oldIds.size)p.flashcards=p.flashcards.filter(c=>!oldIds.has(c.id));
  const arr=Array.isArray(result?.cards)?result.cards:[];const ids=[];
  for(const item of arr){if(!item?.front||!item?.back)continue;const sp=Math.max(r.startPage,Math.min(r.endPage,Number(item.sourcePage||r.startPage)));const card={id:uid(),front:String(item.front),back:String(item.back),materialId:r.m.id,materialName:r.m.name,sourcePage:sp,sourceExcerpt:String(item.sourceExcerpt||''),rangeStart:r.startPage,rangeEnd:r.endPage,createdAt:new Date().toISOString(),known:0,missed:0,lastRating:null};p.flashcards.push(card);ids.push(card.id)}
  const a=saveSourceArtifact(p,r.m,'cards',r.startPage,r.endPage,{cardIds:ids});
  document.querySelector('#aiResultBox').innerHTML=`<div class="card ai-result-card"><div class="row"><h3>학습카드 ${ids.length}개 생성</h3><span class="pill good">🔒 자동 잠금</span></div><p class="muted">이 세트는 ${esc(r.m.name)} ${esc(displayPageLabel(r.m,r.startPage))}~${esc(displayPageLabel(r.m,r.endPage))}만 근거로 저장되었습니다. 다시 생성하지 않고 계속 복습할 수 있습니다.</p><button id="openGeneratedCards" class="primary">저장된 카드 학습 시작</button></div>`;
  document.querySelector('#openGeneratedCards').onclick=()=>openSourceArtifact('cards',r);return a;
}
function importSourceOx(result,r){
  const p=project();const old=sourceArtifact(p,r.m,'ox',r.startPage,r.endPage);const oldIds=new Set(old?.data?.questionIds||[]);
  if(oldIds.size)p.questions=p.questions.filter(q=>!oldIds.has(q.id));
  const arr=Array.isArray(result?.questions)?result.questions:[];const ids=[];
  for(const item of arr){if(!item?.text||typeof item.answer!=='boolean')continue;const sp=Math.max(r.startPage,Math.min(r.endPage,Number(item.sourcePage||r.startPage)));const unit=materialUnits(r.m).filter(u=>Number(u.page||1)<=sp).slice(-1)[0]?.title||'';const q={id:uid(),text:String(item.text),answer:item.answer,explanation:String(item.explanation||'원문 근거 해설'),source:`${r.m.name} · ${displayPageLabel(r.m,sp)}${unit?` · ${unit}`:''}`,sourceExcerpt:String(item.sourceExcerpt||''),materialId:r.m.id,unit,sourcePage:sp,attempts:0,wrong:0,streak:0,lastResult:null};if(addQuestionIfNew(q)){ids.push(q.id)}}
  saveSourceArtifact(p,r.m,'ox',r.startPage,r.endPage,{questionIds:ids});document.querySelector('#aiResultBox').innerHTML=`<div class="card ai-result-card"><div class="row"><h3>OX ${ids.length}문제 생성</h3><span class="pill good">🔒 자동 잠금</span></div><p class="muted">파일 근거 밖의 설명은 넣지 않았습니다. 저장된 세트를 반복할 때는 AI 호출이 없습니다.</p><button id="openGeneratedOx" class="primary">저장된 OX 학습 시작</button></div>`;document.querySelector('#openGeneratedOx').onclick=()=>openSourceArtifact('ox',r)
}
function importSourceBlanks(result,r){
  const p=project();const old=sourceArtifact(p,r.m,'blanks',r.startPage,r.endPage);const oldIds=new Set(old?.data?.blankIds||[]);
  if(oldIds.size)p.blankQuestions=p.blankQuestions.filter(q=>!oldIds.has(q.id));
  const arr=Array.isArray(result?.blanks)?result.blanks:[];const ids=[];
  for(const item of arr){
    if(!item?.prompt||!item?.answer||!String(item.prompt).includes('____'))continue;
    const sp=Math.max(r.startPage,Math.min(r.endPage,Number(item.sourcePage||r.startPage)));
    const q={id:uid(),prompt:String(item.prompt),answer:String(item.answer),explanation:String(item.explanation||'자료 원문에서 빈칸의 표현을 확인하세요.'),sourceExcerpt:String(item.sourceExcerpt||''),materialId:r.m.id,materialName:r.m.name,sourcePage:sp,rangeStart:r.startPage,rangeEnd:r.endPage,attempts:0,wrong:0,known:0,lastResult:null,createdAt:new Date().toISOString()};
    p.blankQuestions.push(q);ids.push(q.id);
  }
  saveSourceArtifact(p,r.m,'blanks',r.startPage,r.endPage,{blankIds:ids});
  document.querySelector('#aiResultBox').innerHTML=`<div class="card ai-result-card"><div class="row"><h3>빈칸 ${ids.length}문제 생성</h3><span class="pill good">🔒 자동 잠금</span></div><p class="muted">빈칸과 정답은 선택한 파일 범위의 실제 표현만 사용합니다. 이후 반복학습에는 AI를 다시 호출하지 않습니다.</p><button id="openGeneratedBlanks" class="primary">저장된 빈칸 학습 시작</button></div>`;
  document.querySelector('#openGeneratedBlanks').onclick=()=>openSourceArtifact('blanks',r);
}
function importSourceMcq(result,r){
  const p=project();const old=sourceArtifact(p,r.m,'mcq',r.startPage,r.endPage);const oldIds=new Set(old?.data?.mcqIds||[]);
  if(oldIds.size)p.mcqQuestions=p.mcqQuestions.filter(q=>!oldIds.has(q.id));
  const arr=Array.isArray(result?.questions)?result.questions:[];const ids=[];
  for(const item of arr){
    const choices=Array.isArray(item?.choices)?item.choices.map(String).filter(Boolean):[];const answerIndex=Number(item?.answerIndex);
    if(!item?.question||choices.length<2||!Number.isInteger(answerIndex)||answerIndex<0||answerIndex>=choices.length)continue;
    const sp=Math.max(r.startPage,Math.min(r.endPage,Number(item.sourcePage||r.startPage)));
    const q={id:uid(),question:String(item.question),choices,answerIndex,explanation:String(item.explanation||'자료 근거를 확인하세요.'),sourceExcerpt:String(item.sourceExcerpt||''),materialId:r.m.id,materialName:r.m.name,sourcePage:sp,rangeStart:r.startPage,rangeEnd:r.endPage,attempts:0,wrong:0,correct:0,lastResult:null,createdAt:new Date().toISOString()};
    p.mcqQuestions.push(q);ids.push(q.id);
  }
  saveSourceArtifact(p,r.m,'mcq',r.startPage,r.endPage,{mcqIds:ids});
  document.querySelector('#aiResultBox').innerHTML=`<div class="card ai-result-card"><div class="row"><h3>객관식 ${ids.length}문제 생성</h3><span class="pill good">🔒 자동 잠금</span></div><p class="muted">질문과 선택지는 선택한 파일 범위 안의 용어·표현만 사용하도록 제한했습니다. 저장 후에는 AI 재호출 없이 반복합니다.</p><button id="openGeneratedMcq" class="primary">저장된 객관식 학습 시작</button></div>`;
  document.querySelector('#openGeneratedMcq').onclick=()=>openSourceArtifact('mcq',r);
}
function storeSourceSummary(result,r){saveSourceArtifact(project(),r.m,'summary',r.startPage,r.endPage,{result});renderStoredSummary(sourceArtifact(project(),r.m,'summary',r.startPage,r.endPage),r)}
function flashcardView(p){
  const cards=activeFlashcards(p);if(!cards.length)return `<div class="card"><div class="row"><div><h2>카드 학습</h2><p class="muted">학습자료 범위에서 카드를 먼저 만들어 주세요.</p></div><span class="pill">SOURCE ONLY</span></div><div class="empty">학습자료 → 범위 학습 → ‘학습카드 1회 생성’에서 만들 수 있습니다.</div><button data-go="materials" class="primary">학습자료 열기</button></div>`;
  if(flashcardIndex>=cards.length)flashcardIndex=0;const c=cards[flashcardIndex];const artifact=activeFlashcardArtifactId?(p.sourceArtifacts||[]).find(a=>a.id===activeFlashcardArtifactId):null;const known=sum(cards,x=>x.known||0),missed=sum(cards,x=>x.missed||0);
  return `<div class="ox-wrap"><div class="card flash-study-card"><div class="row"><div><span class="pill">${artifact?'저장된 카드 세트':'전체 자료 카드'}</span>${artifact?`<div class="muted small" style="margin-top:5px">${esc(c.materialName)} · ${esc(displayPageLabel(p.materials.find(m=>m.id===c.materialId),artifact.startPage))}~${esc(displayPageLabel(p.materials.find(m=>m.id===c.materialId),artifact.endPage))}</div>`:''}</div><div class="row"><span class="muted small">${flashcardIndex+1} / ${cards.length}</span>${artifact?'<button id="showAllFlashcards" class="ghost small-btn">전체 카드</button>':''}</div></div><button id="flipCardBtn" class="flash-face ${flashcardFlipped?'flipped':''}"><span class="flash-label">${flashcardFlipped?'정답':'질문'}</span><strong>${esc(flashcardFlipped?c.back:c.front)}</strong><small>${flashcardFlipped?'다시 누르면 질문':'눌러서 정답 보기'}</small></button><div class="source-box"><div class="small muted">근거: ${esc(c.materialName)} · ${esc(displayPageLabel(p.materials.find(m=>m.id===c.materialId),c.sourcePage))}</div>${c.sourceExcerpt?`<div class="source-excerpt">“${esc(c.sourceExcerpt)}”</div>`:''}</div><div class="ox-actions" style="margin-top:14px"><button class="ghost" data-card-rate="missed">× 몰라요</button><button class="primary" data-card-rate="known">✓ 알아요</button></div><div class="meta-row" style="margin-top:12px"><span>누적 알아요 ${known}</span><span>누적 몰라요 ${missed}</span><span>재생성 호출 0회</span></div></div><div class="footer-hint">카드 생성은 한 번만 하고 잠급니다. 이후 카드 뒤집기와 반복학습은 저장된 세트를 사용하므로 AI를 다시 호출하지 않습니다.</div></div>`
}
function rateFlashcard(rating){const p=project();const cards=activeFlashcards(p);const c=cards[flashcardIndex];if(!c)return;c.lastRating=rating;c.lastReviewedAt=new Date().toISOString();if(rating==='known')c.known=(c.known||0)+1;else c.missed=(c.missed||0)+1;const st=recordSetStudyAttempt('cards',c.id,rating==='known');flashcardFlipped=false;if(st&&st.seenIds.length>=st.itemIds.length){completeSetStage('cards');save();setView('setStudy');return}flashcardIndex=(flashcardIndex+1)%cards.length;save();render()}
function activeBlanks(p){
  const all=p.blankQuestions||[];if(!blankQueue.length)return all;
  const byId=new Map(all.map(q=>[q.id,q]));const filtered=blankQueue.map(id=>byId.get(id)).filter(Boolean);
  if(!filtered.length){blankQueue=[];activeBlankArtifactId=null;return all}return filtered;
}
function normalizeStudyAnswer(v){return String(v||'').trim().toLowerCase().replace(/\s+/g,'').replace(/[.,·ㆍ()\[\]{}'"“”‘’]/g,'')}
function blankView(p){
  const list=activeBlanks(p);if(!list.length)return `<div class="card"><div class="row"><div><h2>빈칸 학습</h2><p class="muted">학습자료 범위에서 빈칸 세트를 먼저 만들어 주세요.</p></div><span class="pill">SOURCE ONLY</span></div><div class="empty">학습자료 → 범위 학습 → ‘빈칸 1회 생성’에서 만들 수 있습니다.</div><button data-go="materials" class="primary">학습자료 열기</button></div>`;
  if(blankIndex>=list.length)blankIndex=0;const q=list[blankIndex];const artifact=activeBlankArtifactId?(p.sourceArtifacts||[]).find(a=>a.id===activeBlankArtifactId):null;const m=p.materials.find(x=>x.id===q.materialId);
  const fb=blankFeedback?.id===q.id?blankFeedback:null;
  return `<div class="ox-wrap"><div class="card practice-card"><div class="row"><div><span class="pill">${artifact?'저장된 빈칸 세트':'전체 빈칸'}</span>${artifact?`<div class="muted small" style="margin-top:5px">${esc(q.materialName)} · ${esc(displayPageLabel(m,artifact.startPage))}~${esc(displayPageLabel(m,artifact.endPage))}</div>`:''}</div><div class="row"><span class="muted small">${blankIndex+1} / ${list.length}</span>${artifact?'<button id="showAllBlanks" class="ghost small-btn">전체 빈칸</button>':''}</div></div><div class="practice-question">${esc(q.prompt)}</div><label class="block-label">정답 입력<input id="blankAnswerInput" class="text-input" autocomplete="off" placeholder="빈칸에 들어갈 표현"></label><div class="question-toolbar"><button id="submitBlankAnswer" class="primary">정답 확인</button><button id="revealBlankAnswer" class="ghost">모르겠어요 · 정답 보기</button></div>${fb?`<div class="answer-box"><strong style="color:${fb.correct?'var(--good)':'var(--bad)'}">${fb.correct?'정답입니다.':'정답을 확인하세요.'}</strong><p><b>정답:</b> ${esc(q.answer)}</p><p>${esc(q.explanation)}</p><div class="source-box"><div class="small muted">근거: ${esc(q.materialName)} · ${esc(displayPageLabel(m,q.sourcePage))}</div>${q.sourceExcerpt?`<div class="source-excerpt">“${esc(q.sourceExcerpt)}”</div>`:''}</div><button id="nextBlankBtn" class="primary" style="margin-top:12px">다음 빈칸</button></div>`:''}<div class="meta-row" style="margin-top:12px"><span>정답 ${q.known||0}</span><span>오답 ${q.wrong||0}</span><span>AI 재호출 0회</span></div></div><div class="footer-hint">저장된 빈칸 세트를 반복해서 씁니다. 정답·근거는 생성된 파일 범위에 고정됩니다.</div></div>`;
}
function checkBlankAnswer(reveal=false){
  const p=project();const list=activeBlanks(p);const q=list[blankIndex];if(!q||blankFeedback?.id===q.id)return;const input=document.querySelector('#blankAnswerInput')?.value||'';const correct=!reveal&&normalizeStudyAnswer(input)===normalizeStudyAnswer(q.answer);q.attempts=(q.attempts||0)+1;q.lastResult=correct;if(correct)q.known=(q.known||0)+1;else q.wrong=(q.wrong||0)+1;recordSetStudyAttempt('blanks',q.id,correct);blankFeedback={id:q.id,correct,reveal};p.sessions.push({id:uid(),kind:'blank',date:todayKey(),questionId:q.id,materialId:q.materialId,sourcePage:q.sourcePage,correct,createdAt:new Date().toISOString()});save();render();
}
function nextBlank(){const p=project(),list=activeBlanks(p);if(!list.length)return;const ctx=currentSetStage(p);if(ctx.stage?.key==='blanks'&&ctx.stage.status==='in_progress'&&ctx.stage.seenIds.length>=ctx.stage.itemIds.length){blankFeedback=null;completeSetStage('blanks');save();setView('setStudy');return}blankFeedback=null;blankIndex=(blankIndex+1)%list.length;render()}
function activeMcqs(p){
  const all=p.mcqQuestions||[];if(!mcqQueue.length)return all;
  const byId=new Map(all.map(q=>[q.id,q]));const filtered=mcqQueue.map(id=>byId.get(id)).filter(Boolean);
  if(!filtered.length){mcqQueue=[];activeMcqArtifactId=null;return all}return filtered;
}
function mcqView(p){
  const list=activeMcqs(p);if(!list.length)return `<div class="card"><div class="row"><div><h2>객관식 학습</h2><p class="muted">학습자료 범위에서 객관식 세트를 먼저 만들어 주세요.</p></div><span class="pill">SOURCE ONLY</span></div><div class="empty">학습자료 → 범위 학습 → ‘객관식 1회 생성’에서 만들 수 있습니다.</div><button data-go="materials" class="primary">학습자료 열기</button></div>`;
  if(mcqIndex>=list.length)mcqIndex=0;const q=list[mcqIndex];const artifact=activeMcqArtifactId?(p.sourceArtifacts||[]).find(a=>a.id===activeMcqArtifactId):null;const m=p.materials.find(x=>x.id===q.materialId);const fb=mcqFeedback?.id===q.id?mcqFeedback:null;
  return `<div class="ox-wrap"><div class="card practice-card"><div class="row"><div><span class="pill">${artifact?'저장된 객관식 세트':'전체 객관식'}</span>${artifact?`<div class="muted small" style="margin-top:5px">${esc(q.materialName)} · ${esc(displayPageLabel(m,artifact.startPage))}~${esc(displayPageLabel(m,artifact.endPage))}</div>`:''}</div><div class="row"><span class="muted small">${mcqIndex+1} / ${list.length}</span>${artifact?'<button id="showAllMcq" class="ghost small-btn">전체 객관식</button>':''}</div></div><div class="practice-question">${esc(q.question)}</div><div class="mcq-options">${q.choices.map((c,i)=>`<button class="mcq-option ${fb?(i===q.answerIndex?'correct':fb.selected===i?'wrong':''):''}" data-mcq-choice="${i}" ${fb?'disabled':''}><span>${i+1}</span>${esc(c)}</button>`).join('')}</div>${fb?`<div class="answer-box"><strong style="color:${fb.correct?'var(--good)':'var(--bad)'}">${fb.correct?'정답입니다.':'틀렸습니다.'}</strong><p><b>정답:</b> ${q.answerIndex+1}. ${esc(q.choices[q.answerIndex])}</p><p>${esc(q.explanation)}</p><div class="source-box"><div class="small muted">근거: ${esc(q.materialName)} · ${esc(displayPageLabel(m,q.sourcePage))}</div>${q.sourceExcerpt?`<div class="source-excerpt">“${esc(q.sourceExcerpt)}”</div>`:''}</div><button id="nextMcqBtn" class="primary" style="margin-top:12px">다음 문제</button></div>`:''}<div class="meta-row" style="margin-top:12px"><span>정답 ${q.correct||0}</span><span>오답 ${q.wrong||0}</span><span>AI 재호출 0회</span></div></div><div class="footer-hint">객관식도 한 번 생성한 세트를 잠가 반복합니다. 선택지 역시 선택한 자료 범위 안의 표현을 우선 사용합니다.</div></div>`;
}
function answerMcq(index){
  const p=project();const list=activeMcqs(p);const q=list[mcqIndex];if(!q||mcqFeedback?.id===q.id)return;const correct=Number(index)===Number(q.answerIndex);q.attempts=(q.attempts||0)+1;q.lastResult=correct;if(correct)q.correct=(q.correct||0)+1;else q.wrong=(q.wrong||0)+1;recordSetStudyAttempt('mcq',q.id,correct);mcqFeedback={id:q.id,selected:Number(index),correct};p.sessions.push({id:uid(),kind:'mcq',date:todayKey(),questionId:q.id,materialId:q.materialId,sourcePage:q.sourcePage,selected:Number(index),correct,createdAt:new Date().toISOString()});save();render();
}
function nextMcq(){const p=project(),list=activeMcqs(p);if(!list.length)return;const ctx=currentSetStage(p);if(ctx.stage?.key==='mcq'&&ctx.stage.status==='in_progress'&&ctx.stage.seenIds.length>=ctx.stage.itemIds.length){mcqFeedback=null;completeSetStage('mcq');save();setView('setStudy');return}mcqFeedback=null;mcqIndex=(mcqIndex+1)%list.length;render()}

async function openAiStudyDialog(){
  const dlg=document.querySelector('#aiStudyDialog');if(!dlg)return;document.querySelector('#aiStudyResult').innerHTML='';dlg.showModal();
}
async function runAiStudy(){
  const statusBox=document.querySelector('#aiStudyResult');const prompt=String(document.querySelector('#aiStudyPrompt')?.value||'').trim();if(!prompt){statusBox.innerHTML='<div class="notice warn">질문이나 원하는 학습 방식을 입력해 주세요.</div>';return}
  const r=activeMaterialDialogId?await getSelectedMaterialRange():null;if(!r){statusBox.innerHTML='<div class="notice warn">먼저 학습자료에서 범위를 연 뒤 AI 학습을 실행해 주세요.</div>';return}
  const configured=await checkAiStatus();if(!configured){statusBox.innerHTML='<div class="notice warn">AI 서버 키가 설정되지 않았습니다.</div>';return}
  const allowOutside=document.querySelector('#aiStudyScope').value==='expanded';statusBox.innerHTML='<div class="notice neutral">AI 학습 중입니다…</div>';
  try{const body={task:'tutor',materialName:r.m.name,startPage:r.startPage,endPage:r.endPage,sourceMode:r.scanMode?'images':'text',userPrompt:prompt,mode:document.querySelector('#aiStudyMode').value,allowOutside};if(r.scanMode)body.images=await selectedScanImages(r,5);else body.text=r.text.slice(0,55000);const res=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const data=await res.json();if(!res.ok)throw new Error(data.error||'AI 학습 실패');const out=data.result||{};statusBox.innerHTML=`<div class="card ai-result-card"><h3>AI 학습 답변</h3><p style="white-space:pre-wrap">${esc(out.answer||'')}</p>${(out.sourceNotes||[]).map(x=>`<div class="source-box"><strong>${esc(x.point||'자료 근거')}</strong><div class="small muted">${x.sourcePage?`${esc(displayPageLabel(r.m,x.sourcePage))} · `:''}“${esc(x.excerpt||'')}”</div></div>`).join('')}${allowOutside&&Array.isArray(out.supplementary)&&out.supplementary.length?`<div class="notice warn" style="margin-top:12px"><strong>AI 보충 설명</strong><ul>${out.supplementary.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:''}</div>`}catch(err){statusBox.innerHTML=`<div class="notice warn">AI 학습 오류: ${esc(err.message)}</div>`}
}

function oxView(p,mode){
  let qs=p.questions;const setCtx=currentSetStage(p);const setOx=setCtx.stage&&setCtx.stage.status==='in_progress'&&(setCtx.stage.key==='ox'||setCtx.stage.key==='oxWrong');
  if(setOx){const ids=setCtx.stage.key==='oxWrong'?(setCtx.stage.remainingIds||setCtx.stage.itemIds||[]):setCtx.stage.itemIds||[];qs=p.questions.filter(q=>ids.includes(q.id));oxMode=setCtx.stage.key==='oxWrong'?'wrong':'all';if(!oxQueue.length)oxQueue=[...ids];if(oxIndex>=Math.max(oxQueue.length,1))oxIndex=0}
  else{if(mode==='wrong')qs=qs.filter(q=>q.wrong>0&&q.lastResult===false);if(mode==='weak')qs=qs.filter(isWeakCurrent).sort((a,b)=>(b.wrong||0)-(a.wrong||0));if(oxUnitFilter)qs=qs.filter(q=>questionMatchesUnit(p,q,oxUnitFilter));oxMode=mode;if(!oxQueue.length||oxQueue.some(id=>!qs.find(q=>q.id===id))){oxQueue=qs.map(q=>q.id);oxIndex=0}}
  const q=qs.find(x=>x.id===oxQueue[oxIndex])||qs[0];
  const label=setOx?(setCtx.stage.key==='oxWrong'?'세트 오답 정복':'세트 OX'):(mode==='all'?'전체 문제':mode==='wrong'?'현재 오답만':'취약문제만')+(oxUnitFilterLabel?` · ${oxUnitFilterLabel}`:'');
  if(!q)return `<div class="card"><div class="row"><h2>${label}</h2><span class="pill good">완료</span></div><div class="empty">${mode==='wrong'?'현재 다시 풀 오답이 없습니다. 🎉':mode==='weak'?'현재 취약문제가 없습니다. 3회 이상 틀린 문제도 2회 연속 정답이면 안정화됩니다.':'아직 문제가 없습니다. AI 문제 생성 연결 후 업로드 자료에서 자동 생성됩니다.'}</div><div class="question-toolbar">${oxUnitFilter?'<button id="clearOxUnitFilter" class="ghost">단원 필터 해제</button>':''}${mode!=='all'?'<button data-go="ox" class="primary">전체 문제로 이동</button>':''}</div></div>`;
  return `<div class="ox-wrap"><div class="card ox-card"><div class="row"><span class="pill">${label}</span><div class="row"><span class="muted small">${Math.min(oxIndex+1,qs.length)} / ${qs.length}</span>${oxUnitFilter?'<button id="clearOxUnitFilter" class="ghost small-btn">단원 필터 해제</button>':''}</div></div><div class="ox-question">${esc(q.text)}</div><div class="row ox-meta"><div class="muted small">출처: ${esc(q.source||'미지정')}</div><div>${relatedTheoryForQuestion(p,q)?'<span class="pill good" style="margin-right:6px">관련 이론 연결</span>':''}<span class="pill ${weakLevel(q).className}">${weakLevel(q).label} · 오답 ${q.wrong||0}회</span></div></div><div class="ox-actions" style="margin-top:26px"><button class="ox-btn" data-answer="true">⭕ O</button><button class="ox-btn" data-answer="false">❌ X</button></div><div id="answerArea"></div></div><div class="footer-hint">맞으면 넘어가고, 틀리면 오답복습에 남습니다. 1회 오답=일반, 2회=주의, 3회 이상=취약입니다. 취약문제도 2회 연속 정답이면 안정화됩니다.</div></div>`;
}

function bindView(){
  document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>setView(b.dataset.go));
  document.querySelectorAll('[data-start-set-study]').forEach(b=>b.onclick=()=>startLearningSetStudy(b.dataset.startSetStudy));
  document.querySelectorAll('[data-start-set-stage]').forEach(b=>b.onclick=()=>runSetStudyStage(b.dataset.startSetStage));
  document.querySelectorAll('[data-restart-set]').forEach(b=>b.onclick=()=>{const p=project();const old=(p.setStudySessions||[]).find(x=>x.groupKey===b.dataset.restartSet&&!x.endedAt);if(old)old.endedAt=new Date().toISOString();activeSetStudySessionId=null;startLearningSetStudy(b.dataset.restartSet)});
  const returnSet=document.querySelector('#returnSetStudyBtn');if(returnSet)returnSet.onclick=()=>setView('setStudy');
  const finishSet=document.querySelector('#finishSetStudyBtn');if(finishSet)finishSet.onclick=()=>{if(confirm('현재 세트 학습을 여기서 종료할까요?')){finishSetStudySession(true);render()}};
  const scheduleReview=document.querySelector('#scheduleSetReviewBtn');if(scheduleReview)scheduleReview.onclick=()=>{const s=activeSetStudySession(project());if(s)saveReviewPlanForSession(s.id)};
  document.querySelectorAll('[data-open-shelf-artifact]').forEach(b=>b.onclick=async()=>{const a=(project().sourceArtifacts||[]).find(x=>x.id===b.dataset.openShelfArtifact);if(!a)return;const m=project().materials.find(x=>x.id===a.materialId);if(!m)return;if(a.type==='summary'){await openMaterialDialog(m.id,{start:a.startPage,end:a.endPage});renderStoredSummary(a,{m,startPage:a.startPage,endPage:a.endPage});return}openSourceArtifact(a.type,{m,startPage:a.startPage,endPage:a.endPage})});
  document.querySelectorAll('[data-open-set-artifact]').forEach(b=>b.onclick=async()=>{const a=(project().sourceArtifacts||[]).find(x=>x.id===b.dataset.openSetArtifact);if(!a)return;const m=project().materials.find(x=>x.id===a.materialId);if(!m)return;if(a.type==='summary'){await openMaterialDialog(m.id,{start:a.startPage,end:a.endPage});renderStoredSummary(a,{m,startPage:a.startPage,endPage:a.endPage});return}openSourceArtifact(a.type,{m,startPage:a.startPage,endPage:a.endPage})});
  document.querySelectorAll('[data-open-set-range],[data-build-set-tool]').forEach(b=>b.onclick=async()=>{const key=b.dataset.openSetRange||b.dataset.buildSetTool;const g=learningSetGroups(project()).find(x=>x.key===key);if(!g)return;await openMaterialDialog(g.materialId,{start:g.startPage,end:g.endPage})});
  document.querySelectorAll('[data-ai-set]').forEach(b=>b.onclick=async()=>{const g=learningSetGroups(project()).find(x=>x.key===b.dataset.aiSet);if(!g)return;await openMaterialDialog(g.materialId,{start:g.startPage,end:g.endPage});document.querySelector('#materialDialog').close();await openAiStudyDialog()});
  const aiViewBtn=document.querySelector('#openAiStudyFromView');if(aiViewBtn)aiViewBtn.onclick=()=>{alert('학습자료에서 범위를 연 뒤 AI 학습 버튼을 눌러 주세요.');setView('materials')};
  const flip=document.querySelector('#flipCardBtn');if(flip)flip.onclick=()=>{flashcardFlipped=!flashcardFlipped;render()};
  const allCards=document.querySelector('#showAllFlashcards');if(allCards)allCards.onclick=()=>{flashcardQueue=[];activeFlashcardArtifactId=null;flashcardIndex=0;flashcardFlipped=false;render()};
  document.querySelectorAll('[data-card-rate]').forEach(b=>b.onclick=()=>rateFlashcard(b.dataset.cardRate));
  const submitBlank=document.querySelector('#submitBlankAnswer');if(submitBlank)submitBlank.onclick=()=>checkBlankAnswer(false);
  const revealBlank=document.querySelector('#revealBlankAnswer');if(revealBlank)revealBlank.onclick=()=>checkBlankAnswer(true);
  const nextBlankBtn=document.querySelector('#nextBlankBtn');if(nextBlankBtn)nextBlankBtn.onclick=nextBlank;
  const showAllBlanks=document.querySelector('#showAllBlanks');if(showAllBlanks)showAllBlanks.onclick=()=>{blankQueue=[];activeBlankArtifactId=null;blankIndex=0;blankFeedback=null;render()};
  document.querySelectorAll('[data-mcq-choice]').forEach(b=>b.onclick=()=>answerMcq(Number(b.dataset.mcqChoice)));
  const nextMcqBtn=document.querySelector('#nextMcqBtn');if(nextMcqBtn)nextMcqBtn.onclick=nextMcq;
  const showAllMcq=document.querySelector('#showAllMcq');if(showAllMcq)showAllMcq.onclick=()=>{mcqQueue=[];activeMcqArtifactId=null;mcqIndex=0;mcqFeedback=null;render()};
  bindUpload('quick');
  bindUpload('main');

  const sp=document.querySelector('#savePaste');
  if(sp)sp.onclick=()=>{
    const title=document.querySelector('#pasteTitle').value.trim()||'붙여넣은 자료';
    const content=document.querySelector('#pasteText').value.trim();
    if(!content)return alert('내용을 붙여넣어 주세요.');
    const m={id:uid(),name:title,type:'paste',sourceRole:'auto',content,analysisStatus:'processing',createdAt:new Date().toISOString()};
    project().materials.push(m);analyzeMaterial(m);save();render();
  };

  document.querySelectorAll('[data-open-material]').forEach(b=>b.onclick=()=>openMaterialDialog(b.dataset.openMaterial));
  document.querySelectorAll('[data-study-unit]').forEach(b=>b.onclick=()=>openProgressUnit(b.dataset.studyUnit));
  document.querySelectorAll('[data-open-related-progress]').forEach(b=>b.onclick=()=>openRelatedProgress(b.dataset.openRelatedProgress));
  document.querySelectorAll('[data-delete-material]').forEach(b=>b.onclick=async()=>{
    const m=project().materials.find(x=>x.id===b.dataset.deleteMaterial);if(!m)return;
    if(!confirm(`'${m.name}' 자료를 삭제할까요?\n진도 항목은 자료와 연결된 것만 함께 정리합니다.`))return;
    project().materials=project().materials.filter(x=>x.id!==m.id);
    project().progress=project().progress.filter(u=>u.sourceMaterialId!==m.id);
    await deleteMaterialPayload(m.id).catch(()=>{});save();render();
  });
  document.querySelectorAll('[data-reanalyze]').forEach(b=>b.onclick=async()=>{
    const m=project().materials.find(x=>x.id===b.dataset.reanalyze);if(!m)return;
    const payload=await getMaterialPayload(m.id).catch(()=>null);analyzeMaterial(m,payload?.text||m.content||'');save();render();
  });
  document.querySelectorAll('[data-role-select]').forEach(s=>s.onchange=async()=>{
    const m=project().materials.find(x=>x.id===s.dataset.roleSelect);if(!m)return;m.sourceRole=s.value;
    const payload=await getMaterialPayload(m.id).catch(()=>null);analyzeMaterial(m,payload?.text||m.content||'');save();render();
  });
  document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>answerOX(b.dataset.answer==='true'));
  ['newNoteBtn','theoryNoteBtn'].forEach(id=>{const b=document.querySelector('#'+id);if(b)b.onclick=()=>document.querySelector('#noteDialog').showModal()});
  const au=document.querySelector('#addUnitBtn');if(au)au.onclick=()=>{const unit=prompt('단원 이름을 입력하세요.');if(!unit)return;project().progress.push({id:uid(),unit,theory:0,practice:0,review:0});save();render()};
  const eg=document.querySelector('#editGoalBtn');if(eg)eg.onclick=()=>editDailyGoal();
  const efg=document.querySelector('#editFocusGoalBtn');if(efg)efg.onclick=()=>editStudyFocus();
  const sr=document.querySelector('#saveRecallBtn');if(sr)sr.onclick=()=>saveRecallOutput();
  [['startFocus25',25],['startFocus40',40],['startFocus50',50]].forEach(([id,min])=>{const b=document.querySelector('#'+id);if(b)b.onclick=()=>startFocus(min)});
  const sf=document.querySelector('#stopFocusBtn');if(sf)sf.onclick=()=>stopFocus(true);
  const ss=document.querySelector('#saveSessionBtn');if(ss)ss.onclick=()=>saveStudySession();
  const sg=document.querySelector('#startGuidedFromDashboard');if(sg)sg.onclick=createGuidedSession;
  const cg=document.querySelector('#createGuidedBtn');if(cg)cg.onclick=createGuidedSession;
  const fg=document.querySelector('#finishGuidedBtn');if(fg)fg.onclick=finishGuidedSession;
  const rg=document.querySelector('#replanGuidedBtn');if(rg)rg.onclick=createGuidedSession;
  document.querySelectorAll('[data-run-guided]').forEach(b=>b.onclick=()=>runGuidedPhase(Number(b.dataset.runGuided)));
  document.querySelectorAll('[data-toggle-guided]').forEach(b=>b.onclick=()=>{const gs=activeGuidedSession(project());if(gs){gs.feedback=document.querySelector('#guidedFeedback')?.value.trim()||gs.feedback||'';gs.improvement=document.querySelector('#guidedImprove')?.value.trim()||gs.improvement||'';}const ph=gs?.phases?.[Number(b.dataset.toggleGuided)];markGuidedPhase(Number(b.dataset.toggleGuided),ph?.status!=='done')});
  const cof=document.querySelector('#clearOxUnitFilter');if(cof)cof.onclick=()=>{oxUnitFilter=null;oxUnitFilterLabel='';oxQueue=[];render()};
}

function formatTime(sec){const m=Math.floor(sec/60),s=sec%60;return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`}
function editStudyFocus(){
  const p=project();
  const next=prompt('오늘 가장 중요한 학습 한 가지를 한 문장으로 적어주세요.',p.studyFocus||'');
  if(next===null)return; p.studyFocus=next.trim()||'오늘 가장 중요한 학습 한 가지';save();render();
}
function saveRecallOutput(){
  const p=project();const body=document.querySelector('#recallBody')?.value.trim()||'';if(!body)return alert('먼저 기억나는 내용을 설명해 주세요.');
  const materialId=document.querySelector('#recallMaterial')?.value||'';const m=p.materials.find(x=>x.id===materialId);
  p.outputs.push({id:uid(),materialId,materialName:m?.name||'직접',unit:document.querySelector('#recallUnit')?.value||'',prompt:document.querySelector('#recallPrompt')?.value.trim()||'',body,createdAt:new Date().toISOString()});
  save();render();
}
function editDailyGoal(){
  const p=project(),g=p.dailyGoal||{minutes:50,pages:20,questions:30};
  const minutes=Number(prompt('하루 집중시간 목표(분)',g.minutes)); if(!Number.isFinite(minutes)||minutes<0)return;
  const pages=Number(prompt('하루 진도 목표(페이지)',g.pages)); if(!Number.isFinite(pages)||pages<0)return;
  const questions=Number(prompt('하루 문제 목표(개)',g.questions)); if(!Number.isFinite(questions)||questions<0)return;
  p.dailyGoal={minutes,pages,questions};save();render();
}
function startFocus(minutes){
  if(focusTimerId){if(!confirm('현재 타이머를 종료하고 새로 시작할까요?'))return;stopFocus(false)}
  focusPlannedMinutes=minutes;focusRemaining=minutes*60;
  focusTimerId=setInterval(()=>{
    focusRemaining--;
    const el=document.querySelector('#focusTimerText'); if(el)el.textContent=formatTime(Math.max(0,focusRemaining));
    if(focusRemaining<=0){
      clearInterval(focusTimerId);focusTimerId=null;
      project().sessions.push({id:uid(),kind:'study',date:todayKey(),minutes:focusPlannedMinutes,pages:0,questions:0,note:'집중 타이머 완료',createdAt:new Date().toISOString()});
      save();alert(`${focusPlannedMinutes}분 집중 학습을 완료했습니다. 학습 기록에 저장했습니다.`);render();
    }
  },1000);
  render();
}
function stopFocus(savePartial){
  if(!focusTimerId)return;
  clearInterval(focusTimerId);focusTimerId=null;
  const elapsed=Math.max(1,Math.round((focusPlannedMinutes*60-focusRemaining)/60));
  if(savePartial&&confirm(`${elapsed}분을 학습 기록으로 저장할까요?`)){
    project().sessions.push({id:uid(),kind:'study',date:todayKey(),minutes:elapsed,pages:0,questions:0,note:'집중 타이머 중간 종료',createdAt:new Date().toISOString()});save();
  }
  focusRemaining=0;render();
}
function saveStudySession(){
  const p=project();
  const start=Number(document.querySelector('#sessionStartPage')?.value||0), end=Number(document.querySelector('#sessionEndPage')?.value||0);
  const expectedMinutes=Number(document.querySelector('#sessionExpectedMinutes')?.value||0);
  const minutes=Number(document.querySelector('#sessionMinutes')?.value||0), questions=Number(document.querySelector('#sessionQuestions')?.value||0);
  const focusRating=Number(document.querySelector('#sessionFocusRating')?.value||0);
  if(minutes<=0)return alert('학습 시간을 입력해 주세요.');
  const pages=(start>0&&end>=start)?(end-start+1):0;
  const materialId=document.querySelector('#sessionMaterial')?.value||'';
  const material=p.materials.find(m=>m.id===materialId);
  p.sessions.push({id:uid(),kind:'study',date:todayKey(),materialId,materialName:material?.name||'직접/기타',unit:document.querySelector('#sessionUnit')?.value||'',startPage:start||null,endPage:end||null,pages,expectedMinutes,minutes,questions,focusRating,plan:document.querySelector('#sessionPlan')?.value.trim()||'',feedback:document.querySelector('#sessionFeedback')?.value.trim()||'',improvement:document.querySelector('#sessionImprove')?.value.trim()||'',note:document.querySelector('#sessionNote')?.value.trim()||'',createdAt:new Date().toISOString()});
  save();render();
}
function sessionRow(s){return `<div class="session-row"><div><strong>${esc(s.materialName||'학습 세션')}</strong><div class="muted small">${esc(s.unit||'단원 미지정')} · ${new Date(s.createdAt||s.date).toLocaleString('ko-KR')}</div>${s.plan?`<div class="small session-note"><b>Plan</b> ${esc(s.plan)}</div>`:''}${s.feedback?`<div class="small session-note"><b>Feedback</b> ${esc(s.feedback)}</div>`:''}${s.improvement?`<div class="small session-note"><b>Improve</b> ${esc(s.improvement)}</div>`:''}${s.note?`<div class="small session-note">${esc(s.note)}</div>`:''}</div><div class="session-metrics">${s.expectedMinutes?`<span>예상 ${s.expectedMinutes}분</span>`:''}<span>실제 ${s.minutes||0}분</span>${s.focusRating?`<span>집중 ${'★'.repeat(s.focusRating)}</span>`:''}<span>${s.pages||0}p</span><span>${s.questions||0}문제</span></div></div>`}

async function openProgressUnit(progressId){
  const p=project();const u=p.progress.find(x=>x.id===progressId);if(!u?.sourceMaterialId)return;
  const m=p.materials.find(x=>x.id===u.sourceMaterialId);if(!m)return;
  const r=getUnitRange(m,u.unit);await openMaterialDialog(m.id,r);
}
async function openRelatedProgress(progressId){
  const p=project();const u=p.progress.find(x=>x.id===progressId);if(!u?.sourceMaterialId)return;
  const source=p.materials.find(m=>m.id===u.sourceMaterialId);const targetKind=materialRole(source)==='problem'?'theory':'problem';
  const rel=relatedUnitFor(p,u.sourceMaterialId,u.unit,targetKind);if(!rel)return alert('연결된 교재 단원을 찾지 못했습니다.');
  await openMaterialDialog(rel.material.id,rel.range);
}

function bindUpload(prefix){
  const fi=document.querySelector(`#${prefix}FileInput`);
  const dz=document.querySelector(`#${prefix}Dropzone`);
  if(fi)fi.onchange=e=>handleFiles([...e.target.files]);
  if(!dz)return;
  ['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('drag')}));
  ['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('drag')}));
  dz.addEventListener('drop',e=>handleFiles([...e.dataTransfer.files]));
}

function answerOX(value){
  const p=project();const q=p.questions.find(x=>x.id===oxQueue[oxIndex]);if(!q)return;
  const correct=value===q.answer;q.attempts++;q.lastResult=correct;
  if(correct)q.streak=(q.streak||0)+1;else{q.wrong++;q.streak=0}
  const setCtx=currentSetStage(p);if(setCtx.stage?.key==='ox'&&setCtx.stage.status==='in_progress')recordSetStudyAttempt('ox',q.id,correct);else if(setCtx.stage?.key==='oxWrong'&&setCtx.stage.status==='in_progress')recordSetStudyAttempt('oxWrong',q.id,correct);
  p.sessions.push({id:uid(),kind:'question',date:todayKey(),questionId:q.id,materialId:q.materialId||'',sourcePage:q.sourcePage||null,selected:value,correct,mode:oxMode,createdAt:new Date().toISOString()});
  save();
  const area=document.querySelector('#answerArea');
  const lvl=weakLevel(q);
  area.innerHTML=`<div class="answer-box"><strong style="color:${correct?'var(--good)':'var(--bad)'}">${correct?'정답입니다.':'틀렸습니다.'}</strong><p>${esc(q.explanation)}</p><div class="source-box"><strong>원문/근거</strong><div class="small muted">${esc(q.source||'미지정')}</div>${q.sourceExcerpt?`<div class="source-excerpt">${esc(q.sourceExcerpt)}</div>`:''}</div><div class="question-toolbar"><button id="nextQ" class="primary">다음 문제</button>${q.materialId?'<button id="sourceQ" class="ghost">문제 근거 보기</button>':''}${relatedTheoryForQuestion(p,q)?'<button id="relatedTheoryQ" class="ghost">관련 기본서 보기</button>':''}<button id="noteQ" class="ghost">노트에 저장</button><span class="pill ${lvl.className}">${lvl.label}</span></div></div>`;
  document.querySelector('#nextQ').onclick=()=>{
    const ctx=currentSetStage(project());
    if(ctx.stage?.key==='ox'&&ctx.stage.status==='in_progress'){
      if(ctx.stage.seenIds.length>=ctx.stage.itemIds.length){completeSetStage('ox');oxQueue=[];oxIndex=0;save();setView('setStudy');return}
      oxIndex=(oxIndex+1)%Math.max(oxQueue.length,1);render();return;
    }
    if(ctx.stage?.key==='oxWrong'&&ctx.stage.status==='in_progress'){
      if(correct){ctx.stage.remainingIds=(ctx.stage.remainingIds||ctx.stage.itemIds||[]).filter(id=>id!==q.id);oxQueue=oxQueue.filter(id=>id!==q.id);if(oxIndex>=oxQueue.length)oxIndex=0}
      else oxIndex=(oxIndex+1)%Math.max(oxQueue.length,1);
      if(!(ctx.stage.remainingIds||[]).length){completeSetStage('oxWrong');oxQueue=[];oxIndex=0;save();setView('setStudy');return}
      save();render();return;
    }
    if(oxMode==='wrong'&&correct){oxQueue=oxQueue.filter(id=>id!==q.id);if(oxIndex>=oxQueue.length)oxIndex=0}
    else oxIndex=(oxIndex+1)%Math.max(oxQueue.length,1);
    render();
  };
  const sourceBtn=document.querySelector('#sourceQ');if(sourceBtn)sourceBtn.onclick=()=>openMaterialDialog(q.materialId,{start:q.sourcePage||1,end:q.sourcePage||1});
  const theoryBtn=document.querySelector('#relatedTheoryQ');if(theoryBtn)theoryBtn.onclick=()=>{const rel=relatedTheoryForQuestion(p,q);if(rel)openMaterialDialog(rel.material.id,rel.range)};
  document.querySelector('#noteQ').onclick=()=>{project().notes.unshift({id:uid(),title:q.text.slice(0,50),body:`정답: ${q.answer?'O':'X'}\n해설: ${q.explanation}${q.sourceExcerpt?`\n원문: ${q.sourceExcerpt}`:''}\n출처: ${q.source||'미지정'}`,kind:'학습 노트',source:q.source||'',materialId:q.materialId||'',sourcePage:q.sourcePage||null,createdAt:new Date().toISOString()});save();alert('노트에 저장했습니다.')};
}

async function handleFiles(files){
  if(!files.length)return;
  for(const file of files){
    const ext=(file.name.split('.').pop()||'file').toLowerCase();
    const m={id:uid(),name:file.name,type:ext,sourceRole:'auto',content:'',contentChars:0,size:file.size,analysisStatus:'processing',createdAt:new Date().toISOString()};
    project().materials.push(m);save();render();
    try{
      if(['txt','md','json'].includes(ext)){
        const text=await file.text();
        await persistExtractedMaterial(m,text,[{page:1,text}]);
        if(ext==='json')importQuestionsFromJson(m);
      }else if(ext==='pdf'){
        await extractPdfMaterial(file,m);
      }else{
        m.analysisStatus='engine-needed';
        m.analysis={detectedType:'문서 자료',units:[],chars:0,lines:0,stage:`${ext.toUpperCase()} 원문 추출은 다음 확장 단계`};
      }
    }catch(err){
      console.error(err);m.analysisStatus='error';m.analysis={detectedType:'읽기 오류',units:[],stage:err?.message||'파일 읽기 실패'};
    }
    save();render();
    if(files.length===1&&simpleMode&&['ready','scan-ready'].includes(m.analysisStatus))await openMaterialDialog(m.id);
  }
}

async function loadPdfJs(){
  if(window.__studyPdfJs)return window.__studyPdfJs;
  const pdfjs=await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs';
  window.__studyPdfJs=pdfjs;return pdfjs;
}

async function extractPdfMaterial(file,m){
  m.analysisStatus='extracting';m.extractProgress=1;save();render();
  const pdfjs=await loadPdfJs();
  const buf=await file.arrayBuffer();
  const pdf=await pdfjs.getDocument({data:new Uint8Array(buf)}).promise;
  m.pageCount=pdf.numPages;

  // 먼저 일부 페이지만 샘플링해 텍스트 PDF인지 스캔 이미지 PDF인지 판별합니다.
  const sampleSet=new Set([1,2,3,4,5,Math.max(1,Math.round(pdf.numPages/2)),pdf.numPages]);
  let sampleChars=0;
  for(const i of [...sampleSet].filter(n=>n>=1&&n<=pdf.numPages)){
    const page=await pdf.getPage(i);const tc=await page.getTextContent();
    sampleChars+=normalizePdfItems(tc.items).length;
  }
  const isScan=sampleChars<80;
  m.scanMode=isScan;

  if(isScan){
    const pages=Array.from({length:pdf.numPages},(_,i)=>({page:i+1,text:''}));
    m.contentChars=0;m.content='';m.extractProgress=100;
    const blob=new Blob([buf],{type:'application/pdf'});
    await putMaterialPayload(m.id,{text:'',pages,pdfBlob:blob,scanMode:true,savedAt:new Date().toISOString()});
    const profile=knownProfileFor(m.name,m.pageCount);
    if(profile){
      m.sourceRole=profile.role;m.printedPageOffset=profile.printedPageOffset||0;
      const units=profile.units.filter(([,page])=>page<=pdf.numPages).map(([title,page])=>({title,page}));
      m.analysisStatus='scan-ready';
      m.analysis={detectedType:roleLabel(profile.role),autoDetectedRole:profile.role,units,chars:0,lines:0,stage:'스캔 PDF 감지 · 교재 목차 프리셋 적용',profileName:profile.name,profileCoverage:profile.coverage||''};
      syncUnitsToProgress(m,units);
    }else{
      m.analysisStatus='scan-ready';
      m.analysis={detectedType:'스캔 PDF',autoDetectedRole:'auto',units:[{title:'자료 전체',page:1}],chars:0,lines:0,stage:'스캔 PDF 감지 · 페이지 이미지 준비 완료'};
      syncUnitsToProgress(m,m.analysis.units);
    }
    save();render();return;
  }

  const pages=[];const chunks=[];
  for(let i=1;i<=pdf.numPages;i++){
    const page=await pdf.getPage(i);const tc=await page.getTextContent();
    const text=normalizePdfItems(tc.items);
    pages.push({page:i,text});chunks.push(`\n[[PAGE ${i}]]\n${text}`);
    m.extractProgress=Math.max(1,Math.round(i/pdf.numPages*100));
    if(i===1||i===pdf.numPages||i%5===0){save();render()}
  }
  const full=chunks.join('\n').trim();
  await persistExtractedMaterial(m,full,pages);
  m.extractProgress=100;
}
function normalizePdfItems(items){
  let out='',lastY=null;
  for(const item of items||[]){
    const str=String(item.str||'').trim();if(!str)continue;
    const y=Math.round(item.transform?.[5]||0);
    if(lastY!==null&&Math.abs(y-lastY)>3)out+='\n';else if(out&&!out.endsWith('\n'))out+=' ';
    out+=str;lastY=y;
  }
  return out.replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim();
}

async function persistExtractedMaterial(m,fullText,pages){
  m.contentChars=fullText.length;
  m.content=fullText.slice(0,18000);
  m.pageCount=pages?.length||m.pageCount||1;
  await putMaterialPayload(m.id,{text:fullText,pages:pages||[{page:1,text:fullText}],savedAt:new Date().toISOString()});
  analyzeMaterial(m,fullText);
}

function analyzeMaterial(m,sourceText){
  const content=(sourceText??m.content??'').trim();
  if(!content){
    if(m.scanMode){const profile=knownProfileFor(m.name,m.pageCount);if(profile){const units=profile.units.filter(([,page])=>page<=Number(m.pageCount||9999)).map(([title,page])=>({title,page}));m.sourceRole=profile.role;m.printedPageOffset=profile.printedPageOffset||0;m.analysisStatus='scan-ready';m.analysis={detectedType:roleLabel(profile.role),autoDetectedRole:profile.role,units,chars:0,lines:0,stage:'스캔 PDF · 교재 목차 프리셋',profileName:profile.name,profileCoverage:profile.coverage||''};syncUnitsToProgress(m,units)}return}
    m.analysisStatus='engine-needed';return
  }
  const autoRole=detectRole(content,m.type);
  const effectiveRole=m.sourceRole==='auto'?autoRole:m.sourceRole;
  const units=extractUnits(content);
  m.analysisStatus='ready';
  m.analysis={
    detectedType:roleLabel(effectiveRole),
    autoDetectedRole:autoRole,
    units,
    chars:content.length,
    lines:content.split(/\r?\n/).length,
    stage:m.type==='pdf'?'PDF 원문 추출 + 기본 구조화 완료':'기본 구조화 완료'
  };
  syncUnitsToProgress(m,units);
}

function detectRole(content,type){
  if(type==='json'&&/"(question|questions|answer|explanation|정답|문제)"/i.test(content))return 'problem';
  const problemHits=(content.match(/(?:문제\s*\d+|정답|해설|①|②|③|④|⑤|\bO\b|\bX\b|다음 중|옳은 것은|틀린 것은)/g)||[]).length;
  const theoryHits=(content.match(/(?:제\s*\d+\s*[장절편]|PART\s*\d+|CHAPTER\s*\d+|개념|정의|원칙|요건|효과|의의|특징|종류)/gi)||[]).length;
  if(problemHits>=4&&theoryHits>=3)return 'mixed';
  if(problemHits>=4)return 'problem';
  if(content.length<700&&problemHits===0)return 'note';
  return 'theory';
}

function extractUnits(content){
  const raw=content.split(/\r?\n/);const headings=[];let currentPage=1;
  const patterns=[/^#{1,6}\s+(.+)/,/^(?:PART|Part)\s*\d+\s*[:.\-–—]?\s*.{1,70}$/,/^(?:CHAPTER|Chapter)\s*\d+\s*[:.\-–—]?\s*.{1,70}$/,/^제\s*\d+\s*[장편절]\s*[:.\-–—]?\s*(.*)/,/^\d{1,2}[.)]\s+.{2,60}$/];
  for(const rawLine of raw){
    const page=rawLine.match(/^\[\[PAGE\s+(\d+)\]\]$/);if(page){currentPage=Number(page[1]);continue}
    const line=rawLine.trim();if(!line||line.length>100)continue;
    if(patterns.some(re=>re.test(line))){
      const clean=line.replace(/^#{1,6}\s+/,'').replace(/[:：]$/,'').trim();
      if(clean&&!headings.some(h=>(typeof h==='string'?h:h.title)===clean))headings.push({title:clean,page:currentPage});
    }
    if(headings.length>=60)break;
  }
  if(!headings.length)return [{title:'자료 전체',page:1}];
  return headings;
}

function syncUnitsToProgress(m,units){
  const p=project();
  units.slice(0,60).forEach(unit=>{
    const title=typeof unit==='string'?unit:unit.title;const sourcePage=typeof unit==='string'?null:unit.page;
    const exists=p.progress.some(u=>u.sourceMaterialId===m.id&&u.unit===title);
    if(!exists)p.progress.push({id:uid(),unit:title,theory:0,practice:0,review:0,sourceMaterialId:m.id,sourcePage});
  });
}

function importQuestionsFromJson(m){
  let data;
  try{data=JSON.parse(m.content)}catch{return}
  const arr=Array.isArray(data)?data:(Array.isArray(data.questions)?data.questions:null);
  if(!arr)return;
  let imported=0;
  for(const item of arr.slice(0,1000)){
    const text=item.text||item.question||item.문제||item.prompt;
    let answer=item.answer??item.정답??item.correct;
    if(typeof answer==='string'){
      const a=answer.trim().toLowerCase();
      if(['o','true','맞음','정답','1'].includes(a))answer=true;
      else if(['x','false','틀림','오답','0'].includes(a))answer=false;
      else continue;
    }
    if(!text||typeof answer!=='boolean')continue;
    project().questions.push({id:uid(),text:String(text),answer,explanation:String(item.explanation||item.해설||'업로드된 문제 데이터'),source:`${m.name}${item.source?` · ${item.source}`:''}`,attempts:0,wrong:0,streak:0,lastResult:null});
    imported++;
  }
  if(imported){m.analysis.importedQuestions=imported;m.analysis.detectedType='문제집'}
}


function renderUnitNavigator(m){
  const box=document.querySelector('#materialUnitNav');if(!box)return;
  const units=materialUnits(m);
  box.innerHTML=units.length?`<div class="unit-nav-title">단원 바로가기</div><div class="unit-nav-list">${units.slice(0,80).map(u=>`<button type="button" class="unit-nav-btn" data-unit-index="${u.index}">${esc(u.title)} <small>${displayPageLabel(m,u.page||1)}</small></button>`).join('')}</div>`:'<div class="muted small">감지된 단원이 없습니다.</div>';
  box.querySelectorAll('[data-unit-index]').forEach(btn=>btn.onclick=async()=>{const u=units[Number(btn.dataset.unitIndex)];const r=getUnitRange(m,u.title);document.querySelector('#rangeStartPage').value=r.start;document.querySelector('#rangeEndPage').value=r.end;await previewMaterialRange()});
}

async function openMaterialDialog(materialId,initialRange=null){
  const p=project();const m=p.materials.find(x=>x.id===materialId);if(!m)return;
  activeMaterialDialogId=m.id;
  const dlg=document.querySelector('#materialDialog');
  document.querySelector('#materialDialogTitle').textContent=m.name;
  const payload=await getMaterialPayload(m.id).catch(()=>null);
  const pageCount=payload?.pages?.length||m.pageCount||1;
  document.querySelector('#materialDialogMeta').innerHTML=`<span>${esc(m.analysis?.detectedType||roleLabel(m.sourceRole))}</span><span>${m.scanMode?'스캔 이미지형':Number(m.contentChars||0).toLocaleString()+'자'}</span><span>${pageCount}p</span>${m.analysis?.profileName?`<span class="pill good">목차 프리셋</span>`:''}${m.analysis?.profileCoverage?`<span class="pill">${esc(m.analysis.profileCoverage)}</span>`:''}`;
  const start=document.querySelector('#rangeStartPage'),end=document.querySelector('#rangeEndPage');start.max=pageCount;end.max=pageCount;start.value=Math.max(1,Math.min(pageCount,Number(initialRange?.start||1)));end.value=Math.max(Number(start.value),Math.min(pageCount,Number(initialRange?.end||Math.min(pageCount,5))));
  renderUnitNavigator(m);
  document.querySelector('#aiResultBox').innerHTML='';
  document.querySelector('#aiStatusBox').className='notice neutral';document.querySelector('#aiStatusBox').textContent='자료 범위를 선택하세요. 자료 기반 학습도구는 원문 밖의 내용을 보충하지 않습니다.';
  await previewMaterialRange();await refreshSourceToolButtons();dlg.showModal();
  const configured=await checkAiStatus();
  const status=document.querySelector('#aiStatusBox');
  if(!configured){status.className='notice warn';status.innerHTML='문제 생성 준비가 필요합니다. Vercel 프로젝트의 환경변수 <b>OPENAI_API_KEY</b>를 설정한 뒤 재배포해 주세요. 현재는 자료·단원 확인과 이미 만든 문제 복습을 이용할 수 있습니다.'}
}
async function getSelectedMaterialRange(){
  const m=project().materials.find(x=>x.id===activeMaterialDialogId);if(!m)return null;
  const payload=await getMaterialPayload(m.id).catch(()=>null);
  if(!payload){return {m,text:m.content||'',startPage:1,endPage:1,pageCount:1}}
  const pages=payload.pages||[];const max=pages.length||1;
  let start=Math.max(1,Math.min(max,Number(document.querySelector('#rangeStartPage').value||1)));
  let end=Math.max(start,Math.min(max,Number(document.querySelector('#rangeEndPage').value||start)));
  document.querySelector('#rangeStartPage').value=start;document.querySelector('#rangeEndPage').value=end;
  const selected=pages.filter(p=>p.page>=start&&p.page<=end);
  const text=selected.map(p=>`[p.${p.page}]\n${p.text}`).join('\n\n');
  return {m,text,startPage:start,endPage:end,pageCount:max,scanMode:Boolean(payload.scanMode||m.scanMode),payload};
}
async function pdfDocFromPayload(payload){
  if(!payload?.pdfBlob)throw new Error('스캔 PDF 원본이 브라우저 저장소에 없습니다. 파일을 다시 등록해 주세요.');
  const pdfjs=await loadPdfJs();const buf=await payload.pdfBlob.arrayBuffer();
  return pdfjs.getDocument({data:new Uint8Array(buf)}).promise;
}
async function renderPdfPageDataUrl(pdf,pageNumber,{maxWidth=980,quality=.76}={}){
  const page=await pdf.getPage(pageNumber);const raw=page.getViewport({scale:1});
  const scale=Math.min(2,Math.max(.7,maxWidth/raw.width));const vp=page.getViewport({scale});
  const canvas=document.createElement('canvas');canvas.width=Math.ceil(vp.width);canvas.height=Math.ceil(vp.height);
  const ctx=canvas.getContext('2d',{alpha:false});ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);
  await page.render({canvasContext:ctx,viewport:vp}).promise;
  return canvas.toDataURL('image/jpeg',quality);
}
async function selectedScanImages(r,maxPages=5){
  const count=r.endPage-r.startPage+1;
  if(count>maxPages)throw new Error(`스캔 PDF AI 분석은 한 번에 최대 ${maxPages}페이지입니다. 범위를 줄여 주세요.`);
  const pdf=await pdfDocFromPayload(r.payload);const images=[];
  for(let p=r.startPage;p<=r.endPage;p++)images.push({page:p,dataUrl:await renderPdfPageDataUrl(pdf,p,{maxWidth:1180,quality:.74})});
  return images;
}
async function previewMaterialRange(){
  const r=await getSelectedMaterialRange();if(!r)return;
  const pre=document.querySelector('#materialTextPreview');const imageBox=document.querySelector('#materialImagePreview');
  if(r.scanMode){
    pre.style.display='none';imageBox.style.display='grid';imageBox.innerHTML='<div class="muted small">페이지 이미지를 준비하고 있습니다…</div>';
    try{
      const pdf=await pdfDocFromPayload(r.payload);const maxPreview=Math.min(r.endPage, r.startPage+5);const html=[];
      for(let p=r.startPage;p<=maxPreview;p++){
        const url=await renderPdfPageDataUrl(pdf,p,{maxWidth:760,quality:.72});
        html.push(`<figure class="scan-page"><figcaption>${displayPageLabel(r.m,p)}</figcaption><img src="${url}" alt="${esc(r.m.name)} ${p}페이지" /></figure>`);
      }
      if(r.endPage>maxPreview)html.push(`<div class="notice neutral scan-more">미리보기는 앞 ${maxPreview-r.startPage+1}페이지만 표시합니다. AI 분석 시 선택 범위는 최대 5페이지입니다.</div>`);
      imageBox.innerHTML=html.join('');
    }catch(err){imageBox.innerHTML=`<div class="notice warn">스캔 페이지 표시 오류: ${esc(err.message)}</div>`}
  }else{
    imageBox.style.display='none';imageBox.innerHTML='';pre.style.display='block';pre.textContent=r.text.slice(0,30000)+(r.text.length>30000?'\n\n… 미리보기는 30,000자까지만 표시됩니다.':'');
  }
}
async function checkAiStatus(){
  if(aiConfigured!==null)return aiConfigured;
  try{const res=await fetch('/api/status');const data=await res.json();aiConfigured=Boolean(data.aiConfigured)}catch{aiConfigured=false}
  return aiConfigured;
}
async function runAiTask(task){
  const r=await getSelectedMaterialRange();if(!r)return;
  const configured=await checkAiStatus();
  const status=document.querySelector('#aiStatusBox');
  if(!configured){status.className='notice warn';status.innerHTML='AI 서버 키가 아직 설정되지 않았습니다. <b>자료 보관·스캔 페이지 미리보기·목차 프리셋·진도 기능은 현재도 작동</b>하며, Vercel 환경변수 OPENAI_API_KEY를 설정하면 스캔 이미지 읽기와 AI 요약/OX 생성이 활성화됩니다.';return}
  status.className='notice neutral';status.textContent=task==='summary'?'선택 범위를 원문 근거로 요약 중입니다…':task==='ox'?'선택 범위에서 OX 문제를 생성 중입니다…':'선택 범위를 정밀 구조화 중입니다…';
  try{
    const body={task,materialName:r.m.name,startPage:r.startPage,endPage:r.endPage,count:10,sourceMode:r.scanMode?'images':'text'};
    if(r.scanMode){body.images=await selectedScanImages(r,5)}
    else {if(!r.text.trim())throw new Error('선택 범위에서 읽을 수 있는 원문이 없습니다.');body.text=r.text.slice(0,55000)}
    const res=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    const data=await res.json();if(!res.ok)throw new Error(data.error||'AI 요청 실패');
    if(task==='summary')renderAiSummary(data.result,r);else if(task==='ox')importAiOx(data.result,r);else applyAiStructure(data.result,r);
    status.className='notice good';status.textContent=task==='summary'?'원문 근거 요약이 완료되었습니다.':task==='ox'?'OX 문제가 생성되어 문제은행에 추가되었습니다.':'AI 정밀 구조화 결과를 단원 목록에 반영했습니다.';
  }catch(err){status.className='notice warn';status.textContent=`AI 처리 오류: ${err.message}`}
}
function renderAiSummary(result,r){
  const points=(result.summary||[]).map(x=>`<li>${esc(x)}</li>`).join('');
  const keys=(result.keywords||[]).map(x=>`<span class="pill">${esc(x)}</span>`).join(' ');
  const conf=(result.confusions||[]).map(x=>`<li>${esc(x)}</li>`).join('');
  const notes=(result.sourceNotes||[]).map(x=>`<div class="source-box"><strong>${esc(x.point||'근거')}</strong><div class="small muted">${x.sourcePage?`${esc(displayPageLabel(r.m,x.sourcePage))} · `:''}“${esc(x.excerpt||'')}”</div></div>`).join('');
  document.querySelector('#aiResultBox').innerHTML=`<div class="card ai-result-card"><div class="row"><h3>${esc(result.title||'AI 학습요약')}</h3><span class="pill good">p.${r.startPage}–${r.endPage}</span></div><ul>${points}</ul><div class="unit-chips">${keys}</div>${conf?`<h4>헷갈리기 쉬운 부분</h4><ul>${conf}</ul>`:''}${notes}<button id="saveAiSummaryNote" class="ghost">이 요약을 내 노트에 저장</button></div>`;
  document.querySelector('#saveAiSummaryNote').onclick=()=>{project().notes.unshift({id:uid(),title:result.title||`${r.m.name} 요약`,body:(result.summary||[]).map(x=>`• ${x}`).join('\n'),kind:'AI 요약',source:`${r.m.name} p.${r.startPage}-${r.endPage}`,createdAt:new Date().toISOString()});save();alert('노트에 저장했습니다.')};
}
function questionFingerprint(text){
  return String(text||'').toLowerCase().replace(/\s+/g,' ').replace(/[“”"'`]/g,'').trim();
}
function addQuestionIfNew(q){
  const fp=questionFingerprint(q?.text);
  if(!fp)return false;
  const exists=project().questions.some(x=>questionFingerprint(x.text)===fp && (x.materialId||'')===(q.materialId||''));
  if(exists)return false;
  project().questions.push(q);return true;
}

function importAiOx(result,r){
  const arr=Array.isArray(result?.questions)?result.questions:[];let added=0;
  for(const item of arr){
    if(!item?.text||typeof item.answer!=='boolean')continue;
    const sp=Math.max(r.startPage,Math.min(r.endPage,Number(item.sourcePage||r.startPage)));
    const unit=materialUnits(r.m).filter(u=>Number(u.page||1)<=sp).slice(-1)[0]?.title||'';
    const q={id:uid(),text:String(item.text),answer:item.answer,explanation:String(item.explanation||'원문 근거 해설'),source:`${r.m.name} · ${displayPageLabel(r.m,sp)}${unit?` · ${unit}`:''}`,sourceExcerpt:String(item.sourceExcerpt||''),materialId:r.m.id,unit,sourcePage:sp,attempts:0,wrong:0,streak:0,lastResult:null};
    if(addQuestionIfNew(q))added++;
  }
  save();
  document.querySelector('#aiResultBox').innerHTML=`<div class="card ai-result-card"><h3>OX ${added}문제 생성 완료</h3><p class="muted">문제는 OX 반복학습에 추가되었습니다. 틀린 문제는 오답복습으로 자동 이동합니다.</p><button id="goOxFromDialog" class="primary">OX 학습 시작</button></div>`;
  document.querySelector('#goOxFromDialog').onclick=()=>{document.querySelector('#materialDialog').close();oxQueue=[];setView('ox')};
}

async function runBatchOx(){
  const base=await getSelectedMaterialRange();if(!base)return;
  const configured=await checkAiStatus();
  const status=document.querySelector('#aiStatusBox');
  if(!configured){status.className='notice warn';status.innerHTML='AI 서버 키가 아직 설정되지 않았습니다. 배치 OX는 Vercel 환경변수 <b>OPENAI_API_KEY</b> 설정 후 사용할 수 있습니다.';return}
  const totalPages=base.endPage-base.startPage+1;
  if(totalPages>25){status.className='notice warn';status.textContent='한 번의 배치 생성은 최대 25페이지입니다. 범위를 25페이지 이하로 줄여 주세요.';return}
  if(!confirm(`선택한 ${totalPages}페이지를 최대 5페이지씩 나누어 OX를 생성합니다. 계속할까요?`))return;
  const chunks=[];
  for(let start=base.startPage;start<=base.endPage;start+=5)chunks.push({start,end:Math.min(base.endPage,start+4)});
  let addedTotal=0,done=0;
  document.querySelector('#aiResultBox').innerHTML='';
  for(const ch of chunks){
    status.className='notice neutral';status.textContent=`OX 배치 생성 중 ${done+1}/${chunks.length} · ${displayPageLabel(base.m,ch.start)}~${displayPageLabel(base.m,ch.end)}`;
    try{
      const range={...base,startPage:ch.start,endPage:ch.end};
      const body={task:'ox',materialName:base.m.name,startPage:ch.start,endPage:ch.end,count:Math.max(5,Math.min(10,(ch.end-ch.start+1)*2)),sourceMode:base.scanMode?'images':'text'};
      if(base.scanMode)body.images=await selectedScanImages(range,5);
      else{
        const pages=(base.payload?.pages||[]).filter(x=>x.page>=ch.start&&x.page<=ch.end);
        body.text=pages.map(x=>`[p.${x.page}]\n${x.text}`).join('\n\n').slice(0,55000);
      }
      const res=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      const data=await res.json();if(!res.ok)throw new Error(data.error||'AI 요청 실패');
      const before=project().questions.length;importAiOx(data.result,range);addedTotal+=Math.max(0,project().questions.length-before);done++;
    }catch(err){status.className='notice warn';status.textContent=`배치 ${done+1} 처리 중 오류: ${err.message}`;return}
  }
  status.className='notice good';status.textContent=`OX 배치 생성 완료 · 새 문제 ${addedTotal}개 추가 · 중복 문제 자동 제외`;
  document.querySelector('#aiResultBox').innerHTML=`<div class="card ai-result-card"><h3>배치 OX 생성 완료</h3><p class="muted">${chunks.length}개 구간을 처리해 새 문제 ${addedTotal}개를 문제은행에 추가했습니다. 같은 문장은 중복 등록하지 않았습니다.</p><button id="goOxBatch" class="primary">OX 학습 시작</button></div>`;
  document.querySelector('#goOxBatch').onclick=()=>{document.querySelector('#materialDialog').close();oxQueue=[];setView('ox')};
}

function applyAiStructure(result,r){
  const m=r.m;const incoming=Array.isArray(result?.units)?result.units:[];const existing=materialUnits(m);
  const merged=[...existing];
  for(const u of incoming){
    const title=String(u?.title||'').trim();if(!title)continue;
    const page=Math.max(r.startPage,Math.min(r.endPage,Number(u?.page||r.startPage)));
    if(!merged.some(x=>x.title===title))merged.push({title,page});
  }
  merged.sort((a,b)=>(a.page||1)-(b.page||1));
  m.analysis=m.analysis||{};m.analysis.units=merged.slice(0,100);m.analysis.aiDetectedType=String(result?.detectedType||'');m.analysis.learningPoints=Array.isArray(result?.learningPoints)?result.learningPoints:[];m.analysis.stage='로컬 구조화 + AI 정밀 구조화';
  syncUnitsToProgress(m,m.analysis.units);save();renderUnitNavigator(m);
  document.querySelector('#aiResultBox').innerHTML=`<div class="card ai-result-card"><h3>구조화 완료</h3><p class="muted">${esc(result?.detectedType||m.analysis.detectedType||'자료')} · 새 단원 ${incoming.length}개 후보</p>${m.analysis.learningPoints.length?`<h4>학습 포인트</h4><ul>${m.analysis.learningPoints.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}</div>`;
}

// global bindings
document.querySelectorAll('.nav-item').forEach(b=>b.onclick=()=>{if(['ox','wrong','weak'].includes(b.dataset.view)){oxUnitFilter=null;oxUnitFilterLabel='';oxQueue=[]}setView(b.dataset.view)});
document.querySelector('#modeToggle').onclick=()=>{simpleMode=!simpleMode;localStorage.setItem(SIMPLE_MODE_KEY,String(simpleMode));setView('dashboard')};
document.querySelector('#projectSelect').onchange=e=>{state.activeProjectId=e.target.value;oxQueue=[];save();render()};
document.querySelector('#newProjectBtn').onclick=()=>document.querySelector('#projectDialog').showModal();
document.querySelector('#projectForm').addEventListener('submit',e=>{e.preventDefault();const name=document.querySelector('#projectName').value.trim();if(!name)return;const p={id:uid(),name,goal:document.querySelector('#projectGoal').value.trim(),createdAt:new Date().toISOString(),materials:[],questions:[],notes:[],outputs:[],studyFocus:'오늘 가장 중요한 학습 한 가지',progress:[],sessions:[],guidedSessions:[],dailyGoal:{minutes:50,pages:20,questions:30}};state.projects.push(p);state.activeProjectId=p.id;save();document.querySelector('#projectDialog').close();e.target.reset();setView('dashboard')});
document.querySelector('#quickAddNote').onclick=()=>document.querySelector('#noteDialog').showModal();
document.querySelector('#noteForm').addEventListener('submit',e=>{e.preventDefault();const title=document.querySelector('#noteTitle').value.trim(),body=document.querySelector('#noteBody').value.trim();if(!title)return;project().notes.push({id:uid(),title,body,kind:'내 메모',createdAt:new Date().toISOString()});save();document.querySelector('#noteDialog').close();e.target.reset();render()});
document.querySelector('#exportBtn').onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='study-os-v19-backup.json';a.click();URL.revokeObjectURL(a.href)};

document.querySelector('#closeMaterialDialog').onclick=()=>document.querySelector('#materialDialog').close();
document.querySelector('#rangePreviewBtn').onclick=async()=>{await previewMaterialRange();await refreshSourceToolButtons()};
document.querySelector('#aiStructureBtn').onclick=()=>runAiTask('structure');
const openAiBtn=document.querySelector('#openAiStudyBtn');if(openAiBtn)openAiBtn.onclick=openAiStudyDialog;
const closeAiBtn=document.querySelector('#closeAiStudyDialog');if(closeAiBtn)closeAiBtn.onclick=()=>document.querySelector('#aiStudyDialog').close();
const runAiBtn=document.querySelector('#runAiStudyBtn');if(runAiBtn)runAiBtn.onclick=runAiStudy;

renderProjectSelect();updateBadges();render();
