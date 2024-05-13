import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogFooter,
  Radio,
} from "@material-tailwind/react";
import NavBar from "../components/navbar"
import Footer from "../components/footer";

function PizzasDoces({ atualizarPedidos }) {
  const [pizzas_salgadas, setPizzas] = useState([]);
  const [open, setOpen] = useState(false);
  const [pizzaSelecionada, setpizzaSelecionada] = useState(null);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
  const [totalPedido, setTotalPedido] = useState(0);
  const [nome, setNome] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
  const [imagem, setImagem] = useState('');
  const [tamanhoSelecionado, settamanhoSelecionado] = useState('Média');

  const atualizarQuantidade = (value) => {
    setQuantidadeSelecionada(Number(value));
  };

  const abrirModal = (pizza) => {
    setpizzaSelecionada(pizza);
    setOpen(true);
  };

  const atualizarTamanho = (value) => {
    settamanhoSelecionado(value);
    let novoTotal = 0;
    if (pizzaSelecionada) {
      switch (value) {
        case 'Pequena':
          novoTotal = quantidadeSelecionada * pizzaSelecionada.vl_pizza - 10;
          break;
        case 'Média':
          novoTotal = quantidadeSelecionada * pizzaSelecionada.vl_pizza;
          break;
        case 'Grande':
          novoTotal = quantidadeSelecionada * pizzaSelecionada.vl_pizza + 15;
          break;
        default:
          novoTotal = quantidadeSelecionada * pizzaSelecionada.vl_pizza;
          break;
      }
    }
    setTotalPedido(novoTotal);
  };

  function data() {
    fetch('http://localhost:3001/pizzas-doces')
      .then((response) => response.json())
      .then((json) => setPizzas(json));
  }

  useEffect(() => {
    data();
  }, []);

  useEffect(() => {
    atualizarTamanho(tamanhoSelecionado);
  }, [tamanhoSelecionado]);

  useEffect(() => {
    if (pizzaSelecionada) {
      const novoTotal = quantidadeSelecionada * pizzaSelecionada.vl_pizza;
      setTotalPedido(novoTotal);
    }
  }, [quantidadeSelecionada, pizzaSelecionada]);


  const CadastrarPedido = async (e) => {
    e.preventDefault();
    try {
      const post = {
        nome: pizzaSelecionada.nm_sabor,
        imagem: pizzaSelecionada.cd_img,
        tamanho: tamanhoSelecionado,
        quantidade: quantidadeSelecionada,
        valor: totalPedido
      };
      console.log(post)
      await axios.post('http://localhost:3001/cadastrarPedido', post);
      atualizarPedidos();
      console.log(post);
      setNome('');
      setImagem('');
      setTamanho('');
      setQuantidade('');
      setValor('');
    } catch (error) {
      console.error("Erro ao enviar post:", error);
    }
  }
  return (
    <>
      <div className="w-screen h-full overflow-x-hidden"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#b7b3b3 #f1f1f1',
        }}>
        <NavBar />
        <p className="text-5xl mt-20 text-center text-black">Pizzas Doces</p>
        <div className="grid grid-cols-5 mb-20 ml-6 gap-14 mt-20">
          {pizzas_salgadas.map((pizza) =>
            <div key={pizza.id}>
              <Card className="w-64 h-96-pl-4 ">
                <div className="flex flex-col">
                  <Typography className="text-2xl self-center text-black font-normal">
                    {pizza.nm_sabor}
                  </Typography>
                  <img className="w-60 h-44 object-cover  self-center mt-2 rounded-lg"
                    src={pizza.cd_img}
                    alt="card-image"
                  />
                  <CardBody>
                    <Typography className="text-xl self-center text-black">
                      {pizza.ds_pizza}
                    </Typography>
                    <Typography className="text-lg flex flex-row justify-center mt-4 text-black font-bold text-xl">R$ {pizza.vl_pizza.toFixed(2)}</Typography>
                  </CardBody>
                </div>
                <CardFooter className="pt-0 self-center">
                  <Button onClick={() => abrirModal(pizza)}>Selecionar</Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
        <Dialog open={open} handler={() => setOpen(false)} size="lg">
          <form onSubmit={(e) => CadastrarPedido(e)}>
            <div className="flex flex-row mt-4 text-black">
              <div className="flex flex-col mr-20 items-center ml-4">
                <img
                  className="h-96 w-96 rounded-lg"
                  src={pizzaSelecionada ? pizzaSelecionada.cd_img : ""}
                  alt={pizzaSelecionada ? pizzaSelecionada.nm_sabor : ""}
                />
                <Typography className="text-center mt-5 text-xl font-semibold">
                  Ingredientes
                </Typography>
                <Typography
                  variant="paragraph"
                  className="text-center mt-5 text-lg ml-2"
                >
                  {pizzaSelecionada ? pizzaSelecionada.ds_pizza : ""}
                </Typography>
              </div>
              <div className="flex flex-col items-center">
                <Typography className="text-center text-4xl font-semibold">
                  Pizza de {pizzaSelecionada ? pizzaSelecionada.nm_sabor : ""}
                </Typography>
                <div className="flex flex-row justify-center mt-4">
                  <Typography className="text-center mt-6 me-4 text-3xl font-semibold">
                    Valor:
                  </Typography>
                  <Typography className="text-center mt-7 text-2xl font-semibold">
                    {pizzaSelecionada ? `R$ ${pizzaSelecionada.vl_pizza.toFixed(2)}` : ""}
                  </Typography>
                </div>
                <Typography className="text-center mt-10 text-2xl font-semibold">
                  Selecione o Tamanho
                </Typography>
                <div className="mt-4 text-2xl">
                  <Radio className="" name="type" label="Pequena"
                    checked={tamanhoSelecionado === 'Pequena'}
                    value={tamanho}
                    onChange={() => atualizarTamanho('Pequena')} />
                  <Radio className="text-xl !important" name="type" label="Media"
                    checked={tamanhoSelecionado === 'Média'}
                    value={tamanho}
                    onChange={() => atualizarTamanho('Média')} />
                  <Radio className="" name="type" label="Grande"
                    checked={tamanhoSelecionado === 'Grande'}
                    value={tamanho}
                    onChange={() => atualizarTamanho('Grande')} />
                </div>
                <Typography className="text-center mt-10 text-2xl font-semibold">
                  Selecione a Quantidade
                </Typography>
                <div className="mt-5">
                  <input
                    className="border border-gray-400 py-1 px-2 w-44 text-lg rounded-lg bg-white text-black"
                    placeholder="Número"
                    type="number"
                    name="numero"
                    id="numero"
                    min="1"
                    step="1"
                    onChange={(e) => {
                      const value = Math.max(1, e.target.value);
                      atualizarQuantidade(value);
                    }}
                    value={quantidadeSelecionada}
                  />
                </div>
                <div className="flex mt-6">
                  <Typography className="text-center mt-5 text-2xl font-bold">
                    Total: R$ {totalPedido.toFixed(2)}
                  </Typography>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={() => setOpen(false)}
                className="mr-1 bg-white"
              >
                <span>Cancelar</span>
              </Button>
              <Button
                variant="gradient"
                color="green"
                type="submit"
                onClick={() => setOpen(false)}
              >
                <span>Confirmar</span>
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
        <Footer />
      </div>
    </>
  )
}

export default PizzasDoces