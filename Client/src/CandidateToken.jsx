import React, { useState, createContext } from "react";
import CandidateLogin from "./CandidateLogin";

export const StoreContext = createContext();

const CandidateToken = () => {
  const [token1, setToken1] = useState(null);

  return (
    <div>
      <StoreContext.Provider value={[token1, setToken1]}>
        <CandidateLogin />
      </StoreContext.Provider>
    </div>
  );
};

export default CandidateToken;
