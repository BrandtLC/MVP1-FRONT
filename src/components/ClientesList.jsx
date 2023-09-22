import { PropTypes } from 'prop-types';
import { useContext } from 'react';
import { Context } from '../App';

export default function ClientesList({getClientes}) {
const {selectedRow, setSelectedRow} = useContext(Context);

  return(
    <table>
      <thead>
        <tr>
        <th>Nome</th>
        <th>Telefone</th>
        <th>CPF</th>

        </tr>

      </thead>

      <tbody>
        {getClientes.map(c => (
          <tr key={c.id}
          onClick={() => setSelectedRow(c.id)}
          className={c.id == selectedRow ? 'selected' : null}
          >
            <td>{c.nome} {c.sobrenome}</td>
            <td>{c.telefone}</td>
            <td>{c.cpf}</td>

          </tr>
        ))}

      </tbody>
    </table>
  )
}

ClientesList.propTypes = {
  getClientes: PropTypes.func.isRequired
}