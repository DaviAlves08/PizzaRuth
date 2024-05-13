import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
  } from "@material-tailwind/react";
   
  function DropCadastro() {
    return (
      <Menu allowHover="true">    
        <MenuHandler>
          <p className="block text-black rounded hover:text-black text-lg font-semibold" >Cadastrar Pizzas</p>
        </MenuHandler>
        <MenuList>
        <a className="text-black" href="cadastrosalgadas"><MenuItem className="border-none bg-white">Salgadas</MenuItem></a>
        <a className="text-black" href="cadastrodoces"><MenuItem className="border-none bg-white">Doces</MenuItem></a>
        <a className="text-black" href="cadastrobebidas"><MenuItem className="border-none bg-white">Bebidas</MenuItem></a>
        </MenuList>
      </Menu>
    );
  }

  export default DropCadastro;