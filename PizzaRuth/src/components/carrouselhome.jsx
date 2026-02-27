import { Carousel } from "@material-tailwind/react";

export function CarouselHome() {
  return (
    <div className="flex items-center justify-center py-10 bg-white">
      <div className="w-full md:w-3/4 lg:w-2/4 h-64 md:h-96">
        <Carousel
          className="rounded-xl h-full"
          autoplay={true}
          loop={true}
          autoplayDelay={3000}
          prevArrow={() => null}
          nextArrow={() => null}
          navigation={() => null}
        >
          <img src="/images/pizzacarrosel.jpg" alt="imagem carrosel 1" className="h-full w-full object-cover" />
          <img src="/images/pizzacarrosel2.png" alt="image carrosel 2" className="h-full w-full object-cover" />
          <img src="/images/pizzacarrosel3.png" alt="image carrosel 3" className="h-full w-full object-cover" />
          <img src="/images/pizzacarrosel4.png" alt="image carrosel 4" className="h-full w-full object-cover" />
        </Carousel>
      </div>
    </div>
  );
}
