// import React, { useState } from "react";
// import mainState from "./utils/MainStates";

// export const Context2 = React.createContext();

// export default function MainProvider({ children }) {
//   const [mainSectionState, setMainSectionState] = useState(mainState.livros); 
//   const [selectedRow, setSelectedRow] = useState(1  );

//   const state = {
//     mainSectionState,
//     setMainSectionState,
//     selectedRow,
//     setSelectedRow
//   };
//   return(
//     <Context.Provider
//     value={state}
//     >
//       {children}
//     </Context.Provider>
//   )
// }