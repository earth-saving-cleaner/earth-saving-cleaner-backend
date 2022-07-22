# 🌏 Earth Saving Cleaner

### 오염된 장소를 공유하고 플로깅 활동을 하세요!

<details>
  <summary>What is plogging?</summary>
  플로깅은 2016년 스웨덴에서 시작된 작은 환경운동입니다. 플로깅은 '줍다'라는 뜻의 스웨덴어 "plocka upp"와 영어 단어 조깅 "jogging"의 합성어입니다. 조깅을 하면서 쓰레기를 줍는 활동으로 운동효과와 더불어 환경운동을 실천할 수 있습니다.
</details>

Earth Saving Cleaner는 오염된 장소에서 사진을 촬영하여 게시물을 공유합니다.
해당 게시물 사진의 메타데이터(위치)를 활용해 지도에 표시하여 시각적으로 오염 정도를 확인할 수 있습니다.
사람들이 올려둔 게시물의 위치 데이터로 해당 지역의 오염을 확인하고, 플로깅 활동(퀘스트)을 인증하여 깨끗한 지구를 만들 수 있습니다.

<br>

## 🔖 Content

- [🌏 Earth Saving Cleaner](#-earth-saving-cleaner)
  - [🌼 Features](#-features)
  - [🔗 Deployment](#-deployment)
  - [🍯 Motivation](#-motivation)
- [🚣‍♀️ Getting Started](#-getting-started)
- [📚 Tech Stack](#-tack-stack)
- [🥑 Challenges](#-challenges)
- [🧵 Future Plan](#-future-plan)

---



## 🌼 Features
<img width="450" alt="main_page" src="https://user-images.githubusercontent.com/54696956/179362025-20a1e6a0-6c17-4a9e-abb3-ff0abe11520a.png">
<img width="445" alt="map_page" src="https://user-images.githubusercontent.com/54696956/179362674-66e9f81b-6199-4e56-8b0a-1c8e26eee786.png">
<br>
<details>
  <summary>More images</summary>
  <img width="420" alt="add_feed" src="https://user-images.githubusercontent.com/54696956/179363152-1341cded-f140-4eec-9990-679e1e12c2a5.png">
피드 등록
<br>
<img width="420" alt="feed_detail" src="https://user-images.githubusercontent.com/54696956/179363435-8cb22bf7-fca8-47bc-a445-27a7cf54f922.png">
피드 상세(댓글, 좋아요 기능)
<br>
<img width="420" alt="mypage" src="https://user-images.githubusercontent.com/54696956/179363202-6caea358-3695-4edb-910b-f7e09bdfc5a3.png">
마이 페이지
<br>
<img width="420" alt="quest_certification" src="https://user-images.githubusercontent.com/54696956/179363356-85e14673-8447-4399-b9e7-8f0dd580b8a4.png">
퀘스트 인증
</details>

- Google 소셜 로그인 제공

- 피드(게시물)

  - 피드 등록 기능: 사용자가 오염된 장소를 촬영하여 피드로 공유할 수 있습니다.
  - 피드 좋아요 기능: 사용자가 마음에 드는 피드에 좋아요를 누를 수 있습니다.
  - 피드 댓글 기능: 사용자가 피드에 댓글을 추가할 수 있습니다.

- 지도

  - 사용자의 GPS를 받아서 해당 지역에 올라온 피드의 위치 지도에서 확인
  - 위치를 나타낸 지도 아이콘 클릭 시, 플로깅 활동 인증 가능
  - socket 통신으로 실시간 활동중인 사용자 확인 가능
  - 오염 정도와 플로깅 완료 정보를 비교할 수 있도록 클러스터링 기능 제공

- 마이페이지
  - 사용자의 레벨, 스코어 확인
  - 전체 랭킹 제공

## 🔗 Deployment
👩‍🔧 현재 google map 계정 권한의 문제와 aws의 서버 설정으로 서비스가 중단된 상태입니다.
- AWS Elastic Beanstalk으로 Node.js 서버 배포
- Netlify(client), AWS CodePipeline 설정하여 배포 자동화(CD)
- AWS S3 파일 서버 구축
- AWS lambda 활용하여 이미지 리사이징 처리

## 🍯 Motivation

시간이 지날수록 오염문제가 심각해지는 상황에서 해당 문제에 기여할 수 있는 프로젝트를 고민해보았습니다.
오염된 장소의 데이터를 모아 지도에 시각적으로 나타내어 모두가 사용할 수 있도록 공공의 데이터를 제공하고 싶었습니다. 다수의 사람이 오염된 장소의 사진을 촬영하여 피드에 올리면, 사진의 데이터를 활용해 지도에 표시해 한 눈에 파악할 수 있게 만들고, 사용자가 지도를 확인하고 여러 방면에서 활용할 수 있는 상황을 기대했습니다. 

1. 어떤 지역에 오염된 장소가 많은지 한 눈에 확인할 수 있도록 시각화된 지도를 제공하면, 공공 기관에서 환경 미화 인력을 효과적으로 배치할 수 있습니다. 오염된 장소가 많은 지역은 인력을 많이 배치하고, 비교적 깨끗한 지역은 적게 배치하여 최대의 효율을 기대할 수 있습니다.
2. 개개인의 사람들이 조깅을 하면서 쓰레기를 줍는 플로깅 활동을 자발적으로 참여할 수 있도록 유도하기 위해 플로깅 퀘스트 인증, 플로깅 활동 Ranking, 개인별 Score 제공의 기능을 추가하여 동기를 부여할 수 있도록 기획했습니다.

<br>

# 🚣‍♀️ Getting Started

Local 환경에서 실행 시 아래와 같이 환경 변수를 입력해 주세요.

### Client

Start
```
yarn start
```
환경 변수 설정 (.env)

```
REACT_APP_GOOGLE_CLIENT_ID="your client id"
REACT_APP_GOOGLE_CLIENT_SECRET="your client secret"
REACT_APP_SERVER_URL=http://localhost:5000
REACT_APP_GOOGLE_MAP_API_KEY="your map api"
```

### Server

Start
```
yarn start
```

환경 변수 설정 (.env)
```
PORT=5000
CLIENT_URL=http://localhost:3000
DB_ATLAS="DB 접속 주소"(earth-saving-cleaner 데이터 베이스 생성하기)
S3_ACCESS="your aws s3 access"
S3_SECRET="your aws s3 secret"
JWT="jwt secret key"
GOOGLE_ID="your google client id"
GOOGLE_SECRET="your google secret key"
```

# 📚 Tech Stack

**Client**

- React
- React-router-dom
- Redux
- Redux-saga
- Redux-toolkit
- Socket.io-client
- Styled-Component
- React-testing-library

**Server**

- NodeJS
- Express
- MongoDB, Atlas
- Mongoose
- Socket.io
- Multer
- AWS S3(Image storage)
- AWS Lambda(Image resizing)

**Common**

- Git
- JWT
- ESLint

# 🥑 Challenges

### Atomic Design
아토믹 디자인을 도입하여 컴포넌트를 디자인해보았습니다. 직관적으로 컴포넌트를 분리할 수 있고, 첫 프로젝트에서 디자인 패턴을 적용해서 조금 더 안정적인 구조로 프로젝트를 만들어보고 싶었습니다. 아토믹 디자인은 원자(Atoms), 분자(Molecules), 유기체(Organisms), 템플릿(Templates), 페이지(Pages)로 컴포넌트를 분리하여 재사용성을 높일 수 있어 효과적인 인터페이스 시스템을 만들 수 있습니다. 하지만 컴포넌트에 대해 높은 이해도가 필요하고, 비슷하게 생겼지만 다른 컴포넌트가 필요한 상황도 발생합니다. 또한 개발 복잡도를 고려했을 때 유사한 컴포넌트를 분리하는 것이 나은 상황도 발생합니다. 이런 단점 때문에 아토믹 디자인을 도입하여 프로젝트를 구성하는 것이 쉽지만은 않았습니다. 컴포넌트에 대해 논의해야할 시간이 길어지고 만들었던 컴포넌트를 다시 만들거나 없애는 상황도 발생하였습니다. 그래서 프로젝트 초반에 mockup UI를 기준으로 어느정도 크게 대략적인 컨셉만 정해놓고, 개발을 시작할 때 칸반 카드에서 해당 기능에 컴포넌트가 필요하다면 필요한 아토믹 컴포넌트를 만드는 방법으로 절차를 수정했습니다. 아토믹 디자인을 도입하는 과정은 생소하고 시간 소요가 있었지만 개발 완성 단계에서는 해당 컴포넌트가 어디서 선언되어 있는지, 어떤 부분을 수정하면 될지 명확해져서 시도해보길 잘 했다는 생각이 들었습니다.

### Image reszing
사용자가 오염된 장소를 촬영하여 피드에 업로드한 사진은 프로젝트 내에서 3가지의 용도로 사용되었습니다. 첫 번째 피드 목록의 이미지, 두 번째 피드 등록 전 미리보기 이미지, 세 번째 플로깅 활동 퀘스트 인증 시 모달 안 미리보기 이미지로 사용되었습니다. 세 번째의 경우 모달 안에 이미지를 보여주기 때문에 사진 크기가 작았고, 작은 사진을 보여주기 위해 원본의 이미지를 가지고 오는 것은 서버의 트레픽의 손실이 클 것이라고 판단하여 이미지 업로드 시 AWS의 serverless 서비스인 lambda를 적용하여 이미지 리사이징을 추가하였습니다. 기존에는 express(node.js) 서버에서 AWS S3에 이미지를 업로드 하는 방식이었는데, lambda를 트리거하여 이미지 리사이징 로직을 적용하여 리사이징된 이미지를 S3에 저장할 수 있도록 구현했습니다.

### Redux-Saga
비동기 통신으로 데이터를 가져와야하는 일이 많아서 Redux saga를 도입하게 되었습니다. Redux thunk보다 제공되는 기능이 많고, Action creator의 반환이 Action Object인 점과 sagas라는 순수함수로 로직을 표현할 수 있기 때문에 협업 시 어떤 팀원이 보아도 예측 가능한 코드를 만들 수 있을 것이라 생각했습니다. 또한 saga effect는 동작에 대한 핸들링을 명확하게 나타낼 수 있어서 매력적이라고 느꼈습니다. takeLatest, call, takeEvery, all 등 해당 메서드를 사용해 명시적으로 동작을 제어할 수 있었습니다. 특히 여러 개의 요청이 올 때 마지막 요청만 실행하는 takeLatest 메서드를 사용해서 불필요한 요청을 방지해서 깔끔한 구성을 만들 수 있었습니다. saga의 러닝커브가 낮지 않기 때문에 팀원 모두가 saga를 공부하는데 시간이 꽤 소요되었고 많은 양의 boilerplate 코드도 단점으로 다가왔지만 Redux toolkit을 사용해 최대한 간결하게 작성하려고 했습니다.

### MongoDB의 GeoJson적용에 따른 Join(Aggregation) 사용
​
지도에 사용자가 올린 피드의 위치정보를 DB에 저장하고 불러와 Map Page에 불러와 올바른 위치에 아이콘(marker)으로 보여주는 로직을 작성하였습니다.​
DB에서 모든 위치 좌표를 불러오는 것이 아닌 현재 사용자가 보고 있는 화면의 위치 좌표값을 가져와 보여주는 로직을 작성하였습니다.  
​
Data Schema에서 Feed에 Location부분을 Geo(type과 coordinates를 필드로 갖는 schema)를 참조하도록 구성했기 때문에 처음 접근할때 populate를 적용하려고 하였으나 populate는 $oid로 모두 조회해서 JavaScript단에서 합쳐주는 것으로, Join처럼 DB 자체에서 합쳐주는 것이 아니라는 것을 조사하는 도중 알게되었습니다. 즉 populate를 쓴다면 당장은 문제가 없겠지만 위치에 대한 data가 많아진다면 성능에 문제가 생길 것으로 판단하였습니다. 그래서 Join으로 aggregation을 사용하여 filter를 해주고 GeoJson을 사용하여 polygon형태 (boundary)를 지정하여 그 안에 있는 좌표값을 가져와 화면에 적용하는 로직을 작성하였습니다.

​
### Clustering
​
지도에서 zoom out 시 아이콘(marker)으로 나타나져 있는 것들이 원형태로 변환되는 클러스터링 기능을 구현 하였습니다.
아이디어 회의를 통해 각각 marker를 객체형태로 marker의 정보를 나타내었습니다.

ex)
​

```
marker = {
  id: "something",
  coordinate: [127, 37],
  clustering: false,
  number: 1
}
```

​
각 marker에 정보를 할당하고 처음에는 작게 test로 100m이내에 4개의 marker를 두고 줌아웃이 되었을때 하나로 합치는 것과 합쳐질 때 몇개가 합쳐졌는지 marker안에 숫자로 나타내었습니다.  
​
100개 이상의 mock data를 적용하였습니다. 하지만 zoom out 시 제대로 클러스터링이 되지 않는 문제가 생겼습니다. 이를 해결하기 위해 전체적인 로직을 다시 점검해 보고, marker가 순환 할때 하나하나 debugging을 하여 어떤 시점에서 어떻게 분기 처리를 해주어야 하는지 계속 시도하였습니다. 그 결과 팀의 기대수준에 맞게 안정적으로 클러스터링 기능을 구현할 수 있었습니다.

# 🧵 Future Plan
1. 모바일 사이즈에도 대응할 수 있도록 반응형으로 프로젝트를 구성하고 PWA 즉, Web App으로 사용할 수 있도록 수정
2. 퀘스트 인증시 흥미를 더하기 위해 게임과 같은 요소 접목
3. 플로깅 단체 활동 모집 게시판, 채팅 추가하여 개인에서 단체 활동도 지원
