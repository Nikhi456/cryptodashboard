import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { CoinContext } from '../../../componenets/context/CoinContext'
import {Link} from 'react-router-dom'
function Home() {
    const { allCoin, currency } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input, setInput] = useState('');

  
    const inputHandler = (event) => {
        setInput(event.target.value);
        if(event.target.value==""){
          setDisplayCoin(allCoin);
        }
    };

    // Handle search
    const searchHandler = (event) => {
        event.preventDefault();
        const coins = allCoin.filter((item) =>
            item.name.toLowerCase().includes(input.toLowerCase()) 
        );
        setDisplayCoin(coins);
    };

    // Initialize displayCoin with allCoin
    useEffect(() => {
        setDisplayCoin(allCoin);
    }, [allCoin]);

    return (
        <div>
            <div className="home">
                <div className="hero">
                    <h1>Largest <br /> Crypto Marketplace</h1>
                    <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about.</p>
                    <form onSubmit={searchHandler}>
                        <input
                            onChange={inputHandler}
                            value={input}
                            list='coinlist'
                            type="text"
                            placeholder="Search crypto..."
                            required
                        />
                      <datalist id="coinlist">
        {allCoin.map((item) => (
            <option key={item.id || item.name} value={item.name} />
        ))}
    </datalist>
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
            <div className="crypto-table">
                <div className="table-layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{ textAlign: "center" }}>24H Change</p>
                    <p className="market-cap">Market Cap</p>
                </div>
                {displayCoin.slice(0, 10).map((item, index) => (
                    <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <img src={item.image} alt={item.name} />
                            <p>{`${item.name} - ${item.symbol.toUpperCase()}`}</p>
                        </div>
                        <p>{currency.symbol}{new Intl.NumberFormat().format(item.current_price)}</p>
                        <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                            {Math.floor(item.price_change_percentage_24h * 100) / 100}%
                        </p>
                        <p className="market-cap">
                            {currency.symbol}{new Intl.NumberFormat().format(item.market_cap)}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Home;
