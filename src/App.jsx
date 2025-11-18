import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import Header from "./components/Header";
import NotFoundPage from "./pages/not-found";
import CoinDetailsPage from "./pages/coin-details";
const API_URL = import.meta.env.VITE_API_URL;




const App = () => {
  const [coins,setCoins] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const [limit,setLimit] = useState(10);
  const [filter,setFilter] = useState('');

 
  useEffect(()=>{

    const fetchCoins = async () =>{
      try {
        const res = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
        if(!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        // console.log(data);
        setCoins(data);
        
      } catch (error) {
        setError(error.message)
        
      }finally{
        setLoading(false)
      }  
    };
    fetchCoins();
  },[limit])
  // console.log(coins);

 
 
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<HomePage coins={coins}
      loading={loading}
      error={error}
      limit={limit}
      filter={filter}
      setFilter={setFilter}
      setLimit={setLimit} 
    />}>

      </Route>
      <Route path="/about" element={<AboutPage/>}></Route>
      <Route path="/coin/:id" element={<CoinDetailsPage/>}></Route>
      <Route path="*" element={<NotFoundPage/>}></Route>
    </Routes>

    </>
    
      
      );
}
 
export default App;