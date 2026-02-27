import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './screens/Index'
import Cadastro from './screens/Cadastro'
import PizzasSalgadas from './screens/PizzasSalgadas'
import PizzasDoces from './screens/PizzasDoces'
import Bebidas from './screens/Bebidas'
import CadastroPizzaSalgada from './screens/CadastroPizzaSalgada'
import CadastroPizzaDoce from './screens/CadastroPizzaDoce'
import CadastroBebidas from './screens/CadastroBebidas'
import Login from './screens/Login'
import MeusDados from './screens/MeusDados'
import Carrinho from './components/Carrinho'

function App() {
  return (
    <>
      <div className='w-screen h-screen bg-white'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Index />}></Route>
            <Route path='cadastro' element={<Cadastro />}></Route>
            <Route path='pizzassalgadas' element={<PizzasSalgadas />}></Route>
            <Route path='pizzasdoces' element={<PizzasDoces />}></Route>
            <Route path='bebidas' element={<Bebidas />}></Route>
            <Route path='cadastrosalgadas' element={<CadastroPizzaSalgada />}></Route>
            <Route path='cadastrodoces' element={<CadastroPizzaDoce />}></Route>
            <Route path='cadastrobebidas' element={<CadastroBebidas />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='meusdados' element={<MeusDados />}></Route>
            <Route path='carrinho' element={<Carrinho />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
