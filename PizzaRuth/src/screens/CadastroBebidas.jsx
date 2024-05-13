import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import axios from 'axios';
import {
  Button,
  Textarea,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  DialogHeader,
  DialogFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

function CadastroBebidas() {
  const [imagem, setImagem] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [nome, setNome] = useState('');
  const [bebidaSelecionada, setbebidaSelecionada] = useState(null);
  const [open, setOpen] = useState(false);
  const [bebidas, setBebidas] = useState([]);
  const [formKey, setFormKey] = useState(0);

  const AbrirModalEdiçao = (bebida) => {
    setbebidaSelecionada(bebida);
    setNome(bebida.nm_bebida);
    setDescricao(bebida.ds_bebida);
    setImagem(bebida.cd_img);
    setValor(bebida.vl_bebida);
    setOpen(true);
  };

  function data() {
    fetch("http://localhost:3001/bebidas")
      .then((response) => response.json())
      .then((json) => setBebidas(json));
  }
  useEffect(() => {
    data();
  }, []);

  const PostBebida = async (e) => {
    e.preventDefault();
    try {
      const post = {
        nome,
        imagem,
        descricao,
        valor,
      };
      await axios.post('http://localhost:3001/cadastrarBebidas', post);
      console.log(post);
      data();
      setNome('');
      setImagem('');
      setDescricao('');
      setValor('');
      setFormKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error("Erro ao enviar post:", error);
    }
  }

  const deleteBebida = async () => {
    console.log('Excluir bebida:', bebidaSelecionada.id);
    try {
      await axios.delete(`http://localhost:3001/deleteBebida/${bebidaSelecionada.id}`);
      setBebidas(bebidas.filter((bebida) => bebida.id !== bebidaSelecionada.id));
      setOpen(false);
    } catch (error) {
      console.error("Erro ao excluir bebida:", error);
    }
  };

  const atualizarBebida = async () => {
    console.log('Alterar bebida:', bebidaSelecionada.id);
    try {
      const post = {
        nome: nome,
        descricao: descricao,
        imagem: imagem,
        valor: valor
      };
      await axios.put(`http://localhost:3001/alterarBebida/${bebidaSelecionada.id}`, post);
      setOpen(false);
      data();
    } catch (error) {
      console.error("Erro ao alterar bebida:", error);
    }
  };

  return (
    <>
      <div className="w-screen h-full  overflow-x-hidden"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#b7b3b3 #f1f1f1',
        }}>
        <NavBar />
        <Typography variant="h2" className=" mt-12 flex justify-center text-black">
          Cadastro de Bebidas
        </Typography>
        <div className='flex justify-center'>
          <img
            src="./src/assets/images/cadastrobebidas.png"
            alt="image 1"
            className="w-96 h-96 "
          />
        </div>
        <form key={formKey} onSubmit={(e) => PostBebida(e)}>
          <div className="flex flex-row justify-center text-black">
            <div className="flex flex-col">
              <div className="flex row">
                <div className="flex flex-col mr-4">
                  <Typography variant="h4" className="text-center text-black">
                    Nome
                  </Typography>
                  <input className='border border-gray-950 rounded-xl w-52 pl-2 bg-white' type="text" name="nome" id="nome"
                    onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className="flex flex-col mr-4">
                  <Typography variant="h4" className="text-center text-black">
                    URL imagem
                  </Typography>
                  <input className='border border-gray-950 rounded-xl w-52 pl-2 bg-white' type="text" name="imagem" id="imagem"
                    onChange={(e) => setImagem(e.target.value)} />
                </div>
                <div className="flex flex-col">
                  <Typography variant="h4" className="text-center mr-5 text-black">
                    Valor
                  </Typography>
                  <input className='border border-gray-950 rounded-xl w-52 pl-2 bg-white' type="text" name="valor" id="valor"
                    onChange={(e) => setValor(e.target.value)} />
                </div>
              </div>
              <div className="flex flex-col">
                <Typography variant="h5" className="text-center mt-5 text-black">
                  Descrição
                </Typography>
                <Textarea className='border-black' placeholder="Escreva uma breve descrição da bebida" name='descricao' id='descricao'
                  onChange={(e) => setDescricao(e.target.value)} />
              </div>
            </div>
          </div>
          <div className='flex justify-center mt-4'>
            <Button
              variant="gradient"
              color="green"
              type="submit"
              className='w-44 mt-6'
            >
              <span className='text-lg'>Cadastrar</span>
            </Button>
          </div>
        </form>
        <Typography className="text-4xl mt-20 text-center font-semibold">Bebidas Cadastradas</Typography>
        <div className="flex flex-wrap mb-20 ml-6 gap-20 mt-20 justify-center">
          {bebidas.map((bebida) =>
            <div key={bebida.id}>
              <Card className="w-64 -pl-4 ">
                <div className="flex flex-col">
                  <Typography className="text-2xl self-center text-black font-normal">
                    {bebida.nm_bebida}
                  </Typography>
                  <img className="w-54 h-44 object-cover self-center mt-2"
                    src={bebida.cd_img}
                    alt="card-image"
                  />
                  <CardBody>
                    <Typography className="text-lg flex flex-row justify-center mt-4 font-bold text-xl">R$ {bebida.vl_bebida.toFixed(2)}</Typography>
                  </CardBody>
                </div>
                <CardFooter className="pt-0 self-center">
                  <Button className='bg-slate-800' onClick={() => AbrirModalEdiçao(bebida)}>Editar</Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
        <Dialog size='sm' open={open} handler={() => setOpen(false)}>
          <DialogHeader className='flex justify-center text-black'>Editar informações</DialogHeader>
          <form onSubmit={(e) => e.preventDefault()}>
            <Card className="mx-auto w-full">
              <CardBody className="flex flex-col gap-4">
                <Typography className="-mb-2" variant="h6">
                  Nome
                </Typography>
                <Input
                  variant="static"
                  value={nome}
                  className="text-black placeholder-gray-700"
                  onChange={(e) => setNome(e.target.value)}
                />
                <Typography className="-mb-2" variant="h6">
                  Descrição
                </Typography>
                <Input
                  variant="static"
                  value={descricao}
                  className="text-black placeholder-gray-700"
                  onChange={(e) => setDescricao(e.target.value)}
                />
                <Typography className="-mb-2" variant="h6">
                  Url Imagem
                </Typography>
                <Input
                  variant="static"
                  value={imagem}
                  className="text-black placeholder-gray-700"
                  onChange={(e) => setImagem(e.target.value)}
                />
                <Typography className="-mb-2" variant="h6">
                  Preço
                </Typography>
                <Input
                  variant="static"
                  value={valor}
                  className="text-black placeholder-gray-700"
                  onChange={(e) => setValor(e.target.value)}
                />
              </CardBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => setOpen(false)}
                  className="mr-32 bg-white"
                >
                  <span>Cancelar</span>
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  type="submit"
                  className=""
                  onClick={() => {
                    console.log(bebidaSelecionada.id);
                    atualizarBebida();
                  }}
                >
                  <span>Alterar</span>
                </Button>
                <Button
                  variant="gradient"
                  color="red"
                  type="submit"
                  className="ml-6 mr-4"
                  onClick={() => {
                    console.log(bebidaSelecionada.id);
                    deleteBebida();
                  }}
                >
                  <span>Excluir</span>
                </Button>
              </DialogFooter>
            </Card>
          </form>
        </Dialog>
      </div>
    </>
  );
}

export default CadastroBebidas;