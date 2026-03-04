---
chapterNumber: 2
title: "Ubuntu 22.04 설치와 Python 3.11 업그레이드"
subtitle: "깨끗한 시작을 위한 환경 준비"
pubDate: 2025-01-10
tags: ["ubuntu", "python", "raspberry-pi", "설치"]
draft: false
---

## Ubuntu 22.04 설치

라즈베리 파이 이미저(Raspberry Pi Imager)를 이용해서 SD 카드에 Ubuntu 22.04 LTS를 구웠다. 오래된 SD 카드라 걱정이 됐지만 다행히 멀쩡했다.

라즈베리 파이 이미저에서는 고급 설정에서 SSH를 미리 활성화하고, Wi-Fi 정보와 사용자 이름/비밀번호를 설정할 수 있다. 이 옵션을 미리 설정해두면 모니터 없이도 바로 접속할 수 있어서 편리하다.

### 첫 부팅 후 업데이트

부팅이 완료되면 SSH로 접속해서 패키지를 업데이트한다.

```bash
sudo apt update && sudo apt upgrade -y
```

시간이 꽤 걸린다. 커피 한 잔 마시면 딱 좋다.

---

## Python 3.11 업그레이드

Ubuntu 22.04에는 기본으로 Python 3.10이 설치되어 있다. nanobot이 Python 3.11 이상을 권장하기 때문에 업그레이드가 필요했다.

### deadsnakes PPA 사용

```bash
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.11 python3.11-venv python3.11-dev -y
```

### 기본 Python 버전 설정

```bash
sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.10 1
sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 2
sudo update-alternatives --config python3
```

`sudo update-alternatives --config python3`를 실행하면 어떤 버전을 기본으로 쓸지 선택하는 메뉴가 나온다. `2`를 선택해서 3.11을 기본으로 설정했다.

확인:

```bash
python3 --version
# Python 3.11.x
```

---

## nanobot 설치

Python 환경이 준비됐으니 nanobot을 설치할 차례다. 가상환경을 사용해서 의존성을 깔끔하게 관리하기로 했다.

```bash
mkdir ~/nanobot-assistant
cd ~/nanobot-assistant
python3 -m venv .venv
source .venv/bin/activate
pip install nanobot
```

설치가 완료되면 버전 확인:

```bash
nanobot --version
```

---

## 다음 단계

환경이 준비됐다. 이제 실제로 뭔가를 연결해볼 차례다. 첫 번째 통합 대상은 Telegram이다. 내 폰에서 봇에게 메시지를 보내고 답장을 받는 것, 그 단순한 것부터 시작하기로 했다.
