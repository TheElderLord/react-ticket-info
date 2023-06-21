import React, { useEffect, useState,useRef } from 'react';
import './App.css';
// import { PDFViewer, PDFDownloadLink, Document, Page, StyleSheet } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   content: {
//     padding: 10
//   }
// });
const MyComponent = () => {
  const pdfContainerRef = useRef(null);

  const [time, setTime] = useState('');
  const [ticketNum, setTicketNum] = useState('');
  const [orderNum, setOrderNum] = useState('');
  const [orderNumTxt, setOrderNumTxt] = useState('');
  const [waitTime, setWaitTime] = useState('');
  const [waitTimeTxt, setWaitTimeTxt] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [minutes, setMinutes] = useState('');

  useEffect(() => {
    // Get the query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search);

    // Access individual query parameters
    let time = queryParams.get('time');
    const ticket = queryParams.get('number');
    const wtime = queryParams.get('waittime');
    const order = queryParams.get('order');
    const lang = queryParams.get('lang');
    time = time.split(' ');
    setTime(time[3]);
    setTicketNum(ticket);
    setWaitTime(wtime);
    setOrderNum(order);

    if (lang.toLowerCase() === 'ru') {
      setOrderNumTxt('Код для оценки качества');
      setWaitTimeTxt('Время ожидания');
      setDownloadLink('Скачать');
      setMinutes('минут');
    } else if (lang.toLowerCase() === 'uz') {
      setOrderNumTxt('Sifatni baholash kodi');
      setWaitTimeTxt('Kutish vaqti');
      setDownloadLink('Yuklab olish');
      setMinutes('daqiqa');
    }
  }, []);
  const handleDownloadPDF = async () => {
    try {
      // Create a canvas from the HTML content
      const canvas = await html2canvas(pdfContainerRef.current);

      // Convert the canvas to a data URL representing the PDF file
      const dataUrl = canvas.toDataURL();

      // Trigger the download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'content.pdf';
      link.click();
    } catch (error) {
      console.error('Error creating PDF:', error);
    }
  };

  return (
    <div className='container'>
      <div ref= {pdfContainerRef} className='pdf-container'>
      <div className='header'>
        <div className='logo'>
        <img src='/images/logo.png' alt='DDD'/>
        </div>
        <div className='time'>
         <h3>
        {time}
         </h3>
          </div>

        </div>

      <div className='main'>
        <div>
        <h1>{ticketNum}</h1>
        <h2>{orderNumTxt}: {orderNum}</h2> 
        <h2>{waitTimeTxt}: {waitTime} {minutes}</h2>
        </div>
      </div>
     </div>
      <div className='footer'>
      <button onClick={handleDownloadPDF}>{downloadLink}</button>
      </div>
    </div>
  );
};

export default MyComponent;
