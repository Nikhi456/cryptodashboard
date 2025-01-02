import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../../componenets/context/CoinContext';
import Linechart from '../../../componenets/Linechart/Linechart';

function Coin() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-n5GTGDw2QyWqsyRN2hEycewr',
      },
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      if (!response.ok) {
        throw new Error('Failed to fetch coin data');
      }
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error('Error fetching coin data:', err);
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-n5GTGDw2QyWqsyRN2hEycewr',
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      );
      if (!response.ok) {
        throw new Error('Failed to fetch historical data');
      }
      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      console.error('Error fetching historical data:', err);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [coinId, currency.name]); 

  if (coinData && historicalData) {
    return (
      <div className="coin">
        <div className ="coin-name">
          <img src={coinData?.image?.large || ''} alt={coinData?.name || 'Coin'} />
          <p>
            <b>
              {coinData?.name} ({coinData?.symbol?.toUpperCase()})
            </b>
          </p>
        </div>
         <div className="coin-chart">
          <Linechart historicalData={historicalData}/>
         </div>
         <div className= "coin-info">  
  <ul>  
    <li>Crypto Market Rank</li>  
    <li>{coinData.market_cap_rank}</li>  
  </ul>  
  <ul>  
    <li>Current Price</li>  
    <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>  
  </ul>  
  <ul>  
    <li>Market cap</li>  
    <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>  
    </ul>
    <ul>
    <li>24 Hour high</li>  
    <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li> 
    </ul>
    <ul>
    <li>24 Hour low</li>  
    <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
  </ul>  
</div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
}

export default Coin;
