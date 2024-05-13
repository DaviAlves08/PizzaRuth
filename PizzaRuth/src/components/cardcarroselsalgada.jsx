import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import {
  Button,
  Dialog,
  DialogFooter,
  Typography,
  Radio,
} from "@material-tailwind/react";

function CardCarroselSalgada() {
  const [pizzasSalgadas, setPizzasSalgadas] = useState([]);
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


  useEffect(() => {
    fetch("http://localhost:3001/pizzas-salgadas")
      .then((response) => response.json())
      .then((json) => setPizzasSalgadas(json));
  }, []);

  const atualizarQuantidade = (value) => {
    setQuantidadeSelecionada(Number(value));
  };

  const abrirModal = (pizza) => {
    setpizzaSelecionada(pizza);
    setOpen(true);
  };

  useEffect(() => {
    if (pizzaSelecionada) {
      const novoTotal = quantidadeSelecionada * pizzaSelecionada.vl_pizza;
      setTotalPedido(novoTotal);
    }
  }, [quantidadeSelecionada, pizzaSelecionada]);

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
  useEffect(() => {
    atualizarTamanho(tamanhoSelecionado);
  }, [tamanhoSelecionado]);

  const cadastroPedidoPizzaSalgada = async (e) => {

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
    <div className="container">
      <h1 className="heading text-black mt-44 ml-10 text-4xl">Pizzas Salgadas</h1>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          loop={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 50,
            modifier: 2.5,
          }}

          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {pizzasSalgadas.map((pizza, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-slide tranding-slide">
                <div className="tranding-slide-img">
                  <img
                    style={{
                      width: 470,
                      height: 470,
                    }}
                    src={pizza.cd_img}
                    alt="Tranding"
                    loading="lazy"
                    onClick={() => abrirModal(pizza)}
                  />
                </div>
                <div className="tranding-slide-content">
                  <div className="tranding-slide-content-bottom">
                    <h2 className="food-name -mt-20">{pizza.nm_sabor}</h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="slider-controler">
            <div className="-mt-24">
              <div className="swiper-pagination"></div>
              <div id="arrow" className="swiper-button-prev slider-arrow">
                <ion-icon className="" name="arrow-back-outline"></ion-icon>
              </div>
              <div id="arrow" className="swiper-button-next slider-arrow">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>
            </div>

          </div>
        </Swiper>
      <Dialog open={open} handler={() => setOpen(false)} size="lg">
        <form onSubmit={(e) => cadastroPedidoPizzaSalgada(e)}>
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
                <Radio className="" name="type" label="Media"
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
    </div>
  );
}

export default CardCarroselSalgada;