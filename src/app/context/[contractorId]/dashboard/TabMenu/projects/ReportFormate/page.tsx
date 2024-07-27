// 'use client';
// import React, { useState } from 'react';
// import { PDFDocument, rgb, StandardFonts,drawRectangle } from 'pdf-lib';

// const generatePDF = async (formData: { date: any; managerName: any; managerPosition: any; managerEmail: any; projectProgress: any; equipment1: any; equipment2: any; equipment3: any; workSummary: any; issue: any; resolution: any; images: any; }) => {
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage([600, 800]);
//   const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

//   const addText = (text: string, x: number, y: number, size = 12, font = helveticaFont) => {
//     page.drawText(text, {
//       x,
//       y,
//       size,
//       font,
//       color: rgb(0, 0, 0),
//     });
//   };

//   const drawBorder = (x1: number, y1: number, x2: number, y2: number, thickness = 1) => {
//     page.drawLine({
//       start: { x: x1, y: y1 },
//       end: { x: x2, y: y1 },
//       thickness,
//       color: rgb(0, 0, 0),
//     });
//     page.drawLine({
//       start: { x: x1, y: y1 },
//       end: { x: x1, y: y2 },
//       thickness,
//       color: rgb(0, 0, 0),
//     });
//     page.drawLine({
//       start: { x: x2, y: y1 },
//       end: { x: x2, y: y2 },
//       thickness,
//       color: rgb(0, 0, 0),
//     });
//     page.drawLine({
//       start: { x: x1, y: y2 },
//       end: { x: x2, y: y2 },
//       thickness,
//       color: rgb(0, 0, 0),
//     });
//   };

//   addText('Daily Report', 200, 750, 30);
//   addText(`Date: ${formData.date}`, 400, 720);
//   drawBorder(50, 700, 550, 700);

//   addText('Manager Details', 50, 670, 14, helveticaFont);
//   addText(`Name: ${formData.managerName}`, 50, 650);
//   addText(`Position: ${formData.managerPosition}`, 50, 630);
//   addText(`Email: ${formData.managerEmail}`, 50, 610);

//   addText('Project Progress', 250, 670, 14, helveticaFont);
//   addText(`Today's Progress: ${formData.projectProgress}`, 250, 630);

//   addText('Equipment Details', 450, 670, 14, helveticaFont);
//   addText(`Equipment 1: ${formData.equipment1}`, 450, 650);
//   addText(`Equipment 2: ${formData.equipment2}`, 450, 630);
//   addText(`Equipment 3: ${formData.equipment3}`, 450, 610);

//   addText('Work Summary', 50, 570, 14, helveticaFont);
//   addText(`Today's work included ${formData.workSummary}`, 50, 530);

//   addText('Issues and Resolutions', 50, 470, 14, helveticaFont);
//   addText(`Issue: ${formData.issue}`, 50, 430);
//   // Increase the Y coordinate for "Resolution" to move it further down
//   addText(`Resolution: ${formData.resolution}`, 50, 410); // Adjust the Y coordinate here
  

//    // Replace with your desired color

//   // Draw a filled rectangle to create the background
//   page.drawRectangle({
//     x: 0,
//     y: 0,
//     width: 600, // Width of the page
//     height: 800, // Height of the page
    
//     borderColor: rgb(0, 0, 0), // Border color (optional)
//     borderWidth: 0, // Border width (optional)
//     opacity: 1, // Opacity (optional)
//   });
  
//   // Add text on top of the background


//   let imageX = 50;
//   let imageY = 350;
//   const imageWidth = 100;
//   const imageHeight = 80;

//   for (const imageFile of formData.images) {
//     const embeddedImage = await pdfDoc.embedPng(await imageFile.arrayBuffer());

//     page.drawImage(embeddedImage, {
//       x: imageX,
//       y: imageY,
//       width: imageWidth,
//       height: imageHeight,
//     });

//     imageX += imageWidth + 10;

//     if (imageX + imageWidth > 550) {
//       imageX = 50;
//       imageY -= imageHeight + 10;
//     }
//   }

//   drawBorder(50, 100, 250, 100);
//   drawBorder(350, 100, 550, 100);
//   addText("Manager's Signature", 50, 80);
//   addText("Client's Signature", 350, 80);

//   const pdfBytes = await pdfDoc.save();
//   const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
//   const pdfUrl = URL.createObjectURL(pdfBlob);
//   const link = document.createElement('a');
//   link.href = pdfUrl;
//   link.download = 'daily-report.pdf';
//   link.click();
// };

// export const AddReport = () => {
//   const [formData, setFormData] = useState({
//     date: '',
//     managerName: '',
//     managerPosition: '',
//     managerEmail: '',
//     projectProgress: '',
//     equipment1: '',
//     equipment2: '',
//     equipment3: '',
//     workSummary: '',
//     issue: '',
//     resolution: '',
//     images: [] as File[],
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, files } = e.target;

