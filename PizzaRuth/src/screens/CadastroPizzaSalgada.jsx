import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Textarea,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  DialogHeader,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import NavBar from '../components/navbar';
import axios from 'axios';

function CadastroPizzaSalgada() {
  const [sabor, setSabor] = useState('');
  const [imagem, setImagem] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [pizzas_salgadas, setPizzas] = useState([]);
  const [formKey, setFormKey] = useState(0);
  const [pizzaSelecionada, setpizzaSelecionada] = useState(null);
  const [open, setOpen] = useState(false);

  const abrirModal = (pizza) => {
    setpizzaSelecionada(pizza);
    setSabor(pizza.nm_sabor);
    setDescricao(pizza.ds_pizza);
    setImagem(pizza.cd_img);
    setValor(pizza.vl_pizza);
    setOpen(true);
  };

  function data() {
    fetch("http://localhost:3001/pizzas-salgadas")
      .then((response) => response.json())
      .then((json) => setPizzas(json));
  }

  useEffect(() => {
    data();
  }, []);

  const cadastrarPizza = async (e) => {
    e.preventDefault();
    try {
      const post = {
        sabor,
        imagem,
        descricao,
        valor,
      };
      console.log(post)
      await axios.post('http://localhost:3001/cadastrarPizzaSalgada', post);
      data();
      setSabor('');
      setImagem('');
      setDescricao('');
      setValor('');
      setFormKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error("Erro ao enviar post:", error);
    }
  }

  const deletePizza = async () => {
    console.log('Excluir bebida:', pizzaSelecionada.id);
    try {
      await axios.delete(`http://localhost:3001/deletePizzaSalgada/${pizzaSelecionada.id}`);
      setPizzas(pizzas_salgadas.filter((pizza) => pizza.id !== pizzaSelecionada.id));
      setOpen(false);
    } catch (error) {
      console.error("Erro ao excluir bebida:", error);
    }
  };

  const atualizarPizza = async () => {
    console.log('Alterar bebida:', pizzaSelecionada.id);
    try {
      const post = {
        sabor: sabor,
        descricao: descricao,
        imagem: imagem,
        valor: valor
      };
      await axios.put(`http://localhost:3001/alterarPizzaSalgada/${pizzaSelecionada.id}`, post);
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
          Cadastro de Pizzas Salgadas
        </Typography>
        <div className='flex justify-center'>
          <img
            src="./src/assets/images/cadastropizza.jpg"
            alt="image 1"
            className="h-80 w-80 mt-6 mb-6"
          />
        </div>
        <form key={formKey} onSubmit={(e) => cadastrarPizza(e)}>
          <div className="flex flex-row justify-center">
            <div className="flex flex-col">
              <div className="flex row text-black">
                <div className="flex flex-col mr-4">
                  <Typography variant="h4" className="text-center text-black">
                    Sabor
                  </Typography>
                  <input className='border border-gray-950 rounded-xl w-52 pl-2 bg-white ' type="text" name="sabor" id="sabor"
                    onChange={(e) => setSabor(e.target.value)} />
                </div>
                <div className="flex flex-col mr-4">
                  <Typography variant="h4" className="text-center text-black">
                    URL Imagem
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
              <div className="flex flex-col text-black">
                <Typography variant="h5" className="text-center mt-5 text-black">
                  Ingredientes
                </Typography>
                <Textarea className='border-black ' placeholder="Escreva os ingredientes que compõem a pizza" name='descricao' id='descricao'
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
        <Typography className="text-4xl mt-20 text-center text-black font-semibold">Pizzas Salgadas Cadastradas</Typography>
        <div className="flex flex-wrap mb-20 ml-6 gap-20 mt-20 justify-center">
          {pizzas_salgadas.map((pizza) =>
            <div key={pizza.id}>
              <Card className="w-64 -pl-4 ">
                <div className="flex flex-col">
                  <Typography className="text-2xl self-center text-black font-normal">
                    {pizza.nm_sabor}
                  </Typography>
                  <img className="w-60 h-44 object-cover self-center mt-2 rounded-lg"
                    src={pizza.cd_img}
                    alt="card-image"
                  />
                  <CardBody>
                    <Typography className="text-xl self-center text-black">
                      {pizza.ds_pizza}
                    </Typography>
                    <Typography className="text-lg flex flex-row justify-center mt-4 font-bold text-xl">R$ {pizza.vl_pizza.toFixed(2)}</Typography>
                  </CardBody>
                </div>
                <CardFooter className="pt-0 self-center">
                  <Button className='bg-slate-800' onClick={() => abrirModal(pizza)}>Editar</Button>
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
                  Sabor
                </Typography>
                <Input
                  variant="static"
                  value={sabor}
                  className="text-black placeholder-gray-700"
                  onChange={(e) => setSabor(e.target.value)}
                />
                <Typography className="-mb-2" variant="h6">
                  Ingredientes
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
                    console.log(pizzaSelecionada.id);
                    atualizarPizza();
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
                    console.log(pizzaSelecionada.id);
                    deletePizza();
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

export default CadastroPizzaSalgada;