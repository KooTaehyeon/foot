### `npm start`

홈페이지 열기
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### App

리엑트 라이브러리 인 react-router-dom 을 했으며 라우터를 사용한 이유는
두번쨰 과제인 음식 상세페이지를 보여주기 위해서 사용하였습니다.
Nav은 상시 보여주기위해서 Routes 위에 마크업 했고
기본 페이지는 Main 페이지 이며 음식 상세페이지로 넘어갈떄
Detail 페이지가 보여지는 것이죠

```
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Main from './components/Main.jsx';
import Detail from './components/Detail.jsx';
import React from 'react';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Nav></Nav>
      <Routes basename={process.env.PUBLIC_URL}>
        <Route path={`/`} exact={true} element={<Main></Main>}></Route>
        <Route
          path={`/recipe/:id`}
          exact={true}
          element={<Detail></Detail>}
        ></Route>
      </Routes>
    </Router>
  );
}


export default App;
```

### Main

## 1. 1번째 과제

async,await 를 이용해서 api 가지고 온후에 useState date 변수에 담아서 map 을 이용해서 api에 있는
필요한 데이터를 넣었습니다
그리고 페이지가 렌더링 해서 api를 다 불러오기전에 로딩중이라는 것을 보여주기 위해서
useState loading 변수를 만들어서 초기값을 true를 주고 렌더링 될떄
처음 실행 api정보를 한번만 가져오기 위해 useEffect에 api의 정보가 담긴 변수 get를 넣어서 실행시키고
그후에 api정보를 다 받아온후에 setLoading에 false 주었고
loading 변수에 값이 true면 로딩페이지를 보여주고 false 라면 api정보가 담긴 api데이터를 넘겨받고 마크업이 담겨있는
jsonDate변수를 보여줍니다.
그 다음 2번째 과제인 상세페이지로 넘어가기 위해서 `` <Link className='link_color' to={`/recipe/${item.id}> ``
작성 해주었씁니다 만약 해당 음식이름을 누르면 /recipe/{해당 누른api id} 넘어가도록 하였습니다.

#

```
import React, { useState, useEffect } from 'react';
import './Main.css';
import imgA from './img/eye@2x.png';
import imgB from './img/time_gray@2x.png';
import { Link } from 'react-router-dom';
const Main = () => {
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [veiw, setView] = useState(0);

  const get = async () => {
    const json = await (
      await fetch(
        'https://asia-northeast1-sharexpere-prod.cloudfunctions.net/recipe'
      )
    ).json();
    setDate(json);
  };
  useEffect(() => {
    get();
    setLoading(false);
  }, []);

  const jsonDate = date.map((item) => (
    <div className='box'>
      <div className='img_box'>
        {' '}
        <img className='img_in_box' src={item.picture} alt='사진' />
      </div>
      <div className='api_info'>
        <div className='api_title' id={item.id}>
          <Link className='link_color' to={`/recipe/${item.id}`}>
            {' '}
            {item.name}
          </Link>
        </div>
        <div className='api_time'>
          <img className='time' src={imgB}></img>
          {item.cookingTime}
        </div>
        <div className='api_view'>
          <img className='cook_img' src={imgA}></img>
          {veiw}
        </div>
      </div>
    </div>
  ));

  return (
    <div className='all'>
      {loading === true ? <h1>로딩중입니다</h1> : jsonDate}
    </div>
  );
};

export default Main;

```

### Detail

## 2. 두번쨰 과제

첫번쨰 과제와 마찬가지로 async,await 를 이용해서 api 가지고 오는데 가지고올떄 url부분을 `https://asia-northeast1-sharexpere-prod.cloudfunctions.net/recipe/${id}`
끝쪽에 백틱을 사용한 템플릿리터럴을 사용에 문자열에 변수를 사용 할 수 있게 해줍니다
템플릿 리터럴에 있는 변수를 사용하기 위해서 먼저 변수를 할당하는데 useParams 를 사용해서 {id}라는 변수를 할당해주게 되면
id 라는 변수안에 object가 담아 둡니다
이렇게 되면 첫 음식 페이지인 Main에서 음식 이름을 누르게 된다면 해당 api에 있는 배열에 id가 useParams을 사용한 {id}라는 변수안에
담겨 URL parameter 가 저장되어 동적으로 주소url을 설정 해 주었습니다.

```
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css';
import imgC from './img/time@2x.png';
import imgD from './img/serving@2x.png';
import imgE from './img/kcal@2x.png';
import imgF from './img/check_full@2x.png';
const Detail = () => {
  const [ids, setIds] = useState([]);
  const { id } = useParams();
  const [dloading, setDloading] = useState(true);
  const getids = async () => {
    const json = await (
      await fetch(
        `https://asia-northeast1-sharexpere-prod.cloudfunctions.net/recipe/${id}`
      )
    ).json();
    setIds(json);
    console.log(json);
  };
  useEffect(() => {
    getids();
    setDloading(false);
  }, []);
  console.log(ids);

  return (
    <>
      {dloading === true ? (
        <h1>로딩중....</h1>
      ) : (
        <div className='details'>
          <div className='details_info'>
            <img className='api_img' src={ids.picture} alt='사진' />
            <div className='api_name'>{ids.name}</div>
            <div className='api_contents'>{ids.description}</div>
            <div className='api_iniine_all'>
              <div className='api_inline'>
                <img src={imgC} alt='사진' />
                <span> {ids.cookingTime}분</span>
              </div>
              <div className='api_inline'>
                <img src={imgD} alt='사진' />
                <span> {ids.servings}인분</span>
              </div>
              <div className='api_inline'>
                <img src={imgE} alt='사진' />
                <span>{ids.kcal}kcal</span>
              </div>
            </div>
            <div className='line'>
              <span className='api_block'>재료</span>
              <ul>
                {ids.ingredients &&
                  ids.ingredients.map((index) => (
                    <li>
                      <img src={imgF} alt='사진' />
                      <span> {index}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className='line'>
              <span className='api_block'>양념장</span>
              <ul>
                {ids.spices &&
                  ids.spices.map((index) => (
                    <li>
                      <img src={imgF} alt='사진' />
                      <span>{index}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className='line'>
              <span className='api_block'>만들어봅시다!!</span>
              <ul>
                {ids.cookingSteps &&
                  ids.cookingSteps.map((index, i) => (
                    <li>
                      <div className='api_num'>{i}</div>
                      <span> {index}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;

```

### Main update

## 3. 3번째 과제

3번쨰 과제는 1번쨰 과제를 페이지를 개선 시키는 것으로 이해했습니다.

일단 가져온 api 데이터를 먼저 필터를 사용해서 새로운 변수에 할당했습니다
korean,japanese 두개를 필터에 조건을 걸어서 분류후에
sort 함수를 이용해서 가나다 순으로 정렬 후에
필터를 사용한 각각 새로운 변수에 map을 사용하였습니다.

```
import React, { useState, useEffect } from 'react';
import './Main.css';
import imgA from './img/eye@2x.png';
import imgB from './img/time_gray@2x.png';
import { Link } from 'react-router-dom';
const Main = () => {
 const [data, setData] = useState([]);
 const [loading, setLoading] = useState(true);
 const [veiw, setView] = useState(0);

 const get = async () => {
   const json = await (
     await fetch(
       'https://asia-northeast1-sharexpere-prod.cloudfunctions.net/recipe'
     )
   ).json();
   setData(json);
 };
 useEffect(() => {
   get();
   setLoading(false);
 }, []);
 //카테고리 별 이름 정렬하기
 const categoryKor = data.filter((category) => category.category === 'korean');
 const categoryJapan = data.filter(
   (category) => category.category === 'japanese'
 );
 categoryKor.sort((a, b) => a.name.localeCompare(b.name));
 categoryJapan.sort((a, b) => a.name.localeCompare(b.name));
 data.sort((a, b) => a.name.localeCompare(b.name));
 data.sort((a, b) => a.category.localeCompare(b.category));

 console.log(categoryKor);
 console.log(categoryJapan);
 console.log('필터', data);

 const jsonDateJapan = categoryJapan.map((item, i) => (
   <div className='box' key={i}>
     <div className='img_box'>
       {' '}
       <img className='img_in_box' src={item.picture} alt='사진' />
     </div>
     <div className='api_info'>
       <div className='api_title' id={item.id}>
         <Link className='link_color' to={`/recipe/${item.id}`}>
           {' '}
           {item.name}
         </Link>
       </div>
       <div className='api_time'>
         <img className='time' src={imgB}></img>
         {item.cookingTime}
       </div>
       <div className='api_view'>
         <img className='cook_img' src={imgA}></img>
         {veiw}
       </div>
     </div>
   </div>
 ));
 const jsonDateKor = categoryKor.map((item, i) => (
   <div className='box' key={i}>
     <div className='img_box'>
       {' '}
       <img className='img_in_box' src={item.picture} alt='사진' />
     </div>
     <div className='api_info'>
       <div className='api_title' id={item.id}>
         <Link className='link_color' to={`/recipe/${item.id}`}>
           {' '}
           {item.name}
         </Link>
       </div>
       <div className='api_time'>
         <img className='time' src={imgB}></img>
         {item.cookingTime}
       </div>
       <div className='api_view'>
         <img className='cook_img' src={imgA}></img>
         {veiw}
       </div>
     </div>
   </div>
 ));

 return (
   <div className='all'>
     {loading === true ? (
       <h1>로딩중입니다</h1>
     ) : (
       <>
         <div className='categroy_title'>일본</div>
         {jsonDateJapan}
         <div className='categroy_title'>한국</div>
         {jsonDateKor}
       </>
     )}
   </div>
 );
};

export default Main;

```