//     if (type === 'file') {
//       // Handle file input for images
//       if (files) {
//         setFormData({
//           ...formData,
//           images: Array.from(files), // Convert FileList to an array of Files
//         });
//       }
//     } else {
//       // Handle other input fields
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };
//   const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };


//   return (
//     <div className="bg-white p-2 w-full">
//       <div className="text-center mb-4">
//         <h1 className="text-xl font-semibold">Daily Report</h1>
//         <p className="text-gray-500 text-sm">Date: September 3, 2023</p>
//       </div>

//       {/* <hr className="my-6" /> */}

//       <div className="flex-col w-full gap-4">
//         {/* Manager Details */}
//         <div className="col-span-2 row-span-2">
//           <div className="bg-gray-100 p-4 rounded-lg">
//             <h2 className="text-2xl font-semibold mb-4">Manager Details</h2>
//             <input
//               type="text"
//               name="managerName"
//               placeholder="Name"
//               value={formData.managerName}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="managerPosition"
//               placeholder="Position"
//               value={formData.managerPosition}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="managerEmail"
//               placeholder="Email"
//               value={formData.managerEmail}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Project Progress */}
//         <div className="col-span-1">
//           <div className="bg-gray-100 p-4 rounded-lg">
//             <h2 className="text-xl font-semibold mb-4">Project Progress</h2>
//             <input
//               type="text"
//               name="projectProgress"
//               placeholder="Today's Progress"
//               value={formData.projectProgress}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Equipment Details */}
//         <div className="col-span-1 row-span-2">
//           <div className="bg-gray-100 p-4 rounded-lg">
//             <h2 className="text-xl font-semibold mb-4">Equipment Details</h2>
//             <input
//               type="text"
//               name="equipment1"
//               placeholder="Equipment 1"
//               value={formData.equipment1}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="equipment2"
//               placeholder="Equipment 2"
//               value={formData.equipment2}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="equipment3"
//               placeholder="Equipment 3"
//               value={formData.equipment3}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Work Summary */}
//       <div className="mt-8">
//   <h2 className="text-xl font-semibold mb-4">Work Summary</h2>
//   <textarea
//     name="workSummary"
//     placeholder="Today's work included"
//     value={formData.workSummary}
//     onChange={handleTextareaChange}
//   />
// </div>

//       {/* Issues and Resolutions */}
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold mb-4">Issues and Resolutions</h2>
//         <input
//           type="text"
//           name="issue"
//           placeholder="Issue"
//           value={formData.issue}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="resolution"
//           placeholder="Resolution"
//           value={formData.resolution}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Images */}
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold mb-4">Images</h2>
//         <input
//           type="file"
//           name="images"
//           accept=".jpg,.jpeg,.png,.gif,.pdf"
//           multiple
//           onChange={handleChange}
//         />
//         {formData.images.length > 0 && (
//           <div className="grid grid-cols-2 gap-4">
//             {formData.images.map((imageFile, index) => (
//               <div key={index} className="col-span-1">
//                 <img
//                   src={URL.createObjectURL(imageFile)}
//                   alt={`Image ${index + 1}`}
//                   className="w-full h-auto rounded"
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Signatures */}
//       <div className="flex justify-between mt-8">
//         <div className="w-1/3">
//           <p className="border-t pt-4">Manager's Signature</p>
//         </div>
//         <div className="w-1/3">
//           <p className="border-t pt-4">Client's Signature</p>
//         </div>
//       </div>

//       <button
//         onClick={() => generatePDF(formData)}
//         className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Generate PDF
//       </button>
//     </div>
//   );
// };




'use client';
import { Checkbox, CommonButtonSolidBlue } from '@/app/components/common/buttons';
import { CommonIconInput } from '@/app/components/common/inputs';
import { CommonSpinner, DangerNotification, SuccessNotification } from '@/app/components/common/notifications';
import CommonPopup from '@/app/components/common/popUp';
import { faHeading } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPrint } from 'react-icons/fa';

interface TableRow {
  No: number;
  TradeInDirect: string;
  ATS: string;
  SC: string;
  SC_Details: string;
}
interface Table2_1Row {
  No: number;
  material: string;
  qty: number;
  weight: number;
}

interface Table2_2Row {
  SerialNo: number;
  category: string;
  No:number;
}

interface Table3Row {
  SerialNo: number;
  ActivityDescription: string;
  LocationOfWorksInProgress: string;
  StartDate: Date;
  FinishDate: Date;
}
interface Table4Row {
  No: number;
  ActivityDescriptionNextDay: string;
  Location: string;
}

interface EmployeeTableProps {
  position?:string;
  project_id?:string;
  contractorId?:string;
  report_created_by?:string;
  report_id?:string;
  day?:string;
  weather?:string;
  temperature?:string;


}



