import './App.css';
import { useEffect, useState } from 'react';
import { FormControl, Form, Button } from 'react-bootstrap'; // Import Button from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const url_api = 'https://api.adviceslip.com/advice';
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  const fetchInfo = () => {
    return fetch(url_api)
      .then((res) => res.json())
      .then((data) => {
        if (data.slip) {
          setData(data.slip.advice);
        } else {
          setData('Could not fetch');
        }
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const searchAdvice = async(e) => {
    e.preventDefault();
    try {
      const url = `https://api.adviceslip.com/advice/search/${ query }`
      const res = await fetch(url);
      const responseData = await res.json();
      if(responseData.slip){
        setData(responseData.slip.advice)
      }else{
        setData('no advice found')
      }
    
    }
    catch(e){
      console.log(e);

   }
  }
  

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="App">
      <h1>Advice</h1>
      <Form onSubmit={searchAdvice}>
        <FormControl
          type="search"
          placeholder="Search advice"
          onChange={changeHandler}
          value={query}
        />
        <Button variant="secondary" type="submit">
          Search
        </Button>
      </Form>
      <h2>{data}</h2>
    </div>
  );
}


export default App;
