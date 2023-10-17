import './App.css';
import { useEffect, useState } from 'react';
import { FormControl, Form, Button, Nav } from 'react-bootstrap'; // Import Button from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactComponent as DiceLogo} from './icon-dice.svg';


function App() {
  const url_api = 'https://api.adviceslip.com/advice';
  
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [image, setImage] = useState('');
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  

  // to show the advice slip on click
  const onClick = () => showSlip(true)
  const showSlip = () => {
   
      setImage('https://api.adviceslip.com/advice/65/img/m');
 
  }
 
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
    //searchAdvice();
  }, []);

  const fetchBadAdvice = (e) => {
     e.preventDefault();
     return fetch("https://badadvice.vercel.app/api/count=5")
     .then((res) => res.json())
     .then((data) => {
      setData(data.advice);
    
  })
  .catch((error) => {
    console.log("feth erro", error);
  })
}
  const check = (e)=> {
    setQuery(e.target.value)
  };

  

  const searchAdvice = (e) => {
    e.preventDefault();
    fetch(`https://api.adviceslip.com/advice/search/${query}`)
    .then((res) => res.json())
    .then((data) => {
      if(data.slips) {
        const adviceslips = data.slips.map((slip) => slip.advice);
        if(adviceslips.length > 0){ 
          const arr = [];
          arr.push(adviceslips);
          setData(arr);
          // setData(adviceslips)
        }
      } else {
        setData('No advice slips found ')
      }
    })
    .catch((error)  => {
      console.error("fetch error", error)
    })
  };
  
  

  return (
    <div className="App col-xs-12 col-sm-12 col-md-12 col-xl-12">
    
    <h1 className='head'>Best Advice</h1> 
      
      
      {/* <Button onClick={fetchBadAdvice}>
      Fetch Bad Advice
      </Button> */}
   
      
      <div className='body'>
        <Form onSubmit={searchAdvice} >
          <FormControl
            type="text"
            placeholder="Search advice"
            onChange={check}
            value={query}
            
          />
          <Button className='pick' variant="secondary" onClick={searchAdvice} type="submit">
            Search
          </Button>
          
          
        </Form>
      </div>
      <div className='content' >
        <div className='text-center' style={{backgroundColor: "#" + `${randomColor}`, }}>
        <h2 >{data}</h2>
          <p style={{backgroundColor: "#" + `${randomColor}`, }}>Press the dice to get new advice</p>
      
        </div>
        
        <div className='logo-div' style={{backgroundColor: "#" + `${randomColor}`}} onClick={fetchInfo}>
            <DiceLogo className='diceLogo' onClick={fetchInfo} />
        </div>
          <Button variant="secondary" style={{backgroundColor: "#" + `${randomColor}`, }} onClick={onClick} className='print'>
          print Daily slip
          </Button>
        <img
          src = {image}
          
          className='img-fluid.max-width:100% slipimage'
        />
      </div>
      
      
      
    </div>
  );
}


export default App;
