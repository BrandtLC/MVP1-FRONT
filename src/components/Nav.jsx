import "../styles/nav.css"
import mainState from "../utils/MainStates";
import { useContext } from "react";
import { Context } from "../App";

export default function Nav() {

  const {setMainSectionState, setSelectedRow} = useContext(Context)

  return(
    <nav className="nav-bar">
      <ul
      className="nav-links"
      >
        <li
        onClick={() => {
          setSelectedRow(null);
          setMainSectionState(mainState.livros)}}
          className="nav-button"
        >Livros</li>
        <li
        onClick={() => {
          setSelectedRow(null);
          setMainSectionState(mainState.clientes)}}
          className="nav-button"
        >Clientes</li>
      </ul>
      {/* <button
      onClick={() => {
        setSelectedRow(null);
        setMainSectionState(mainState.livros)}}
        className="nav-button"
      >Livros
      </button>
      <button
      onClick={() => {
        setSelectedRow(null);
        setMainSectionState(mainState.clientes)}}
        className="nav-button"
      >Clientes</button> */}
    </nav>
  )
}
