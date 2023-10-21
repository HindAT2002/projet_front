import React, { useEffect, useState } from 'react';
import meImage from './me.png';
import meImage2 from './me2.png';

function App() {
  const [data3, setData3] = useState(null);
  const [score, setScore] = useState(0);
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('userData')));
  useEffect(() => {
    const fetchData = async () => {
      const response3 = await fetch('http://localhost:8080/get_scoreByCat/'+user.id);
      const data3 = await response3.json();
      setData3(data3);

      // Vérifier que data3 est défini avant de calculer le score total
      if (data3 && Array.isArray(data3)) {
        const totalScore = data3.reduce((acc, item) => acc + item.scoreByCat, 0);
        setScore(totalScore);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Log in" style={{ position: 'relative' }}>
      <div style={{ position: 'relative', zIndex: 2, left: 50 }}>
        <h1 style={{ textAlign: 'center' }}>Découvrir votre score</h1>
        {data3 &&
          Array.isArray(data3) &&
          data3.map((item3, index3) => (
            <div key={index3}>
              <h3>
                {item3.cat_qst.id}- {item3.cat_qst.nom}
              </h3>
              Score : {item3.scoreByCat}
            </div>
          ))}
        {score !== null && <h1>Score Total : {score}</h1>}
      </div>
      <img
        src={meImage}
        alt="Image"
        style={{
          position: 'absolute',
          top: 30,
          right: 50,
          width: '300px',
          height: 'auto',
          zIndex: 1,
        }}
      />
    </div>
  );
}

export default App;
