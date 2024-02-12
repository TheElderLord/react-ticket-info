import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    const queryParams = new URLSearchParams(window.location.search);
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
    } else if (lang.toLowerCase() === 'kz') {
      setOrderNumTxt('Сапаны бағалау коды');
      setWaitTimeTxt('Күту уақыты');
      setDownloadLink('Жүктеу');
      setMinutes('минут');
    }
    else if (lang.toLowerCase() === 'en') {
      setOrderNumTxt('Quality assessment code');
      setWaitTimeTxt('Waiting time');
      setDownloadLink('Download');
      setMinutes('minutes');
    }
  }, []);

  const handleDownloadPDF = async () => {
    try {
      const canvas = await html2canvas(pdfContainerRef.current);
      const imageData = canvas.toDataURL('image/png');

      const pdf = new jsPDF();
      pdf.addImage(imageData, 'PNG', 10, 10, 190, 0);
      pdf.save('content.pdf');
    } catch (error) {
      console.error('Error creating PDF:', error);
    }
  };

  return (
    <div className='container'>
      <div ref={pdfContainerRef} className='pdf-container'>
        <div className='header'>
          <div className='logo'>
            <img src='/images/halyk.png' alt='DDD' />
          </div>
          <div className='time'>
            <h3>{time}</h3>
          </div>
        </div>
        <div className='main'>
          <div className='tnum'>{ticketNum}</div> 
          <h2>{orderNumTxt}: {orderNum}</h2>
          <h2>{waitTimeTxt}: {waitTime} {minutes}</h2>
        </div>
      </div>
      <div className='footer'>
        <button onClick={handleDownloadPDF}>{downloadLink}</button>

        <div className='bass'>
        <a href='https://bass-technology.kz/' >
            <img src='/images/bass.png' alt='Bass Technology' />
        </a>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
