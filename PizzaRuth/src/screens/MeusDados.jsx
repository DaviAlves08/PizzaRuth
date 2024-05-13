import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import NavBar from "../components/navbar";
import Footer from '../components/footer';

function MeusDados() {
  const [Dados, setDados] = useState(null);
  const [error, setError] = useState('');

  function removeLocalStorage() {
    localStorage.clear();
    window.location.href = '/'
  }
  useEffect(() => {
    const fetchDados = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          return;
        }
        const response = await axios.get(`http://localhost:3001/Dados?email=${userEmail}`);
        setDados(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados do usuário:', error);
        setError('Erro ao obter os dados do usuário');
      }
    };
    fetchDados();
  }, []);

  return (
    <>
      <div className="w-screen h-full overflow-x-hidden"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#b7b3b3 #f1f1f1',
        }}>
        <NavBar />
        <div className='bg-red-700 w-full h-48'>
          <div className='flex justify-center'>
            {Dados ? (
              <Card id="carddados" className="card mt-4 w-96">
                <CardBody className=''>
                  <Typography className="flex justify-center mb-2 text-4xl font-medium">
                    Meus Dados
                  </Typography>
                  <Typography className="mb-2 mt-6 text-2xl font-medium">
                    Dados Pessoais
                  </Typography>
                  <Typography className='flex flex-row text-lg font-medium'>
                    Nome: <Typography className='ml-2 text-lg font-light'>{Dados.nome}</Typography>
                  </Typography>
                  <Typography className="mb-2 mt-4 text-2xl font-medium">
                    Dados de Contato
                  </Typography>
                  <Typography className='flex flex-row mt-2 text-lg font-medium'>
                    Email: <Typography className='ml-2 text-lg'>{Dados.email}</Typography>
                  </Typography>
                  <Typography className="mb-1 mt-4 text-2xl font-medium">
                    Endereço
                  </Typography>
                  <Typography className='flex flex-row mt-2 text-lg font-medium'>
                    CEP: <Typography className='ml-2 ml-2 text-lg'>{Dados.cep}</Typography>
                  </Typography>
                  <Typography className='flex flex-row mt-2 text-lg font-medium'>
                    Rua: <Typography className='ml-2 ml-2 text-lg'>{Dados.logradouro}</Typography>
                  </Typography>
                  <Typography className='flex flex-row mt-2 text-lg font-medium'>
                    Bairro: <Typography className='ml-2 ml-2 text-lg'>{Dados.bairro}</Typography>
                  </Typography>
                  <Typography className='flex flex-row mt-2 text-lg font-medium'>
                    Complemento: <Typography className='ml-2 ml-2 text-lg'>{Dados.complemento}</Typography>
                  </Typography>
                  <Typography className='flex flex-row mt-2 text-lg font-medium'>
                    Cidade: <Typography className='ml-2 ml-2 text-lg'>{Dados.cidade}</Typography>
                  </Typography>
                  <Typography className='flex flex-row mt-2 text-lg font-medium'>
                    Estado: <Typography className='ml-2 ml-2 text-lg'> {Dados.estado}</Typography>
                  </Typography>

                  <Button className='mt-6 mb-4 flex justify-center bg-red-500' onClick={removeLocalStorage}> Logout </Button>
                </CardBody>
              </Card>
            ) : (
              <Typography variant="h3" color="blue-gray" className="flex justify-center mt-4">
                {error || 'Carregando Dados...'}
              </Typography>
            )}
          </div>
        </div>
        <div className="mt-96 mt-96 pt-36"><Footer /></div>
      </div>
    </>
  );
}

export default MeusDados;