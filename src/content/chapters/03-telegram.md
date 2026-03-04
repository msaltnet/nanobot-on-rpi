---
chapterNumber: 3
title: "Telegram 연결 - 봇에게 인사하기"
subtitle: "드디어 내 폰에서 라즈베리 파이와 대화를"
pubDate: 2025-01-20
tags: ["telegram", "nanobot", "봇토큰"]
draft: false
---

## 왜 Telegram인가

여러 메신저 연동 방법을 고려했지만 Telegram을 선택한 이유는 간단했다.

- 봇 API가 무료이고 잘 문서화되어 있다
- 라즈베리 파이에서도 가볍게 돌아간다
- BotFather를 통해 몇 분 만에 봇 토큰을 발급받을 수 있다

---

## BotFather로 봇 토큰 발급

Telegram에서 `@BotFather`를 검색해서 대화를 시작한다.

```
/newbot
```

명령을 입력하면 봇 이름과 사용자명을 물어본다. 사용자명은 반드시 `bot`으로 끝나야 한다.

설정을 마치면 봇 토큰이 발급된다. 이 토큰은 절대 외부에 공개하면 안 된다.

```
Use this token to access the HTTP API:
1234567890:ABCdefGhIJKlmNoPQRsTUVwxyZ
```

---

## nanobot에 Telegram 연결

토큰을 환경 변수에 저장한다.

```bash
echo 'export TELEGRAM_BOT_TOKEN="여기에_토큰_입력"' >> ~/.bashrc
source ~/.bashrc
```

nanobot 설정 파일을 만든다.

```python
# bot.py
from nanobot import NanoBot
from nanobot.integrations.telegram import TelegramIntegration

bot = NanoBot()
telegram = TelegramIntegration(token=os.environ["TELEGRAM_BOT_TOKEN"])
bot.add_integration(telegram)

@bot.on_message
async def handle_message(message):
    await message.reply(f"안녕하세요! 저는 nanobot입니다. 메시지를 받았어요: {message.text}")

bot.run()
```

### 실행

```bash
cd ~/nanobot-assistant
source .venv/bin/activate
python bot.py
```

---

## 첫 번째 인사

Telegram에서 봇을 찾아 `/start`를 보냈다. 잠시 후 답장이 왔다.

> 안녕하세요! 저는 nanobot입니다. 메시지를 받았어요: /start

라즈베리 파이가 내 폰에 답장을 보냈다. 신발 상자에서 꺼낸 지 얼마 되지 않은 그 작은 기기가.

---

## systemd로 자동 실행 설정

봇을 항상 켜두려면 부팅 시 자동 실행되도록 설정해야 한다.

```bash
sudo nano /etc/systemd/system/nanobot.service
```

```ini
[Unit]
Description=NanoBot Personal Assistant
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/nanobot-assistant
ExecStart=/home/ubuntu/nanobot-assistant/.venv/bin/python bot.py
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable nanobot
sudo systemctl start nanobot
sudo systemctl status nanobot
```

이제 라즈베리 파이가 켜질 때마다 봇도 자동으로 실행된다.

---

## 다음 단계

봇이 살아서 대화를 나눌 수 있게 됐다. 하지만 아직 "안녕하세요" 밖에 못한다. 다음은 실용적인 기능을 붙여볼 차례다. Tavily를 연결해서 날씨를 알려주는 봇으로 업그레이드해보자.
