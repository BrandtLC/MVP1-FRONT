import { useState } from "react";
import { PropTypes } from 'prop-types';

export default function LivroForm({getLivros}) {
  const [titulo, setTitulo] = useState("");
  const [editora, setEditora] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState();

  const saveLivro = async() => {
    const url = 'http://localhost:5000/livros'
    await fetch(url,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titulo,
          editora,
          autor,
          ano
        })
      });

    getLivros();
  }

  return(
    <form action="">
      <h3>Cadastrar</h3>
 
      <div className="form-row">
        <label htmlFor="titulo">Titulo</label>
        <input
        type="text"
        value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          id="titulo"/>

      </div>

      <div className="form-row">
        <label htmlFor="editora">Editora</label>
        <input
        type="text"
        value={editora}
          onChange={(e) => setEditora(e.target.value)}
          id="editora"/>
          
      </div>

      <div className="form-row">
        <label htmlFor="autor">Autor</label>
        <input
        type="text"
        value={autor}
          onChange={(e) => setAutor(e.target.value)}
          id="autor"/>
          
      </div>

      <div className="form-row">
        <label htmlFor="ano">Lançamento</label>
        <input
        type="number"
        min="1000"
        max={new Date().getFullYear()}
        value={ano}
          onChange={(e) => setAno(e.target.value)}
          id="ano"/>
          
      </div>

      <button
      onClick={() => saveLivro()}
      type="button"
      >Salvar</button>
    </form>
  )

}

LivroForm.propTypes = {
  getLivros: PropTypes.func.isRequired,
}