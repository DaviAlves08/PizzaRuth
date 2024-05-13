-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 13-Maio-2024 às 05:05
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `pizzaruth`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `bebidas`
--

CREATE TABLE `bebidas` (
  `id` int(11) NOT NULL,
  `nm_bebida` varchar(60) NOT NULL,
  `cd_img` text NOT NULL,
  `ds_bebida` text NOT NULL,
  `vl_bebida` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `bebidas`
--

INSERT INTO `bebidas` (`id`, `nm_bebida`, `cd_img`, `ds_bebida`, `vl_bebida`) VALUES
(1, 'Coca-Cola 2L', 'src/assets/images/bebidas1.png', 'Coca-Cola 2L', 10.9),
(2, 'Fanta-Laranja 350ml', 'src/assets/images/bebidas2.png', 'Fanta-Laranja 300ml', 7.8),
(3, 'Fanta-Uva 350ml', 'src/assets/images/bebidas3.png', 'Fanta-Uva 350ml', 5.99),
(4, 'Coca-Cola Zero 350ml', 'src/assets/images/bebidas4.png', 'Coca-Cola Zero 350ml', 8.99),
(5, 'Coca-Cola 350ml', 'src/assets/images/bebidas5.png', 'Coca-Cola 350ml', 11.99),
(6, 'Fanta-Uva 2L', 'src/assets/images/bebidas6.png', 'Fanta-Uva 2L', 7.99),
(7, 'Kuat 2L', 'src/assets/images/bebidas7.png', 'Kuat 2L', 14.99),
(8, 'Pepsi 2L', 'src/assets/images/bebidas8.png', 'Pepsi 2L', 9.99),
(9, 'Fanta-Laranja 2L', 'src/assets/images/bebidas9.png', 'Fanta-Laranja 2L', 12.9);

-- --------------------------------------------------------

--
-- Estrutura da tabela `cadastro`
--

CREATE TABLE `cadastro` (
  `cliente` int(11) NOT NULL,
  `nome` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `senha` varchar(60) NOT NULL,
  `cep` int(8) NOT NULL,
  `logradouro` varchar(200) NOT NULL,
  `bairro` varchar(200) NOT NULL,
  `cidade` varchar(200) NOT NULL,
  `estado` char(2) NOT NULL,
  `numero` int(11) NOT NULL,
  `complemento` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedido`
--

CREATE TABLE `pedido` (
  `id` int(11) NOT NULL,
  `nm_pizza` varchar(60) NOT NULL,
  `cd_img` text NOT NULL,
  `ds_tamanho` varchar(30) NOT NULL,
  `ds_quantidade` int(11) NOT NULL,
  `vl_total_pedido` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pizzas_doces`
--

CREATE TABLE `pizzas_doces` (
  `id` int(11) NOT NULL,
  `nm_sabor` varchar(60) NOT NULL,
  `cd_img` text NOT NULL,
  `ds_pizza` varchar(200) NOT NULL,
  `vl_pizza` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `pizzas_doces`
--

INSERT INTO `pizzas_doces` (`id`, `nm_sabor`, `cd_img`, `ds_pizza`, `vl_pizza`) VALUES
(1, 'Nutella', 'src/assets/images/pizza-doce1.jpg', 'Nutella cremosa e doce de leite', 49.9),
(2, 'Beijinho', 'src/assets/images/pizza-doce2.jpeg', 'Beijinho e chantilly caramelizado', 54.9),
(3, 'Brigadeiro', 'src/assets/images/pizza-doce3.jpg', 'Chocolate com brigadeiro e canela', 39.9),
(4, 'Sorvete', 'src/assets/images/pizza-doce4.jpg', 'Sorvete de chocolate e chantilly.', 45.9),
(5, 'Doce de Leite', 'src/assets/images/pizza-doce5.jpg', 'Doce de leite, canela e granulado', 24.9),
(6, 'Brigaleite', 'src/assets/images/pizza-doce6.jpg', 'Chocolate com leite condensado e morango', 57.9),
(7, 'Brigajinho', 'src/assets/images/pizza-doce7.png', 'Brigadeiro, Beijinho e chantilly', 44.9);

-- --------------------------------------------------------

--
-- Estrutura da tabela `pizzas_salgadas`
--

CREATE TABLE `pizzas_salgadas` (
  `id` int(11) NOT NULL,
  `nm_sabor` varchar(60) NOT NULL,
  `cd_img` text NOT NULL,
  `ds_pizza` varchar(200) NOT NULL,
  `vl_pizza` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `pizzas_salgadas`
--

INSERT INTO `pizzas_salgadas` (`id`, `nm_sabor`, `cd_img`, `ds_pizza`, `vl_pizza`) VALUES
(1, 'Mussarela', 'src\\assets\\images\\pizza-salgada1.jpeg', 'Mussarela, tomate e azeitona', 49.9),
(3, 'Calabresa', 'src/assets/images/pizza-salgada2.jpeg', 'Calabresa, mussarela e azeitona', 54.9),
(4, 'MussaFrango', 'src/assets/images/pizza-salgada3.jpeg', 'Mussarela, Frango e azeitona preta', 34.9),
(5, 'Poderosa ll', 'src/assets/images/pizza-salgada4.jpeg', 'Mussarela, catupiry, parmesão e gorgonzola', 39.9),
(6, 'Carneijo', 'src/assets/images/pizza-salgada5.jpeg', 'Calabresa moída, mussarela e azeitona', 54.9),
(7, 'Queijotona', 'src/assets/images/pizza-salgada6.jpeg', 'Calabresa, mussarela e cebola', 39.9),
(8, 'Mexicana', 'src/assets/images/pizza-salgada7.jpeg', 'Catupiry, calabresa moída, bacon e pimenta', 49.9);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `bebidas`
--
ALTER TABLE `bebidas`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `cadastro`
--
ALTER TABLE `cadastro`
  ADD PRIMARY KEY (`cliente`);

--
-- Índices para tabela `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `pizzas_doces`
--
ALTER TABLE `pizzas_doces`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `pizzas_salgadas`
--
ALTER TABLE `pizzas_salgadas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `bebidas`
--
ALTER TABLE `bebidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de tabela `cadastro`
--
ALTER TABLE `cadastro`
  MODIFY `cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT de tabela `pizzas_doces`
--
ALTER TABLE `pizzas_doces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `pizzas_salgadas`
--
ALTER TABLE `pizzas_salgadas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
