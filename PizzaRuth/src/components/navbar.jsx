import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faClipboard, faPizzaSlice } from '@fortawesome/free-solid-svg-icons'
import DropCardapio from "./dropCardapio"
import DropCadrastro from './dropCadastro'
import Carrinho from './Carrinho';

function NavBar() {
  const [Dados, setDados] = useState(null);
  const [openCarrinho, setOpenCarrinho] = useState(false);

  const AbrirCarrinho = () => {
    setOpenCarrinho(true);
  };

  const FecharCarrinho = () => {
    setOpenCarrinho(false);
  };

  useEffect(() => {
    
    const fetchDados = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          return;
        }
        const response = await axios.get(`http://localhost:3001/Dados?email=${userEmail}`);
        setDados(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados do usuário:', error);
      }
    };

    fetchDados();
  }, []);

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-withe-900">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <a href="/">
            <div className="flex items-center">
              <img src="./src/assets/images/logo.png" className="h-14 mr-4" alt="PizzaRuth Logo" />
              <p className="text-2xl font-semibold whitespace-nowrap dark:text-black">Pizza Ruth</p>
            </div>
          </a>

          <div className="flex justify-center flex-grow">
            <ul className="flex flex-row">
              <li className="px-4">
                <a href="/" className="block text-black rounded hover:text-black text-lg font-semibold">
                  <FontAwesomeIcon icon={faHouse} className='pr-2 pt-1 w-6' />Início
                </a>
              </li>
              <li className="px-4">
                <div className="flex flex-row">
                  <FontAwesomeIcon icon={faClipboard} className='pr-2  pt-0.5 w-4 text-black' />
                  <DropCardapio />
                </div>
              </li>
              <li className="px-4">
                {!Dados &&
                  <div className='flex flex-row'>
                    <FontAwesomeIcon icon={faPizzaSlice} className='pr-2 w-5 pt-0.5 text-black' />
                    <DropCadrastro />
                  </div>}
              </li>
            </ul>
          </div>
          <div>
            {Dados ? (
              <div>
                <a className="text-black hover:text-black text-lg" href='meusdados'>
                  <button className='hover:border-none border-none mr-4 bg-white font-semibold mr-20'>Meus Dados</button>
                </a>
                <Carrinho />
              </div>
            ) : (
              <div className="flex mr-12">
                <a className="text-black hover:text-black text-lg" href="cadastro">
                  <button className='hover:border-none border-none mr-24 bg-white font-semibold'>Cadastro</button>
                </a>
                <a className="text-black hover:text-black text-lg" href="login">
                  <button className='hover:border-none border-none bg-white font-semibold'>Login</button>
                </a>
              </div>
            )}
          </div>
        </div>
        <hr />
      </nav>
    </>
  );
}

export default NavBar;
