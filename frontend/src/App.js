import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const backendUrl = 'http://localhost/backend';
  const [product, setProduct] = useState({
    id: 0,
    name: '',
    price: '',
    code: '',
    image: `${backendUrl}/images/no-image.jpg`,
  });

  const [searchCode, setSearchCode] = useState('');

  const getProduct = async (code) => {
    try {
      if (!code.trim()) return;
      const response = await fetch(`${backendUrl}/getProductByCode.php?code=${code}`);
      const data = await response.json();

      if (data.length) {
        data[0].image = !data[0].image.length ? `${backendUrl}/images/no-image.jpg` : `${backendUrl}/images/${data[0].image}`;
        setProduct(data[0]);
      } else {
        alert('Producto no encontrado.');
      }
    } catch (err) {
      console.error('Error al buscar producto:', err.message);
    }
  };

  const searchProduct = async () => {
    try {
      const response = await fetch(`${backendUrl}/getProductByName.php?name=${product.name}`);
      const data = await response.json();

      if (data.length) {
        data[0].image = !data[0].image.length ? `${backendUrl}/images/no-image.jpg` : `${backendUrl}/images/${data[0].image}`;
        setProduct(data[0]);
      } else {
        // alert('Producto no encontrado.');
      }
    } catch (err) {
      console.error('Error al buscar producto:', err.message);
    }
  }

  const addEditProduct = async () => {
    try {
      const response = await axios.post(`${backendUrl}/addUpdateProduct.php`, product, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        alert('✔ Producto guardado correctamente.');
        clearProduct();
      } else {
        alert('✖ Error al guardar el producto.');
      }
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCodeChange = (e) => {
    let code = e.target.value;
    console.log("e.target.value: " + e.target.value.length)

    setProduct((prev) => ({ ...prev, code }));
    setSearchCode(code);
  };

  const handleCodeKeyDown = (e) => {
    e.preventDefault();
    setProduct((prev) => ({ ...prev, code: e.target.value }));
    setSearchCode(e.target.value);
  };

  const clearProduct = () => {
    setProduct({
      id: '',
      name: '',
      price: '',
      code: '',
      image: `${backendUrl}/images/no-image.jpg`,
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchCode) {
        getProduct(searchCode);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchCode]);

  return (
    <>
      <div className="flex">
        <div className="w-1/2">
          <img src={product.image} alt="Producto" className="w-full h-full" />
        </div>
        <div className="w-1/2">
          <form className="w-full mx-auto pt-2">
            <div className="m-5">
              <label htmlFor="code" className="block mb-3 text-4xl font-medium text-gray-900">
                Código de barras
              </label>
              <input
                name="code"
                type="text"
                placeholder=""
                value={product.code}
                onChange={handleCodeKeyDown}
                id="code"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-4xl focus:ring-blue-500 focus:border-blue-500"
                autoFocus
                required
              />
            </div>
            <div className="m-5">
              <label htmlFor="name" className="block mb-3 text-4xl font-medium text-gray-900">
                Nombre del producto
              </label>
              <input
                name="name"
                type="text"
                placeholder=""
                value={product.name}
                onChange={handleChange}
                id="name"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-4xl focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="m-5">
              <label htmlFor="price" className="block mb-3 text-4xl font-medium text-gray-900">
                Precio
              </label>
              <input
                name="price"
                type="text"
                placeholder=""
                value={product.price}
                onChange={handleChange}
                id="price"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-4xl focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="m-5">
              <button
                type="button"
                onClick={addEditProduct}
                className="w-full px-6 py-3.5 text-4xl font-medium text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-center"
              >
                Editar / Agregar
              </button>
            </div>
            <div className="m-5">
              <button
                type="button"
                onClick={searchProduct}
                className="w-full px-6 py-3.5 text-4xl font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
              >
                Buscar
              </button>
            </div>
            <div className="m-5">
              <button
                type="button"
                onClick={clearProduct}
                className="w-full px-6 py-3.5 text-4xl font-medium text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-center"
              >
                Limpiar
              </button>
            </div>
            <div className="m-5">
              <p className="text-center my-5">
                Paul Sistemas - Checador de Precios v1.0.1
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
