import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { Button, Dialog, DialogFooter, Typography } from "@material-tailwind/react";

function CardCarroselBebidas() {
  const [bebidas, setBebidas] = useState([]);
  const [open, setOpen] = useState(false);
  const [bebidaSelecionada, setbebidaSelecionada] = useState(null);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
  const [totalPedido, setTotalPedido] = useState(0);

  useEffect(() => {
    fetch("https://pizzaruth.onrender.com/bebidas")
      .then((r) => r.json())
      .then((json) => setBebidas(json));
  }, []);

  const atualizarQuantidade = (value) => setQuantidadeSelecionada(Number(value));
  const abrirModal = (bebida) => { setbebidaSelecionada(bebida); setOpen(true); };

  useEffect(() => {
    if (bebidaSelecionada) setTotalPedido(quantidadeSelecionada * bebidaSelecionada.vl_bebida);
  }, [quantidadeSelecionada, bebidaSelecionada]);

  const cadastroPedidoBebida = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://pizzaruth.onrender.com/cadastrarPedido', {
        nome: bebidaSelecionada.nm_bebida,
        imagem: bebidaSelecionada.cd_img,
        tamanho: ' ',
        quantidade: quantidadeSelecionada,
        valor: totalPedido
      });
    } catch (error) { console.error(error); }
  };

  return (
    <div className="w-full overflow-hidden px-2">
      <h1 className="text-black mt-10 ml-4 text-2xl md:text-4xl">Bebidas</h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={1.3}
        breakpoints={{
          640: { slidesPerView: 2.3 },
          1024: { slidesPerView: 3 },
        }}
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 50, modifier: 2.5 }}
        pagination={{ el: ".swiper-pagination-bebida", clickable: true }}
        navigation={{ nextEl: ".swiper-next-bebida", prevEl: ".swiper-prev-bebida", clickable: true }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="w-full mt-4"
      >
        {bebidas.map((bebida, index) => (
          <SwiperSlide key={index}>
            <div className="tranding-slide relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => abrirModal(bebida)}>
              <img className="w-full h-36 md:h-48 object-cover" src={bebida.cd_img} alt={bebida.nm_bebida} loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 py-2 px-3">
                <h2 className="text-white text-sm md:text-base font-semibold text-center">{bebida.nm_bebida}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="flex justify-center items-center gap-4 mt-4">
          <div className="swiper-prev-bebida swiper-button-prev slider-arrow"></div>
          <div className="swiper-pagination-bebida swiper-pagination"></div>
          <div className="swiper-next-bebida swiper-button-next slider-arrow"></div>
        </div>
      </Swiper>

      <Dialog open={open} handler={() => setOpen(false)} size="xs">
        <form onSubmit={cadastroPedidoBebida}>
          <div className="flex flex-col text-black p-4">
            <img className="w-full h-52 object-cover rounded-lg"
              src={bebidaSelecionada ? bebidaSelecionada.cd_img : ""}
              alt={bebidaSelecionada ? bebidaSelecionada.nm_bebida : ""} />
            <Typography className="text-center mt-3 text-lg font-bold">
              {bebidaSelecionada ? bebidaSelecionada.nm_bebida : ""}
            </Typography>
            <Typography className="text-center text-base font-semibold mt-2">
              Valor: {bebidaSelecionada ? "R$ " + bebidaSelecionada.vl_bebida.toFixed(2) : ""}
            </Typography>
            <Typography className="text-center mt-3 text-base font-semibold">Descrição</Typography>
            <Typography className="text-center text-sm mt-1">{bebidaSelecionada ? bebidaSelecionada.ds_bebida : ""}</Typography>
            <Typography className="text-center mt-3 text-base font-semibold">Selecione a Quantidade</Typography>
            <input className="border border-gray-400 py-1 px-2 w-full text-lg rounded-lg bg-white text-black mt-2"
              type="number" min="1" step="1"
              onChange={(e) => atualizarQuantidade(Math.max(1, e.target.value))}
              value={quantidadeSelecionada} />
            <Typography className="text-center mt-3 text-lg font-bold">Total: R$ {totalPedido.toFixed(2)}</Typography>
          </div>
          <DialogFooter className="pt-0">
            <Button variant="text" color="red" onClick={() => setOpen(false)} className="bg-white">Cancelar</Button>
            <Button variant="gradient" color="green" type="submit" onClick={() => setOpen(false)}>Confirmar</Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}

export default CardCarroselBebidas;
