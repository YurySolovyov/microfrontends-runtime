import { useEffect, useState } from 'react';

const Deferred = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => setCount((curr) => curr + 1), 1000);

    return () => clearInterval(tick);
  }, []);

  return (
    <div>
      I'm deferred: {value}, count: {count}
    </div>
  );
};

export default Deferred;
