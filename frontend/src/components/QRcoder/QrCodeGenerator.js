import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Текст скопирован');
    }).catch(err => {
      console.error('Ошибка при копировании текста: ', err);
    });
  };

const QrCodeGenerator = ({ value }) => {
  return (
    <div>
      <QRCodeCanvas
        value={value} // The text or URL you want to encode in the QR code
        size={256}    // Size of the QR code (default is 128)
        level={"H"}   // Error correction level: "L", "M", "Q", "H" (default is "L")
      />
      <a 
        href="#"
        onClick={(e) => {
          e.preventDefault(); // чтобы предотвратить стандартное поведение ссылки
          copyToClipboard(`${value}`);
        }}
      >
        Скопировать ссылку на мероприятие
      </a>
    </div>
  );
};

export default QrCodeGenerator;
