# Earth Saving Cleaner

- [Earth Saving Cleaner](#earth-saving-cleaner)
  - [Introduce](#Introduce)
  - [Features](#Features)
  - [Stie](#site)
  - [Motivation](#motivation)
- [Getting Started](#getting-started)
  - [Frontend](#front-end)
  - [Backend](#back-end)
- [Tech Stack](#tack-stack)
  - [Frontend Stack](#frontend-stack)
  - [Backend Stack](#backend-stack)
  - [Common](#common)
- [Problem and Solve](#problem-and-solve)

---

## Introduce

**_쓰레기 사진을 올리고 플로깅 활동을 하세요!_**

<details><summary>What is plogging?
</summary>
플로깅은 2016년 스웨덴에서 시작된 작은 환경운동입니다. 플로깅은 '줍다'라는 뜻의 스웨덴어 "plocka upp"와 영어 단어 조깅 "jogging"의 합성어입니다. 조깅을 하면서 쓰레기를 줍는 활동으로 운동효과와 더불어 환경운동을 실천할 수 있습니다.
</details>

ESC(Earth Saving Cleaner)는 쓰레기가 버려진 곳의 사진을 촬영하여 게시물을 공유합니다.
해당 게시물 사진의 메타데이터(위치)를 활용해 지도에 표시하여 시각적으로 오염 정도를 확인할 수 있습니다.
사람들이 올려둔 게시물의 위치 데이터로 해당 지역의 오염을 확인하고, 플로깅 활동(퀘스트)을 인증하여 깨끗한 지구를 만들 수 있습니다.

## Features

- Google 소셜 로그인 제공

- 피드(게시물)

  - 피드 등록 기능
  - 피드 좋아요 기능
  - 피드 댓글 기능

- 지도

  - 사용자의 GPS를 받아서 해당 지역에 올라온 피드의 위치 지도에서 확인
  - 위치를 나타낸 지도 아이콘 클릭 시, 플로깅 활동 인증 가능
  - socket 통신으로 실시간 활동중인 사용자 확인 가능
  - 오염 정도와 플로깅 완료 정보를 비교할 수 있도록 클러스터링 기능 제공

- 마이페이지
  - 사용자의 레벨, 스코어 확인
  - 전체 랭킹 제공

## Site

https://www.earth-saving-cleaner

## Motivation

길거리를 걷다보면 우리는 흔하게 쓰레기를 볼 수 있습니다. 관리가 잘되는 지역은 다음날이 되면 바로바로 치워지지만 관리가 되지 않는 지역은 하루 이틀이 지나도 쓰레기가 그대로 있는 것을 볼 수 있습니다.
저희는 좀 더 효율적으로 환경미화 인력을 배치해 좀 더 관리가 잘 되었으면 좋겠다는 생각으로 시작하였습니다.
​
사람들이 쓰레기 사진을 찍어 올리고 사진에 있는 위치 데이터를 지도에 표시하여 시각적으로 한눈에 파악 할 수 있습니다. 어떤 지역에 쓰레기가 많은 지 데이터를 쌓아 공공기관에 제공하면 좀 더 깨끗하게 관리 될 수 있을 것이라 예상합니다.
​
더 나아가 저희 프로젝트에는 사람들이 자발적으로 쓰레기를 줍는 플로깅 활동을 유도하도록 플로깅 활동 인증, 플로깅 활동에 대한 Ranking, 개인별 Score를 제공하고 동기를 부여하여 공공의 목적으로 기여 할 수 있다는 측면에서 프로젝트의 의의를 찾을 수 있었습니다.

# Getting Started

Local 환경에서 실행 시 아래와 같이 환경 변수를 입력해 주세요.

**Frontend**

<details>
  <summary>Start</summary>

```
yarn start
```

</details>​

<details>
  <summary>env 설정</summary>
  .env

```
REACT_APP_GOOGLE_CLIENT_ID="your client id"
REACT_APP_GOOGLE_CLIENT_SECRET="your client secret"
REACT_APP_SERVER_URL=http://localhost:5000
REACT_APP_GOOGLE_MAP_API_KEY="your map api"
```

</details>

**Backend**

<details>
  <summary>Start</summary>

```
yarn start
```

</details>
<details>
  <summary>env 설정</summary>
  .env

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

</details>

# Tech Stack

**Frontend Stack**

- React
- React-router-dom
- Redux
- Redux-saga
- Redux-toolkit
- Socket.io-client
- Styled-Component
- React-testing-library

**Backend Stack**

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

# Problem and Solve

**Redux saga**  
비동기 통신으로 데이터를 가져와야하는 일이 많아서 Redux saga를 도입하게 되었습니다. Redux thunk보다 제공되는 기능이 많고, Action creator의 반환이 Action Object인 점과 sagas라는 순수함수로 로직을 표현할 수 있기 때문에 협업 시 어떤 팀원이 보아도 예측 가능한 코드를 만들 수 있을 것이라 생각했습니다. 또한 saga effect는 동작에 대한 핸들링을 명확하게 나타낼 수 있어서 매력적이라고 느꼈습니다. takeLatest, call, takeEvery, all 등 해당 메서드를 사용해 명시적으로 동작을 제어할 수 있었습니다. 특히 여러 개의 요청이 올 때 마지막 요청만 실행하는 takeLatest 메서드를 사용해서 명확하고 깔끔한 구성을 만들 수 있었습니다. saga의 러닝커브가 낮지 않기 때문에 팀원 모두가 saga를 공부하는데 시간이 꽤 소요되었고 많은 양의 boilerplate 코드도 단점으로 다가왔지만 Redux toolkit을 사용해 최대한 간결하게 작성하려고 했습니다.

**MongoDB의 GeoJson적용에 따른 Join(Aggregation) 사용**  
​
지도에 사용자가 올린 피드의 위치정보를 DB에 저장하고 불러와 Map Page에 불러와 올바른 위치에 아이콘(marker)으로 보여주는 로직을 작성하였습니다.​
DB에서 모든 위치 좌표를 불러오는 것이 아닌 현재 사용자가 보고 있는 화면의 위치 좌표값을 가져와 보여주는 로직을 작성하였습니다.  
​
Data Schema에서 Feed에 Location부분을 Geo참조로 하였기때문에 처음 접근할때 populate를 적용하려고 하였으나 populate는 $oid로 모두 조회해서 JavaScript단에서 합쳐주는 것으로, Join처럼 DB 자체에서 합쳐주는 것이 아니라는 것을 찾아보게 되었습니다. 즉 populate를 쓴다면 당장은 문제가 없겠지만 위치에 대한 data가 많아진다면 성능에 문제가 생길 것으로 판단하였습니다. 그래서 Join으로 aggregation을 사용하여 filter를 해주고 GeoJson을 사용하여 polygon형태 (boundary)를 지정하여 그 안에 있는 좌표값을 가져와 화면에 적용하는 로직을 작성하였습니다.

​
**Clustering**  
​
지도에서 zoom out 시 아이콘(marker)으로 나타나져 있는 것들이 원형태로 변환되는 클러스터링 기능을 구현 하였습니다.

​
첫번째로 어떻게 이것을 구현할 것인가가 가장 난관이었습니다.  
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
두번째로 각 marker에 정보를 할당하고 처음에는 작게 test로 100m이내에 4개의 marker를 두고 줌아웃이 되었을때 하나로 합치는 것과 합쳐질 때 몇개가 합쳐졌는지 marker안에 숫자로 나타내었습니다.  
​
세번째로 100개 이상의 mock data를 적용하였습니다. 하지만 zoom out 시 제대로 클러스터링이 되지 않는 문제가 생겼습니다. 이를 해결하기 위해 전체적인 로직을 다시 점검해 보고, marker가 순환 할때 하나하나 debugging을 하여 어떤 시점에서 어떻게 분기 처리를 해주어야 하는지 밤새도록 시도하였습니다. 그 결과 팀의 기대수준에 맞게 안정적으로 클러스터링 기능을 구현할 수 있었습니다.
