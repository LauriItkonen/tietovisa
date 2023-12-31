const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001; // Eri portti kuin Reactissa

app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Korvaa omalla MySQL-käyttäjänimelläsi
  password: '', // Korvaa omalla MySQL-salasanallasi
  database: 'tietovisa'
});

connection.connect((err) => {
  if (err) {
    console.error('Virhe yhdistettäessä MySQL:ään: ', err);
    return;
  }
  console.log('Yhdistetty MySQL:ään');
});

app.use(bodyParser.json());

// Hae kaikki kysymykset
app.get('/kysymykset', (req, res) => {
  connection.query('SELECT * FROM kysymykset', (error, results) => {
    if (error) {
      return res.status(500).json({ viesti: error.message });
    }
    res.json(results);
  });
});

// Lisää uusi kysymys
app.post('/kysymykset', (req, res) => {
  const { kysymys, vastaus } = req.body;
  connection.query('INSERT INTO kysymykset (kysymys, vastaus) VALUES (?, ?)', [kysymys, vastaus], (error, result) => {
    if (error) {
      return res.status(400).json({ viesti: error.message });
    }
    res.status(201).json({ viesti: 'Kysymys lisätty onnistuneesti' });
  });
});

app.listen(port, () => {
  console.log(`Palvelin on käynnissä portissa ${port}`);
});
