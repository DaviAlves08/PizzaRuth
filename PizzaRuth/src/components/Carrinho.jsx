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
        fetch('https://pizzaruth.onrender.com/pedidos')
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
        try {
            await axios.delete(`https://pizzaruth.onrender.com/deletePedido/${pedidoId}`);
            setPedidos(pedidos.filter((pedido) => pedido.id !== pedidoId));
        } catch (error) {
            console.error("Erro ao excluir pedido:", error);
        }
    };

    const deletePedidoAll = async (e) => {
        try {
            await axios.delete(`https://pizzaruth.onrender.com/deletePedidoAll`);
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
                size='sm'
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
                <div className='flex flex-row items-center justify-between px-4 pt-4'>
                    <div className='flex flex-row items-center gap-3'>
                        <FontAwesomeIcon icon={faTimes} className='h-6 text-red-500 cursor-pointer mt-1' onClick={() => setOpen(false)} />
                        <DialogHeader className='p-0 -ml-2 md:ml-0 text-black text-base md:text-xl lg:-ml-2 xl:ml-2'>Seu Carrinho</DialogHeader>
                    </div>
                    <Typography
                        variant='h6'
                        className='text-red-500 underline underline-offset-4 cursor-pointer text-sm whitespace-nowrap '
                        onClick={() => deletePedidoAll()}>
                        Limpar Carrinho
                    </Typography>
                </div>

                <div className="max-h-full overflow-x-hidden" style={{ paddingBottom: '180px' }}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        {pedidos.length === 0 ? (
                            <div className='flex flex-col items-center mt-36'>
                                <img className='h-28 object-cover'
                                    src='/images/PizzaTriste.jpg'
                                    alt="card-image"
                                />
                                <Typography className="mt-4 font-bold text-black">
                                    Seu carrinho está vazio
                                </Typography>
                            </div>
                        ) : (
                            pedidos.map((pedido) => (
                                <div key={pedido.id}>
                                    <Card className="mt-4 mx-2 border-2">
                                        <CardBody>
                                            <div className="flex flex-row">
                                                <div className="shrink-0">
                                                    <img className='w-20 h-20 object-cover rounded'
                                                        src={pedido.cd_img}
                                                        alt="card-image"
                                                    />
                                                </div>
                                                <div className='pl-4 min-w-0'>
                                                    <Typography variant="h5" color="blue-gray" className="mb-2 truncate">
                                                        {pedido.nm_pizza}
                                                    </Typography>
                                                    {pedido.ds_tamanho !== ' ' && (
                                                        <div className="flex flex-wrap gap-1">
                                                            <Typography variant="h6" color="blue-gray">Tamanho:</Typography>
                                                            <Typography variant="h6" color="blue-gray">{pedido.ds_tamanho}</Typography>
                                                        </div>
                                                    )}
                                                    <div className="flex flex-wrap gap-1">
                                                        <Typography variant="h6" color="blue-gray">Quantidade:</Typography>
                                                        <Typography variant="h6" color="blue-gray">{pedido.ds_quantidade}</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                        <CardFooter className="-mt-6">
                                            <div className="flex flex-row items-center justify-between">
                                                <Typography variant='h5' color="blue-gray">
                                                    R$ {pedido.vl_total_pedido.toFixed(2)}
                                                </Typography>
                                                <Button variant="gradient" color='red' onClick={() => deletePedido(pedido.id)}>Excluir</Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            ))
                        )}
                        <div className="fixed bottom-0 left-0 bg-white w-full p-4 border-t border-gray-500">
                            <Typography variant="h5" className="mb-2 text-black">Total do Pedido: R$ {calcularTotalPedido()}</Typography>
                            <Button variant="gradient" color="green" className='w-full'>Pagamento</Button>
                        </div>
                    </form>
                </div>
            </Dialog>
        </>
    );
}

export default Carrinho;