const CreateReport= (props: any): JSX.Element => {

  const {project_id}= props as EmployeeTableProps
  const {contractorId}= props as EmployeeTableProps
  const {report_created_by}= props as EmployeeTableProps
  const {report_id}= props as EmployeeTableProps
  const {day}= props as EmployeeTableProps
  const {temperature}= props as EmployeeTableProps
  const {weather}= props as EmployeeTableProps

  const [day2,setDay]=useState(day);
  const [dead_line, setDeadLine] = useState<Date | Date[] | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [alerttype, setAlertType] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [heading_title, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [weather2, setWeather] = useState(weather);
  const [temperature2, setTemperature] = useState(temperature);



  const [tableData2, setTableData2] = useState<TableRow[]>([]);
  let [tableData, setTableData] = useState<TableRow[]>([
    { No: 1, TradeInDirect: 'Project Manager', ATS: '0', SC: '0', SC_Details: '' },
    { No: 2, TradeInDirect: 'Project Engineer', ATS: '0', SC: '0', SC_Details: '' },
    { No: 3, TradeInDirect: 'Site Engineer', ATS: '0', SC: '0', SC_Details: '' },
    { No: 4, TradeInDirect: 'Document Controller', ATS: '0', SC: '0', SC_Details: '' },
    { No: 5, TradeInDirect: 'HSE Officer', ATS: '0', SC: '0', SC_Details: '' },
    { No: 6, TradeInDirect: 'Foreman', ATS: '0', SC: '0', SC_Details: '' },
    { No: 7, TradeInDirect: 'Surveyor', ATS: '0', SC: '0', SC_Details: '' },
    { No: 8, TradeInDirect: 'Driver', ATS: '0', SC: '0', SC_Details: '' },
    { No: 9, TradeInDirect: 'Supervisor', ATS: '0', SC: '0', SC_Details: '' },
    { No: 10, TradeInDirect: 'Store Keeper', ATS: '0', SC: '0', SC_Details: '' },
    { No: 11, TradeInDirect: 'Mason', ATS: '0', SC: '0', SC_Details: '' },
    { No: 12, TradeInDirect: 'Labour', ATS: '0', SC: '0', SC_Details: '' },
    { No: 13, TradeInDirect: 'Erector /Rigger', ATS: '0', SC: '0', SC_Details: '' },
    { No: 14, TradeInDirect: 'Carpenter', ATS: '0', SC: '0', SC_Details: '' },
    { No: 15, TradeInDirect: 'Water Proofing Technician', ATS: '0', SC: '0', SC_Details: '' },
    { No: 16, TradeInDirect: 'Pile Breaker', ATS: '0', SC: '0', SC_Details: '' },
    { No: 17, TradeInDirect: 'Electrician/ Plumber', ATS: '0', SC: '0', SC_Details: '' },
    { No: 18, TradeInDirect: 'Crane operator', ATS: '0', SC: '0', SC_Details: '' },
    { No: 19, TradeInDirect: 'Others- Day & Night Security', ATS: '0', SC: '0', SC_Details: '' },
  ]);

  const addRow = () => {
    const newRow: TableRow = { No: tableData.length + 1, TradeInDirect: '', ATS: '', SC: '', SC_Details: '' };
    setTableData([...tableData, newRow]);
  };

  const calculateGrandTotal = (columnName: keyof TableRow) => {
    return tableData.reduce((total, row) => total + Number(row[columnName]) || 0, 0);
  };

  const handleCellValueChange = (index: number, columnName: keyof TableRow, value: string) => {
    const updatedData: TableRow[] = [...tableData];
    updatedData[index] = { ...updatedData[index], [columnName]: value };
    setTableData(updatedData);
  };
  let[table2_1Data2, setTable2_1Data2] = useState<Table2_1Row[]>([])

  let [table2_1Data, setTable2_1Data] = useState<Table2_1Row[]>([
    // Default rows for Table2-1
    { No: 1, material: '', qty: 0, weight: 0 },
    { No: 2, material: '', qty: 0, weight: 0 },
    { No: 3, material: '', qty: 0, weight: 0 },
    { No: 4, material: '', qty: 0, weight: 0 },
    { No: 5, material: '', qty: 0, weight: 0 },

  ]);
  let [table2_2Data2, setTable2_2Data2] = useState<Table2_2Row[]>([]);

  let [table2_2Data, setTable2_2Data] = useState<Table2_2Row[]>([
    // Default rows for Table2-2
    { SerialNo: 1, category: 'Generators',No:0 },
    { SerialNo: 2, category: 'Fork Lift',No:0 },
    { SerialNo: 3, category: '4 x 4 Pick-up',No:0 },
    { SerialNo: 4, category: 'Scissor Lift',No:0 },
    { SerialNo: 5, category: 'Plate Compactor',No:0 },
    { SerialNo: 6, category: 'Mini Roller',No:0 },
    { SerialNo: 7, category: 'Roller Compactor',No:0 },
    { SerialNo: 8, category: 'Water Tank',No:0 },
    { SerialNo: 9, category: 'JCB',No:0 },
    { SerialNo: 10, category: 'Manlift',No:0 },
    { SerialNo: 11, category: 'Compactor',No:0 },
    { SerialNo: 12, category: 'Compressor',No:0 },
    { SerialNo: 13, category: 'Vibrator (Power Tools)',No:0 },
    { SerialNo: 14, category: 'Level',No:0 },
    { SerialNo: 15, category: 'Total station',No:0 },
    { SerialNo: 16, category: 'Bending machine',No:0 },
    { SerialNo: 17, category: 'Mobile Crane',No:0 },
    { SerialNo: 18, category: 'Bobcat',No:0 },
    { SerialNo: 19, category: 'Shovel',No:0 },
    { SerialNo: 20, category: 'Excavator',No:0 },
    { SerialNo: 21, category: 'Pick Up 3 ton',No:0 },
    { SerialNo: 22, category: 'Epoxy Machine',No:0 },
    { SerialNo: 23, category: 'Boom Loader',No:0 },
    { SerialNo: 24, category: 'Water Tanker',No:0 },
    { SerialNo: 25, category: 'Floor Grinder',No:0 },
    { SerialNo: 26, category: 'Bar Cutter',No:0 },
    { SerialNo: 27, category: 'Drill Machine',No:0 },
    { SerialNo: 28, category: 'Welding Machine',No:0 },
    { SerialNo: 29, category: 'Zipping Machine',No:0 },
    { SerialNo: 30, category: 'Screw Machine',No:0 },
  ]);

  const handleTable2_1CellValueChange = (index: number, columnName: keyof Table2_1Row, value: string) => {
    const updatedData: Table2_1Row[] = [...table2_1Data];
    updatedData[index] = { ...updatedData[index], [columnName]: value };
    setTable2_1Data(updatedData);
  };
  const handleTable2_2CellValueChangePart1 = (index: number, columnName: keyof Table2_2Row, value: string) => {
    setTable2_2Data((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], [columnName]: value };
      return updatedData;
    });
  };
  
  const handleTable2_2CellValueChangePart2 = (index: number, columnName: keyof Table2_2Row, value: string) => {
    setTable2_2Data((prevData) => {
      const updatedData = [...prevData];
      const dataIndex = index + 15; // Adjust the index for the second part
      updatedData[dataIndex] = { ...updatedData[dataIndex], [columnName]: value };
      return updatedData;
    });
  };
  
  

  const addTable2_1Row = () => {
    const newRow: Table2_1Row = { No: table2_1Data.length + 1, material: '', qty: 0, weight: 0 };
    setTable2_1Data([...table2_1Data, newRow]);
  };

  const addTable2_2Row = () => {
    const newRow: Table2_2Row = { SerialNo: table2_2Data.length + 1, category: '', No: 0 };
    setTable2_2Data([...table2_2Data, newRow]);
  };
  let table2_2DataPart1 = table2_2Data.slice(0, 15);
  let table2_2DataPart2 = table2_2Data.slice(15);

  const handleDateChangeEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDateString = event.target.value;
    const selectedDate2 = new Date(selectedDateString);
    setDeadLine(selectedDate2);
  };
  const currentDate = new Date();
  let [table3Data2, setTable3Data2] = useState<Table3Row[]>([])

  let [table3Data, setTable3Data] = useState<Table3Row[]>([
    // Your initial data for table3
    {  SerialNo: 1,ActivityDescription:'Roof sheet cladding ( 500 msq)',
    LocationOfWorksInProgress: '',
    StartDate: currentDate,
    FinishDate: currentDate}
  ]);
  const handleTable3CellValueChange = (index: number, columnName: keyof Table3Row, value: string | Date) => {
    const updatedData: Table3Row[] = [...table3Data];
    let convertedValue: Date | string = value;
  
    // Convert the value to Date if it's a string and the column is 'StartDate' or 'FinishDate'
    if (typeof value === 'string' && (columnName === 'StartDate' || columnName === 'FinishDate')) {
      convertedValue = new Date(value);
    }
  
    updatedData[index] = { ...updatedData[index], [columnName]: convertedValue };
    setTable3Data(updatedData);
  };
  

  const addTable3Row = () => {
    const newRow: Table3Row = { SerialNo: table3Data.length + 1, ActivityDescription: '', LocationOfWorksInProgress: '', StartDate: currentDate, FinishDate: currentDate};
    setTable3Data([...table3Data, newRow]);
  };
  let [table4Data2, setTable4Data2] = useState<Table4Row[]>([])

  let [table4Data, setTable4Data] = useState<Table4Row[]>([
   {No:1,ActivityDescriptionNextDay:'Offloading of materials.',Location:''},
  ]);

  const handleTable4CellValueChange = (index: number, columnName: keyof Table4Row, value: string) => {
    const updatedData: Table4Row[] = [...table4Data];
    updatedData[index] = { ...updatedData[index], [columnName]: value };
    setTable4Data(updatedData);
  };

  const addTable4Row = () => {
    const newRow: Table4Row = { No: table4Data.length + 1, ActivityDescriptionNextDay: '', Location: '' };
    setTable4Data([...table4Data, newRow]);
  };


  const [isSunny, setIsSunny] = useState(false);
  const SunnyCheckboxChange = () => {
    setIsSunny((prev) => !prev);
    setWeather('sunny');
  };

  const [isCloudy, setIsCloudy] = useState(false);
  const CloudyCheckboxChange = () => {
    setIsCloudy((prev) => !prev);
    setWeather('cloudy');
 1 }; 
  
  const [isWindy, setIsWindy] = useState(false);
  const WindyCheckboxChange = () => {
    setIsWindy((prev) => !prev);
    setWeather('windy');
  };  
  
  const [isDusty, setIsDusty] = useState(false);


  const DustyCheckboxChange = () => {
    setIsDusty((prev) => !prev);
    setWeather('dusty');
  };
  // if (isDusty){
  //   setWeather('dusty');
  // }else if (isWindy){
  //   setWeather('windy');
  // }else if (isCloudy){
  //   setWeather('cloudy');
  // }else {
  //   setWeather('sunny');
  // }


  const submitReport = async () => {
    setShowLoader(true);
    setPopupVisible(false);
    try {
      // Prepare data for the API request
      const reportData = {
        date: dead_line, // Include the date or adjust as needed
        type: 'Daily', // Adjust the type as needed
        project_id:  project_id, // Replace with the actual project ID
        contractor_company: contractorId, // Replace with the actual organisation ID
        heading: heading_title, // Replace with the actual heading
        submitted_by: report_created_by, // Replace with the actual submitted_by value
        day:day2,
        weather:weather2,
        temperature:temperature2,
        progressDescription: description, // Replace with the actual progress description
        tables: [
          {
            tableName: 'table1', 
            entries: tableData,
          },
          {
            tableName: 'table2_1',
            entries: table2_1Data,
          },
          {
            tableName: 'table2_2', 
            entries: table2_2Data,
          },
          {
            tableName: 'table3', 
            entries: table3Data,
          },
          {
            tableName: 'table4',
            entries: table4Data,
          },
        ],
        // other_images: table3Data.map((row) => row.other_images).flat(), // Include other images as needed
        remark: 'your_remark', // Replace with the actual remark
      };

      // Make a POST request to the backend
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reports/create-report`, reportData);

      setMessage(`Report submitted successfully`);
      setAlertType('success');
      setShowLoader(false);
    } catch (error) {
    
      console.error('Error submitting report:', error);
    }
  };
  const updateReport = async () => {
    setShowLoader(true);
    try {
      // Prepare data for the API request
      const reportData = {
        date: dead_line, // Include the date or adjust as needed
        type: 'Daily', // Adjust the type as needed
        project_id:  project_id, // Replace with the actual project ID
        contractor_company: contractorId, // Replace with the actual organisation ID
        heading: heading_title, // Replace with the actual heading
        submitted_by: report_created_by, // Replace with the actual submitted_by value

        progressDescription: 'your_progress_description', // Replace with the actual progress description
        tables: [
          {
            tableName: 'table1', 
            entries: tableData,
          },
          {
            tableName: 'table2_1',
            entries: table2_1Data,
          },
          {
            tableName: 'table2_2', 
            entries: table2_2Data,
          },
          {
            tableName: 'table3', 
            entries: table3Data,
          },
          {
            tableName: 'table4',
            entries: table4Data,
          },
        ],
        // other_images: table3Data.map((row) => row.other_images).flat(), // Include other images as needed
        remark: 'your_remark', // Replace with the actual remark
      };

      // Make a POST request to the backend
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reports/update/report/${report_id}`, reportData);

      setMessage(`Report Updated successfully`);
      setAlertType('success');
      setShowLoader(false);
    } catch (error) {
    
      console.error('Error submitting report:', error);
    }
  };


  const fetchData = async () => {
   
    try {

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reports/get/report/${report_id}`);
        const fetchedData = response.data; 
        console.warn(fetchedData,"vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
        setTableData(fetchedData.report.tables[0].entries);
        setTable2_1Data(fetchedData.report.tables[1].entries);
        setTable2_2Data(fetchedData.report.tables[2].entries);
        setTable3Data(fetchedData.report.tables[3].entries);
        setTable4Data(fetchedData.report.tables[4].entries);
    } catch (error) {
  
      console.error('Error fetching data:', error);
    }
  };
if (report_id){
  fetchData()
  // if (tableData2){
  //   console.warn(tableData2,":::::::::::::::::::::::::::::::::::::::::::")
  //   tableData=tableData2;
  // }
  // if (table2_1Data2){
  //   table2_1Data=table2_1Data2;
  // }
  // if (table2_2Data2){
  //   table2_2Data=table2_2Data2;
  //   table2_2DataPart1 = table2_2Data.slice(0, 15);
  //   table2_2DataPart2 = table2_2Data.slice(15);
  //   }
  // if (table3Data2){
  //   // table3Data=table3Data2;
    
  // }
  // if (table4Data2){
  //   table4Data=table4Data2;
  // }
}
const formatDate = (date: Date): string => {
  if (date instanceof Date && !isNaN(date.getTime())) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return '';
};

const today = new Date().getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

// Set the default day based on the current day
const defaultDay = (() => {
  switch (today) {
    case 1: return 'Monday';
    case 2: return 'Tuesday';
    case 3: return 'Wednesday';
    case 4: return 'Thursday';
    case 5: return 'Friday';
    case 6: return 'Saturday';
    default: return 'Sunday';
  }
})();




  return (
    <div className=' overflow-x-scroll'>
            {errorMessage.length > 0 ? 
        <DangerNotification message={errorMessage} />
        : <></>}
      {message.length > 0 ? 
        <SuccessNotification  message={message} />
        : <></>}
        {showLoader ? <div className='mx-auto flex flex-col align-middle items-center mt-[-20px] justify-center'>
            <CommonSpinner/>
      </div> : <></>}
      {report_id?
          <div className='flex justify-end p-2'>
            <CommonButtonSolidBlue text='Update Report' onClick={updateReport} />
          </div>
      :
        <div className='flex justify-end p-2'>
          <CommonButtonSolidBlue text='Submit Report' onClick={()=>setPopupVisible(true)} />
        </div>}
      <div className=" overflow-x-scroll justify-center space-y-4 md:space-y-0">
      {/* Table 1 (Left Side) */}
      <div className="">
        <th className="flex items-center justify-center text-white bg-[color:var(--mainTitleColor)]  border p-2">ON SITE STAFF & LABOUR RECORD</th>
          <table className="table-auto w-full border-collapse">
      
            <thead className="bg-[color:var(--lightBackgroundGreyColor)] shadow-md border-2 border-white">
              <tr>                
                <th className="border p-2">No.</th>
                <th className="border p-2">Trade-InDirect</th>
                <th className="border p-2">ATS</th>
                <th className="border p-2">S.C</th>
                <th className="border p-2">SC Details</th>

              </tr>
            </thead>
          <tbody>

           {tableData.map((row, index) => (
              <tr key={index} className="hover:bg-[color:var(--mainTitleLightestColor)]">
                <td className="border p-2">{row.No}</td>
                <td className="border p-2" contentEditable onBlur={(e) => handleCellValueChange(index, 'TradeInDirect', e.target.innerText)}>
                  {row.TradeInDirect}
                </td>
                <td className="border p-2" contentEditable onBlur={(e) => handleCellValueChange(index, 'ATS', e.target.innerText)}>
                  {row.ATS}
                </td>
                <td className="border p-2" contentEditable onBlur={(e) => handleCellValueChange(index, 'SC', e.target.innerText)}>
                  {row.SC}
                </td>
                <td className="border p-2" contentEditable onBlur={(e) => handleCellValueChange(index, 'SC_Details', e.target.innerText)}>
                  {row.SC_Details}
                </td>
              </tr>
            ))

             }
          </tbody>
          <tfoot>
            <tr>
              <td className="border p-2 text-right" colSpan={1}>
               
              </td>
              <td className="border p-2 text-right font-bold"> Grand Total</td>
              <td className="border p-2 text-left">{calculateGrandTotal('ATS')}</td>
              <td className="border p-2 text-left">{calculateGrandTotal('SC')}</td>
              <td className="border p-2"></td>
            </tr>
          </tfoot>
        </table>
        {!report_id &&
        <button className="w-full rounded-xl bg-gray-50 text-[color:var(--mainTitleColor)] px-4 py-2 rounded" onClick={addRow}>
          Add Row
        </button>}
      </div>

      <div className="flex w-full justify-between  pt-4">
        {/* Table2-1 */}
        <div>
          <th className="flex items-center justify-center text-white bg-[color:var(--mainTitleColor)]  border p-2">DAILY SITE DIARY & PROGRESS REPORT</th>
          <div className="flex flex-col justify-between space-y-4 md:space-y-0">
            {/* Day, Date, Weather, Temperature */}
            <div className="w-full">
              <div className="flex space-x-4 p-4 m-4">
              <select 
                onChange={(event) => setDay(event.target.value)}
                id="Week Days" 
                defaultValue={defaultDay}
                value={day}
                className="p-2 bg-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleColor)] text-md rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-[color:var(--lightBackgroundColor)] dark:border-[color:var(--lightBackgroundColor)] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
                {/* Add a dropdown for weekdays */}
                <div className="truncate p-2 bg-[color:var(--mainTitleLightestColor)] rounded-2xl pl-4  ">
            <h1 className="text-[10px] text-[color:var(--mainTitleLightColor)]">Date</h1>
            
              <input
            type="date"
            className="text-md bg-[color:var(--mainTitleLightestColor)] text-[color:var(--mainTitleColor)] mt-1  placeholder-slate-400 focus:outline-none focus:border-[color:var(--primaryColor)] focus:ring-[color:var(--primaryColor)] block rounded-xl sm:text-sm focus:ring-1 w-full"
            onChange={handleDateChangeEnd}
            // max={currentDate.toISOString().split('T')[0]} // Set max date
          />
          </div>
                {/* Add a date picker here */}
              </div>
              <div className="p-4 flex space-x-4">
                {/* Add fancy checkboxes for weather */}
                <label>Weather:</label>
                {weather=='sunny'?
                  <Checkbox label={'Sunny'} isChecked={true} handleCheckboxChange={SunnyCheckboxChange}/>:

                  <Checkbox label={'Sunny'} isChecked={isSunny} handleCheckboxChange={SunnyCheckboxChange}/>}
                {weather=='cloudy'?
                  <Checkbox label={'Cloudy'} isChecked={true} handleCheckboxChange={CloudyCheckboxChange}/>:
                  <Checkbox label={'Cloudy'} isChecked={isCloudy} handleCheckboxChange={CloudyCheckboxChange}/>
                }
                {weather=='windy'?
                  <Checkbox label={'Windy'} isChecked={true} handleCheckboxChange={WindyCheckboxChange}/>:

                  <Checkbox label={'Windy'} isChecked={isWindy} handleCheckboxChange={WindyCheckboxChange}/>}
                {weather=='dusty'?
                  <Checkbox label={'Dusty'} isChecked={true} handleCheckboxChange={DustyCheckboxChange}/>:

                  <Checkbox label={'Dusty'} isChecked={isDusty} handleCheckboxChange={DustyCheckboxChange}/>}
                {/* Add input fields for temperature */}
              </div>
              <label className='p-4'>Temperature (Min/Max): <input className='m-4 border-2' onChange={(e) => {
                    setTemperature(e.target.value);
                    }} /></label> 
            </div>
            {/* Table2-1 Table */}
            <table className="table-auto w-full border-collapse">
              <thead className="bg-[color:var(--lightBackgroundGreyColor)] shadow-md border-2 border-white">
                <tr>
                  <th className="border p-2">NO.</th>
                  <th className="border p-2">Material</th>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">Weight (KG)</th>
                </tr>
              </thead>
              <tbody>
                {table2_1Data.map((row, index) => (
                  <tr key={index} className="hover:bg-[color:var(--mainTitleLightestColor)]">
                    <td className="border p-2">{row.No}</td>
                    <td className="border p-2" contentEditable onBlur={(e) => handleTable2_1CellValueChange(index, 'material', e.target.innerText)}>
                      {row.material}
                    </td>
                    <td className="border p-2" contentEditable onBlur={(e) => handleTable2_1CellValueChange(index, 'qty', e.target.innerText)}>
                      {row.qty}
                    </td>
                    <td className="border p-2" contentEditable onBlur={(e) => handleTable2_1CellValueChange(index, 'weight', e.target.innerText)}>
                      {row.weight}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!report_id &&
            <button className="w-full rounded-xl bg-gray-50 text-[color:var(--mainTitleColor)] px-4 py-2 rounded"  onClick={addTable2_1Row}>
              Add Row 
            </button>}
          </div>
        </div>

        {/* Table2-2 */}
        <div className='flex flex-col'>
        <th className="flex items-center justify-center border text-white bg-[color:var(--mainTitleColor)]  p-2">ON SITE PLANT & EQUIPMENT RECORD</th>
        <div className="flex">
        {/* Table2-2 Part 1 */}
    
        <div className="w-1/2">
          
          {/* Table2-2 Table */}
          <table className="table-auto w-full border-collapse">
            <thead className="bg-[color:var(--lightBackgroundGreyColor)] shadow-md border-2 border-white">
              <tr className=''>
                <th className=" border p-2 ">Serial NO.</th>
                <th className="flex w-[120px] flex-nowrap border p-2">Category</th>
                <th className="border p-2">No</th>
              </tr>
            </thead>
            <tbody>
              {table2_2DataPart1.map((row, index) => (
                <tr key={index} className="hover:bg-[color:var(--mainTitleLightestColor)]">
                  <td className="border p-2">{row.SerialNo}</td>
                  <td className="flex w-[200px] flex-nowrap border p-2" contentEditable onBlur={(e) => handleTable2_2CellValueChangePart1(index, 'No', e.target.innerText)}>
                  {row.category}
                  </td>
                  <td className="border p-2" contentEditable onBlur={(e) => handleTable2_2CellValueChangePart1(index, 'No', e.target.innerText)}>
                    {row.No}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* Table2-2 Part 2 */}
        <div className="w-1/2 ml-4">

          {/* Table2-2 Table */}
          <table className="table-auto w-full border-collapse">
            <thead className="bg-[color:var(--lightBackgroundGreyColor)] shadow-md border-2 border-white">
              <tr>
                <th className="border p-2">Serial NO.</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">No</th>
              </tr>
            </thead>
            <tbody>
              {table2_2DataPart2.map((row, index) => (
                <tr key={index} className="hover:bg-[color:var(--mainTitleLightestColor)]">
                  <td className="border p-2">{row.SerialNo}</td>
                  <td className="flex w-[200px] flex-nowrap border p-2" contentEditable onBlur={(e) => handleTable2_2CellValueChangePart2(index, 'category', e.target.innerText)}>
                    {row.category}
                  </td>
                  <td className="border p-2" contentEditable onBlur={(e) => handleTable2_2CellValueChangePart2(index, 'No', e.target.innerText)}>
                    {row.No}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!report_id &&
          <button className="w-full mt-4 rounded-xl bg-gray-50 text-[color:var(--mainTitleColor)] px-4 py-2 rounded"  onClick={addTable2_2Row}>
            Add Row
          </button>}
        </div>
      </div>
      </div>
      </div>
      <div className="pt-4">
        <th className="flex flex-nowrap w-auto items-center justify-center text-white bg-[color:var(--mainTitleColor)]  border p-2 ">ACTIVITY DESCRIPTION & LOCATION OF WORKS IN PROGRESS</th>
        {/* Table 3 */}
        <table className="table-auto w-full border-collapse">
          <thead className="bg-[color:var(--lightBackgroundGreyColor)] shadow-md border-2 border-white">
            <tr>
              <th className="border p-2">No</th>

              <th className="border p-2">Activity Description</th>
              <th className="border p-2">Location of Works in Progress</th>
              <th className="border p-2">Start Date</th>
              <th className="border p-2">Finish Date</th>
            </tr>
          </thead>
          <tbody>
            {table3Data.map((row, index) => (
              <tr key={index} className="hover:bg-[color:var(--mainTitleLightestColor)]">
                <td className="border p-2" contentEditable onBlur={(e) => handleTable3CellValueChange(index, 'SerialNo', e.target.innerText)}>
                  {row.SerialNo}
                </td>
                <td className="border p-2" contentEditable onBlur={(e) => handleTable3CellValueChange(index, 'ActivityDescription', e.target.innerText)}>
                  {row.ActivityDescription}
                </td>
                <td className="border p-2" contentEditable onBlur={(e) => handleTable3CellValueChange(index, 'LocationOfWorksInProgress', e.target.innerText)}>
                  {row.LocationOfWorksInProgress}
                </td>

                <td className="border p-2">
                  <input
                    value={row.StartDate ? new Date(row.StartDate).toISOString().split('T')[0] : ''}
                    type='date'
                    onChange={(e) => handleTable3CellValueChange(index, 'StartDate', e.target.value)}
                  />
                </td>

                <td className="border p-2">
                  <input
                    value={row.FinishDate ? new Date(row.FinishDate).toISOString().split('T')[0] : ''}
                    type='date'
                    onChange={(e) => handleTable3CellValueChange(index, 'FinishDate', e.target.value)}
                  />
                </td>


              </tr>
            ))}
          </tbody>
        </table>
        {!report_id &&
        <button className="w-full mt-4 rounded-xl bg-gray-50 text-[color:var(--mainTitleColor)] px-4 py-2 rounded"  onClick={addTable3Row}>
          Add Row
        </button>}
      </div>
      <div className="pt-4">
        <th className="flex items-center text-white bg-[color:var(--mainTitleColor)]  justify-center border p-2">ACTIVITY DESCRIPTION OF THE NEXT DAY & LOCATION</th>
        {/* Table 4 */}
        <table className="table-auto w-full border-collapse">
          <thead className="bg-[color:var(--lightBackgroundGreyColor)] shadow-md border-2 border-white">
            <tr>
              <th className="border p-2">No</th>
              <th className="border p-2">Activity Description of The Next Day</th>
              <th className="border p-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {table4Data.map((row, index) => (
              <tr key={index} className="hover:bg-[color:var(--mainTitleLightestColor)]">
                <td className="border p-2">{row.No}</td>
                <td className="border p-2" contentEditable onBlur={(e) => handleTable4CellValueChange(index, 'ActivityDescriptionNextDay', e.target.innerText)}>
                  {row.ActivityDescriptionNextDay}
                </td>
                <td className="border p-2" contentEditable onBlur={(e) => handleTable4CellValueChange(index, 'Location', e.target.innerText)}>
                  {row.Location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!report_id &&
        <button className="w-full mt-4 rounded-xl bg-gray-50 text-[color:var(--mainTitleColor)] px-4 py-2 rounded p-4"  onClick={addTable4Row}>
          Add Row
        </button>}
      </div>
    </div>
    <CommonPopup
                showModal={isPopupVisible}
                onClose={() => setPopupVisible(false)}
                heading={'Report Submission'}
                content='' >
              <div className=' flex-cols  sm:w-auto  overflow-scroll no-scrollbar'>  
              <div className='p-4'>
              <CommonIconInput
                    id="heading_title"
                    icon={faHeading}
                    required={true} 
                   
                    placeholder='Report Title'
                    onChange={(e) => {
                    setHeading(e.target.value);
                    }} 
                    />
                    </div>
                    <div className='p-4'>
                       <textarea 
                       className='border-2'
                       placeholder='Report Description' 
                        style={{ width: '300px', height: '150px' }}
                        onChange={(e) => {
                      setDescription(e.target.value);
                    }} />
                    </div>
                    <div className='flex items-center justify-center'>
                  <CommonButtonSolidBlue text="Submit Report" onClick={submitReport}/>
                  </div>
              </div>             
    </CommonPopup>
    </div>
  );
};
export default CreateReport

