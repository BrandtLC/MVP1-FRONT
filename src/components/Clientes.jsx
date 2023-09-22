import { useContext, useEffect} from "react";
import ClientesList from "./ClientesList";
import ClientForm from "./ClientForm";
import { Context } from "../App";

export default function Clientes() {
  const {clientes, setClientes, selectedRow} = useContext(Context);

  useEffect(() => {
    getClientes();
  }, []);

  const deleteUser = async() => {
    const url = `http://localhost:5000/clientes/${selectedRow}`;

    await fetch(url, { method: 'DELETE'});

    getClientes();
  }

  const getClientes = async () => {
    const url = "http://localhost:5000/clientes"

    const response =  await fetch(url,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      setClientes(response)
  }
  return(
    <>
    <div className="title"><h1>Clientes</h1></div>
      <section className="content">
        <ClientForm getClientes = {getClientes}/>


        <div>
          <ClientesList getClientes = {clientes}/>

          <div className="button-table">
            {selectedRow && (
              <button
              type="button"
              onClick={() => deleteUser()}
              >Delete</button>

            )}

          </div>
          
        </div>

      </section>
  

    </>
  )
}