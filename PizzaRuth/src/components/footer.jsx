import { Typography } from "@material-tailwind/react";

const SITEMAP = [
  {
    title: "Quem somos",
    links: ["Nossa História", "Seja uma franqueado"],
  },
  {
    title: "Atendimento ao cliente",
    links: ["Fale conosco", "Pesquisa de satisfação"],
  },
  {
    title: "Termos",
    links: ["Política de Privacidade", "Adendo à Política de Privacidade", "Política de cookies e anúncios", "Termos de uso"],
  },
];
const RedesSociais = () => {
  const redesLinks = [
    {
      label: "Facebook",
      url: "https://www.facebook.com/suacontadefacebook",
      imgSrc: "/src/assets/images/facebook.png",
      alt: "facebook logo"
    },
    {
      label: "Instagram",
      url: "https://www.instagram.com",
      imgSrc: "/src/assets/images/instagram.png",
      alt: "instagram logo"
    },
    {
      label: "TikTok",
      url: "https://www.tiktok.comk",
      imgSrc: "/src/assets/images/tik-tok.png",
      alt: "tik-tok logo"
    },
    {
      label: "Twitter",
      url: "https://twitter.com",
      imgSrc: "/src/assets/images/twitter.png",
      alt: "twitter logo"
    },
    {
      label: "YouTube",
      url: "https://www.youtube.com",
      imgSrc: "/src/assets/images/youtube.png",
      alt: "youtube logo"
    }
  ];

  return (
    <div className="flex row">
      {redesLinks.map((link, key) => (
        <a key={key} href={link.url} target="_blank" rel="noopener noreferrer">
          <img
            className="h-7 w-7 object-cover object-center mr-6 transition-transform transform hover:scale-125"
            src={link.imgSrc}
            alt={link.alt}
          />
        </a>
      ))}
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#231F20] py-8">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {SITEMAP.map(({ title, links }, key) => (
            <div key={key} className="w-full">
              <Typography
                variant="h6"
                color="white"
                className="mb-4 font-bold uppercase text-white"
              >
                {title}
              </Typography>
              <ul className="space-y-1">
                {links.map((link, key) => (
                  <Typography key={key} as="li" color="white" className="font-normal">
                    <a
                      href="#"
                      className="inline-block py-1 pr-2 transition-transform hover:scale-105 text-white hover:text-white"
                    >
                      {link}
                    </a>
                  </Typography>
                ))}
              </ul>
            </div>
          ))}
          <div className="">
            <Typography variant="h6"
              color="white"
              className="mb-4 font-bold uppercase text-white">Conecte-se com a Pizza Ruth</Typography>
            <RedesSociais />
          </div>
        </div>
        <hr className="opacity-20" />
        <div className="flex flex-row">
          <img
            className="h-20 w-20 object-cover object-center mt-12 mr-4"
            src="/src/assets/images/pizzaruthlogofooter.png"
            alt="logo pizza ruth"
          />
          <Typography className="text-white mt-16 mb-16 text-base font-semibold">Copyright © @2020 PIMENTA VERDE ALIMENTOS LTDA. – CNPJ :09.060.964/0001-08 - AVENIDA DRA RUTH CARDOSO Nº: 4777 – JARDIM UNIVERSIDADE PINHEIROS – SÃO PAULO/SP. Todos os direitos reservados.</Typography>
        </div>
        <hr className="opacity-20" />
        <Typography className="text-white mt-16 text-sm">Os preços apresentados já incluem impostos. Imagens meramente ilustrativas. Promoções, combos e preços podem variar de acordo com a sua localização. Se ocorrer qualquer divergência nos valores dos produtos ou promoções, o preço válido é o apresentado no carrinho de compras. Preços e condições de pagamento exclusivos para compras via internet. As promoções são válidas enquanto durarem os estoques. A Pizza Hut se reserva o direito de alterar e/ou remover itens ou promoções do cardápio sem aviso prévio. O horário de funcionamento e de entrega varia de acordo com a sua localização e unidade escolhida. Digite o seu CEP para descobrir se fazemos entregas para a sua região.</Typography>
      </div>
    </footer>
  );
} 