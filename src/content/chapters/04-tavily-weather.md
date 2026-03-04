---
chapterNumber: 4
title: "Tavily 연결 - 날씨 확인하기"
subtitle: "Node.js 설치부터 실시간 날씨 조회까지"
pubDate: 2025-01-28
tags: ["tavily", "날씨", "node.js", "검색"]
draft: false
---

## Tavily란?

Tavily는 AI 에이전트를 위해 설계된 검색 API다. 일반적인 웹 검색 결과를 깔끔하게 정제해서 AI가 사용하기 좋은 형태로 돌려준다. nanobot과의 통합이 잘 되어 있어서 선택했다.

---

## Node.js 설치

Tavily의 일부 기능은 Node.js 환경이 필요했다. Ubuntu에 Node.js를 설치하는 방법은 여러 가지가 있는데, NodeSource 저장소를 사용하는 방법이 가장 안정적이다.

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

설치 확인:

```bash
node --version
# v20.x.x
npm --version
# 10.x.x
```

---

## Tavily API 키 발급

[Tavily 공식 사이트](https://tavily.com)에서 계정을 만들고 API 키를 발급받는다. 무료 플랜도 월 1,000회 검색이 가능해서 개인 용도로는 충분하다.

API 키를 환경 변수에 추가한다:

```bash
echo 'export TAVILY_API_KEY="여기에_키_입력"' >> ~/.bashrc
source ~/.bashrc
```

---

## 날씨 조회 기능 추가

nanobot에 Tavily를 연결하고 날씨 조회 기능을 추가했다.

```python
# bot.py
import os
from nanobot import NanoBot
from nanobot.integrations.telegram import TelegramIntegration
from nanobot.tools.tavily import TavilySearch

bot = NanoBot()
telegram = TelegramIntegration(token=os.environ["TELEGRAM_BOT_TOKEN"])
search = TavilySearch(api_key=os.environ["TAVILY_API_KEY"])

bot.add_integration(telegram)
bot.add_tool(search)

@bot.on_message
async def handle_message(message):
    text = message.text.lower()

    if "날씨" in text:
        # 검색 쿼리 생성
        query = f"오늘 날씨 {text.replace('날씨', '').strip() or '서울'}"
        result = await search.search(query)
        await message.reply(result.answer)
    else:
        await message.reply(f"무엇을 도와드릴까요? '날씨'라고 입력하면 날씨를 알려드립니다.")

bot.run()
```

---

## 테스트

Telegram에서 "서울 날씨"라고 메시지를 보냈다.

> 현재 서울의 날씨는 맑음이며, 기온은 3°C입니다. 바람은 북서쪽에서 10km/h로 불고 있습니다...

신발 상자에서 꺼낸 라즈베리 파이가 이제 날씨를 알려준다.

---

## 여기까지 왔다

처음 신발 상자에서 꺼낼 때만 해도 먼지만 있었는데, 이제는:

1. Ubuntu 22.04 + Python 3.11 환경
2. nanobot 설치
3. Telegram으로 메시지 주고받기
4. Tavily로 실시간 날씨 검색

여기까지 왔다. 아직 갈 길이 멀지만, 작은 것부터 하나씩 쌓아가고 있다.

다음엔 어떤 기능을 붙여볼까? 일정 관리? 뉴스 브리핑? 할 일 목록? 이야기는 계속된다.
