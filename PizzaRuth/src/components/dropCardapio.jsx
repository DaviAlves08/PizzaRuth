import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
  } from "@material-tailwind/react";
   
   function DropCardapio() {
    return (
      <Menu allowHover={true}>
      <MenuHandler>
        <p className="block text-black rounded text-lg font-semibold">Cardápio</p>
      </MenuHandler>
      <MenuList className="bg-white">
          <a className="text-black" href="pizzassalgadas">
              <MenuItem className="border-none bg-white">Pizzas Salgadas</MenuItem>
            </a>
        <a className="text-black" href="pizzasdoces">
          <MenuItem className="border-none bg-white">Pizzas Doces</MenuItem>
        </a>
        <a className="text-black " href="bebidas">
          <MenuItem className="border-none bg-white">Bebidas</MenuItem>
        </a>
      </MenuList>
    </Menu>
    );
  }

export default DropCardapio;