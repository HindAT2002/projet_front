
import React, { useEffect, useState } from 'react';
import meImage from './me.png';
import meImage2 from './me2.png';
import { useNavigate } from 'react-router-dom';
import '../src/diagnostic.css';
function Diagnostic() {
  const [data, setData] = useState(null);
  const [data3, setData3] = useState(null);
  const [data2, setData2] = useState(null);
  const [datatosend, setdatatosend] = useState([]);
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('userData')));
   const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response1 = await fetch('http://127.0.0.1:8080/get_qst');
      const data1 = await response1.json();
      setData(data1);

      const response2 = await fetch('http://127.0.0.1:8080/get_choix');
      const data2 = await response2.json();
      setData2(data2);

      const response3 = await fetch('http://127.0.0.1:8080/get_catg');
      const data3 = await response3.json();
      setData3(data3);
    };

    fetchData();
  }, []);

  const handleRadioClick = async (qst, choix) => {
    const arraycopy = [...datatosend];
    arraycopy.push({
      respo: user,
      qst: qst,
      choix: choix,
    });
    setdatatosend(arraycopy);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/Enregistrer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datatosend),
      });

      if (!response.ok) {
        console.error('Erreur lors de la requête');
      }
      navigate('/score')
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Erreur lors de la requête', error);
    }
  };

  return (
    <div className="Log in" style={{ position: 'relative' }}>
      <div style={{ position: 'relative', zIndex: 2, left: 50 }}>
        <h1 style={{ textAlign: 'center' }}>Diagnostic</h1>
        {data3 &&
          Array.isArray(data3) &&
          data3.map((item3, index3) => (
            <div key={index3}>
              <h3>{item3.id}- {item3.nom}</h3>
              <ul>
                {data &&
                  Array.isArray(data) &&
                  data.map((item, index) => (
                    item.cat.id === item3.id ? (
                      <li key={item.id}>
                        {item.qst}
                        {data2 &&
                          Array.isArray(data2) &&
                          data2.map((item2, index2) => (
                            <label key={item2.id}>
                              <br />
                              <input type="radio" name={`choice-${index}`} value={item2.nom} onClick={() => handleRadioClick(item, item2)} />
                              {item2.nom}
                            </label>
                          ))}
                      </li>
                    ) : null
                  ))}
              </ul>
            </div>
          ))}
        <button onClick={handleSubmit} >send</button>
      </div>
      <img src={meImage2} alt="Image" style={{ position: 'absolute', top: 30, right: 50, width: '300px', height: 'auto', zIndex: 1 }} />
      <img src={meImage} alt="Image" style={{ position: 'absolute', top: 700,  right: 50, width: '300px', height: 'auto', zIndex: 1 }} />
      </div>
  );
}

export default Diagnostic;
