import './App.css';
import { useEffect, useState } from 'react';
import { FormControl, Form, Button, } from 'react-bootstrap'; // Import Button from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactComponent as DiceLogo} from './icon-dice.svg';


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
    // searchAdvice();
  }, []);

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  const searchAdvice = async(e) => {
    e.preventDefault();
    try{
    
      const url = "https://api.adviceslip.com/advice/search/";
      const res = await fetch(url + `${ query }`);
      const data = await res.json();
      if(data.slip) {
        setData(data.slip.advice);
      }
      else{
        setData('No advice found')
      }
     
    }
    
    catch(e) {
      console.log(e);

   }
  }
  
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
 

  return (
    <div className="App col-xs-12 col-sm-12 col-md-12 col-xl-12">
      <h1>Advice</h1>
      <div className='body'>
        <Form onSubmit={searchAdvice}>
          <FormControl
            type="search"
            placeholder="Search advice"
            onChange={changeHandler}
            value={query}
          />
          <Button variant="secondary" onClick={searchAdvice} type="submit">
            Search
          </Button>
          
        </Form>
      </div>
      <div className='content' >
        <h2 style={{backgroundColor: "#" + `${randomColor}`, }}>{data}</h2>
        <div className='logo-div' style={{backgroundColor: "#" + `${randomColor}`}}>
          <DiceLogo className='diceLogo' onClick={fetchInfo} />
        </div>
        
      </div>

      
      
    </div>
  );
}


export default App;
