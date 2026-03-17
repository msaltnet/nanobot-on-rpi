# naonobot on rpi

어느 신발 상자 속에서 깊은 동면(hibernation) 상태에 있던 rpi에 nanobot을 올려서 개인 비서로 만들어 보기!

AI도 모르고 지나칠만한 정보와 경험. 그리고 재미있는 이야기로 풀어낸 기록.

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
1. nanobot으로 선택
2. rpi 에 우분투 22.04 설치. python 3.11로 업그레이드. 그리고 nanobot 설치
3. telegram 연결해서 인사하기
4. tavily 연결해서 날씨 확인하기 - node설치, 잘 안되어서 brave 도 붙였지만 여전히 잘 안됨
5. 스킬셋을 빡시게 해야 한다

네 개 모두 “OpenClaw 계열 에이전트”지만, 규모·언어·보안 철학이 꽤 다릅니다. [github](https://github.com/openclaw/openclaw)

## 1. OpenClaw

- 개요: WhatsApp·Telegram·Discord·이메일 등 여러 채널을 한 게이트웨이에서 묶어서 돌리는 풀스택 자율 에이전트 프레임워크. [openclaw](https://openclaw.ai)
- 특장점  
  - 멀티 채널 게이트웨이, 멀티 에이전트 라우팅, 브라우저 UI, 크론·세션·노드까지 포함된 “올인원” 구조. [milvus](https://milvus.io/blog/openclaw-formerly-clawdbot-moltbot-explained-a-complete-guide-to-the-autonomous-ai-agent.md)
  - 로컬 LLM(Ollama 등)과 클라우드 LLM(Claude, OpenAI, Gemini)을 모두 붙일 수 있고, Moltbook/Canvas 등 시각 워크스페이스 지원. [openclaw](https://openclaw.ai)
- 주의할 점 (이슈 포함)  
  - 코드베이스가 40만+ LOC, 모듈·의존성이 많아 **보안 감사가 매우 어렵고 공격면이 넓다**는 비판. [zdnet](https://www.zdnet.com/article/openclaw-moltbot-clawdbot-5-reasons-viral-ai-agent-security-nightmare/)
  - 단일 Node.js 프로세스에 높은 권한(파일, 쉘, 크론 등)을 몰아 넣는 구조라, 설정 실수 시 “디지털 키 전부를 넘기는 수준”의 위험. [kaspersky](https://www.kaspersky.com/blog/openclaw-vulnerabilities-exposed/55263/)
  - 잘못 설정된 리버스 프록시·인증 없는 관리 UI 때문에 API 키·토큰·로그가 외부로 노출된 사례가 다수 보고됨. [github](https://github.com/slowmist/openclaw-security-practice-guide)
  - 이 때문에 별도의 “OpenClaw 보안 가이드” 리포지터리까지 나올 정도로, 운영 시 보안 하드닝이 필수. [github](https://github.com/slowmist/openclaw-security-practice-guide)
- GitHub 스타  
  - 공식 리포지터리는 수만 단위 스타(정확 수치는 수시 변동), 최근에도 활발히 사용·포크되는 중. [github](https://github.com/topics/openclaw-agent)

## 2. nanoclaw

- 개요: OpenClaw/Clawdbot의 보안·복잡성을 정면 겨냥한 “컨테이너 기반 초경량 대안”, TypeScript/Anthropic Agents SDK 기반. [linkedin](https://www.linkedin.com/posts/sanjaykrish_github-qwibitainanoclaw-a-lightweight-activity-7428232930801377280-s6XU)
- 특장점  
  - OS 레벨 격리: 각 에이전트를 Docker/Apple Container 안에서 비특권 유저로 돌리고, 명시적으로 마운트한 디렉터리만 보이게 하는 하드 샌드박스. [nanoclaw](https://nanoclaw.dev/blog/nanoclaw-security-model/)
  - 코어 런타임 ~500 LOC 정도로 매우 작아서, 보안팀이 10분 안에 감사할 수 있는 규모를 목표. [linkedin](https://www.linkedin.com/posts/mattgrunert_github-qwibitainanoclaw-a-lightweight-activity-7428130339874856960-3Egg)
  - Claude Agents SDK 위에서 “서브에이전트 스웜”, 스킬 기반 확장, WhatsApp 채널·메모리·스케줄 잡 등을 모듈로 추가. [linkedin](https://www.linkedin.com/posts/sanjaykrish_github-qwibitainanoclaw-a-lightweight-activity-7428232930801377280-s6XU)
- 주의할 점 (이슈 포함)  
  - Anthropic/Claude 중심 아키텍처라, OpenAI·Gemini·로컬 LLM 등 멀티 프로바이더를 기본으로 기대하면 맞지 않을 수 있음. [agentskill](https://agentskill.work/zh/skills/qwibitai/nanoclaw)
  - 범용 프레임워크라기보다 “보안/엔터프라이즈 지향 레퍼런스 아키텍처”라, 기능 폭은 OpenClaw보다 좁은 편. [linkedin](https://www.linkedin.com/posts/mattgrunert_github-qwibitainanoclaw-a-lightweight-activity-7428130339874856960-3Egg)
  - 생태계·문서·예제가 아직 성장 중이라, 커뮤니티 템플릿·플러그인이 풍부하진 않음. [agentskill](https://agentskill.work/en/skills/qwibitai/nanoclaw)
- GitHub 스타  
  - 공개 이후 빠르게 성장, 수만 단위 스타·수천 포크 수준(AgentSkill·SNS 언급 기준). [agentskill](https://agentskill.work/zh/skills/qwibitai/nanoclaw)

## 3. picoclaw

- 개요: “Tiny, Fast, Deployable anywhere”를 내세우는 Go 기반 초경량 에이전트, nanobot을 참고해 완전히 새로 짠 자가부트스트랩 구현. [libraries](https://libraries.io/go/github.com%2Fsipeed%2Fpicoclaw)
- 특장점  
  - 단일 정적 바이너리로 RISC-V, ARM, MIPS, x86 등 다양한 아키텍처에 배포 가능, 임베디드·경량 서버에 적합. [github](https://github.com/sipeed/picoclaw)
  - 워크스페이스 구조(AGENTS.md, SOUL.md, MEMORY.md, HEARTBEAT.md, cron, skills 등)를 갖춘 OpenClaw 스타일이면서, Go 런타임이라 성능·배포 편의성이 높음. [libraries](https://libraries.io/go/github.com%2Fsipeed%2Fpicoclaw)
  - `spawn` 툴로 비동기 서브에이전트, 하트비트 기반 주기 작업 등 에이전트 오케스트레이션 기능 내장. [libraries](https://libraries.io/go/github.com%2Fsipeed%2Fpicoclaw)
- 주의할 점 (이슈 포함)  
  - 생태계가 아직 초기 단계라 예제·플러그인·문서가 적고, 사용자가 직접 스킬/도구를 많이 구현해야 함. [github](https://github.com/sipeed/picoclaw)
  - Go 기반이라 Python 에코·AI 라이브러리에 익숙한 사람에게는 진입 장벽이 있을 수 있음. [github](https://github.com/sipeed/picoclaw)
- GitHub 스타  
  - 2026년 초 공개된 비교적 신규 프로젝트로, 수천 단위 스타 수준의 “떠오르는 대안” 포지션. [libraries](https://libraries.io/go/github.com%2Fsipeed%2Fpicoclaw)

## 4. nanobot

- 개요: HKUDS에서 만든 Python 기반 초경량 퍼스널 에이전트, “Clawdbot 43만 LOC → ~4k LOC로 압축한 OpenClaw 영감작”. [github](https://github.com/HKUDS/nanobot)
- 특장점  
  - 코어 에이전트 코드 약 3,800~4,000 LOC, Clawdbot 대비 99% 작다고 직접 명시. [github](https://github.com/HKUDS/nanobot)
  - 코드가 읽기 좋게 정리되어 있어 연구·실험용, 커스터마이징·포크해서 자기 용도에 맞게 바꾸기에 적합. [agentskill](https://agentskill.work/en/skills/HKUDS/nanobot)
  - Python이라 다양한 LLM 프로바이더(OpenRouter, OpenAI, Anthropic, DeepSeek, Groq, Gemini, vLLM 등)와 쉽게 연동 가능. [github](https://github.com/HKUDS/nanobot)
  - 텔레그램·Discord·WhatsApp·Feishu·Slack·QQ·이메일 등 멀티 채널 게이트웨이, 스케줄링, 서브에이전트, MCP 연동 등 OpenClaw 핵심 기능 다수 커버. [agentskill](https://agentskill.work/en/skills/HKUDS/nanobot)
- 주의할 점 (이슈 포함)  
  - 보안 철학은 nanoclaw만큼 강하게 컨테이너에 의존하지 않고, 여전히 애플리케이션 레벨 설정과 권한 제어에 많이 기대는 편. [nanoclaw](https://nanoclaw.dev/blog/nanoclaw-security-model/)
  - OpenClaw보다 작지만 그래도 “작은 프레임워크/플랫폼” 수준이라, 단순 텔레그램 봇 같은 케이스에는 과한 면이 있을 수 있음. [milvus](https://milvus.io/blog/openclaw-formerly-clawdbot-moltbot-explained-a-complete-guide-to-the-autonomous-ai-agent.md)
  - 엔터프라이즈용 보안 가이드·감사 아티팩트는 상대적으로 적고, 주 타겟은 연구자·개인 개발자 쪽. [agentskill](https://agentskill.work/en/skills/HKUDS/nanobot)
- GitHub 스타  
  - 공개 후 급성장해 2만 개 안팎 스타·수천 포크 수준으로, OpenClaw 대안 중 가장 인기 있는 Python 구현 중 하나. [github](https://github.com/HKUDS/nanobot)

## 한눈에 비교

| 항목 | OpenClaw | nanoclaw | picoclaw | nanobot |
| --- | --- | --- | --- | --- |
| 언어 | TypeScript/Node.js [github](https://github.com/openclaw/openclaw) | TypeScript [linkedin](https://www.linkedin.com/posts/sanjaykrish_github-qwibitainanoclaw-a-lightweight-activity-7428232930801377280-s6XU) | Go [libraries](https://libraries.io/go/github.com%2Fsipeed%2Fpicoclaw) | Python [github](https://github.com/HKUDS/nanobot) |
| 포지션 | 풀스택 올인원 게이트웨이 [github](https://github.com/openclaw/openclaw) | 컨테이너 보안 특화 대안 [linkedin](https://www.linkedin.com/posts/sanjaykrish_github-qwibitainanoclaw-a-lightweight-activity-7428232930801377280-s6XU) | 초경량 단일 바이너리 에이전트 [libraries](https://libraries.io/go/github.com%2Fsipeed%2Fpicoclaw) | 초경량 범용 프레임워크 [github](https://github.com/HKUDS/nanobot) |
| 강점 | 기능·에코가 가장 풍부 [github](https://github.com/openclaw/openclaw) | OS 레벨 샌드박스, 작은 코드 [linkedin](https://www.linkedin.com/posts/sanjaykrish_github-qwibitainanoclaw-a-lightweight-activity-7428232930801377280-s6XU) | 어디서나 돌릴 수 있는 포터블 Go 바이너리 [libraries](https://libraries.io/go/github.com%2Fsipeed%2Fpicoclaw) | 읽기 쉬운 Python 코드, 멀티 LLM/채널 [github](https://github.com/HKUDS/nanobot) |
| 주요 이슈 | 높은 권한+보안 취약점 사례, 복잡성 [milvus](https://milvus.io/blog/openclaw-formerly-clawdbot-moltbot-explained-a-complete-guide-to-the-autonomous-ai-agent.md) | 생태계 초기, Claude 중심 [agentskill](https://agentskill.work/zh/skills/qwibitai/nanoclaw) | 에코·문서 초기, Go 진입장벽 [libraries](https://libraries.io/go/github.com%2Fsipeed%2Fpicoclaw) | 컨테이너 수준 하드 샌드박스는 아님, 엔터프라이즈 가이드 적음 [github](https://github.com/HKUDS/nanobot) |
| 스타 온도감 | 수만 단위, 가장 크고 논쟁도 많음 [github](https://github.com/openclaw/openclaw) | 수만 단위, 보안 커뮤니티 관심 집중 [agentskill](https://agentskill.work/zh/skills/qwibitai/nanoclaw) | 수천 단위, 신규·실험적 [libraries](https://libraries.io/go/github.com%2Fsipeed%2Fpicoclaw) | 2만 전후, Python 진영에서 인기 [github](https://github.com/HKUDS/nanobot) |

인프라+보안 관점에서 실제로 써볼 후보를 고르려면, 우선 “로컬 개인용 실험 위주냐, 아니면 사내·프로덕션에 붙일 거냐”가 중요합니다. 어느 쪽에 더 가깝게 쓰실 계획인지 한쪽을 먼저 알려주면, 그 기준으로 하나를 찍어서 설치·구성 전략까지 같이 설계해 드릴게요.  