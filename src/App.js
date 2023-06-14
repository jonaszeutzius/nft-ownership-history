import React from 'react';
import NFTDisplay from './NFTDisplay';
import NFTTable from './NFTTable';

const contractAddress = '0xffc558bc2fef0d4295d7ce95e379518eaa6789e3';
const tokenId = '253';

function App() {
  return (
    <div className="App">
      <NFTDisplay contractAddress={contractAddress} tokenId={tokenId} />
      <NFTTable contractAddress={contractAddress} tokenId={tokenId} />
    </div>
  );
}

export default App;