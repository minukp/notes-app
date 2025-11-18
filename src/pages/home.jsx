import InputFilter from "../components/InputFilter"
import LimitSelector from "../components/LimitSelector"
import CoinCard from "../components/CoinCard"
import Spinner from "../components/Spinner";

const HomePage = ({
    coins,
    loading,
    error,
    limit,
    filter,
    setFilter,
    setLimit
}) => {
    const filteredCoins = coins.filter((coin)=>{
        return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) 
        || coin.symbol.toLowerCase().includes(filter.toLowerCase())
        )
    });

  return (
    <div>
        <h1>Crypto dash</h1>
        {loading && <Spinner color="white"/>}
        <div className="top-controls">
            <InputFilter filter={filter} onFilterChange={setFilter}/>
            <LimitSelector limit={limit} changeLimit={setLimit}/>

        </div>
      
     
        {loading || coins.length === 0 ? <p>Loading</p> : ( 

            <main className="grid">            
            {
                filteredCoins.length >0 ? filteredCoins.map((coin)=><CoinCard key={coin.id} coin={coin}/>) 
                : <p>No coins to Display</p>
            }
            </main>

        )}
        
    </div>
  )
}

export default HomePage