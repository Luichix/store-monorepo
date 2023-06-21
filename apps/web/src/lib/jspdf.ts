// Importa la biblioteca jsPDF
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Cart } from '@/types';

// Define las interfaces para los parámetros de la función
interface Cliente {
  nombre: string;
  documento: string;
  correo: string;
  telefono: string;
}

interface Direccion {
  direccion: string;
  municipio: string;
  departamento: string;
  pais: string;
}

interface Orden {
  id: string;
  fecha: string;
  cliente: Cliente;
  direccion: Direccion;
  formaEnvio: string;
  items: Cart[];
  subtotal: number;
  envio: number;
  impuestos: number;
  total: number;
  instrucciones: string;
}

// Función para generar el documento PDF
function generarOrdenCompra(orden: Orden) {
  // Crea una nueva instancia de jsPDF
  const doc = new jsPDF();

  // Define las coordenadas iniciales para el contenido
  let x = 15;
  let y = 20;

  // Agrega el encabezado de la orden
  doc.setFontSize(18);
  doc.text('Orden de Compra', x, y);
  doc.setFontSize(12);
  y += 10;
  doc.text(`Número de Orden: ${orden.id}`, x, y);
  y += 7;
  doc.text(`Fecha de la Orden: ${orden.fecha}`, x, y);

  // Agrega la información del cliente
  y += 15;
  doc.setFontSize(14);
  doc.text('Información del Cliente', x, y);
  doc.setFontSize(12);
  y += 10;
  doc.text(`Nombre: ${orden.cliente.nombre}`, x, y);
  y += 7;
  doc.text(`Documento de Identidad: ${orden.cliente.documento}`, x, y);
  y += 7;
  doc.text(`Correo Electrónico: ${orden.cliente.correo}`, x, y);
  y += 7;
  doc.text(`Teléfono: ${orden.cliente.telefono}`, x, y);

  // Agrega la dirección de envío
  y += 15;
  doc.setFontSize(14);
  doc.text('Dirección de Envío', x, y);
  doc.setFontSize(12);
  y += 10;
  doc.text(`Dirección: ${orden.direccion.direccion}`, x, y);
  y += 7;
  doc.text(`Municipio: ${orden.direccion.municipio}`, x, y);
  y += 7;
  doc.text(`Departamento: ${orden.direccion.departamento}`, x, y);
  y += 7;
  doc.text(`País: ${orden.direccion.pais}`, x, y);

  // Agrega la forma de envío
  y += 15;
  doc.setFontSize(14);
  doc.text('Forma de Envío', x, y);
  doc.setFontSize(12);
  y += 10;
  doc.text(`Forma de Envío: ${orden.formaEnvio}`, x, y);

  // Agrega los detalles de la orden
  y += 15;
  doc.setFontSize(14);
  doc.text('Detalles de la Orden', x, y);
  doc.setFontSize(12);
  y += 10;

  // Crea una matriz de datos para la tabla de artículos
  const data = [];
  data.push([
    'Categoría',
    'Sección',
    'Talla',
    'Descripción',
    'Precio',
    'Estado',
  ]);
  for (const item of orden.items) {
    data.push([
      item.items.category,
      item.items.section,
      item.items.size || '-',
      item.items.description,
      `$${item.items.price}`,
      item.items.state,
    ]);
  }

  const tableLength = data.length;

  // Agrega la tabla de artículos
  autoTable(doc, {
    head: data[0],
    body: data.slice(1),
    startY: y,
    margin: { top: 15 },
    styles: {
      fontSize: 10,
      cellPadding: 5,
      valign: 'middle',
    },
  });

  // Agrega la información adicional
  y += tableLength + 15;
  doc.setFontSize(12);
  doc.text(`Subtotal: $${orden.subtotal}`, x, y);
  y += 7;
  doc.text(`Envío: $${orden.envio}`, x, y);
  y += 7;
  doc.text(`Impuestos: $${orden.impuestos}`, x, y);
  y += 7;
  doc.text(`Total: $${orden.total}`, x, y);
  y += 10;
  doc.text(`Instrucciones Especiales: ${orden.instrucciones}`, x, y);

  // Agrega el agradecimiento
  y += 20;
  doc.setFontSize(14);
  doc.text('¡Gracias por tu compra! ¡Disfruta!', x, y);

  // Guarda el documento PDF con un nombre de archivo específico
  doc.save('orden_compra.pdf');
}

