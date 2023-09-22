import { useState } from "react";
import { PropTypes } from 'prop-types';

export default function ClientForm({getClientes}) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState();

  const saveCliente = async() => {
    const url = 'http://localhost:5000/clientes'
    await fetch(url,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome,
          sobrenome,
          telefone,
          cpf
        })
      });

    getClientes();
  }

  return (
    <form action="">
      <h3>Cadastrar</h3>

      <div className="form-row">
        <label htmlFor="nome">Nome</label>
        <input
        type="text"
        value={nome}
          onChange={(e) => setNome(e.target.value)}
          id="nome"/>

      </div>

      <div className="form-row">
        <label htmlFor="sobrenome">Sobrenome</label>
        <input
        type="text"
        value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          id="sobrenome"/>
          
      </div>

      <div className="form-row">
        <label htmlFor="telefone">Telefone</label>
        <input
        type="tel"
        value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          id="telefone"/>
          
      </div>

      <div className="form-row">
        <label htmlFor="cpf">CPF</label>
        <input
        type="number"
        min="10000000000"
        max="99999999999"
        value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          id="cpf"/>
          
      </div>

      <button
      onClick={() => saveCliente()}
      type="button"
      >Salvar</button>
    </form>
  )
}

ClientForm.propTypes = {
  getClientes: PropTypes.func.isRequired,
}