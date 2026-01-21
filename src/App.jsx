import { useState, useEffect } from 'react'
import './App.css'

function App() {
  
  const [spanishWord, setSpanishWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [showTranslation, setShowTranslation] = useState(false);
  const [loading, setLoading] = useState(false);

  const getWord = async() => {
    setLoading(true);
    const response = await fetch(`https://random-word-api.herokuapp.com/word?lang=es`);
    const data = await response.json();
    setSpanishWord(data[0].toLowerCase());
    setTranslation("");
    setShowTranslation(false);
    setLoading(false);
  }

  useEffect(() => {
    getWord();
  }, [])

  const translateWord = async () => {
    if (!spanishWord) return;
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(spanishWord)}&langpair=es|ru`
    );
    const data = await response.json();
    setTranslation(data.responseData.translatedText.toLowerCase());
    setShowTranslation(true);
  };

  return (
    <div className='app'>
      <div className='container'>
        <h1>Una palabra del día</h1>
        {loading ? <p>Loading...</p> : <h2>{spanishWord}</h2>}
        <div className='buttons'>
        <button className='nuevaPalabra' onClick={getWord} disabled={loading}>nueva palabra</button>
        <button className='traduccion' onClick={translateWord} disabled={loading || !spanishWord}>traducción</button>
        </div>
        {showTranslation && <h2>{translation}</h2>}
        <p>⚠️ Note:
            This app uses free public APIs to generate random Spanish words and translations.<br></br>
            Occasionally, you may see uncommon words, loanwords, or imperfect translations.<br></br>
            The project is intended for learning and practice purposes rather than as a full dictionary.
        </p>
      </div>
    </div>
  );
}

export default App
