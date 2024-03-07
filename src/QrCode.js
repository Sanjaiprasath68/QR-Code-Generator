import React, { useState } from 'react'
import './QrCode.css'

const QrCode = () => {
    const [img, setImg] = useState();
    const [loading, setLoading] = useState(false);
    const [qrdata, setQrData] = useState();
    const [qrsize, setQrSize] = useState();
    async function generateQR(){  
         setLoading(true);
         try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}*${qrsize}&data=${encodeURIComponent(qrdata)}`;
            setImg(url)
         }catch(error){
            console.error("Error generating QR code", error)
         }finally{
            setLoading(false);
         }
        }
    function downloadQR(){
        fetch(img).then((Response)=>Response.blob()).then((blob)=>{
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png"
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
    
}
  return (
    <div>
        <div className='app-container'> 
        <h2>QR Code Generator</h2> 
        {loading && <p>Please wait...</p>}
        {img && <img src={img} alt="Qrcode" />}
        
            <label htmlFor="dataInput" className='input-label'> Data for QR code:</label>
            <input type='text' id='dataInput' value={qrdata} onChange={(e)=>setQrData(e.target.value)} placeholder='Enter Data for QR code'/>
            <label htmlFor="sizeInput" className='input-label'> Image size (e.g., 150):</label>
            <input type='text' id='sizeInput' value={qrsize} onChange={(e)=>setQrSize(e.target.value)} placeholder='Enter Image size'/>
           <div>
                <button className='GenerateQRCode' disabled={loading} onClick={generateQR}>Generate QR Code</button>
                <button className='DownloadQRCode' onClick={downloadQR}>Download QR Code</button>
           </div>
      </div>
      <footer>Designed By <span>Sanjai</span></footer>
    </div>
  )
}

export default QrCode
