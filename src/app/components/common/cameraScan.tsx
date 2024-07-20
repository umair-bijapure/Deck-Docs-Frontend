'use client';
import React, { useEffect, useRef, useState } from 'react';
import Tesseract, { createWorker } from 'tesseract.js';
import { FaCamera, FaTimes } from 'react-icons/fa';

interface CameraScanProps {
  openCamera?: boolean;
}
const CameraScan: React.FC<CameraScanProps> = () => {

  const [cameraVisible, setCameraVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [faceImage, setFaceImage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const startVideo = () => {
    if (cameraVisible && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    }
  };

  const openCamera = () => {
    setCameraVisible(true);
  };

  const closeCamera = () => {
    setCameraVisible(false); // Hide the camera interface
    
    // Stop the video stream
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  };
  
  const captureImage = async () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (videoRef.current && context) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
          const extractedText = await extractTextFromImage(file);
          
          const wholeImage = await extractTextFromImageNopara(file);
          setExtractedText(extractedText[0]+extractedText[1]);
          setCapturedImage(URL.createObjectURL(blob));

          console.warn(wholeImage,"gggggggggggggggggggggggggggggggggggggggggg")
          // Extract dates
          const dates = extractDates(extractedText[0], 'DocumentName');
          console.log('Dates:', dates);
          
          // Extract names
          const names = extractNames(extractedText[0], 'DocumentName');
          console.log('Names:', names);
          const fullName =recognizeFullName(extractedText[0]+extractedText[1]+extractedText[2])
          console.warn(fullName,"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkKKKKKKKKKKKKKKkkkkkkkkkk")
          // Extract ID numbers
          const idNumbers = extractIDNumber(extractedText[1], 'DocumentName');
          console.log('ID Numbers:', idNumbers);
          
          closeCamera(); // Turn off the camera after capturing the image
        }
      }, 'image/jpeg');
    }
  };
  

  const extractTextFromImage = async (imageFile: File): Promise<[string,string,string]> => {
    try {
      const originalImage = await loadImage(imageFile);

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Failed to get canvas context');
      }
      canvas.width = originalImage.width;
      canvas.height = originalImage.height;
      context.drawImage(originalImage, 0, 0, originalImage.width, originalImage.height);

      const width = originalImage.width;
      const height = originalImage.height;
      
      // Crop and extract text from left image
      const leftImageData = context.getImageData(0, 0, width, height);
      const leftText = await extractTextFromImageData(leftImageData);

      // Crop and extract text from right image
      const rightImageData = context.getImageData(width , 0, width  , height);
      const rightText = await extractTextFromImageData(rightImageData);

      // Crop and extract text from top image
      const topImageData = context.getImageData(0, 0, width, height );
      const topText = await extractTextFromImageData(topImageData);

      // Crop and extract text from bottom image
      const bottomImageData = context.getImageData(0, height , width, height );
      const bottomText = await extractTextFromImageData(bottomImageData);

      // Combine extracted text from all four images
      console.warn(leftText,rightText,topText,bottomText,"ppppppppppppppppppppppppppppppppppppppppppppppppppp")
      const combinedText = [leftText,rightText, topText, bottomText].join('\n');
      const combinedText2 = ['plqae'+leftText,'ghvvgh' ,'yeco'+rightText, 'sdvfv','ybbdllg'+topText, 'iwoqy','ggttaax'+bottomText].join('\n');


      return [combinedText,leftText,combinedText2];
    } catch (error) {
      console.error('Error during text extraction:', error);
      return ['','',''];
    }
  };

  const loadImage = (imageFile: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = URL.createObjectURL(imageFile);
    });
  };

  const extractTextFromImageData = async (imageData: ImageData): Promise<string> => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get canvas context');
    }
    canvas.width = imageData?.width;
    canvas.height = imageData?.height;
    context.putImageData(imageData, 0, 0);
    const dataUrl = canvas.toDataURL();
    const { data: { text } } = await Tesseract.recognize(dataUrl, 'eng');
    return text || '';
  };
  const extractTextFromImageNopara = async (imageFile: File): Promise<string> => {
    const { data: { text } } = await Tesseract.recognize(imageFile, 'eng');
    return text || '';
  };
  useEffect(() => {
    if (cameraVisible) {
      startVideo();
    }
  }, [cameraVisible]);

  return (
    <>
      {cameraVisible && (
        <div className="fixed inset-0 z-10 flex flex-col items-center justify-center">
          <video ref={videoRef} autoPlay />
          <button className="absolute top-4 right-4 text-red-500" onClick={closeCamera}>
            <FaTimes className="w-8 h-8" /> {/* Close camera button with red cross icon */}
          </button>
          <button onClick={captureImage} className="bg-blue-500 text-white rounded-full p-4 mt-4">
            <FaCamera className="w-8 h-8" /> {/* Capture image button with camera icon */}
          </button>
        </div>
      )}
      {capturedImage && (
        <div>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
      <div>
        <h2>Extracted Text:</h2>
        <pre>{extractedText}</pre>
      </div>
      <button onClick={openCamera}>Open Camera</button>
    </>
  );
};

export default CameraScan;





interface ExtractionResult {
  name: string;
  employer: string;
  issuingPlace: string;
  occupation: string;
  secondLongestSequence: string;
}

function extractNames(extractedText: string, documentName: string): ExtractionResult {
  const result: ExtractionResult = {
    name: "",
    employer: "",
    issuingPlace: "",
    occupation: "",
    secondLongestSequence: "",
  };

  console.warn(extractedText, "in names kkkkkkkiiiiiiiiiiiiiiiiiiiiiii");

  const employerRegex = /Employer\s*:\s*(.*?)\n/g;
  const issuingPlaceRegex = /Issuing Place: ([A-Za-z\s]+)/;
  const occupationRegex = /Occupation: ([A-Za-z\s]+)/;

  const employerMatch = extractedText.match(employerRegex);
  const issuingPlaceMatch = extractedText.match(issuingPlaceRegex);
  const occupationMatch = extractedText.match(occupationRegex);

  if (employerMatch) {
    result.employer = employerMatch[1].trim();
  }

  if (issuingPlaceMatch) {
    result.issuingPlace = issuingPlaceMatch[1].trim();
  }

  if (occupationMatch) {
    result.occupation = occupationMatch[1].trim();
  }

  // Extract potential names using the provided logic
  const words = extractedText.match(/[A-Za-z]+/g) || [];
  const potentialNames = words.join(' ');

  // Find the longest continuous subsequence
  const longestSequence = findLongestContinuousSubsequence(extractedText);

  result.name = longestSequence;

  // Find the second longest continuous subsequence
  let secondLongestSequence = "";
  let secondLongestLength = 0;

  // Iterate over each word to find the second longest sequence
  for (const word of words) {
    if (word !== longestSequence && word.length > secondLongestLength) {
      secondLongestSequence = word;
      secondLongestLength = word.length;
    }
  }

  result.secondLongestSequence = secondLongestSequence;

  // Return the result
  return result;
}



function findLongestContinuousSubsequence(text: string): string {
  let longestSubsequence = "";
  let currentSubsequence = "";

  // Iterate over each character in the text
  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    // If the character is alphabetic, a space, or a newline, add it to the current subsequence
    if (/[A-Za-z\s\n]/.test(char)) {
      currentSubsequence += char;
    } else {
      // If the current subsequence is longer than the longest one found so far, update the longest subsequence
      if (currentSubsequence.length > longestSubsequence.length) {
        longestSubsequence = currentSubsequence;
      }
      // Reset the current subsequence
      currentSubsequence = "";
    }
  }

  // Check if the current subsequence at the end is the longest
  if (currentSubsequence.length > longestSubsequence.length) {
    longestSubsequence = currentSubsequence;
  }

  return longestSubsequence.trim(); // Trim whitespace from the ends
}





