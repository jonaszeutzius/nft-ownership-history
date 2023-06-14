import React, { useEffect, useState } from 'react';
import { getAllTransfers } from './api';

const NFTTable = ({ contractAddress, tokenId }) => {
  const [transfers, setTransfers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransfers = async () => {
      const data = await getAllTransfers(contractAddress, tokenId);
      setTransfers(data);
      setLoading(false);
    };

    fetchTransfers();
  }, [contractAddress, tokenId]);

  if (loading) return <p>Loading...</p>;

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

export default NFTTable;