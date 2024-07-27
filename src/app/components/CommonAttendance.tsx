import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CommonButtonSolidBlue } from './common/buttons';
import SearchComponent from '../context/search';

interface User {
  _id: string;
  phone_no: string;
  first_name: string;
  last_name: string;
  profile_picture:string;
  attendance: {
    [key: string]: {
      absences: number[];
      leaves: number[];
    };
  };
}

interface AttendanceProps {
  employees: any[];
}

interface AttendanceRecord {
  phone_no: string;
  month: string;
  absences: number[];
  leaves: number[];
  status: 'P' | 'A' | 'L';
}

const CommonAttendance: React.FC<AttendanceProps> = ({ employees }) => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  
  useEffect(() => {
    // Initialize all employees as present by default
    const today = new Date();
    const month = today.toLocaleString('default', { month: 'short' });
    const defaultRecords: AttendanceRecord[] = employees.map(employee => ({
      phone_no: employee._id,
      month,
      absences: [],
      leaves: [],
      status: 'P'
    }));
    setAttendanceRecords(defaultRecords);
  }, [employees]);

  const handleMarkAttendance = (employeeId: string, dayOfMonth: number, status: 'P' | 'A' | 'L') => {
    const today = new Date();
    const month = today.toLocaleString('default', { month: 'short' });

    const existingEmployeeIndex = attendanceRecords.findIndex(emp => emp.phone_no === employeeId);

    if (existingEmployeeIndex !== -1) {
      const updatedRecord = { ...attendanceRecords[existingEmployeeIndex] };

      if (status === 'A') {
        updatedRecord.absences = [dayOfMonth];
        updatedRecord.leaves = [];
        updatedRecord.status = 'A';
      } else if (status === 'L') {
        updatedRecord.absences = [];
        updatedRecord.leaves = [dayOfMonth];
        updatedRecord.status = 'L';
      } else if (status === 'P') {
        updatedRecord.absences = [];
        updatedRecord.leaves = [];
        updatedRecord.status = 'P';
      }

      const updatedRecords = [...attendanceRecords];
      updatedRecords[existingEmployeeIndex] = updatedRecord;

      setAttendanceRecords(updatedRecords);
    }
  };

  const handleSubmit = async () => {
    try {
      for (const record of attendanceRecords) {
        const { phone_no, month, absences, leaves } = record;
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/${phone_no}/attendance`, {
          attendance: {
            [month]: { absences, leaves }
          }
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      alert('Attendance updated successfully!');
    } catch (error) {
      console.error('Error updating attendance:', error);
      alert('Failed to update attendance');
    }
  };
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);

  const handleSearch = (results: any[]) => {
    setFilteredEmployees(results);
  };

  const today = new Date();
  const currentDay = today.getDate();

  return (
    <div className='mt-2'>
                
            <div className='flex items-center justify-between p-2 m-2'>
              <SearchComponent onSearch={handleSearch} employees={filteredEmployees.length > 0 ? filteredEmployees : employees} />
              <CommonButtonSolidBlue  onClick={handleSubmit} text='Submit Attendance'/>
            </div>
    <div className="flex flex-wrap gap-4 mt-10">
      {attendanceRecords.map((record) => (
        <div key={record.phone_no} className="mb-2 p-2 border rounded-lg flex flex-col items-center items-center shadow-md transition transform hover:-translate-y-1 hover:shadow-lg">
          <img
            src={employees.find(emp => emp._id === record.phone_no)?.profile_picture || '/default-user-profile.png'}
            alt={`${employees.find(emp => emp._id === record.phone_no)?.first_name}`}
            className="rounded-full mb-2 w-12 h-12 object-cover"
          />
          <span className="text-lg font-medium truncate w-36 align-middle">{employees.find(emp => emp._id === record.phone_no)?.first_name} {employees.find(emp => emp._id === record.phone_no)?.last_name}</span>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => handleMarkAttendance(record.phone_no, currentDay, 'P')}
              className={`p-1 px-2 rounded-full ${record.status === 'P' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              P
            </button>
            <button
              onClick={() => handleMarkAttendance(record.phone_no, currentDay, 'A')}
              className={`p-1 px-2 rounded-full ${record.status === 'A' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            >
              A
            </button>
            <button
              onClick={() => handleMarkAttendance(record.phone_no, currentDay, 'L')}
              className={`p-1 px-2 rounded ${record.status === 'L' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
            >
              L
            </button>
          </div>
        </div>
      ))}
    </div>

  
  </div>
  );
};

export default CommonAttendance;
