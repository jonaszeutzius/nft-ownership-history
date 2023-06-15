import axios from 'axios';

const API_KEY = '2jhzbqIWanB8puiqySBIWJVf6Ovp7oPW'; 

export const getAllTransfers = async (contractAddress, tokenId, blockchain) => {
  const options = {
    method: 'GET',
    url: `http://localhost:8080/v1/transfers/contract/${contractAddress}/token/${tokenId}?chain=${blockchain}&page_size=25`,
    headers: {
      accept: 'application/json',
      'X-API-KEY': API_KEY
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const getSingleNFT = async (contractAddress, tokenId, blockchain) => {
  const options = {
    method: 'GET',
    url: `http://localhost:8080/v1/nfts/contract/${contractAddress}/token/${tokenId}?chain=${blockchain}`,
    headers: {
      accept: 'application/json',
      'X-API-KEY': API_KEY
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};