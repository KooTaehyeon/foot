import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    <div>
      <img className='api_img' src={ids.picture} alt='사진' />
      <div className='api_name'>{ids.name}</div>
      <div>
        <span className='api_inline'>{ids.cookingTime},</span>
        <span className='api_inline'>{ids.servings},</span>
        <span className='api_inline'>{ids.kcal}</span>
      </div>
      <div>
        <span className='api_block'>재료</span>
        <ul>
          {ids.ingredients && ids.ingredients.map((index) => <li>{index}</li>)}
        </ul>
      </div>
      <div>
        <span className='api_block'>양념장</span>
        <ul>{ids.spices && ids.spices.map((index) => <li>{index}</li>)}</ul>
      </div>
      <div>
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
  );
};

export default Detail;
