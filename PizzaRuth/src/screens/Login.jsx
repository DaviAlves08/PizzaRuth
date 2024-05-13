import React, { useState } from 'react';
import axios from 'axios';
import { Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [estaLogado, setestaLogado] = useState(false);

  const Login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response.data);
      console.log(email)
      setestaLogado(true);
    } catch (error) {
      if (!error?.response) {
        setError('Erro ao acessar o servidor');
      } else if (error.response.status === 401) {
        setError('Usuário ou senha inválidos');
      }
    }
  };

  return (
    <>
      {!estaLogado ? (
        <div className="w-screen h-full  overflow-x-hidden"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#b7b3b3 #f1f1f1',
          }}>
          <nav className="bg-white border-gray-200 dark:bg-withe-900">
            <div className="max-w-screen-xl flex flex-wrap mx-auto p-4 mt-6 ">
              <div className="flex flex-row mt-3">
                <FontAwesomeIcon icon={faArrowLeft} className='text-red-500 pr-4 w-4 pt-0.5' />
                <Typography className='text-red-500 text-lg font-bold'><a className='hover:text-red-500 text-red-500' href="/">Voltar para home</a></Typography>
              </div>
              <div className="flex flex-row ml-96 pb-2">
                <img src="./src/assets/images/logo.png" className="h-12 mr-3" alt="PizzaRuth Logo" />
                <p className="text-2xl font-semibold whitespace-nowrap dark:text-black pt-2">Pizza Ruth</p>
              </div>
            </div>
            <hr />
          </nav>
          <div className="grid grid-cols-2  mb-10">
            <img
              src="./src/assets/images/backcadastro.png"
              alt="imagem de login do pizzaruth"
              className="w-8/12 ml-40 mt-12"
            />
            <div className="justify-center mt-40 text-black ml-0">
              <div className="w-full lg:w-1/2 ml-32 ">
                <p className="mb-10 text-3xl ml-14">Acessar minha conta</p>
                <form onSubmit={(e) => Login(e)}>
                  <div className="">
                    <input
                      className="border border-gray-400 py-1 px-2 w-full rounded-lg text-2xl bg-white"
                      placeholder='Email'
                      type="text"
                      name="email"
                      id="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mt-6">
                    <input
                      className="border border-gray-400 py-1 px-2 w-full rounded-lg text-2xl bg-white"
                      placeholder='Senha'
                      type="password"
                      name="senha"
                      id="senha"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <p className='ml-6 mt-4'>{error}</p>
                  <div className="mt-8">
                    <button className="w-full bg-red-500 py-3 text-center text-white text-xl" type='submit'>Acessar</button>
                  </div>
                </form>
                <div className="mt-5 text-lg text-center">
                  <span>
                    Não possui conta? <a className='text-red-500' href="cadastro">Clique aqui</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20"><Footer /></div>
        </div>
      ) : (
        localStorage.setItem('userEmail', email),
        window.location.href = '/'
      )}
    </>
  );
}

export default Login;