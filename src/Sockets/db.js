const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5432;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'la_suculenta'
});

connection.connect((error) => {
    if (error) {
        console.error('Error de conexión a la base de datos: ', error);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

app.use(cors());
app.use(bodyParser.json());

// Ejemplo de ruta para obtener datos desde la base de datos
app.get('/platillo', (req, res) => {
    const sql = 'SELECT * FROM platillo';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la consulta a la base de datos:', err);
            res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        } else {
            res.json(results);
        }
    });
});

app.get('/ingredientes', (req, res) => {
    const sql = 'SELECT * FROM ingredientes';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la consulta a la base de datos:', err);
            res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        } else {
            res.json(results);
        }
    });
});

// app.get('/det_platillo', (req, res) => {
//     const sql = 'SELECT * FROM det_platillo';
//     connection.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error en la consulta a la base de datos:', err);
//             res.status(500).json({ error: 'Error en la consulta a la base de datos' });
//         } else {
//             res.json(results);
//         }
//     });
// });

app.get('/detPlatillo', (req, res) => {
    const numero = req.query.idP;
    const sql = 'SELECT det_platillo.cantidad, det_platillo.u_medida,'
            + ' ingredientes.nombre_ingrediente FROM det_platillo'
            + ' LEFT JOIN ingredientes ON det_platillo.id_ingrediente'
            + ' = ingredientes.id_ingrediente WHERE det_platillo.id_platillo = ?';
    //const sql = 'SELECT * FROM det_platillo WHERE id_platillo = ?';
  
    connection.query(sql, [numero], (err, results) => {
        if (err) {
        console.error('Error al realizar la consulta:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(results);
    });
  });

  app.post('/agregarPlatillo', (req, res) => {
    const { nombre_platillo, precio_platillo } = req.body;
  
    // Realizar la inserción en la base de datos
    const sql = 'INSERT INTO platillo (nombre_platillo, precio_platillo) VALUES (?, ?)';
    connection.query(sql, [nombre_platillo, precio_platillo], (err, result) => {
      if (err) {
        console.log('Error al insertar datos: ' + err.message);
        res.status(500).send('Error interno del servidor');
      } else {
        console.log('Datos insertados correctamente');
        res.status(200).send('Datos insertados correctamente');
      }
    });
  });

  app.put('/editPlatillo', (req, res) => {
    const id_platillo = req.query.idP;
    const { nombre_platillo, precio_platillo } = req.body;
    const sql = 'UPDATE platillo SET nombre_platillo = ?, precio_platillo = ? WHERE id_platillo = ?';
    connection.query(sql, [nombre_platillo, precio_platillo, id_platillo], (err, result) => {
      if (err) {
        console.log('Error al actualizar datos: ' + err.message);
        res.status(500).send('Error al actualizar datos');
      } else {
        console.log('Datos actualizados correctamente');
        res.status(200).send('Datos actualizados correctamente');
      }
    });
  });

  app.delete('/deletePlatillo', (req, res) => {
    const id_platillo = req.query.idP;
    const sql = 'DELETE FROM platillo WHERE id_platillo = ?';
    connection.query(sql, [id_platillo], (err, result) => {
      if (err) {
        console.log('Error al eliminar datos: ' + err.message);
        res.status(500).send('Error al eliminar datos');
      } else {
        console.log('Datos eliminados correctamente');
        res.status(200).send('Datos eliminados correctamente');
      }
    });
  });

//PUERTO EN DONDE SE ESCUCHA
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
