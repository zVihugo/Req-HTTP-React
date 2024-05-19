import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch'
import './App.css'

function App() {
   // Estado para armazenar os produtos
  const [products, setProducts] = useState([])
  const [name, setName]  = useState('')
  const [price, setPrice] = useState('')
  const [id, setId] = useState('')
    
  // URL da API
  const url = 'http://localhost:3000/products'  

  //Custom HOOK
  const { data: items, httpConfig, loading, error } = useFetch(url);
  

  // Função para buscar os produtos
  // useEffect(() => {
  // const fetchData = async () => {
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   setProducts(data);
  // };
  //   fetchData();
  // }, []);
   
 //Adicionando um novo produto

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price
    }


    // const res = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': "application/json"
    //   },
    //   body: JSON.stringify(product)
    // })
   
    // //Carregamento Dinâmico
    // const addedProduct = await res.json();

    // setProducts((prevProducts) => [...prevProducts, addedProduct])

    httpConfig(product, 'POST')

    setName('')
    setPrice('')
  }

  const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir o item');
    }

  } catch (error) {
    console.error(error);
  }
};
  
  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <ul>
        {items && items.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={() => handleDelete(product.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Price:
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          {loading && <input type="submit" disabled value="aguarde"/>}
          {!loading && <input type="submit" value="criar"/>}
          {!loading && <button onClick={handleDelete}>Deletar</button>}
        </form>
        
      </div>
    </div>
  )
}

export default App
