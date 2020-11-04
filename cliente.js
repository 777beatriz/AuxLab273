const net = require('net');


let stdin = process.openStdin();

const client = net.createConnection({ port: 7000 }, () => {
  console.log('Bienvenido al sistema LAB 273');
  console.log('Ingrese usuario y contraseña (user/password)');
});

stdin.on('data', async (chunk) => {
  await client.write(chunk);

  client.once('data', async (data) => {
    if(data.toString().startsWith('Bienvenido')) {
      console.log(data.toString());
      await client.end();
    }
    console.log(data.toString());
    console.log('Ingrese usuario y contraseña (user/password)');
  });
});

client.on('end', async () => await process.exit());
