const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "pizzaruth",
});

app.use(cors());
app.use(express.json());

app.get('/pizzas-salgadas', (req, res) => {
  const SQL = "SELECT * FROM pizzas_salgadas";
  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get('/pizzas-doces', (req, res) => {
  const SQL = "SELECT * FROM pizzas_doces";
  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get("/bebidas", (req, res) => {
  let SQL = "SELECT * from  bebidas";
  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get("/pedidos", (req, res) => {
  let SQL = "SELECT * from  pedido";
  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get('/Dados', (req, res) => {
  const { email } = req.query;
  console.log("Email recebido na rota /userData:", email);
  const SQL = "SELECT * FROM cadastro WHERE email = ?";
  const values = [email];
  db.query(SQL, values, (err, results) => {
    if (err) {
      console.error("Erro ao consultar o banco de dados:", err);
      return res.status(500).json({ message: 'Erro ao tentar obter os dados do usuário' });
    }
    console.log("Resultados da consulta SQL:", results);
    if (results.length > 0) {
      const user = results[0];
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
  });
});

app.post('/cadastrarUsuario', (req, res) => {
  const data = req.body;
  if (data && data.nome && data.email && data.senha && data.cep && data.logradouro && data.bairro && data.cidade && data.estado && data.numero && data.complemento) {
    const sql = "INSERT INTO cadastro (nome, email, senha, cep, logradouro, bairro, cidade, estado, numero, complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [data.nome, data.email, data.senha, data.cep, data.logradouro, data.bairro, data.cidade, data.estado, data.numero, data.complemento];
    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Erro ao cadastrar o usuário:", error);
        res.status(500).json({ status: 'error', message: 'Erro ao cadastrar o usuário.' });
      } else {
        console.log("Usuário cadastrado com sucesso!");
        res.json({ status: 'success', message: 'Usuário cadastrado com sucesso.' });
      }
    });
  } else {
    res.status(400).json({ status: 'error', message: 'Dados ausentes.' });
  }
});

app.post('/cadastrarPedido', (req, res) => {
  const data = req.body;
  if (data && data.nome && data.imagem && data.tamanho && data.quantidade && data.valor) {
    const sql = "INSERT INTO pedido (nm_pizza, cd_img, ds_tamanho, ds_quantidade, vl_total_pedido) VALUES (?, ?, ?, ?, ?)";
    const values = [data.nome, data.imagem, data.tamanho, data.quantidade, data.valor];
    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Erro ao cadastrar o pedido:", error);
        res.status(500).json({ status: 'error', message: 'Erro ao cadastrar o pedido.' });
      } else {
        console.log("Pedido cadastrado com sucesso!");
        res.json({ status: 'success', message: 'Pedido cadastrado com sucesso.' });
      }
    });
  } else {
    res.status(400).json({ status: 'error', message: 'Dados ausentes.' });
  }
});

app.post('/cadastrarPizzaSalgada', (req, res) => {
  const data = req.body;
  if (data && data.sabor && data.imagem && data.descricao && data.valor) {
    const sql = "INSERT INTO pizzas_salgadas (nm_sabor , cd_img, ds_pizza, vl_pizza) VALUES (?, ?, ?, ?)";
    const values = [data.sabor, data.imagem, data.descricao, data.valor];
    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Erro ao cadastrar o pedido:", error);
        res.status(500).json({ status: 'error', message: 'Erro ao cadastrar o pedido.' });
      } else {
        console.log("Pedido cadastrado com sucesso!");
        res.json({ status: 'success', message: 'Pedido cadastrado com sucesso.' });
      }
    });
  } else {
    res.status(400).json({ status: 'error', message: 'Dados ausentes.' });
  }
});

app.post('/cadastrarPizzaDoce', (req, res) => {
  const data = req.body;
  if (data && data.sabor && data.imagem && data.descricao && data.valor) {
    const sql = "INSERT INTO pizzas_doces (nm_sabor, cd_img, ds_pizza, vl_pizza) VALUES (?, ?, ?, ?)";
    const values = [data.sabor, data.imagem, data.descricao, data.valor];
    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Erro ao cadastrar o pedido:", error);
        res.status(500).json({ status: 'error', message: 'Erro ao cadastrar o pedido.' });
      } else {
        console.log("Pedido cadastrado com sucesso!");
        res.json({ status: 'success', message: 'Pedido cadastrado com sucesso.' });
      }
    });
  } else {
    res.status(400).json({ status: 'error', message: 'Dados ausentes.' });
  }
});

