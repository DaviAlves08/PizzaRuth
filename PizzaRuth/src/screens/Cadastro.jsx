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

  const api = axios.create({ baseURL: "https://viacep.com.br/ws/" });

  async function buscarCep() {
    if (cep === "") { setCep(""); return; }
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
      const post = { nome, email, senha, cep, logradouro, bairro, cidade: localidade, estado: uf, numero, complemento: complementoFinal };
      await axios.post('https://pizzaruth.onrender.com/cadastrarUsuario', post);
      setNome(''); setEmail(''); setSenha(''); setCep(''); setLogradouro('');
      setBairro(''); setLocalidade(''); setUf(''); setNumero(''); setComplemento('');
    } catch (error) {
      console.error("Erro ao enviar post:", error);
    }
  }

  return (
    <div className="w-screen h-full overflow-x-hidden"
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#b7b3b3 #f1f1f1' }}>
      <NavBar />
      <div className="flex flex-col md:grid md:grid-cols-2">
        <div className="flex justify-center md:block">
          <img
            src="/images/backcadastro.png"
            alt="image 1"
            className="w-8/12 md:ml-44 mt-12"
          />
        </div>
        <div className="flex flex-col px-6 mt-10 mb-10 w-full max-w-md mx-auto md:mx-0">
          <p className="mb-8 text-3xl md:text-4xl text-center text-black">Criar minha conta</p>
          <form onSubmit={(e) => CadastroCliente(e)} className="flex flex-col gap-4 w-full">
            <input className="border border-gray-400 py-2 px-3 w-full rounded-lg text-lg bg-white text-black"
              placeholder="Nome" value={nome} type="text" name="nome" id="nome" onChange={(e) => setNome(e.target.value)} />
            <input className="border border-gray-400 py-2 px-3 w-full rounded-lg text-lg bg-white text-black"
              placeholder="Email" value={email} type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
            <input className="border border-gray-400 py-2 px-3 w-full rounded-lg text-lg bg-white text-black"
              placeholder="Senha" value={senha} type="password" name="senha" id="senha" onChange={(e) => setSenha(e.target.value)} />
            <div className="flex flex-row gap-3">
              <input className="border border-gray-400 py-2 px-3 w-full rounded-lg text-lg bg-white text-black"
                placeholder="Digite seu Cep" value={cep} onChange={(e) => setCep(e.target.value)} />
              <Button className="w-32 shrink-0 text-sm" color="red" onClick={buscarCep}>Buscar</Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input className="border border-gray-400 py-2 px-3 w-full rounded-lg text-lg bg-white text-black"
                value={logradouro} onChange={(e) => setLogradouro(e.target.value)} placeholder="Rua" name="logradouro" id="logradouro" />
              <input className="border border-gray-400 py-2 px-3 w-full rounded-lg text-lg bg-white text-black"
                value={bairro} onChange={(e) => setBairro(e.target.value)} placeholder="Bairro" name="bairro" id="bairro" />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input className="border border-gray-400 py-2 px-3 w-full rounded-lg text-lg bg-white text-black"
                value={localidade} onChange={(e) => setLocalidade(e.target.value)} placeholder="Cidade" name="cidade" id="cidade" />
              <input className="border border-gray-400 py-2 px-3 w-full rounded-lg text-lg bg-white text-black"
                value={uf} onChange={(e) => setUf(e.target.value)} placeholder="Estado" name="estado" id="estado" />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input className="border border-gray-400 py-2 px-3 w-full rounded-lg text-lg bg-white text-black"
                value={numero} placeholder="Número" type="text" name="numero" id="numero" onChange={(e) => setNumero(e.target.value)} />
              <input className="border border-gray-400 py-2 px-3 w-full rounded-lg text-lg bg-white text-black"
                placeholder="Complemento" value={complemento} type="text" name="complemento" id="complemento" onChange={(e) => setComplemento(e.target.value)} />
            </div>
            <button className="bg-red-500 py-3 w-full text-white text-xl rounded-lg mt-1" type="submit">Registrar</button>
          </form>
          <div className="mt-5 text-lg text-center">
            <span className="text-black">
              Já possui conta? <a className="text-red-500" href="login">Clique aqui</a>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-20"><Footer /></div>
    </div>
  );
}

export default Cadastro;
