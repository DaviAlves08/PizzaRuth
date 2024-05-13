import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import {
  Button,
  Dialog,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

function CardCarroselBebidas() {
  const [bebidas, setBebidas] = useState([]);
  const [open, setOpen] = useState(false);
  const [bebidaSelecionada, setbebidaSelecionada] = useState(null);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
  const [totalPedido, setTotalPedido] = useState(0);
  const [nome, setNome] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
  const [imagem, setImagem] = useState('');

  useEffect(() => {
    fetch("http://localhost:3001/bebidas")
      .then((response) => response.json())
      .then((json) => setBebidas(json));
  }, []);

  const atualizarQuantidade = (value) => {
    setQuantidadeSelecionada(Number(value));
  };

  const abrirModal = (pizza) => {
    setbebidaSelecionada(pizza);
    setOpen(true);
  };


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

      console.log(post)
      await axios.post('http://localhost:3001/cadastrarPedido', post);
      console.log(post);
      setNome('');
      setImagem('')
      setTamanho('');
      setQuantidade('');
      setValor('');

    } catch (error) {
      console.error("Erro ao enviar post:", error);
    }
  }

  return (
    <div className="container">
      <h1 className="heading text-black ml-10 text-4xl">Bebidas</h1>
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
        {bebidas.map((bebida, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-slide tranding-slide">
              <div className="tranding-slide-img">
                <img style={{
                  width: 400,
                  height: 400,
                }} src={bebida.cd_img} alt="Tranding" loading="lazy"
                  onClick={() => abrirModal(bebida)} />
                <div className="tranding-slide-content1">
                  <div className="tranding-slide-content-bottom1">
                    <h2 className="food-name text-black">{bebida.nm_bebida}</h2>
                  </div>
                </div>
              </div>
              <div className="tranding-slide-content"></div>
            </div>
          </SwiperSlide>
        ))}
        <div className="slider-controler">
          <div className="-mt-24">
            <div className="swiper-pagination"></div>
            <div id="arrow" className="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div id="arrow" className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
          </div>
        </div>
      </Swiper>
      <Dialog open={open} handler={() => setOpen(false)} size="md">
        <form onSubmit={(e) => cadastroPedidoBebida(e)}>
          <div className="flex flex-row mt-4 text-black">
            <div className="flex flex-col">
              <img
                className="h-96 w-80 object-cover object-center ml-2"
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
            <div className="flex flex-col items-center -ml-4">
              <Typography className="text-center text-3xl font-semibold mt-10">
                {bebidaSelecionada ? bebidaSelecionada.nm_bebida : ""}
              </Typography>
              <div className="flex flex-row justify-center mt-10">
                <Typography className="text-center me-4 text-2xl font-semibold">
                  Valor:
                </Typography>
                <Typography className="text-center text-2xl font-semibold">
                  {bebidaSelecionada ? `R$ ${bebidaSelecionada.vl_bebida.toFixed(2)}` : ""}
                </Typography>
              </div>
              <Typography className="text-center mt-8 text-2xl font-semibold">
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

export default CardCarroselBebidas;
