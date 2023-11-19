const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const { ref } = require('vue');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    allowEIO3: true,
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:5174'],
        credentials: true,
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
	//Inicio del tiempo de conexion del cliente
	const tiempoIni = Date.now();
    console.log('User connected');

	//MENSAJE DESDE EL SERVIDOR
    socket.emit('msg personal', 'Hola soy server');
    
	//LISTAS DE OPCIONES DISPONIBLES DEL MENU
    const OpcionesMenu = [
	{
		id: '1',
		nombreOpc: 'Gestión de platillos'
	},
	{
		id: '2',
		nombreOpc: 'Gestión de ingredientes'
	},
	{
		id: '3',
		nombreOpc: 'Gestión de meseros'
	},
	{
		id: '4',
		nombreOpc: 'Gestión de cocineros'
	},
	{
		id: '5',
		nombreOpc: 'Gestión de ordenes'
	},
	{
		id: '6',
		nombreOpc: 'Reportes'
	}
	];
	
	//MANDAR LA LISTA DE OPCIONES AL CLIENTE
	OpcionesMenu.forEach((msg) =>{
		socket.emit('opciones menu', msg);
	});

	//METODO DE TIEMPO DE CONEXION
    socket.on('disconnect', () => {
		//Fin del tiempo de conexion
		//Se hacen calculos para saber la cantidad
		//de segundos totales
		const tiempoFin = (Date.now() - tiempoIni) / 1000;
        console.log('User disconnected');
		console.log('Tiempo de conexion: ' + tiempoFin + ' segundos');
    });
	
	//RECIBIMIENTO DE LAS PETICIONES DEL CLIENTE
    socket.on('chat message', (msg) => {
        console.log('Recibiendo respuesta del cliente ... ' + msg);
    });
});

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', (req, res) =>{
	const path = require('path');
	const pythonScriptPath = path.join(__dirname, '..', '..', 'src', 'views', 'uikit', 'VistasMenu', 'chatBot', 'chat.py');
	// Lógica del chatbot aquí
    const userMessage = req.body.message;
    // Procesar el mensaje y generar una respuesta del chatbot

	console.log('ruta' + pythonScriptPath);
    exec(`py ${pythonScriptPath} ${userMessage}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el script: ${error.message}`);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        if (stderr) {
            console.error(`Error del script: ${stderr}`);
            return res.status(400).json({ message: 'Error en la solicitud del cliente' });
        }

        // Enviar la respuesta del script de Python al cliente
        const botResponse = stdout.trim(); // Asegúrate de eliminar espacios en blanco adicionales
        res.json({ message: botResponse });
    });
})

server.listen(3000, () => {
    console.log('Listening on *:3000');
});
