const express = require('express');
const fs = require('fs');
const { Blob } = require('buffer');
// const Blob = require('node-blob');
const app = express();
const port = 3000;

globalThis.Blob = Blob;

// Configura el manejo estático de archivos
app.use(express.static('public')); // Crea una carpeta "public" en el mismo directorio

app.get('/', (req, res) => {
  res.header({ 'Access-Control-Allow-Origin': '*' });

  // Lee el archivo binario
  const archivoBinario = fs.readFileSync('./public/images/images.jpeg'); // Cambia la ruta y el tipo de archivo
  console.log(archivoBinario);

  // Crea un Blob a partir del contenido binario
  const blob = new Blob([archivoBinario], { type: 'image/jpg' }); // Cambia el tipo según tu archivo

  // Crea un enlace "blob"
  const enlaceBlob = URL.createObjectURL(blob);

  // Construye la respuesta HTML
  const respuestaHTML = `
                              <div>
                                    <img src="${enlaceBlob}" alt="Imagen Blob" />
                                          <img src="./images/images.jpeg" alt="Imagen Blob" />
                                                <p>Enlace Blob generado: <a href="${enlaceBlob}" target="_blank">${enlaceBlob}</a></p>
                                                    </div>
                                                      `;

  res.send(respuestaHTML);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
