import React, { useState } from 'react'
import Header from "./components/Header"
import Nav from './components/Nav';
import "./styles/main.css"
import "./styles/table.css"
import Livros from './components/Livros';
import Clientes from "./components/Clientes";
import mainState from "./utils/MainStates";

export const Context = React.createContext();

function App() {
  const [mainSectionState, setMainSectionState] = useState(mainState.livros)
  const [selectedRow, setSelectedRow] = useState();
  const [clientes, setClientes] = useState([]);

const state = {
  mainSectionState,
  setMainSectionState,
  selectedRow,
  setSelectedRow,
  clientes,
  setClientes
};

  return (
    <Context.Provider value={
      state
      }>
    {Header()}

    <section className="Main">
      <Nav/>
      <section className='main-content'>
      {mainSectionState == mainState.livros && <Livros/>}
      {mainSectionState == mainState.clientes && <Clientes/>}

      </section>

    </section>
    </Context.Provider>
  )
}

export default App
