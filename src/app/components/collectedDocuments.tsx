import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf'; // Import jsPDF library
import html2canvas from 'html2canvas'; // Import html2canvas library
import { CommonButtonSolidBlue } from './common/buttons';

interface DocumentData {
  document_name: string;
  front_image: string;
  back_image: string;
}

interface FileData {
  _id: { $oid: string };
  user_id: string;
  is_personel_document: boolean;
  documents: DocumentData[];
  createdAt: { $date: string };
  __v: number;
}

const CollectedDocuments: React.FC<{ userId: string }> = ({ userId }) => {
  const [fileData, setFileData] = useState<FileData | null>(null);

  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const response = await axios.get<FileData>(`${process.env.NEXT_PUBLIC_API_URL}/documents/${userId}`);
        const { data } = response;
        setFileData(data);
      } catch (error) {
        console.error('Error fetching document data:', error);
      }
    };

    fetchDocumentData();
  }, [userId]);

  const handleConvertToPDF = () => {
    try {
      const element = document.getElementById('imageGrid') as HTMLElement;
      html2canvas(element).then(canvas => {
        const dataUrl = canvas.toDataURL();
  
        const pdf = new jsPDF();
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.save('collected_documents.pdf');
      });
    } catch (error) {
      console.error('Error converting HTML to PDF:', error);
    }
  };

  const renderImages = () => {
    if (!fileData) return null;
  
    const rows = [];
    const imagesLoaded: boolean[] = [];
  
    const handleImageLoad = () => {
      imagesLoaded.push(true);
      // if (imagesLoaded.length === fileData.documents.length) {
      //   handleConvertToPDF();
      // }
    };
  
    for (let i = 0; i < fileData.documents.length; i += 2) {
      const row = (
        <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ marginRight: '10px' }}>
            <img
              src={fileData.documents[i].front_image}
              alt="Front"
              onLoad={handleImageLoad}
            />
            {fileData.documents[i].back_image && (
              <img
                src={fileData.documents[i].back_image}
                alt="Back"
                onLoad={handleImageLoad}
              />
            )}
          </div>
          {i + 1 < fileData.documents.length && (
            <div>
              <img
                src={fileData.documents[i + 1].front_image}
                alt="Front"
                onLoad={handleImageLoad}
              />
              {fileData.documents[i + 1].back_image && (
                <img
                  src={fileData.documents[i + 1].back_image}
                  alt="Back"
                  onLoad={handleImageLoad}
                />
              )}
            </div>
          )}
        </div>
      );
      rows.push(row);
    }
    return rows;
  };
  

  return (
    <div className='flex flex-col justify-center items-center'>
      <div id="imageGrid">{renderImages()}</div>

      {/*<div> <CommonButtonSolidBlue text='Download' onClick={handleConvertToPDF} /></div> */}
    </div>
  );
};

export default CollectedDocuments;


