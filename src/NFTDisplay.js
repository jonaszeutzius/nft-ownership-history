import React, { useEffect, useState } from 'react';
import { getSingleNFT } from './api';

const NFTDisplay = ({ contractAddress, tokenId }) => {
  const [nft, setNFT] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchNFT = async () => {
      const data = await getSingleNFT(contractAddress, tokenId);
      setNFT(data);
      setLoading(false);
    };

    fetchNFT();
  }, [contractAddress, tokenId]);
  console.log('nft',nft)
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>{nft.name}</h2>
      <img src={nft.cached_images.original} alt={nft.name} style={{ width: '300px' }} />
      <p>{nft.description}</p>
    </div>
  );
};

export default NFTDisplay;