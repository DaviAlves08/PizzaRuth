import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@material-tailwind/react";
import NavBar from "../components/navbar"
import Footer from '../components/footer';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUf] = useState('');
  const [complemento, setComplemento] = useState('');
  const [numero, setNumero] = useState('');

  async function buscarCep() {
    if (cep === "") {
      console.log("Cep Inválido!");
      setCep("");
    }
    try {
      const response = await api.get(`/${cep}/json/`);
      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setLocalidade(response.data.localidade);
      setUf(response.data.uf);
    } catch (error) {
      console.log("ERRO" + error);
    }
  }
  const CadastroCliente = async (e) => {
    const complementoFinal = complemento.trim() === '' ? 'não possui' : complemento;
    e.preventDefault();
    try {
      const post = {
        nome,
        email,
        senha,
        cep,
        logradouro,
        bairro,
        cidade: localidade,
        estado: uf,
        numero,
        complemento: complementoFinal,
      };
      await axios.post('http://localhost:3001/cadastrarUsuario', post);
      setNome('');
      setEmail('');
      setSenha('');
      setCep('');
      setLogradouro('');
      setBairro('');
      setLocalidade('');
      setUf('');
      setNumero('');
      setComplemento('');
    } catch (error) {
      console.error("Erro ao enviar post:", error);
    }
  }

  const api = axios.create({
    baseURL: "https://viacep.com.br/ws/"
  })

  return (
    <>
      <div className="w-screen h-full  overflow-x-hidden"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#b7b3b3 #f1f1f1',
        }}>
        <NavBar />
        <div className="grid grid-cols-2">
          <img
            src="./src/assets/images/backcadastro.png"
            alt="image 1"
            className="w-8/12 ml-44 mt-12"
          />
          <div className="justify-center mt-10 ml-32 mb-10">
            <p className="mb-10 text-4xl ml-14 text-black">Criar minha conta</p>
            <form onSubmit={(e) => CadastroCliente(e)}>
              <div className="flex flex-row">
                <input className="border border-gray-400 py-1 px-2 w-96 rounded-lg text-lg bg-white text-black"
                  placeholder='Nome'
                  value={nome}
                  type="text" name="nome" id="nome" onChange={(e) => setNome(e.target.value)} />
              </div>
              <div className="mt-6">
                <input className="border border-gray-400 py-1 px-2 w-96 rounded-lg text-lg bg-white text-black"
                  placeholder='Email'
                  value={email}
                  type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-6">
                <input className="border border-gray-400 py-1 px-2 w-96 rounded-lg text-lg bg-white text-black"
                  placeholder='Senha'
                  value={senha} type="password" name="senha" id="senha" onChange={(e) => setSenha(e.target.value)} />
              </div>
              <div className="flex flex-row mt-5">
                <input className="border border-gray-400 py-1 px-2 w-44 text-lg rounded-lg bg-white text-black"
                  placeholder="Digite seu Cep"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
                <Button className="ml-4 w-48 text-sm" color="red" onClick={buscarCep}>
                  Buscar
                </Button>
              </div>
              <div className="flex flex-row mt-6">
                <input className="border border-gray-400 py-1 px-2 w-44 mr-4 text-lg rounded-lg bg-white text-black"
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)}
                  placeholder="Rua"
                  name='logradouro'
                  id='logradouro'
                />
                <input className="border border-gray-400 py-1 px-2 w-48 text-lg rounded-lg bg-white text-black"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Bairro"
                  name='bairro'
                  id='bairro'
                />
              </div>
              <div className="flex gap-4 mt-4">
                <input className="border border-gray-400 py-1 px-2 w-44 text-lg rounded-lg bg-white text-black"
                  value={localidade}
                  onChange={(e) => setLocalidade(e.target.value)}
                  placeholder="Cidade"
                  name='cidade'
                  id='cidade'
                />
                <input className="border border-gray-400 py-1 px-2 w-48 text-lg rounded-lg bg-white text-black"
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
                  placeholder="Estado"
                  name='estado'
                  id='estado' />
              </div>
              <div className="flex gap-4 mt-4">
                <input className="border border-gray-400 py-1 px-2 w-44 text-lg rounded-lg bg-white text-black"
                  value={numero}
                  placeholder='Número'
                  type="text" name="numero" id="numero" onChange={(e) => setNumero(e.target.value)} />
                <input className="border border-gray-400 py-1 px-2 w-48 text-lg rounded-lg bg-white text-black"
                  placeholder='Complemento'
                  value={complemento}
                  type="text" name="complemento" id="complemento" onChange={(e) => setComplemento(e.target.value)} />
              </div>
              <div className="mt-5">
                <button className=" bg-red-500 py-3 w-96 text-white w-30 text-xl"
                  type='submit'>Registrar</button>
              </div>
            </form>
            <div className="mt-5 text-lg ml-20">
              <span className='text-black'>
                Já possui conta? <a className='text-red-500' href="login">Clique aqui</a>
              </span>
            </div>
          </div >
        </div>
        <div className="mt-20"><Footer /></div>
      </div>
    </>
  );
}

export default Cadastro;