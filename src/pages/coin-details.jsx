import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import Spinner from "../components/Spinner";
import CoinChart from "../components/CoinChart";
const API_URL = import.meta.env.VITE_COIN_URL;


const CoinDetailsPage = () => {
    const {id} = useParams();
    const [coin,setCoin] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        const fetchCoin = async() =>{
            try {
                const res= await fetch(`${API_URL}/${id}`);
                if(!res.ok) throw new Error("Failed to fetch data")
                const data = await res.json();
                // console.log(data)
                setCoin(data);

                
            } catch (error) {
               setError(error.message)
                
            }finally{
                setLoading(false)
            }
        }

        fetchCoin();
    },[id])
  return (
    <div className="coin-details-container">
        <Link to="/">Back to Home</Link>
        <h1 className="coin-details-title">{coin ? `${coin.name} ${coin.symbol.toUpperCase()}`:"Coin Details"}</h1>
        {loading && <Spinner/>}
        {error && <div className="error">{error}</div>}

        {!loading && !error && (
            <>
            <img src={coin.image.large} alt={coin.name} className="coin-details-image"/>
            <p>{coin.description.en.split('. ')[0]+'.'}</p>
            <div className="coin-details-info">
                <h3>Rank:#{coin.market_cap_rank}</h3>
                <h3>Current Price: ${coin.market_data.current_price.usd.toLocaleString()}</h3>
                <h4>Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</h4>
                <h4>24th High: ${coin.market_data.market_cap.usd.toLocaleString()}</h4>
                <h4>24th Low: ${coin.market_data.market_cap.usd.toLocaleString()}</h4>
                <h4>24th Price Change: ${coin.market_data.market_cap.usd.toLocaleString()}</h4>
                <h4>Circulating Supply : ${coin.market_data.market_cap.usd.toLocaleString()}</h4>
                <h4>Total Supply: ${coin.market_data.market_cap.usd.toLocaleString()}</h4>
                <CoinChart coinId={coin.id}/>
                <div className="coin-details-links">
                    <p>{coin.links.homepage[0] && (<a href={coin.links.homepage[0] }  target="_blank" rel="noopener norefrer">Website</a>)}</p>
                    <p>{coin.links.blockchain_site[0] && (<a href={coin.links.blockchain_site[0] }  target="_blank" rel="noopener norefrer"><span className="text-green-300">₿</span> BlockChanin Explorer</a>)}</p>
                </div>
               
                {coin.categories.length > 0 && (
                    <p>Categories:{coin.categories.join(', ')}</p>                    
                )}
                {!loading && !error && !coin && <p>NO data foind!</p>}
            </div>
            
            </>
        )}
    </div>
  )
}

export default CoinDetailsPage