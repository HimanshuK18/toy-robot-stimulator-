import React, { useState, useEffect } from 'react';
interface CatData {
  type: string
  text: string
  _id: string
  user: string
};

const FetchDogs: React.FC = () => {
  const [data, setData] = useState<CatData[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const apiUrl = 'https://cat-fact.herokuapp.com/facts/';
  // useEffect should not be an async function: You cannot mark the useEffect function itself as
  // async. This is because useEffect is expected to return a cleanup function (if needed) or nothing
  // (undefined). Instead, you should use async within the body of the useEffect function.
  useEffect(() => {
    fetch(apiUrl)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      })
      .then((result: CatData[]) => {
        setData(result);
        setLoading(false);
      })
      // eslint-disable-next-line n/handle-callback-err
      .catch((error) => {
        console.log('There was a problem fetching the data:');
        setLoading(false);
      });
  }, []);

  return (<>
        <div>
            <h1>Fetch Data Example</h1>
            {loading
              ? (
                    <p >Loading...</p>
                )
              : (
                    <ul>
                        {data?.map((item: CatData) => (
                            <li key={item.text}>{item.text}</li>
                        ))}
                    </ul>
                )}
        </div>
   </>
  );
};

export default FetchDogs;
