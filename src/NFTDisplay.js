import React, { useState } from 'react';
import { getSingleNFT } from './api';
import { getAllTransfers } from './api';

const NFTDisplay = ({ nft }) => {
  if (nft === null) return null;

  return (
    <div className="nftData">
      <h2>{nft.name}</h2>
      <div className="imageContainer">
        {console.log(nft)}
        <img className="image" src={nft.cached_images.medium_500_500} alt={nft.name} />
      </div>
      {console.log(nft)}
      <p className='message'>
        Id: {nft.id} | 
        Token Name: {nft.token_name} | 
        {(nft.rarity_rank)? `Rarity: ${nft.rarity_rank} | ` : " "}
        Recent Price: ${parseFloat(nft.recent_price.price_usd).toFixed(2)} {`(${nft.recent_price.price} ${nft.recent_price.price_currency})`}</p>
    </div>
  );
};
const NFTTable = ({ transfers }) => {
  if (transfers === null) return null;

  return (
    <table style={{ width: '100%', marginTop: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={{ padding: '10px', textAlign: 'left' }}>From</th>
          <th style={{ padding: '10px', textAlign: 'left' }}>To</th>
          <th style={{ padding: '10px', textAlign: 'left' }}>Transfer Type</th>
          <th style={{ padding: '10px', textAlign: 'left' }}>Block Timestamp</th>
          <th style={{ padding: '10px', textAlign: 'left' }}>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {transfers.map((transfer, index) => (
          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
            <td style={{ padding: '10px' }}>{transfer.from_address}</td>
            <td style={{ padding: '10px' }}>{transfer.to_address}</td>
            <td style={{ padding: '10px' }}>{transfer.transfer_type}</td>
            <td style={{ padding: '10px' }}>{transfer.block_timestamp}</td>
            <td style={{ padding: '10px' }}>{transfer.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Wrapper = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [blockchain, setBlockchain] = useState('eth-main');
  const [tokenId, setTokenId] = useState('');
  const [loading, setLoading] = useState(false);
  const [nft, setNFT] = useState(null);
  const [transfers, setTransfers] = useState(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      const nftData = await getSingleNFT(contractAddress, tokenId, blockchain);
      setNFT(nftData);

      const transfersData = await getAllTransfers(contractAddress, tokenId, blockchain);
      setTransfers(transfersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockchainChange = (event) => {
    setBlockchain(event.target.value);
  };

  return (
    <div>
      <h1 className='title'>NFT Ownership History</h1>
      <p className='message'>Input NFT token ID and contract address below to see the ownership history of the NFT.</p>
      <div className='inputContainer'>
        <input type="text" placeholder="Contract Address" onChange={(e) => setContractAddress(e.target.value)} />
        <input type="text" placeholder="Token ID" onChange={(e) => setTokenId(e.target.value)} />
        <select name='blockchain' value={blockchain} onChange={handleBlockchainChange}>
          <option value="eth-main">eth-main</option>
          <option value="arbitrum-main">arbitrum-main</option>
          <option value="optimism-main">optimism-main</option>
          <option value="poly-main">poly-main</option>
          <option value="bsc-main">bsc-main</option>
          <option value="eth-goerli">eth-goerli</option>
          {console.log('This is the blockchain:' + blockchain)}
        </select>
        <button onClick={fetchData}>View Ownership History</button>
      </div>
      {loading ? (
        <div>Loading...</div> // Display a loading message while data is being fetched
      ) : (
        <>
          <NFTDisplay nft={nft} />
          <NFTTable transfers={transfers} />
        </>
      )}
    </div>
  );
};

export default Wrapper;
