import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const backendUrl = 'http://localhost/price-checker/backend/'
  const [product, setProduct] = useState({
    id: 0,
    name: '',
    price: '',
    code: '',
    image: `${backendUrl}/images/no-image.jpg`
  });

  const getProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/getProduct.php?code=${product.code}&name=${product.name}`);
      const data = await response.json();

      if (data.length) {
        data[0].image = `${backendUrl}/images/${data[0].image}`
        setProduct(data[0])
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const editProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/updateProduct.php`, product, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data) {
        console.log(`✔ Producto actualizado: ${response}`);
      } else {
        console.log(`✖ Error: ${response}`);
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  const clearProduct = () => {
    setProduct({
      id: '',
      name: '',
      price: '',
      code: '',
      image: `${backendUrl}/images/no-image.jpg`
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="flex">
      <div className="w-1/2">
        <img src={product.image} className="w-full h-full" />
      </div>
      <div className="w-1/2">
        <form className="w-full mx-auto pt-2">
          <div className="m-5">
            <label htmlFor="large-input" className="block mb-3 text-4xl font-medium text-gray-900">Código de barras</label>
            <input name='code' type="text" placeholder="" value={product.code} onChange={handleChange} id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-4xl focus:ring-blue-500 focus:border-blue-500" autoFocus required />
          </div>
          <div className="m-5">
            <label htmlFor="large-input" className="block mb-3 text-4xl font-medium text-gray-900">Nombre del producto</label>
            <input name='name' type="text" placeholder="" value={product.name} onChange={handleChange} id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-4xl focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div className="m-5">
            <label htmlFor="large-input" className="block mb-3 text-4xl font-medium text-gray-900">Precio</label>
            <input name='price' type="text" placeholder="" value={product.price} onChange={handleChange} id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-4xl focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div className="m-5">
            <button type="button" onClick={getProduct} className="w-full px-6 py-3.5 text-4xl font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">
              Buscar
            </button>
          </div>
          <div className="m-5">
            <button type="button" onClick={editProduct} className="w-full px-6 py-3.5 text-4xl font-medium text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-center">
              Editar
            </button>
          </div>
          <div className="m-5">
            <button type="button" onClick={clearProduct} className="w-full px-6 py-3.5 text-4xl font-medium text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-center">
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
