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
      <p>{nft.description}</p>
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
  const [tokenId, setTokenId] = useState('');
  const [loading, setLoading] = useState(false);
  const [nft, setNFT] = useState(null);
  const [transfers, setTransfers] = useState(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      const nftData = await getSingleNFT(contractAddress, tokenId);
      setNFT(nftData);

      const transfersData = await getAllTransfers(contractAddress, tokenId);
      setTransfers(transfersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className='title'>NFT Ownership History</h1>
      <div className='inputContainer'>
        <input type="text" placeholder="Contract Address" onChange={(e) => setContractAddress(e.target.value)} />
        <input type="text" placeholder="Token ID" onChange={(e) => setTokenId(e.target.value)} />
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
