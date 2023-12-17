import './App.css'
import  { useState } from 'react';

function App() {
    const [yourName, setYourName] = useState('');
    const [yourAddress, setYourAddress] = useState('');
    const [date, setDate] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [yourPosition, setYourPosition] = useState('');
    const [endWorkDate, setEndWorkDate] = useState('');
    const [yourSignature, setYourSignature] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');

    const createPdf = async () => {
        try {
            await fetch('http://localhost:8080/api/pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: new URLSearchParams({
                    yourName: yourName,
                    yourAddress: yourAddress,
                    date: date,
                    employerName: employerName,
                    companyName: companyName,
                    companyAddress: companyAddress,
                    yourPosition: yourPosition,
                    endWorkDate: endWorkDate,
                    yourSignature: yourSignature,
                })
            })
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    setPdfUrl(url);
                });
        } catch (err) {
            console.error(err);
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'ResignationLetter.pdf'; // The filename for downloaded PDF
        link.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createPdf();
    }

    return (
        <div className="container">
                <div style={{color:"white"}}>
                    <h1 >Contoh Surat Berhenti Kerja</h1>
                    <h6>other type of <i>surat</i> coming soon... </h6>
                </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nama Anda:
                    <input required type="text" value={yourName} onChange={(e) => setYourName(e.target.value)}/>
                </label>
                <label>
                    Alamat Anda:
                    <input required type="text" value={yourAddress} onChange={(e) => setYourAddress(e.target.value)}/>
                </label>
                <label>
                    Tarikh:
                    <input required type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                </label>
                <label>
                    Nama Boss:
                    <input required type="text" value={employerName} onChange={(e) => setEmployerName(e.target.value)}/>
                </label>
                <label>
                    Nama Syarikat:
                    <input required type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
                </label>
                <label>
                    Alamat Syarikat:
                    <input required type="text" value={companyAddress}
                           onChange={(e) => setCompanyAddress(e.target.value)}/>
                </label>
                <label>
                    Jawatan Anda:
                    <input required type="text" value={yourPosition} onChange={(e) => setYourPosition(e.target.value)}/>
                </label>
                <label>
                    Tarikh Terakhir Bekerja:
                    <input required type="date" value={endWorkDate} onChange={(e) => setEndWorkDate(e.target.value)}/>
                </label>
                {/*<label>*/}
                {/*    Signature:*/}
                {/*    <input required type="text" value={yourSignature} onChange={(e) => setYourSignature(e.target.value)} />*/}
                {/*</label>*/}
                <button type="submit">Preview PDF</button>
                {pdfUrl && <button onClick={handleDownload}>Download PDF</button>}
            </form>
            <object data={pdfUrl} type="application/pdf" width="100%" height="800px">
                <p>This browser does not support PDF!</p>
            </object>
            <div className="footer">
                <p>Disclaimer: I do not store any of your information anywhere. If you refresh the page, you will lose all the progress.</p>
                <p> Repo for this website </p>
                <a href="https://github.com/yourUserName/yourRepo" target="_blank" rel="noopener noreferrer">
                    frontend
                </a><br/>
                <a href="https://github.com/yourUserName/yourRepo" target="_blank" rel="noopener noreferrer">
                    backend
                </a>
            </div>
        </div>
    );
}

export default App;
