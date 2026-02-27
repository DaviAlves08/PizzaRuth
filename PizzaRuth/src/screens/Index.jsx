import CardCarroselBebidas from "../components/cardcarroselbebidas"
import CardCarroselDoce from "../components/cardcarroseldoce"
import CardCarroselSalgada from "../components/cardcarroselsalgada"
import { CarouselHome } from "../components/carrouselhome"
import Footer from "../components/footer"
import NavBar from "../components/navbar"

function Index() {
  return (
    <>
      <div className="w-screen h-full overflow-x-hidden"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#b7b3b3 #f1f1f1' }}>
        <NavBar />
        <h1 className="text-center mt-10 md:mt-32 text-black text-3xl md:text-5xl px-4">Bem vindo ao Pizza Ruth</h1>
        <CarouselHome />
        <h1 className="text-center mt-10 mb-10 md:mb-20 text-black text-2xl md:text-4xl px-4">Confira Alguns Destaques Abaixo</h1>
        <CardCarroselSalgada />
        <CardCarroselDoce />
        <CardCarroselBebidas />
        <Footer />
      </div>
    </>
  )
}

export default Index
