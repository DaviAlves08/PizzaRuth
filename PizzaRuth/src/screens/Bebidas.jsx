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
} from "@material-tailwind/react";
import NavBar from "../components/navbar"
import Footer from "../components/footer";

function Bebidas() {
  const [bebidas, setBebidas] = useState([]);
  const [open, setOpen] = useState(false);
  const [bebidaSelecionada, setbebidaSelecionada] = useState(null);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
  const [totalPedido, setTotalPedido] = useState(0);
  const [nome, setNome] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
  const [imagem, setImagem] = useState('')

  function data() {
    fetch('https://pizzaruth.onrender.com/bebidas')
      .then((response) => response.json())
      .then((json) => setBebidas(json));
  }

  const atualizarQuantidade = (value) => {
    setQuantidadeSelecionada(Number(value));
  };

  const abrirModal = (pizza) => {
    setbebidaSelecionada(pizza);
    setOpen(true);
  };

  useEffect(() => {
    data();
  }, []);

  useEffect(() => {
    if (bebidaSelecionada) {
      const novoTotal = quantidadeSelecionada * bebidaSelecionada.vl_bebida;
      setTotalPedido(novoTotal);
    }
  }, [quantidadeSelecionada, bebidaSelecionada]);

  const cadastroPedidoBebida = async (e) => {
    e.preventDefault();
    try {
      const post = {
        nome: bebidaSelecionada.nm_bebida,
        imagem: bebidaSelecionada.cd_img,
        tamanho: ' ',
        quantidade: quantidadeSelecionada,
        valor: totalPedido
      };
      await axios.post('https://pizzaruth.onrender.com/cadastrarPedido', post);
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
        <p className="text-3xl md:text-5xl mt-20 text-center text-black">Bebidas</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-20 px-4 gap-6 mt-20 justify-items-center">
          {bebidas.map((bebida) =>
            <div key={bebida.id} className="w-full max-w-xs">
              <Card className="w-full">
                <div className="flex flex-col">
                  <Typography className="text-xl self-center text-black font-normal text-center px-2">
                    {bebida.nm_bebida}
                  </Typography>
                  <img className="w-36 h-36 object-cover self-center mt-2"
                    src={bebida.cd_img}
                    alt="Imagem de uma bebida"
                  />
                  <CardBody>
                    <Typography className="text-lg flex flex-row justify-center font-bold text-xl">R$ {bebida.vl_bebida.toFixed(2)}</Typography>
                  </CardBody>
                </div>
                <CardFooter className="pt-0 self-center">
                  <Button onClick={() => abrirModal(bebida)}>Selecionar</Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
        <Dialog open={open} handler={() => setOpen(false)} size="md">
          <form onSubmit={(e) => cadastroPedidoBebida(e)}>
            <div className="flex flex-col md:flex-row mt-4 text-black">
              <div className="flex flex-col items-center">
                <img
                  className="h-64 w-64 md:h-96 md:w-80 object-cover object-center ml-2"
                  src={bebidaSelecionada ? bebidaSelecionada.cd_img : ""}
                  alt={bebidaSelecionada ? bebidaSelecionada.nm_bebida : ""}
                />
                <Typography className="text-center mt-5 text-xl font-semibold">
                  Descrição
                </Typography>
                <Typography
                  variant="paragraph"
                  className="text-center mt-5 text-lg"
                >
                  {bebidaSelecionada ? bebidaSelecionada.ds_bebida : ""}
                </Typography>
              </div>
              <div className="flex flex-col items-center mt-4 md:mt-0">
                <Typography className="text-center text-2xl md:text-3xl font-semibold mt-4 md:mt-10">
                  {bebidaSelecionada ? bebidaSelecionada.nm_bebida : ""}
                </Typography>
                <div className="flex flex-row justify-center mt-6 md:mt-10">
                  <Typography className="text-center me-4 text-xl md:text-2xl font-semibold">
                    Valor:
                  </Typography>
                  <Typography className="text-center text-xl md:text-2xl font-semibold">
                    {bebidaSelecionada ? `R$ ${bebidaSelecionada.vl_bebida}` : ""}
                  </Typography>
                </div>
                <Typography className="text-center mt-6 md:mt-8 text-xl md:text-2xl font-semibold">
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
                <div className="mt-6">
                  <Typography className="text-center mt-5 text-xl md:text-2xl font-bold">
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

export default Bebidas;
