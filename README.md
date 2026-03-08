# naonobot on rpi

어느 신발 상자 속에서 깊은 동면(hibernation) 상태에 있던 rpi에 nanobot을 올려서 개인 비서로 만들어 보기!

A-Z 방법 및 노하우 공유, 자료 공유를 위한 저장 공간이며, 이야기로 기록하는 일기장.

🌐 **사이트**: https://msaltnet.github.io/nanobot-on-rpi

---

## 문서 다운로드 관리

웹사이트에서 직접 내려받을 문서는 `public/downloads/` 아래에 두면 됩니다.

예:

```text
public/downloads/sample-guide.txt
```

배포 후 주소:

```text
https://msaltnet.github.io/nanobot-on-rpi/downloads/sample-guide.txt
```

페이지에서는 `import.meta.env.BASE_URL`을 붙여 링크하면 GitHub Pages의 base 경로에서도 안전합니다.

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
0. openclaw도 요구 사항부터
  - 연초부터 moltbot 이야기로 커뮤니티가 시끌벅적했다. 많은 서비스들의 agent 기능이 강화되면서 다양한 활용이 나와던 찰나, 어쩌면 예상 가능한 것이었으나 생각보다 빨리 실증되었다는 것이 의미가 있다. 개인적으로 나는 그렇게 놀랍진 않았다. 더욱이 혼자 쓰려고 만들고 있던 agent도 있어서 새로운 느낌이 없었다.
  - 불구하고 빠르게 셋업이 가능하다고 하니 해봐야지. 근데, 중요한거 '무엇을 할 것인가' 이다. 나에게 필요한 요구사항을 몇 가지 정리해 봤다. 내 습관 매니저, 경제 분석 및 재무 조언가 역할의 agent를 만들어 보기로 했다. 유튭이나 SNS에서는 아직 못 봄. 내가 필요한거 만드는게 중요하다. 그게 이런 토이 프로젝트에서는 큰 원동력이 된다.
  - 요구사항와 시스템 사양, 최종 목표와 검증 방법 등을 작성하는 것은 SW 개발의 첫걸음이자 필수 핵심 작업인데, 개발만큼이나 아니 개발보다 더 중요하다. 특히 요즘 같은 바이브 코딩의 시대에는 더욱! 중요한만큼 관심을 더 갖고 개입해야 하는데, 이 과정에도 AI를 활용한다. 보통 이때는 2~3개의 AI 서비스를 사용해서 동시에 대화하면서 내 생각에 대한 의견도 묻고 레퍼런스도 찾아보고 최종적으로 내용도 정리한다. gemini는 pin으로, gpt, claude는 프로젝트, perflexity는 공간을 생성해서 계속 대화를 이어가며 프로젝트 끝까지 함께 한다.ㅎ GPT랑 정리한 요구사항 requirements.md

1. nanobot으로 선택
  - openclaw, nanoclaw, picoclaw 등 후보군이 많이 있었지만 nanobot으로 선택했다. 애초에 
2. rpi 에 우분투 22.04 설치. python 3.11로 업그레이드. 그리고 nanobot 설치
3. telegram 연결해서 인사하기
4. tavily 연결해서 날씨 확인하기 - node설치, 잘 안되어서 brave 도 붙였지만 여전히 잘 안됨
5. 스킬셋을 빡시게 해야 한다

curl https://api.search.brave.com/res/v1/web/search?q=KOSPI -H "X-Subscription-Token: "BSAwBuYjWbAlaDq_yPh7G9PSuhXdkmH""
