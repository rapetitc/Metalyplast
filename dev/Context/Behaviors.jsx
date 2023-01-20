import React, { createContext, useState } from "react";

const BehaviorsContext = createContext();

export const BehaviorsProvider = ({ children }) => {
  const [outerWidth, setOuterWidth] = useState(window.outerWidth);

  const reportWindowSize = (e) => {
    setTimeout(() => {
      setOuterWidth(window.outerWidth);
    }, 100);
  };

  window.addEventListener("resize", reportWindowSize);

  return (
    <BehaviorsContext.Provider value={{ outerWidth }}>
      {children}
    </BehaviorsContext.Provider>
  );
};

export default BehaviorsContext;
