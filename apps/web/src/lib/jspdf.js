// Importa la biblioteca jsPDF
const { jsPDF } = require('jspdf');
const autoTable = require('jspdf-autotable');
autoTable.applyPlugin(jsPDF);

const imageData = require('../../public/base64/logo.json');

// Función para generar el documento PDF
function generarOrdenCompra(orden) {
  // Crea una nueva instancia de jsPDF
  const doc = new jsPDF();

  // Define las coordenadas iniciales para el contenido
  let x = 15;
  let y = 30;

  const FONT_BASE = 10;
  const FONT_HEAD = 12;
  const FONT_SUPER = 20;

  const pageWidth = doc.internal.pageSize.getWidth();

  const centerPage = pageWidth / 2;
  const startRigth = pageWidth - x;

  // agregar el logotipo en el encabezado

  doc.addImage(imageData.image, 'PNG', pageWidth - x - 9, 10, 10, 10);
  // doc.setTextColor(236, 72, 153);
  // doc.text('Queen Closeth', 30, 20);
  // console.log(doc.getFontList());

  // Agrega el encabezado de la orden

  doc.setFontSize(FONT_SUPER);
  doc.setTextColor('#333333');
  doc.setFont('helvetica', 'bold');
  doc.text('Orden del Cliente', startRigth, y, { align: 'right' });

  doc.setFontSize(FONT_BASE);

  // Añade la información de identificacion del pedido
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Pedido: ', startRigth - 25, y, {
    align: 'right',
  });
  doc.setFont('helvetica', 'normal');
  doc.text(`${orden.id}`, startRigth, y, { align: 'right' });

  // Añade la fecha del pedido
  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Fecha: ', startRigth - 25, y, {
    align: 'right',
  });
  doc.setFont('helvetica', 'normal');
  doc.text(`${orden.fecha}`, startRigth, y, {
    align: 'right',
  });

  // Agrega encabezado de la información del cliente
  y += 15;
  doc.setFontSize(FONT_HEAD);
  doc.setFont('helvetica', 'bold');
  doc.text('Información del Cliente', x, y);

  // Agrega informacion del cliente - Nombre
  y += 10;
  doc.setFontSize(FONT_BASE);
  doc.setFont('helvetica', 'bold');
  doc.text('Nombre:', x, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${orden.cliente.nombre}`, x + 20, y);
  // Agrega informacion del cliente - Nombre
  y += 7;
  doc.setFontSize(FONT_BASE);
  doc.setFont('helvetica', 'bold');
  doc.text('Apellidos:', x, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${orden.cliente.apellido}`, x + 22, y);
  // Agrega informacion del cliente - Correo electronico
  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Correo:', x, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${orden.cliente.correo}`, x + 18, y);

  // Agrega informacion del cliente - Telefono
  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Teléfono:', x, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${orden.cliente.telefono}`, x + 22, y);

  // Agrega encabezado de la dirección de envío
  y -= 31;
  doc.setFontSize(FONT_HEAD);
  doc.setFont('helvetica', 'bold');
  doc.text('Dirección de Envío', centerPage, y);

  // Agrega la información de envío - dirección
  y += 10;
  doc.setFontSize(FONT_BASE);
  doc.setFont('helvetica', 'bold');
  doc.text('Dirección:', centerPage, y);

  doc.setFont('helvetica', 'normal');
  const direccion = orden.direccion.direccion;

  if (direccion.length > 35) {
    const lines = [];
    const words = direccion.split(' ');
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      if (currentLine.length + word.length <= 40) {
        currentLine += word + ' ';
      } else {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      }
    }

    if (currentLine.trim().length > 0) {
      lines.push(currentLine.trim());
    }

    for (let i = 0; i < lines.length; i++) {
      if (i === 0) {
        doc.text(lines[i], centerPage + 23, y);
      } else {
        doc.text(lines[i], centerPage, y);
      }
      y += 7;
    }
  } else {
    doc.text(direccion, centerPage + 23, y);
    y += 7;
  }

  // Añade el municipio de envio
  doc.setFont('helvetica', 'bold');
  doc.text('Municipio:', centerPage, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${orden.direccion.municipio}`, centerPage + 23, y);

  // Añade el departamento de envio
  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Departamento:', centerPage, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${orden.direccion.departamento}`, centerPage + 31, y);

  // Agrega los detalles de la orden
  y += 15;
  doc.setFontSize(FONT_HEAD);
  doc.setFont('helvetica', 'bold');
  doc.text('Detalles de la Orden', x, y);
  doc.setFontSize(FONT_BASE);
  y += 7;

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

  // Agrega la tabla de artículos
  doc.autoTable({
    head: [data[0]],
    body: data.slice(1),
    startY: y,
    margin: { top: 15 },
    styles: {
      fontSize: 10,
      cellPadding: 5,
      valign: 'middle',
    },
    theme: 'plain',
    headStyles: {
      fillColor: [240, 240, 240],
    },
  });

  // Agrega la información adicional
  y = doc.autoTable.previous.finalY + 15;
  doc.setFontSize(FONT_BASE);
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
  doc.setFontSize(FONT_HEAD);
  doc.text('¡Gracias por tu compra!', centerPage, y, { align: 'center' });
  y += 7;
  doc.text('¡Disfruta!', centerPage, y, {
    align: 'center',
  });

  // Guarda el documento PDF con un nombre de archivo específico
  doc.save('pedido.pdf');
  console.log('🚀 ~ file: jspdf.js:146 ~ PDF Generado:');
}

const Orden = {
  id: '105150',
  fecha: '12/12/2012',
  cliente: {
    nombre: 'Luichix',
    apellido: 'Rex',
    correo: 'luichix@email.com',
    telefono: '88880000',
  },
  direccion: {
    direccion:
      'De donde fue el hotel glomar tres y media cuadras al sur, Barrio Guadalupe.',
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
