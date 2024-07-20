import { NextApiRequest as Request, NextApiResponse as Response } from 'next';
import PDFParser from 'pdf-parse';
import Tesseract from 'tesseract.js';
import sizeOf from 'image-size';

interface Region {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ExtendedNextApiRequest extends Request {
  files?: {
    frontFile?: {
      data: Buffer;
    };
    backFile?: {
      data: Buffer;
    };
  };
}
interface ExtractedText {
  leftToRight: string;
  rightToLeft: string;
  topToBottom: string;
  bottomToTop: string;
  center: string;
}

const extractTextFromRegion = async (imageData: Buffer, region: Region): Promise<string> => {
  try {
    const croppedImageData = await cropImage(imageData, region.x, region.y, region.width, region.height);

    if (croppedImageData !== null) {
      const result = await Tesseract.recognize(croppedImageData, 'eng');
      return result.data.text;
    } else {
      console.error('Error extracting text: Cropped image data is null');
      return '';
    }
  } catch (error) {
    console.error('Error extracting text:', error);
    return '';
  }
};


const cropImage = async (imageData: Buffer, x: number, y: number, width: number, height: number): Promise<Buffer | null> => {
  try {
    const Jimp = require('jimp');
    const image = await Jimp.read(imageData);

    // Crop the image based on the specified region
    image.crop(x, y, width, height);

    // Convert the cropped image back to a buffer
    const croppedImageData = await image.getBufferAsync(Jimp.MIME_PNG);

    return croppedImageData;
  } catch (error) {
    console.error('Error cropping image:', error);
    return null;
  }
};


const extractText = async (req: ExtendedNextApiRequest, res: Response): Promise<void> => {
  const { frontFileType, backFileType } = req.body;
  const documentName = req.body.DocumentName;
  let fileType = frontFileType || backFileType;

  try {
    let ExtractedText: ExtractedText | string = ''; // Updated ExtractedText type

    if (fileType === 'application/pdf') {
      if (req.files?.frontFile) {
        const frontPdfData = await PDFParser(req.files.frontFile.data);
        ExtractedText = { leftToRight: frontPdfData.text, rightToLeft: '', topToBottom: '', bottomToTop: '', center: '' };
      }
    } else if (fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png') {
      let ImageData: Buffer | undefined = undefined;

      if (req.files?.frontFile) {
        ImageData = req.files.frontFile.data;
      } else if (req.files?.backFile) {
        ImageData = req.files.backFile.data;
      }

      if (ImageData) {
        const ImageDimensions = sizeOf(ImageData);

        if (ImageDimensions && ImageDimensions.width && ImageDimensions.height) {
          const width = ImageDimensions.width;
          const height = ImageDimensions.height;
          const centerX = width / 5;
          const centerY = height / 5;

          const leftToRightRegion = { x: 0, y: 0, width: width * 0.6, height: height };
          const rightToLeftRegion = { x: width * 0.4, y: 0, width: width * 0.6, height: height };
          const topToBottomRegion = { x: 0, y: 0, width: width, height: height * 0.6 };
          const bottomToTopRegion = { x: 0, y: height * 0.4, width: width, height: height * 0.6 };
          const centerRegion = { x: centerX, y: centerY, width: width - 2 * centerX, height: height - 2 * centerY };

          const leftToRightText = await extractTextFromRegion(ImageData, leftToRightRegion);
          const rightToLeftText = await extractTextFromRegion(ImageData, rightToLeftRegion);
          const topToBottomText = await extractTextFromRegion(ImageData, topToBottomRegion);
          const bottomToTopText = await extractTextFromRegion(ImageData, bottomToTopRegion);
          const centerText = await extractTextFromRegion(ImageData, centerRegion);

          ExtractedText = {
            leftToRight: leftToRightText,
            rightToLeft: rightToLeftText,
            topToBottom: topToBottomText,
            bottomToTop: bottomToTopText,
            center: centerText,
          };
        }
      }
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    if (typeof ExtractedText === 'object') {
      const combinedText =
        ExtractedText.leftToRight + ExtractedText.rightToLeft + ExtractedText.topToBottom + ExtractedText.bottomToTop;
      const dates = extractDates(combinedText);
    
      // Adjust types based on the actual return types of extractNames and extractIDNumber
      let extractedIdNumbers: { [x: number]: string } = {}; // or a more specific type
      let names: ExtractionResult = { name: "", employer: "", issuingPlace: "", occupation: "" };
    
      if (documentName === 'EmiratesId') {
        names = extractNames(combinedText + ExtractedText.center + ExtractedText.center, documentName);
      }
    
      extractedIdNumbers = { [documentName]: extractIDNumber(combinedText, documentName) };
    

      const response = {
        dates,
        extractedIdNumbers,
        names,
      };
      res.json(response);
    } else {
      // Processing for PDF
      const dates = extractDates(ExtractedText);
      const emiratesIdNumbers = extractIDNumber(ExtractedText, documentName);
      const names = extractNames(ExtractedText, documentName);

      const response = {
        dates,
        emiratesIdNumbers,
        names,
      };
      res.json(response);
    }
  } catch (error) {
    console.error('Error extracting text:', error);
    res.status(500).json({ error: 'Text extraction failed' });
  }
};

interface ExtractionResult {
  name: string;
  employer: string;
  issuingPlace: string;
  occupation: string;
}

interface DateExtractionResult {
  dateOfBirth: string | null;
  issuingDate: string | null;
  expiryDate: string | null;
}

interface DocumentNameMapping {
  [key: string]: string;
}

// Add more document names as needed
const documentNameMapping: DocumentNameMapping = {
  EmiratesId: 'Emirates ID',
  Visa: 'Visa',
  // Add other document names here
};

function extractNames(extractedText: string, documentName: keyof DocumentNameMapping): ExtractionResult {
  const result: ExtractionResult = {
    name: '',
    employer: '',
    issuingPlace: '',
    occupation: '',
  };

  const employerRegex = /Employer\s*:\s*(.*?)\n/g;
  const issuingPlaceRegex = /Issuing Place: ([A-Za-z\s]+)/;
  const occupationRegex = /Occupation: ([A-Za-z\s]+)/;

  // Use regular expressions to extract information
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

  // List of common English words to exclude (in lowercase)
  const commonWords = [
    'card', 'steel', 'arc', 'welder', 'shop', 'united', 'number', 'permanent', 'account',
    'the', 'and', 'united', 'arab', 'emirates', 'federal', 'for', '&', 'citizenship', 'personal',
    'data', 'and', 'emergency', 'contact', 'date', 'issuing', 'republic', 'people\'s', 'personal',
    'contact', 'emergency'
  ];

  let longestSequence = findLongestCommonSubsequence(extractedText);

  for (let attempts = 0; attempts < 6; attempts++) {
    if (!longestSequence) {
      break; // No more valid subsequences found
    }

    // Check if the sequence contains any word from commonWords
    const wordsInSequence = longestSequence.split(/\s+/);
    const hasCommonWord = wordsInSequence.some((word: string) => commonWords.includes(word.toLowerCase()));
    if (hasCommonWord) {
      result.name = longestSequence;
      // Remove the found sequence from the text
      extractedText = extractedText.replace(longestSequence, '');
      longestSequence = findLongestCommonSubsequence(extractedText);
    }
    result.name = longestSequence;
  }
  return result;
}

function extractDates(combinedText: string): DateExtractionResult {
  // Define regular expressions for various date patterns
  const dateRegex = /\b(\d{1,2}[/-]\d{1,2}[/-]\d{4})\b/g; // Matches dates in formats "dd/mm/yyyy" or "dd-mm-yyyy"
  const dateRegex2 = /\b(\d{4}[/-]\d{1,2}[/-]\d{1,2})\b/g; // Matches dates in formats "yyyy-mm-dd" or "yyyy/mm/dd"
  const dateRegex3 = /\b(\d{1,2}[A-Z][A-Za-z]{2,8} \d{4})\b/g;
  const dateRegex4 = /\b(\d{1,2} [A-Z][A-Za-z]{2,8} \d{4})\b/g;

  // Extract dates from the combined text
  const allDatesToConvert = [...new Set([...(combinedText.match(dateRegex) || []),
    ...(combinedText.match(dateRegex2) || []),
    ...(combinedText.match(dateRegex3) || []),
    ...(combinedText.match(dateRegex4) || [])])];

    const monthMapping: Record<string, string> = {
      JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06',
      JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12'
    };
    

  const allDates = allDatesToConvert.map(dateStr => {
    // Check if the date matches the 'DD MON YYYY' pattern
    const parts = dateStr.match(/(\d{2}) ([A-Z]{3}) (\d{4})/);

    if (parts) {
      const day = parts[1];
      const month = monthMapping[parts[2]];
      const year = parts[3];

      return `${day}/${month}/${year}`;
    } else {
      // Check if the date matches the 'DDMON YYYY' pattern
      const parts2 = dateStr.match(/(\d{2})([A-Z]{3}) (\d{4})/);

      if (parts2) {
        const day = parts2[1];
        const month = monthMapping[parts2[2]];
        const year = parts2[3];

        return `${day}/${month}/${year}`;
      } else {
        return dateStr; // Return the original date if it doesn't match either pattern
      }
    }
  });

  // Process and filter the dates
  const currentDate = new Date();
  const dateObjects = allDates.map((dateStr) => {
    // Determine date format based on the presence of '/'
    const isFormat1 = dateStr[2] === '/' && dateStr[5] === '/';

    // Split the date string into components
    const parts = dateStr.split(/[/-]/);

    let day, month, year;

    if (isFormat1) {
      // Format: DD/MM/YYYY
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else {
      // Format: YYYY/MM/DD
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    }

    // Check if the values are valid numbers
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      // Create Date objects without changing the date format and time
      const dateObject = new Date(Date.UTC(year, month - 1, day));
      // Format the date as 'dd/mm/yyyy'
      return `${day}/${month}/${year}`;
    }

    return null;
  });

  // Remove null values (invalid dates)
  const validDateObjects = dateObjects.filter((date): date is string => date !== null);
  // Sort the dates in ascending order
  validDateObjects.sort();

  // Define the criteria for identifying dates
  let dateOfBirth: string | null = null;
  let issuingDate: string | null = null;
  let expiryDate: string | null = null;

  for (let i = 0; i < validDateObjects.length; i++) {
    const dateStr = validDateObjects[i];
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    // Calculate age based on date of birth
    const age = currentDate.getFullYear() - date.getFullYear();
    const last_four_digits = dateStr.slice(-4);
    // Check for date of birth
    if (age >= 12) {
      dateOfBirth = dateStr;
    }

    // Check for issuing date (between DOB and current date)
    if (!issuingDate && currentDate.getFullYear() - parseInt(last_four_digits, 10) <= 4) {
      issuingDate = dateStr;
    }

    // Check for expiry date (greater than all other dates)
    if (!expiryDate) {
      let isExpiryDate = true;
      for (let j = 0; j < validDateObjects.length; j++) {
        if (i !== j && date <= new Date(validDateObjects[j])) {
          isExpiryDate = false;
          break;
        }
      }
      if (isExpiryDate) {
        expiryDate = dateStr;
      }
    }
  }

  return {
    dateOfBirth,
    issuingDate,
    expiryDate,
  };
}

function findLongestCommonSubsequence(extractedText: string): string {
  const strLength = extractedText.length;
  let longestSequence = "";

  for (let i = 0; i < strLength; i++) {
    for (let j = i + 1; j < strLength; j++) {
      // Compare substrings starting from i and j
      let k = 0;
      while (j + k < strLength && extractedText[i + k] === extractedText[j + k]) {
        k++;
      }

      if (k > longestSequence.length) {
        const candidate = extractedText.substring(i, i + k);

        // Check if the candidate only contains English alphabets and spaces
        if (/^[A-Za-z\s]*$/.test(candidate)) {
          longestSequence = candidate;
        }
      }
    }
  }
  return longestSequence;
}


function extractIDNumber(frontExtractedText: string, documentName: keyof DocumentNameMapping): string {
  const frontTextWithoutSpaces = frontExtractedText.replace(/\s/g, '');

  if (documentName === 'EmiratesId') {
    const emiratesIDNumberRegex = /(\d{3}-\d{4}-\d{7}-\d{1})/g;
    const allMatches = [...frontTextWithoutSpaces.matchAll(emiratesIDNumberRegex)];

    for (const match of allMatches) {
      const emiratesID = match[0].replace(/-/g, '');

      // Check for the presence of 784 in the ID
      if (emiratesID.includes('784')) {
        // Additional checks for valid Emirates ID numbers
        const birthYear = parseInt(emiratesID.substr(3, 4), 10);
        const currentYear = new Date().getFullYear();

        if (
          birthYear < currentYear - 12 &&
          birthYear > currentYear - 100 && // Assuming the person is not older than 100
          match[0].split('-').length - 1 <= 3 // Check for a reasonable number of hyphens
        ) {
          return match[0];
        } else {
          return 'Emirates ID Number not found';
        }
      }
    }
  } else if (documentName === 'Visa') {
    const fileNo = /((101|201|301|401)\/\d+\/\d+\/\d+)/g;
    // Find all matches in the text
    const matches = frontExtractedText.match(fileNo);

    // Initialize a variable to store the largest string
    let largestString = '';

    // Iterate through the matches to find the largest one
    if (matches) {
      matches.forEach((match) => {
        if (match.length > largestString.length) {
          largestString = match;
        }
      });
      return largestString;
    }
  }

  return '';
}


export default extractText;

