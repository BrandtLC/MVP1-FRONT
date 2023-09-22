import { useContext, useEffect, useState } from "react";
import LivrosList from "./LivrosList";
import LivroForm from "./LIvroForm";
import { Context } from "../App";

export default function Livros() {
  const [livros, setLivros] = useState([]);
  const [livrosFiltrados, setLivrosFiltrados] = useState([]);
  const [selectedClient, setSelectedClient] = useState();
  const [disableLocar, setDisableLocar] = useState(true);
  const [filtro, setFiltro] = useState("todos");
  const [firstLoad, setFirstLoad] = useState(true);
  const [selectedLivro, setSelctedLivro]= useState();
  const { selectedRow, setSelectedRow, clientes, setClientes} = useContext(Context);

  useEffect(() => {
    const loadLivros = async () =>{
      const response = await getLivros();
      setLivrosFiltrados(response);

    }

    if(firstLoad) {
      loadLivros();
      setFirstLoad(false);
    }
  });

  useEffect(() => {
    if(selectedClient) {
      setDisableLocar(false);
    }
  }, [selectedClient]);

  useEffect(() => {
    switch (filtro) {
      case 'todos':
        setLivrosFiltrados(livros);
        break;

      case 'disponiveis':
        setLivrosFiltrados(livros.filter(c => !c.locador))
      break;

      case 'locados':
        setLivrosFiltrados(livros.filter(c => c.locador))
      break;
    
      default:
        break;
    }

  }, [filtro, livros]);

  useEffect(() => {
    setSelctedLivro(livros.find(c => c.id == selectedRow))
  }, [selectedRow, livros])
  

  const getLivros = async () => {
    const url = "http://localhost:5000/livros"

    const responseLivros =  await fetch(url,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
    setLivros(responseLivros)

    const urlClientes = "http://localhost:5000/clientes"

    const response =  await fetch(urlClientes,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      setClientes(response)

      return responseLivros;
  }

  const locarDevolver = async () => {
    let url;
    if(!selectedLivro.locador) {
      url = `http://localhost:5000/locar/${selectedRow}/${selectedClient}`;
    } else {
      url = `http://localhost:5000/retornar/${selectedRow}`;
    }

    await fetch(url, {method: 'PATCH'});
    // setSelectedRow(undefined)
    getLivros();
  }

  const deleteLivro = async () => {
    const url = `http://localhost:5000/livros/${selectedRow}`;

    await fetch(url, { method: 'DELETE'});

    getLivros();
  }

  return(
    <>
      <div className="title"><h1>Livros</h1></div>
       
      <section className="content">
      <LivroForm getLivros = {getLivros}/>

        <div>
          <div className="select-row">
           <label htmlFor="filtro">Filtro</label>
           <select
           name="filtro"
           id="filtro"
           value={filtro}
           onChange={(e) => {
            setFiltro(e.target.value);
            setSelectedRow(null);
           }}
           >
             <option value="todos">Todos</option>
             <option value="disponiveis">Disponíveis</option>
             <option value="locados">Locados</option>
           </select>

          </div>

          <LivrosList getLivros = {livrosFiltrados}/>
          {(selectedRow && selectedLivro) && (
            <>
            <button
            type="button"
            onClick={() => locarDevolver()}
            disabled={!selectedLivro.locador ? disableLocar : false}>
              {!selectedLivro.locador ? "Locar" : "Devolver"}
            </button>

            {!selectedLivro.locador && (
              <>
                <label htmlFor="cliente">Cliente</label>
                <select
                name="cliente"
                id="cliente"
                value={selectedClient}
                onChange={(e) =>setSelectedClient(e.target.value)}
                >
                  <option></option>
                  {clientes.map((c) => (
                  <option value={c.id} key={c.id}>{c.nome} {c.sobrenome}({c.cpf})</option>
              ))}
            
            </select>

              </>
            )}

            <button
            type="button"
            onClick={() => deleteLivro()}
            >
              Delete
            </button>
            </>
          )}


        </div>


      </section>

    </>
  )
}