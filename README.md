# naonobot on rpi

어느 신발 상자 속에서 깊은 동면 hibernation 상태에 있던 rpi에 nanobot을 올려서 개인비서로 만들어 보기!

A-Z 방법 및 노하우 공유, 자료 공유를 위한 저장 공간이며, 이야기로 기록하는 일기장입니다.

🌐 **사이트**: https://msaltnet.github.io/nanobot-on-rpi

---

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:4321)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기 (http://localhost:4321/nanobot-on-rpi/)
npm run preview
```

## 새 챕터 추가

1. `src/content/chapters/` 에 마크다운 파일 추가 (예: `05-new-chapter.md`)
2. 프론트매터 작성:
   ```yaml
   ---
   chapterNumber: 5
   title: "챕터 제목"
   subtitle: "부제목 (선택)"
   pubDate: 2025-02-01
   tags: ["태그1", "태그2"]
   draft: false
   ---
   ```
3. 이미지는 `src/assets/chapters/05/` 에 저장
4. `main` 브랜치에 push → GitHub Actions가 자동 배포

## 배포 (GitHub Pages)

GitHub 저장소 **Settings → Pages → Source** 를 **"GitHub Actions"** 로 변경.
`main` 브랜치에 push하면 자동으로 빌드 후 배포됩니다.

---

## History
1. nanobot으로 선택 openclaw, nanoclaw, picoclaw...
2. rpi 에 우분투 22.04 설치. python 3.11로 업그레이드. 그리고 nanobot 설치
3. telegram 연결해서 인사하기
4. tavily 연결해서 날씨 확인하기 - node설치
