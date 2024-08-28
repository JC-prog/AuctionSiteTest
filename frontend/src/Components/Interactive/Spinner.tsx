// Spinner.tsx
import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <TailSpin
        height="80"
        width="80"
        color="blue"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Spinner;
