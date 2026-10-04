# 🩸 Blood on the Clocktower - Digital Grimoire (시계탑에 흐른 피)

오프라인 마피아 보드게임 **시계탑에 흐른 피 (Blood on the Clocktower)** 중 **Trouble Brewing (초보자용)** 시나리오를 스마트폰과 웹을 통해 즐길 수 있도록 제작된 **비동기식 디지털 마도서 및 플레이어 클라이언트**입니다.

스토리텔러(ST)의 수고를 덜어주는 강력한 자동화 기능과, 100% 모바일 친화적인 다크 고딕 UI를 제공합니다.

---

## ✨ 주요 기능 (Features)

* **전체 직업(22종) 로직 완벽 구현**: 시장, 처녀, 슬레이어, 레이븐키퍼, 핏빛 후계자(Scarlet Woman) 등 복잡한 조건부 능력들이 오프라인 룰북과 동일하게 시스템 상에서 정밀하게 작동합니다.
* **제로 타임(Zero-Time) 밤 단계**: 모든 플레이어가 스마트폰으로 동시에 밤 행동을 입력하므로, 오프라인처럼 눈을 감고 한 명씩 기다릴 필요가 없습니다.
* **스토리텔러(ST) 스마트 대시보드**: 시스템이 취객(Drunk)과 독술사(Poisoner)의 상태를 계산하여 ST에게 "오정보(거짓 정보)"를 자동으로 제안합니다. 또한 밤 행동으로 지목된 대상의 직업 정보를 ST에게 즉각적으로 표시하여 빠르고 정확한 판정을 돕습니다.
* **실시간 투표 및 처형 시스템**: 원형 마을 광장(Town Square) UI에서 실시간으로 지목과 찬반 투표가 진행되며, 유령 표(Ghost Vote) 역시 자동으로 관리됩니다.
* **과거 기록 열람 및 관리 (History Viewer)**: 게임이 종료되면 밤과 낮의 모든 행동, 전달받은 비밀 정보, 투표 내역이 시간의 흐름(Night Order)에 따라 영구적으로 박제되며 클립보드로 복사하여 공유할 수 있습니다. (ST 권한으로 개별 기록 삭제 가능)
* **다양한 디바이스 지원 (반응형 UI)**: 모바일 환경 최적화뿐만 아니라, 태블릿 등 넓은 화면(가로 모드)에서는 스토리텔러를 위한 2단 레이아웃을 제공하여 복잡한 상태 관리를 한눈에 파악할 수 있습니다.

---

## 🚀 나만의 마도서 만들기 (시작하기)

이 프로젝트는 누구나 무료로 자신만의 서버를 띄워 친구들과 즐길 수 있도록 서버리스(Serverless) 프론트엔드 환경으로 구성되어 있습니다. 데이터베이스로는 **Firebase Realtime Database**를 사용합니다. 아래의 가이드를 따라 천천히 진행해 보세요!