// function extractNames(extractedText: string, documentName: string): ExtractionResult {
//   const result: ExtractionResult = {
//     name: "",
//     employer: "",
//     issuingPlace: "",
//     occupation: "",
//   };

//   const employerRegex = /Employer\s*:\s*(.*?)\n/g;
//   const issuingPlaceRegex = /Issuing Place: ([A-Za-z\s]+)/;
//   const occupationRegex = /Occupation: ([A-Za-z\s]+)/;

//   const employerMatch = extractedText.match(employerRegex);
//   const issuingPlaceMatch = extractedText.match(issuingPlaceRegex);
//   const occupationMatch = extractedText.match(occupationRegex);

//   if (employerMatch) {
//     result.employer = employerMatch[1].trim();
//   }

//   if (issuingPlaceMatch) {
//     result.issuingPlace = issuingPlaceMatch[1].trim();
//   }

//   if (occupationMatch) {
//     result.occupation = occupationMatch[1].trim();
//   }

//   const commonWords = ["card", "steel", "arc", "welder", "shop", "united", "number", "permanent", "account", "the", "and", "united", "arab", "emirates", "federal", "for", "&", "citizenship", "personal", "data", "and", "emergency", "contact", "date", "issuing", "republic", "people's", "personal", "contact", "emergency"];

