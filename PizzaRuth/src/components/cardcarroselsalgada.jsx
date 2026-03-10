import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { Button, Dialog, DialogFooter, Typography, Radio } from "@material-tailwind/react";

function CardCarroselSalgada() {
  const [pizzasSalgadas, setPizzasSalgadas] = useState([]);
  const [open, setOpen] = useState(false);
  const [pizzaSelecionada, setpizzaSelecionada] = useState(null);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
  const [totalPedido, setTotalPedido] = useState(0);
  const [tamanho, setTamanho] = useState('');
  const [tamanhoSelecionado, settamanhoSelecionado] = useState('Media');

  useEffect(() => {
    fetch("https://pizzaruth.onrender.com/pizzas-salgadas")
      .then((r) => r.json())
      .then((json) => setPizzasSalgadas(json));
  }, []);

  const atualizarQuantidade = (value) => setQuantidadeSelecionada(Number(value));
  const abrirModal = (pizza) => { setpizzaSelecionada(pizza); setOpen(true); };

  useEffect(() => {
    if (pizzaSelecionada) setTotalPedido(quantidadeSelecionada * pizzaSelecionada.vl_pizza);
  }, [quantidadeSelecionada, pizzaSelecionada]);

  const atualizarTamanho = (value) => {
    settamanhoSelecionado(value);
    if (pizzaSelecionada) {
      let base = quantidadeSelecionada * pizzaSelecionada.vl_pizza;
      if (value === 'Pequena') base -= 10;
      if (value === 'Grande') base += 15;
      setTotalPedido(base);
    }
  };

  useEffect(() => { atualizarTamanho(tamanhoSelecionado); }, [tamanhoSelecionado]);

  const cadastroPedidoPizzaSalgada = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://pizzaruth.onrender.com/cadastrarPedido', {
        nome: pizzaSelecionada.nm_sabor,
        imagem: pizzaSelecionada.cd_img,
        tamanho: tamanhoSelecionado,
        quantidade: quantidadeSelecionada,
        valor: totalPedido
      });
    } catch (error) { console.error(error); }
  };

  return (
    <div className="w-full overflow-hidden px-2">
      <h1 className="text-black mt-10 ml-4 text-2xl md:text-4xl">Pizzas Salgadas</h1>
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
        pagination={{ el: ".swiper-pagination-salgada", clickable: true }}
        navigation={{ nextEl: ".swiper-next-salgada", prevEl: ".swiper-prev-salgada", clickable: true }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="w-full mt-4"
      >
        {pizzasSalgadas.map((pizza, index) => (
          <SwiperSlide key={index}>
            <div className="tranding-slide relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => abrirModal(pizza)}>
              <img className="w-full h-36 md:h-48 object-cover" src={pizza.cd_img} alt={pizza.nm_sabor} loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 py-2 px-3">
                <h2 className="text-white text-sm md:text-base font-semibold text-center">{pizza.nm_sabor}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="flex justify-center items-center gap-4 mt-4">
          <div className="swiper-prev-salgada swiper-button-prev slider-arrow"></div>
          <div className="swiper-pagination-salgada swiper-pagination"></div>
          <div className="swiper-next-salgada swiper-button-next slider-arrow"></div>
        </div>
      </Swiper>

      <Dialog open={open} handler={() => setOpen(false)} size="xs">
        <form onSubmit={cadastroPedidoPizzaSalgada}>
          <div className="flex flex-col text-black p-4">
            <img className="w-full h-52 object-cover rounded-lg"
              src={pizzaSelecionada ? pizzaSelecionada.cd_img : ""}
              alt={pizzaSelecionada ? pizzaSelecionada.nm_sabor : ""} />
            <Typography className="text-center mt-3 text-base font-semibold">Ingredientes</Typography>
            <Typography className="text-center text-sm mt-1">{pizzaSelecionada ? pizzaSelecionada.ds_pizza : ""}</Typography>
            <Typography className="text-center text-lg font-bold mt-3">
              Pizza de {pizzaSelecionada ? pizzaSelecionada.nm_sabor : ""}
            </Typography>
            <Typography className="text-center text-base font-semibold mt-2">
              Valor: {pizzaSelecionada ? "R$ " + pizzaSelecionada.vl_pizza.toFixed(2) : ""}
            </Typography>
            <Typography className="text-center mt-3 text-base font-semibold">Selecione o Tamanho</Typography>
            <div className="flex flex-col mt-1 ml-8">
              <Radio name="type-s" label="Pequena" checked={tamanhoSelecionado === 'Pequena'} value={tamanho} onChange={() => atualizarTamanho('Pequena')} />
              <Radio name="type-s" label="Media" checked={tamanhoSelecionado === 'Media'} value={tamanho} onChange={() => atualizarTamanho('Media')} />
              <Radio name="type-s" label="Grande" checked={tamanhoSelecionado === 'Grande'} value={tamanho} onChange={() => atualizarTamanho('Grande')} />
            </div>
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

export default CardCarroselSalgada;
