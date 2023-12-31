import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [kysymykset, setKysymykset] = useState([]);
  const [uusiKysymys, setUusiKysymys] = useState('');
  const [uusiVastaus, setUusiVastaus] = useState('');

  useEffect(() => {
    haeKysymykset();
  }, []);

  const haeKysymykset = async () => {
    try {
      const response = await axios.get('http://localhost:3001/kysymykset');
      setKysymykset(response.data);
    } catch (error) {
      console.error('Virhe haettaessa kysymyksiä:', error);
    }
  };

  const lisaaKysymys = async () => {
    try {
      await axios.post('http://localhost:3001/kysymykset', {
        kysymys: uusiKysymys,
        vastaus: uusiVastaus
      });
      alert('Kysymys lisätty onnistuneesti');
      haeKysymykset();
    } catch (error) {
      console.error('Virhe lisättäessä kysymystä:', error);
    }
  };

  return (
    <div>
      <h1>Tietovisapeli</h1>

      <h2>Kysymykset</h2>
      <button onClick={haeKysymykset}>Hae kaikki kysymykset</button>
      <pre>{JSON.stringify(kysymykset, null, 2)}</pre>

      <h2>Lisää uusi kysymys</h2>
      <label htmlFor="uusiKysymys">Kysymys:</label>
      <input
        type="text"
        id="uusiKysymys"
        placeholder="Syötä uusi kysymys"
        value={uusiKysymys}
        onChange={(e) => setUusiKysymys(e.target.value)}
      />
      <label htmlFor="uusiVastaus">Vastaus:</label>
      <input
        type="text"
        id="uusiVastaus"
        placeholder="Syötä uusi vastaus"
        value={uusiVastaus}
        onChange={(e) => setUusiVastaus(e.target.value)}
      />
      <button onClick={lisaaKysymys}>Lisää kysymys</button>
    </div>
  );
}

export default App;