//   let longestSequence = findLongestCommonSubsequence(extractedText);

//   for (let attempts = 0; attempts < 6; attempts++) {
//     if (!longestSequence) {
//       break;
//     }

//     const wordsInSequence = longestSequence.split(/\s+/);
//     const hasCommonWord = wordsInSequence.some(word => commonWords.includes(word.toLowerCase()));
//     if (hasCommonWord) {
//       result.name = longestSequence;
//       extractedText = extractedText.replace(longestSequence, "");
//       longestSequence = findLongestCommonSubsequence(extractedText);
//     }
//     result.name = longestSequence;
//   }
//   return result;
// }

const dynamicVariables: Record<string, string | null> = {};

function extractDates(combinedText: string, documentName: string) {
  const dateRegex = /\b(\d{1,2}[/-]\d{1,2}[/-]\d{4})\b/g;
  const dateRegex2 = /\b(\d{4}[/-]\d{1,2}[/-]\d{1,2})\b/g;
  const dateRegex3 = /\b(\d{1,2}[A-Z][A-Za-z]{2,8} \d{4})\b/g;
  const dateRegex4 = /\b(\d{1,2} [A-Z][A-Za-z]{2,8} \d{4})\b/g;
  const monthYearRegex = /\b(\d{1,2}\/\d{2})\b/g; // Added regex for month/year format

  const allDatesToConvert = [
    ...(combinedText.match(dateRegex) || []),
    ...(combinedText.match(dateRegex2) || []),
    ...(combinedText.match(dateRegex3) || []),
    ...(combinedText.match(dateRegex4) || []),
    ...(combinedText.match(monthYearRegex) || []) // Include month/year format
  ];

  const monthMapping: Record<string, string> = {
    'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04', 'MAY': '05', 'JUN': '06',
    'JUL': '07', 'AUG': '08', 'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
  };

  const allDates = allDatesToConvert.map(dateStr => {
    const parts = dateStr && dateStr.match(/(\d{2}) ([A-Z]{3}) (\d{4})/);

    if (parts) {
      const day = parseInt(parts[1], 10);
      const month = monthMapping[parts[2]];
      const year = parseInt(parts[3], 10);

      return `${day}/${month}/${year}`;
    } else {
      const parts2 = dateStr && dateStr.match(/(\d{2})([A-Z]{3}) (\d{4})/);

      if (parts2) {
        const day = parseInt(parts2[1], 10);
        const month = monthMapping[parts2[2]];
        const year = parseInt(parts2[3], 10);

        return `${day}/${month}/${year}`;
      } else {
        // Check if the date is in month/year format
        const parts3 = dateStr && dateStr.match(/(\d{1,2})\/(\d{2})/);
        if (parts3) {
          const month = parseInt(parts3[1], 10);
          const year = parseInt(parts3[2], 10);
          // Assuming day is always 01 for month/year format
          return `01/${month}/${year}`;
        } else {
          return dateStr;
        }
      }
    }
  });

  const currentDate = new Date();
  const dateObjects = allDates.map((dateStr) => {
    const isFormat1 = dateStr && dateStr[2] === '/' && dateStr[5] === '/';

    const parts = dateStr && dateStr.split(/[/-]/);

    let day: number | undefined, month: number | undefined, year: number | undefined;

    if (isFormat1 && parts) {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else if (!isFormat1 && parts) {
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    }

    if (day !== undefined && month !== undefined && year !== undefined) {
      const dateObject = new Date(Date.UTC(year, month - 1, day));
      return `${day}/${month}/${year}`;
    }

    return null;
  });

  const validDateObjects = dateObjects.filter((date) => date !== null);
  validDateObjects.sort();

  let dateOfBirth: string | null = null;
  let issuingDate: string | null = null;
  dynamicVariables[`${documentName}expiryDate`] = null;

  for (let i = 0; i < validDateObjects.length; i++) {
    const dateStr = validDateObjects[i];
    if (dateStr) {
      const [day, month, year] = dateStr.split('/').map(Number);
      const date = new Date(year, month - 1, day);

      const age = currentDate.getFullYear() - year;
      var last_four_digits = dateStr.slice(-4);

      if (age >= 12) {
        dateOfBirth = dateStr;
      }

      if (!issuingDate && currentDate.getFullYear() - parseInt(last_four_digits, 10) <= 4) {
        issuingDate = dateStr;
      }

      if (!dynamicVariables[`${documentName}expiryDate`]) {
        let isExpiryDate = true;
        for (let j = 0; j < validDateObjects.length; j++) {
          if (i !== j && new Date(dateStr) <= new Date(validDateObjects[j]!)) {
            isExpiryDate = false;
            break;
          }
        }
        if (isExpiryDate) {
          dynamicVariables[`${documentName}expiryDate`] = dateStr;
        }
      }
    }
  }

  return {
    dateOfBirth,
    issuingDate,
    [`${documentName}expiryDate`]: dynamicVariables[`${documentName}expiryDate`],
  };
}



function extractIDNumber(frontExtractedText: string, documentName?: string) {
  console.warn(frontExtractedText, "iiiiiiiiiiiiiiiiiiiiiii");
  const frontTextWithoutSpaces = frontExtractedText.replace(/\s/g, "");

  const alphanumericRegex = /[-\s.\w]+/g;
  const allMatches = [...frontTextWithoutSpaces.matchAll(alphanumericRegex)];

  const validSubstrings: string[] = [];

  for (const match of allMatches) {
    const currentSubstring = match[0];

    // Condition one: Check for alphanumeric characters, spaces, dots, dashes, forward slashes, or backward slashes
    if (/[0-9A-Z-.\s\\/]+/.test(currentSubstring)) {
      // Condition two: Check for a combination of alphabets (capital letters) and digits
      if (/^[A-Z]+\d+$/.test(currentSubstring) || /\d+[A-Z]+$/.test(currentSubstring)) {
        validSubstrings.push(currentSubstring);
      } else {
        validSubstrings.push(currentSubstring);
      }
    }
  }

  if (validSubstrings.length > 0) {
    let largestString = validSubstrings[0];

    for (let i = 1; i < validSubstrings.length; i++) {
      if (validSubstrings[i].length > largestString.length) {
        largestString = validSubstrings[i];
      }
    }

    // Remove lowercase letters from the end
    const sanitizedString = largestString.replace(/[a-z]+$/i, '');

    return sanitizedString;
  }

  return "ID Number not found";
}



function recognizeFullName(text: string): string {
  const words = text.split(/\s+/); // Tokenization by spaces
  let fullName = '';

  // Track if we've encountered the start of a potential full name
  let potentialFullName = '';

  // Track the number of consecutive capitalized words
  let consecutiveCapitalizedWords = 0;

  // Iterate through words to find potential name candidates
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    // Check if the word starts with a capital letter and contains alphabetic characters
    if (/[A-Z]/.test(word[0]) && /[a-zA-Z]/.test(word)) {
      // Increment the count of consecutive capitalized words
      consecutiveCapitalizedWords++;

      // Append the word to potentialFullName with a space separator
      potentialFullName += (potentialFullName ? ' ' : '') + word;
    } else {
      // Reset the count of consecutive capitalized words and potentialFullName
      consecutiveCapitalizedWords = 0;
      potentialFullName = '';
    }

    // If we have encountered at least three consecutive capitalized words, consider it as a potential full name
    if (consecutiveCapitalizedWords >= 3) {
      fullName = potentialFullName;
    }
  }

  return fullName;
}





function findLongestCommonSubsequence(extractedText: string): string {
  const strLength = extractedText.length;
  let longestSequence = "";

  for (let i = 0; i < strLength; i++) {
    for (let j = i + 1; j < strLength; j++) {
      let k = 0;
      while (j + k < strLength && extractedText[i + k] === extractedText[j + k]) {
        k++;
      }

      if (k > longestSequence.length) {
        const candidate = extractedText.substring(i, i + k);
        if (/^[A-Za-z\s]*$/.test(candidate)) {
          longestSequence = candidate;
        }
      }
    }
  }
  return longestSequence;
}
