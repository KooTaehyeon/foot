import React, { useState, useEffect } from 'react';
import './Main.css';
import imgA from './img/eye@2x.png';
import imgB from './img/time_gray@2x.png';
import { Link } from 'react-router-dom';
const Main = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [veiw, setView] = useState(0);
  //카테고리 담아두는곳
  const [categoryOne, setCategoryOne] = useState([]);
  // 디테일부분
  // const [idGet, setIdGet] = useState(null);

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
  // console.log(data);
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

  const jsonDateJapan = categoryJapan.map((item) => (
    <div className='box' key={categoryJapan.length}>
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
  const jsonDateKor = categoryKor.map((item) => (
    <div className='box' key={categoryKor.length}>
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
  console.log(data[0].category);
  return (
    <div className='all'>
      {loading === true ? (
        <h1>로딩중입니다</h1>
      ) : (
        <>
          {/* <div className='categroy_title'>{data[1] && data[1].category}</div> */}
          {jsonDateJapan}
          {/* <div className='categroy_title'>{data[3].category}</div> */}
          {jsonDateKor}
        </>
      )}
    </div>
  );
};

export default Main;
