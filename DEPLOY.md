# Study OS 배포 순서

수업 흐름에 맞춘 안전한 배포 절차입니다.

1. 로컬 파일/기능 확인
2. 새 GitHub 비공개 저장소 `study-os` 생성
3. 이 폴더의 파일만 새 저장소에 업로드
4. Vercel에서 새 프로젝트로 해당 GitHub 저장소 Import
5. Vercel Project Settings > Environment Variables에 `OPENAI_API_KEY` 등록
6. 필요하면 `OPENAI_MODEL` 등록
7. Deploy/Re-deploy
8. `/api/status`에서 `aiConfigured: true` 확인
9. 실제 PDF 업로드 → 카드 1회 생성 → 잠금 → 기존 열기 → 세트 학습 순으로 테스트

## 절대 하지 않을 것
- 기존 Coway GitHub 저장소 재사용
- 기존 Coway Vercel 프로젝트 Import/연결 변경
- 기존 Supabase 프로젝트 연결
- API 키를 GitHub 코드나 `.env.example`에 기록
