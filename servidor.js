const net = require('net');


const usuarios = [
  { id: 1, nombre: 'Dan Israel', apellido: 'Copa Lupe', usuario: 'dcopalupe', password: '123456' },
  { id: 2, nombre: 'Jorge Andres', apellido: 'Alanoca Quino', usuario: 'jalanocaquino', password: '1q2w3e4' },
  { id: 3, nombre: 'Ana', apellido: 'Condori Quispe', usuario: 'acondoriquispe', password: '54321' }
];

const server = net.createServer((connection) => {

  try {
    connection.on('end', () => console.log('...'));

    connection.on('data', async (data) => {
      const dataArray = data.toString().split('/');
      const user = dataArray[0];
      const pwd = dataArray[1];
      sw = false;

      for(const usuario of usuarios) {
        if(user === usuario.usuario) {
          if(pwd.trim() === usuario.password) {
            console.log(`Cliente conectado ${data.toString()}`);
            await connection.write(`Bienvenido ${usuario.nombre} ${usuario.apellido} !!!\r`);
            await connection.end();
            break;
          }
          else {
            await connection.write(`La contraseña para ${usuario.usuario} es incorrecta.\r`);
            break;
          }
        }
        else {
          sw = true;
        }
      }
      if(sw) {
        await connection.write(`El usuario ${user} es incorrecto o no existe\r`);
      }
    });
  }
  catch(error) {

  }
});

server.listen(7000, () => console.log('Servidor en ejecución el el puerto 7000'));