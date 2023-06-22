import { useEffect, useReducer, useState } from 'react';

import './App.css';

const getRandomNumberApi = async (): Promise<number> => {
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
  const numberString = await res.text();
  return +numberString;
}

const AppOld = () => {
  const [number, setNumber] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [key, forceReFetch] = useReducer((x) => x + 1, 0);


  useEffect(() => {
    setLoading(true);
    getRandomNumberApi()
      .then(setNumber)
      .catch(err => setError(err.message));
  }, [key]);

  useEffect(() => {
    if (number) setLoading(false);
  }, [number]);

  useEffect(() => {
    if (error) setLoading(false);
  }, [error]);

  return (
    <div className="App App-header">
      {
        loading ? <h2>Cargando...</h2>
          : <h2>Número aleatorio: {number}</h2>
      }

      {
        !loading && error && <h3>{error}</h3>
      }

      <button onClick={forceReFetch} disabled={loading}>
        {
          loading ? '...' : 'Nuevo número'
        }
      </button>
    </div>
  )
}

export default AppOld;
