// src/components/GenericTable.tsx
import React from 'react';

interface Props {
  headers: string[];
  children: React.ReactNode;
}

export const GenericTable = ({ headers, children }: Props) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f4f4f4' }}>
          {headers.map((h) => (
            <th key={h} style={{ border: '1px solid #ddd', padding: '8px' }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};