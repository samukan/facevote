import { use, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useStore } from '@/stores/DBStore';

const Detected = () => {
  const { addFaces } = useStore();
  const { state } = useLocation();

  useEffect(() => {}, []);

  return <div>Detected</div>;
};

export default Detected;