### 1. Firebase 데이터베이스 준비하기
1. [Firebase Console](https://console.firebase.google.com/)에 접속하여 새 프로젝트를 생성합니다. (무료 요금제로 충분합니다!)
2. 좌측 메뉴에서 **Build > Realtime Database**를 클릭하고 데이터베이스를 생성합니다. (위치는 주로 'asia-northeast' 등 가까운 곳을 추천합니다.)
3. **프로젝트 설정(톱니바퀴 아이콘)**으로 이동하여 **웹 앱(Web App, `</>` 아이콘)**을 하나 추가합니다.
4. 추가가 완료되면 화면에 나타나는 **Firebase SDK 구성(Config) 값**을 잠시 복사해 둡니다.

### 2. 소스 코드 가져오기 및 환경 설정
1. 우측 상단의 `Fork` 버튼을 눌러 이 저장소를 본인의 깃허브 계정으로 복사하거나, 터미널에서 `git clone https://github.com/singwithgame/botc.git` 명령어로 코드를 다운로드 받습니다.
2. 다운받은 프로젝트 폴더 최상단에 `.env`라는 이름의 파일을 새로 만듭니다.
3. 방금 복사해둔 Firebase Config 값을 활용하여, 아래 양식에 맞게 여러분의 키값을 채워 넣어 저장합니다. (이 과정을 통해 여러분의 웹페이지가 Firebase 데이터베이스와 연결됩니다!)
```env
VITE_FIREBASE_API_KEY="본인의_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN="본인의_AUTH_DOMAIN"
VITE_FIREBASE_DATABASE_URL="본인의_DATABASE_URL"
VITE_FIREBASE_PROJECT_ID="본인의_PROJECT_ID"
VITE_FIREBASE_STORAGE_BUCKET="본인의_STORAGE_BUCKET"
VITE_FIREBASE_MESSAGING_SENDER_ID="본인의_MESSAGING_SENDER_ID"
VITE_FIREBASE_APP_ID="본인의_APP_ID"
VITE_FIREBASE_MEASUREMENT_ID="본인의_MEASUREMENT_ID"
```

### 3. 파이어베이스 보안 규칙 (Security Rules) 설정
게임 진행 중 다른 플레이어가 시스템 데이터를 함부로 조작하거나 남의 직업을 훔쳐보지 못하도록 보안 규칙을 적용해야 합니다.
Firebase 콘솔의 Realtime Database -> **Rules(규칙)** 탭에 들어간 후, 프로젝트 폴더에 있는 `database.rules.json` 파일의 내용을 그대로 복사하여 붙여넣고 **게시(Publish)** 버튼을 누릅니다.

### 4. 스토리텔러(ST) 비밀번호 설정
게임 방을 개설하고 진행할 스토리텔러만의 비밀번호를 설정합니다.
Firebase 콘솔의 Realtime Database -> **Data(데이터)** 탭에서 최상위 루트 기호(`+` 버튼)를 누르고, `admin_auth` 노드를 만듭니다. 그 아래에 원하는 비밀번호를 '이름(키)'으로, `true`를 '값(밸류)'으로 입력합니다. 
(예: ST 비밀번호를 1234로 하고 싶다면 아래와 같이 구조가 만들어집니다.)
```json
{
  "admin_auth": {
    "1234": true
  }
}
```

### 5. 실행 및 호스팅 (배포하기)
* **내 컴퓨터에서 테스트하기:** 터미널에서 `npm install` 명령어로 패키지를 설치한 후, `npm run dev`를 입력하면 로컬에서 앱을 실행해볼 수 있습니다.
* **인터넷에 배포하기 (무료 호스팅):** Vercel, Netlify, 혹은 GitHub Pages 등을 이용하면 누구나 접속 가능한 웹사이트로 쉽게 만들 수 있습니다. (현재 이 저장소에는 GitHub Pages용 자동 배포 스크립트인 `.github/workflows/deploy.yml`이 이미 세팅되어 있어 Fork 후 설정만 켜주면 편리합니다!)

---

## ⚖️ 저작권 및 라이선스 (License & Disclaimer)

* **Code License:** 이 프로젝트에서 저희가 작성한 소스 코드 자체는 **[MIT License](./LICENSE)**를 따릅니다. 누구나 코드를 자유롭게 복제, 수정, 배포, 활용하실 수 있습니다.
* **IP Disclaimer:** 게임의 명칭, 로직, 세계관, 캐릭터 디자인 등 **"Blood on the Clocktower"**에 관련된 모든 지적 재산권 및 상표권은 [The Pandemonium Institute](https://bloodontheclocktower.com/)와 Steven Medway에게 있습니다.
* 이 애플리케이션은 영리적 목적이 전혀 없는 **비공식 팬메이드(Unofficial Fan-made) 프로젝트**이며, 원작사 측과 어떠한 공식적인 제휴나 연관도 없습니다. 보드게임의 진정한 재미를 느끼기 위해, 공식 오프라인 실물 패키지를 구매하여 즐기시기를 강력히 권장합니다.
* **Built with AI:** 이 프로젝트의 기획, 로직 설계 및 코딩은 구글의 생성형 AI **Google Gemini** 와의 대화형 협업을 통해 작성되었습니다.
