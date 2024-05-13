import { Carousel } from "@material-tailwind/react";

export function CarouselHome() {
  return (

    <div className="flex items-center justify-center h-screen -mt-32 bg-white">
      <div className="w-2/4 h-2/4">
        <Carousel
          className="rounded-xl"
          autoplay={true}
          loop={true}
          autoplayDelay={3000}
          prevArrow={() => null}
          nextArrow={() => null}
          navigation={() => null}
        >
          <img
            src="./src/assets/images/pizzacarrosel.jpg"
            alt="imagem carrosel 1"
            className="h-full w-full object-cover"
          />
          <img
            src="./src/assets/images/pizzacarrosel2.png"
            alt="image carrosel 2"
            className="h-full w-full object-cover"
          />
          <img
            src="./src/assets/images/pizzacarrosel3.png"
            alt="image carrosel 3"
            className="h-full w-full object-cover"
          />
          <img
            src="./src/assets/images/pizzacarrosel4.png"
            alt="image carrosel 4"
            className="h-full w-full object-cover"
          />
        </Carousel>
      </div>
    </div>

  );
}
