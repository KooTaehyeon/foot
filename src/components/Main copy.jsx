import React, { useState, useEffect } from 'react';
import './Main.css';
import imgA from './img/eye@2x.png';
import imgB from './img/time_gray@2x.png';
import { Link } from 'react-router-dom';
const Main = () => {
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [veiw, setView] = useState(0);
  // 디테일부분
  // const [idGet, setIdGet] = useState(null);

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
  console.log(date);

  date.forEach((element) => {
    console.log(element.category);
  });

  //detail
  // const jsonFilter = date.map((item) => {
  //   <Detail
  //     id={item.id} //아이디
  //     name={item.name} //음식이름
  //     cookingSteps={item.cookingSteps} //음식 레시피
  //     time={item.cookingTime} //시간
  //     description={item.description} //음식내용
  //     ingredients={item.ingredients} // 재료
  //     kcal={item.kcal} //칼로리
  //     img={item.picture} //이미지
  //     servings={item.servings} // 먹는양 몇인분
  //     spices={item.spices} // 재료 얼마나 넣을지 개량
  //     idGet={idGet}
  //   />;
  // });

  // console.log(idGet);
  // console.log(idBool);
  // console.log(date);

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
