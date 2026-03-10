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
        'https://pizzaruth.onrender.com/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
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
        <div className="w-screen h-full overflow-x-hidden"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#b7b3b3 #f1f1f1' }}>
          <nav className="bg-white border-gray-200">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faArrowLeft} className='text-red-500 w-4' />
                <Typography className='text-red-500 text-base font-bold'>
                  <a className='hover:text-red-500 text-red-500' href="/">Voltar para home</a>
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <img src="/images/logo.png" className="h-10" alt="PizzaRuth Logo" />
                <p className="text-xl font-semibold text-black">Pizza Ruth</p>
              </div>
            </div>
          </nav>
          <div className="flex flex-col md:grid md:grid-cols-2 mb-10">
            <div className="flex justify-center md:block">
              <img
                src="/images/backcadastro.png"
                alt="imagem de login do pizzaruth"
                className="w-8/12 md:ml-40 mt-12"
              />
            </div>
            <div className="flex justify-center mt-10 md:mt-40 text-black px-6">
              <div className="w-full max-w-sm">
                <p className="mb-10 text-2xl md:text-3xl text-center">Acessar minha conta</p>
                <form onSubmit={(e) => Login(e)}>
                  <div>
                    <input
                      className="border border-gray-400 py-1 px-2 w-full rounded-lg text-xl md:text-2xl bg-white"
                      placeholder='Email' type="text" name="email" id="email" required
                      onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mt-6">
                    <input
                      className="border border-gray-400 py-1 px-2 w-full rounded-lg text-xl md:text-2xl bg-white"
                      placeholder='Senha' type="password" name="senha" id="senha" required
                      onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <p className='ml-2 mt-4'>{error}</p>
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
