import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogHeader,
    Card,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import "../css/style.css";

function Carrinho() {
    const [open, setOpen] = useState(false);
    const [pedidos, setPedidos] = useState([]);
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

    function data() {
        fetch('http://localhost:3001/pedidos')
            .then((response) => response.json())
            .then((json) => setPedidos(json))
            .catch((error) => console.error('Erro ao buscar pedidos:', error));
    }

    const abrirModal = (pedido) => {
        setPedidoSelecionado(pedido);
        setOpen(true);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            data();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const deletePedido = async (pedidoId) => {
        console.log('Excluir pedido:', pedidoId);
        try {
            await axios.delete(`http://localhost:3001/deletePedido/${pedidoId}`);
            setPedidos(pedidos.filter((pedido) => pedido.id !== pedidoId));
        } catch (error) {
            console.error("Erro ao excluir pedido:", error);
        }
    };

    const deletePedidoAll = async (e) => {
        console.log('Excluir pedido:');
        try {
            await axios.delete(`http://localhost:3001/deletePedidoAll`);
            setOpen(false);
        } catch (error) {
            console.error("Erro ao excluir pedido:", error);
        }
    };

    const calcularTotalPedido = () => {
        let total = 0;
        pedidos.forEach((pedido) => {
            total += pedido.vl_total_pedido;
        });
        return total.toFixed(2);
    };

    return (
        <>
            <button onClick={() => abrirModal(pedidos)} className='hover:border-none border-none mr-4 text-black hover:text-black text-lg bg-white font-semibold'>
                Carrinho
            </button>

            <Dialog id='dialg'
                open={open}
                onClose={() => setOpen(false)}
                handler={() => setOpen(false)}
                size='xs'
                animate={{
                    mount: { scale: 1, y: -10 },
                    unmount: { scale: 5, y: 0 },
                }}
                style={{
                    right: '0',
                    top: '0',
                    position: 'fixed',
                    height: '100vh',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#b7b3b3 #f1f1f1',
                }}
            >
                <div className='flex flex-row ml-4' >
                    <FontAwesomeIcon icon={faTimes} className='pt-6 h-8 text-red-500 ' onClick={() => setOpen(false)} />
                    <DialogHeader className='mt-1.5 text-black'>Seu Carrinho</DialogHeader>
                    <Typography
                        variant='h6'
                        className='mt-6 ml-14 text-red-500 underline underline-offset-4 cursor-pointer'
                        onClick={() => deletePedidoAll()}>
                        Limpar Carrinho
                    </Typography>
                </div>
                <div className="max-h-full overflow-x-hidden" style={{ paddingBottom: '180px' }}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        {pedidos.length === 0 ? (
                            <div className='flex flex-col items-center mt-36'>
                                <img className='h-28 object-cover'
                                    src='./src/assets/images/PizzaTriste.jpg'
                                    alt="card-image"
                                />
                                <Typography className="mt-4 font-bold text-black">
                                    Seu carrinho está vazio
                                </Typography>
                            </div>
                        ) : (
                            pedidos.map((pedido) => (
                                <div key={pedido.id}>
                                    <Card className="mt-4 w-96 ml-2 mr-0 h-52 border-2">
                                        <CardBody>
                                            <div className="flex flex-row ">
                                                <div className="-ml-2">
                                                    <img className='w-24 h-24 object-cover'
                                                        src={pedido.cd_img}
                                                        alt="card-image"
                                                    />
                                                </div>
                                                <div className='pl-6'>
                                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                                        {pedido.nm_pizza}
                                                    </Typography>
                                                    {pedido.ds_tamanho !== ' ' && (
                                                        <div className="flex">
                                                            <Typography variant="h6" color="blue-gray" className="mr-2">
                                                                Tamanho:
                                                            </Typography>
                                                            <Typography variant="h6" color="blue-gray" className="">
                                                                {pedido.ds_tamanho}
                                                            </Typography>
                                                        </div>
                                                    )}
                                                    <div className="flex">
                                                        <Typography variant="h6" color="blue-gray" className="mr-2">
                                                            Quantidade:
                                                        </Typography>
                                                        <Typography variant="h6" color="blue-gray" className="">
                                                            {pedido.ds_quantidade}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                        <CardFooter className="-mt-6">
                                            <div className="flex flex-row">
                                                <Typography variant='h5' color="blue-gray" className="mr-36 mt-2">
                                                    R$ {pedido.vl_total_pedido.toFixed(2)}
                                                </Typography>
                                                <Button variant="gradient" color='red' onClick={() => deletePedido(pedido.id)} className='w-18'>Excluir</Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            ))
                        )}
                        <div className="fixed bottom-0 left-0 bg-white w-full p-4 border-t border-gray-500 ">
                            <div className='align center'>
                                <Typography variant="h5" className="mb-2 ml-16 text-black">Total do Pedido: R$ {calcularTotalPedido()}</Typography>
                                <Button variant="gradient" color="green" className='ml-32'>Pagamento</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Dialog>
        </>
    );
}

export default Carrinho;