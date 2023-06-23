// Importa la biblioteca jsPDF
const { jsPDF } = require('jspdf');
const autoTable = require('jspdf-autotable');
autoTable.applyPlugin(jsPDF);

const imageData = require('../../public/base64/logo.json');

import { Cart } from '@/types';

// Define las interfaces para los parámetros de la función
interface Cliente {
  nombre: string;
  apellido: string;
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
export function generateCustomerOrder(orden: Orden) {
  // Crea una nueva instancia de jsPDF
  const doc = new jsPDF();

  // Define las coordenadas iniciales para el contenido
  let x = 15;
  let y = 30;

  const FONT_BASE = 10;
  const FONT_HEAD = 12;
  const FONT_SUPER = 20;
  const BORDER_WIDTH = 0.1;
  const FOOT_COLUMN = 6;
  const FILL_COLOR_TABLE = [240, 240, 240];

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

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
    'N°',
    'Item',
    'Talla',
    'Descripción',
    'Categoria',
    'Estado',
    'Precio',
  ]);
  let index = 1;
  for (const item of orden.items) {
    data.push([
      index,
      item.items.item,
      item.items.size || '-',
      item.items.description,
      item.items.category,
      item.items.state,
      `C$ ${item.items.price.toFixed(2)}`,
    ]);
    index++;
  }

  // Agrega la tabla de artículos
  doc.autoTable({
    head: [data[0]],
    body: data.slice(1),
    startY: y,
    margin: { top: 15, bottom: 35 },
    styles: {
      fontSize: 10,
      cellPadding: 2,
      valign: 'middle',
      lineWidth: BORDER_WIDTH,
      halign: 'center',
    },
    theme: 'plain',
    headStyles: {
      fillColor: FILL_COLOR_TABLE,
    },
    columnStyles: {
      6: {
        halign: 'right',
        cellPadding: { right: 4 },
      },
    },
    footStyles: {
      lineWidth: 0,
    },
    foot: [
      [
        {
          content: 'Subtotal:',
          colSpan: FOOT_COLUMN,
          rowSpan: 1,
          styles: {
            halign: 'right',
            cellPadding: { top: 2, left: 0, right: 4, bottom: 2 },
          },
        },
        {
          content: `C$ ${orden.subtotal.toFixed(2)}`,
          styles: {
            fillColor: FILL_COLOR_TABLE,
            lineWidth: BORDER_WIDTH,
            halign: 'right',
            cellPadding: { right: 4 },
          },
        },
      ],
      [
        {
          content: 'Envio:',
          colSpan: FOOT_COLUMN,
          rowSpan: 1,
          styles: {
            halign: 'right',
            cellPadding: { top: 2, left: 0, right: 4, bottom: 2 },
          },
        },
        {
          content: `C$ ${orden.envio.toFixed(2)}`,
          styles: {
            fontStyle: 'normal',
            fillColor: FILL_COLOR_TABLE,
            lineWidth: BORDER_WIDTH,
            halign: 'right',
            cellPadding: { right: 4 },
          },
        },
      ],
      [
        {
          content: 'Total:',
          colSpan: FOOT_COLUMN,
          rowSpan: 1,
          styles: {
            halign: 'right',
            cellPadding: { top: 2, left: 0, right: 4, bottom: 2 },
          },
        },
        {
          content: `C$ ${orden.total.toFixed(2)}`,
          styles: {
            fillColor: FILL_COLOR_TABLE,
            lineWidth: BORDER_WIDTH,
            halign: 'right',
            cellPadding: { right: 4 },
          },
        },
      ],
    ],
  });

  // Agrega la información adicional
  doc.setFontSize(FONT_BASE);

  const finalTable = doc.autoTable.previous.finalY + 40;
  const finalPage = pageHeight - 25;

  if (finalTable <= finalPage) {
    y = doc.autoTable.previous.finalY + 20;
  } else {
    y = pageHeight - 40;
  }
  doc.setFont('helvetica', 'bold');
  doc.text('Instrucciones Especiales:', x, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.text(`- ${orden.instrucciones}`, x, y);

  // Agrega el agradecimiento
  y = pageHeight - 25;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(FONT_HEAD);
  doc.text('¡Gracias por tu compra!', centerPage, y, { align: 'center' });
  y += 7;
  doc.text('¡Disfruta!', centerPage, y, {
    align: 'center',
  });

  // Guarda el documento PDF con un nombre de archivo específico
  // doc.save('pedido.pdf');
  console.log('🚀 ~ file: jspdf.js:146 ~ PDF Generado:');
}
