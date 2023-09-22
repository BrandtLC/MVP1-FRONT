import { PropTypes } from 'prop-types';
import { Context } from '../App';
import { useContext } from 'react';
import '../styles/livrosList.css'

export default function LivrosList({getLivros}) {
  const {selectedRow, setSelectedRow} = useContext(Context);

  return(
    <table>
      <thead>
        <tr>
        <th>Título</th>
        <th>Editora</th>
        <th>Autor</th>
        <th>Lançamento</th>
        <th>Locador</th>
        <th>Locado em</th>

        </tr>

      </thead>

      <tbody>
        {getLivros.map(c => (
          <tr key={c.id}
          onClick={() => setSelectedRow(c.id)}
          className={c.id == selectedRow ? 'selected' : null}
          >
            <td>{c.título}</td>
            <td>{c.editora}</td>
            <td>{c.autor}</td>
            <td>{c.ano}</td>
            <td>{c.locador}</td>
            <td>{c.locado_em}</td>

          </tr>
        ))}

      </tbody>
    </table>
  )
}

LivrosList.propTypes = {
  getLivros: PropTypes.array.isRequired,
}