const Orden: Orden = {
  id: '112',
  fecha: '12/12/2012',
  cliente: {
    nombre: 'Luichix',
    documento: '081-000000-00000',
    correo: 'luichix@email.com',
    telefono: '88880000',
  },
  direccion: {
    direccion: 'Hotel Glomar 3 1/2 al sur',
    municipio: 'Chinandega',
    departamento: 'Chinandega',
    pais: 'Nicaragua',
  },
  formaEnvio: 'envio',
  items: [
    {
      id: '648a359b2c1bb0a938bc19e6',
      v: null,
      userId: '6483a9a96be7fda476c09358',
      itemId: '6222f0805778424cb9db5818',
      quantity: 1,
      items: {
        id: '6222f0805778424cb9db5818',
        v: 0,
        category: 'Prenda',
        section: 'ropa',
        size: 'M',
        color: null,
        material: null,
        gender: null,
        style: null,
        brand: null,
        created_at: '2022-03-05T05:05:27.283Z',
        description: 'Talla S',
        imageUrl:
          'http://res.cloudinary.com/luichix/image/upload/v1646456959/cloudinary_react/e8ys3ea0ksf90gbmuvkt.jpg',
        item: 'Camisa de Rosa',
        price: 125,
        public_id: 'cloudinary_react/e8ys3ea0ksf90gbmuvkt',
        state: 'Nuevo',
        stock: 1,
        rating: 5,
        reviewCount: 38,
      },
    },
    {
      id: '648a35c92c1bb0a938bc19e8',
      v: null,
      userId: '6483a9a96be7fda476c09358',
      itemId: '62323d9073063c30eb07832e',
      quantity: 1,
      items: {
        id: '62323d9073063c30eb07832e',
        v: 0,
        category: 'Ropa',
        section: 'ropa',
        size: null,
        color: null,
        material: null,
        gender: null,
        style: null,
        brand: null,
        created_at: '2022-03-16T19:35:33.731Z',
        description: 'Talla S',
        imageUrl:
          'http://res.cloudinary.com/luichix/image/upload/v1647459728/cloudinary_react/l8nljj03k57stvmrvmds.jpg',
        item: 'Camisa Semi ',
        price: 175,
        public_id: 'cloudinary_react/l8nljj03k57stvmrvmds',
        state: 'Nuevo',
        stock: 1,
        rating: 5,
        reviewCount: 38,
      },
    },
    {
      id: '648a36472c1bb0a938bc19e9',
      v: null,
      userId: '6483a9a96be7fda476c09358',
      itemId: '622d5752655c829bb47b969f',
      quantity: 1,
      items: {
        id: '622d5752655c829bb47b969f',
        v: 0,
        category: 'Ropa',
        section: 'ropa',
        size: 'S',
        color: null,
        material: null,
        gender: null,
        style: null,
        brand: null,
        created_at: '2022-03-13T02:25:52.011Z',
        description: 'Talla M',
        imageUrl:
          'http://res.cloudinary.com/luichix/image/upload/v1647138641/cloudinary_react/ne2m8lnjrumdcstkmiop.jpg',
        item: 'Camisa Milk',
        price: 150,
        public_id: 'cloudinary_react/ne2m8lnjrumdcstkmiop',
        state: 'Nuevo',
        stock: 1,
        rating: 5,
        reviewCount: 38,
      },
    },
  ],
  subtotal: 100,
  envio: 45,
  impuestos: 0,
  total: 145,
  instrucciones: 'Ninguna',
};

generarOrdenCompra(Orden);
