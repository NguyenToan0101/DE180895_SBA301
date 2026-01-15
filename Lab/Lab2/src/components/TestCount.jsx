import { useState } from "react";
import Button from "react-bootstrap/Button";

function TestCount() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="glass-container rounded-4 d-inline-block px-4 py-3">
      <p className="text-white mb-2 fw-bold">Counter: <span className="text-warning">{count}</span></p>
      <Button onClick={handleClick} className="glass-btn">
        ➕ Click me
      </Button>
    </div>
  );
}
export default TestCount;