app.post('/cadastrarBebidas', (req, res) => {
  const data = req.body;
  if (data && data.nome && data.imagem && data.descricao && data.valor) {
    const sql = "INSERT INTO bebidas (nm_bebida , cd_img, ds_bebida, vl_bebida) VALUES (?, ?, ?, ?)";
    const values = [data.nome, data.imagem, data.descricao, data.valor];
    db.query(sql, values, (error, results) => {
      if (error) {
        console.error("Erro ao cadastrar o pedido:", error);
        res.status(500).json({ status: 'error', message: 'Erro ao cadastrar o pedido.' });
      } else {
        console.log("Pedido cadastrado com sucesso!");
        res.json({ status: 'success', message: 'Pedido cadastrado com sucesso.' });
      }
    });
  } else {
    res.status(400).json({ status: 'error', message: 'Dados ausentes.' });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const SQL = "SELECT * FROM cadastro WHERE email = ? AND senha = ?";
  const values = [email, password];
  db.query(SQL, values, (err, results) => {
    if (err) {
      console.error("Erro ao consultar o banco de dados:", err);
      return res.status(500).json({ message: 'Erro ao tentar fazer login' });
    }
    if (results.length > 0) {
      const user = results[0];
      return res.status(200).json(user);
    } else {
      return res.status(401).json({ message: 'Credenciais Inválidas' });
    }
  });
});

app.put('/alterarBebida/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (data && !data.nome && !data.imagem && !data.descricao && !data.valor) {
    return res.status(400).json({ status: 'error', message: 'Dados ausentes.' });
  }
  const sql = `UPDATE bebidas SET nm_bebida = ?, cd_img = ?, ds_bebida = ?, vl_bebida = ? WHERE id = ?`;
  const values = [data.nome, data.imagem, data.descricao, data.valor, id];
  console.log('Tentando alterar bebida com o ID:', id);
  db.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao alterar bebida:', error);
      return res.status(500).json({ message: 'Erro ao alterar bebida.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Bebida não encontrada.' });
    }
    res.status(200).json({ message: 'Bebida alterada com sucesso.' });
  });
});

app.put('/alterarPizzaDoce/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (data && !data.sabor && !data.imagem && !data.descricao && !data.valor) {
    return res.status(400).json({ status: 'error', message: 'Dados ausentes.' });
  }
  const sql = `UPDATE pizzas_doces SET nm_sabor = ?, cd_img = ?, ds_pizza = ?, vl_pizza = ? WHERE id = ?`;
  const values = [data.sabor, data.imagem, data.descricao, data.valor, id];
  console.log('Tentando alterar bebida com o ID:', id);
  db.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao alterar bebida:', error);
      return res.status(500).json({ message: 'Erro ao alterar bebida.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Bebida não encontrada.' });
    }
    res.status(200).json({ message: 'Bebida alterada com sucesso.' });
  });
});

app.put('/alterarPizzaSalgada/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (data && !data.sabor && !data.imagem && !data.descricao && !data.valor) {
    return res.status(400).json({ status: 'error', message: 'Dados ausentes.' });
  }
  const sql = `UPDATE pizzas_salgadas SET nm_sabor = ?, cd_img = ?, ds_pizza = ?, vl_pizza = ? WHERE id = ?`;
  const values = [data.sabor, data.imagem, data.descricao, data.valor, id];
  console.log('Tentando alterar bebida com o ID:', id);
  db.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao alterar bebida:', error);
      return res.status(500).json({ message: 'Erro ao alterar bebida.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Bebida não encontrada.' });
    }
    res.status(200).json({ message: 'Bebida alterada com sucesso.' });
  });
});

app.delete('/deleteBebida/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM bebidas WHERE id = ${mysql.escape(id)}`;
  console.log('Tentando excluir bebida com o ID:', id);
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Erro ao excluir bebida:', error);
      return res.status(500).json({ message: 'Erro ao excluir bebida.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Bebida não encontrada.' });
    }
    res.status(200).json({ message: 'Bebida excluída com sucesso.' });
  });
});

app.delete('/deletePizzaDoce/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM pizzas_doces WHERE id = ${mysql.escape(id)}`;
  console.log('Tentando excluir bebida com o ID:', id);
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Erro ao excluir bebida:', error);
      return res.status(500).json({ message: 'Erro ao excluir bebida.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Bebida não encontrada.' });
    }
    res.status(200).json({ message: 'Bebida excluída com sucesso.' });
  });
});

app.delete('/deletePizzaSalgada/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM pizzas_salgadas WHERE id = ${mysql.escape(id)}`;
  console.log('Tentando excluir bebida com o ID:', id);
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Erro ao excluir bebida:', error);
      return res.status(500).json({ message: 'Erro ao excluir bebida.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Bebida não encontrada.' });
    }
    res.status(200).json({ message: 'Bebida excluída com sucesso.' });
  });
});

app.delete('/deletePedido/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM pedido WHERE id = ${mysql.escape(id)}`;
  console.log('Tentando excluir pedido com o ID:', id);
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Erro ao excluir pedido:', error);
      return res.status(500).json({ message: 'Erro ao excluir pedido.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'pedido não encontrada.' });
    }
    res.status(200).json({ message: 'pedido excluído com sucesso.' });
  });
});

app.delete('/deletePedidoAll', (req, res) => {
  const sql = `DELETE FROM pedido`;
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Erro ao excluir pedidos:', error);
      return res.status(500).json({ message: 'Erro ao excluir pedidos.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Nenhum pedido encontrado.' });
    }
    res.status(200).json({ message: 'Todos os pedidos foram excluídos com sucesso.' });
  });
});

app.listen(3001, () => {
  console.log("Rodando servidor")
});