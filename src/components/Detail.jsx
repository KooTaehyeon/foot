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
                      <div className='api_num'>{i + 1}</div>
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
