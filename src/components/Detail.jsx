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
  }, []);
  console.log(ids);

  return (
    <div className='details'>
      <div className='details_info'>
        <img className='api_img' src={ids.picture} alt='사진' />
        <div className='api_name'>{ids.name}</div>
        <div>
          <span className='api_inline'>
            <img src={imgC} alt='사진' />
            {ids.cookingTime}분
          </span>
          <span className='api_inline'>
            <img src={imgD} alt='사진' />
            {ids.servings}인분
          </span>
          <span className='api_inline'>
            <img src={imgE} alt='사진' />
            {ids.kcal}kcal
          </span>
        </div>
        <div className='line'>
          <span className='api_block'>재료</span>
          <ul>
            {ids.ingredients &&
              ids.ingredients.map((index) => (
                <li>
                  <img src={imgF} alt='사진' />
                  {index}
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
                  {index}
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
                  {index}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Detail;
