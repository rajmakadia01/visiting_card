// App.js


// function App() {
//   const initialFormData = {
//     username: '',
//     logo: null,
//     qrCodeData: '',
//     companyName: '',
//     companyAddress: '',
//     email: '',
//     phone: '',
//     linkedin: ''
//   };

//   const [formData, setFormData] = useState({ ...initialFormData });
//   const [showFront, setShowFront] = useState(true);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleLogoChange = (e) => {
//     const file = e.target.files[0];
//     setFormData(prevState => ({
//       ...prevState,
//       logo: file
//     }));
//   };

//   const toggleSide = () => {
//     setShowFront(prevState => !prevState);
//   };

//   const handleDownload = () => {
//     const card = document.getElementById('card');
//     html2canvas(card).then(canvas => {
//       const dataURL = canvas.toDataURL('image/png');
//       const link = document.createElement('a');
//       link.href = dataURL;
//       link.download = 'business_card.png';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     });
//   };

//   const handleClear = () => {
//     setFormData({ ...initialFormData });
//   };

//   return (
//     <div className="app">
//       <div className="card" id="card">
//         {showFront ? (
//           <div className="front">
//             <div className="content">
//               {formData.logo && <img src={URL.createObjectURL(formData.logo)} alt="Logo" className="logo" />}
//               <h2 className="card-username">{formData.username}</h2>
//               <div className="qr-code">
//                 <QRCode value={formData.qrCodeData} />
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="back">
//             <h1 className="title">Back Side</h1>
//             <div className="content">
//               <p className="card-company">{formData.companyName}</p>
//               <p className="card-address">{formData.companyAddress}</p>
//               <p className="card-email">{formData.email}</p>
//               <p className="card-phone">{formData.phone}</p>
//               <p className="card-linkedin">{formData.linkedin}</p>
//             </div>
//           </div>
//         )}
        
//       </div>
//       <div className="form">
//         <label htmlFor="username">Username:</label>
//         <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />

//         <label htmlFor="logo">Logo:</label>
//         <input type="file" id="logo" name="logo" onChange={handleLogoChange} accept="image/*" />

//         <label htmlFor="companyName">Company Name:</label>
//         <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />

//         <label htmlFor="companyAddress">Company Address:</label>
//         <input type="text" id="companyAddress" name="companyAddress" value={formData.companyAddress} onChange={handleChange} />

//         <label htmlFor="email">Email:</label>
//         <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

//         <label htmlFor="phone">Phone:</label>
//         <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />

//         <label htmlFor="linkedin">LinkedIn:</label>
//         <input type="text" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} />

//         <div className="navigation">
//           <button className="button" onClick={handleDownload}>
//             Download
//           </button>
//           <button className="button" onClick={handleClear}>
//             Clear
//           </button>
//           <div className="navigation">
//           <button className="button" onClick={toggleSide}>
//             {showFront ? 'Back' : 'Front'}
//           </button>
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas'; // Import html2canvas for capturing the image
import './App.css';
import image from '../src/images/image.png'; // Import the background image




const App = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    companyName: '',
    companyAddress: '',
    phone: '',
    linkedin: '',
    degination:'',
    logo: null,
  });

  const [isFront, setIsFront] = useState(true);
  const [companyUrl, setCompanyUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const cardRef = useRef(null);

  const toggleSide = () => {
    setIsFront(prevState => !prevState);
  };



  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      // Handle logo upload
      setFormData(prevData => ({
        ...prevData,
        logo: e.target.files[0], // Store the uploaded file
      }));
    } else {
      // Handle other input changes
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
      if (name === 'companyUrl') {
        setCompanyUrl(value);
      } else if (name === 'linkedin') {
        setLinkedinUrl(value); // Update the LinkedIn URL state
      }
    }
  };

  const handleDownload = () => {
    const cardContent = cardRef.current;
  
    // Define padding
    const padding = { top: 0, right: 20, bottom: 20, left: 0 }; // Adjust padding values as needed
  
    // Calculate total width and height including padding
    const canvasWidth = 540; // Set the desired canvas width
    const canvasHeight = 300; // Set the desired canvas height
  
    // Calculate width and height of card content without padding
    const cardWidth = canvasWidth - padding.left - padding.right;
    const cardHeight = canvasHeight - padding.top - padding.bottom;
  
    // Create a new canvas element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    // Set canvas dimensions
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  
    // Create an image element for the background image
    const backgroundImage = new Image();
    backgroundImage.crossOrigin = 'anonymous'; // Enable CORS for the image
    backgroundImage.src = image; // Set the background image source
  
    // Draw the background image onto the canvas
    backgroundImage.onload = () => {
      context.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight); // Draw the image with specified dimensions
  
      // Convert the card content to an image and draw it onto the canvas
      html2canvas(cardContent, {
        useCORS: true, // Enable CORS to load images from other origins
        allowTaint: true, // Allow rendering of images loaded from other origins
        backgroundColor: null, // Set background color to transparent
        width: cardWidth, // Set width without padding
        height: cardHeight, // Set height without padding
        x: padding.left, // Set x position considering left padding
        y: padding.top // Set y position considering top padding
      }).then(cardCanvas => {
        context.drawImage(cardCanvas, padding.left, padding.top); // Draw the card content at the appropriate position
  
        // Convert the canvas to a data URL and initiate download
        const imageDataUrl = canvas.toDataURL('images/png');
  
        const downloadLink = document.createElement('a');
        downloadLink.href = imageDataUrl;
        downloadLink.download = 'business_card.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
    };
  };
  

  const handleDownloadBack = () => {
    const cardContent = cardRef.current;
  
    // Define padding
    const padding = { top: 0, right: 20, bottom: 20, left: 0 }; // Adjust padding values as needed
  
    // Calculate total width and height including padding
    const canvasWidth = 530; // Set the desired canvas width
    const canvasHeight = 300; // Set the desired canvas height
  
    // Calculate width and height of card content without padding
    const cardWidth = canvasWidth - padding.left - padding.right;
    const cardHeight = canvasHeight - padding.top - padding.bottom;
  
    // Create a new canvas element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    // Set canvas dimensions
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  
    // Create an image element for the background image
    const backgroundImage = new Image();
    backgroundImage.crossOrigin = 'anonymous'; // Enable CORS for the image
    backgroundImage.src = image; // Set the background image source
  
    // Draw the background image onto the canvas
    backgroundImage.onload = () => {
      context.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight); // Draw the image with specified dimensions
  
      // Convert the card content to an image and draw it onto the canvas
      html2canvas(cardContent, {
        useCORS: true, // Enable CORS to load images from other origins
        allowTaint: true, // Allow rendering of images loaded from other origins
        backgroundColor: null, // Set background color to transparent
        width: cardWidth, // Set width without padding
        height: cardHeight, // Set height without padding
        x: padding.left, // Set x position considering left padding
        y: padding.top // Set y position considering top padding
      }).then(cardCanvas => {
        context.drawImage(cardCanvas, padding.left, padding.top); // Draw the card content at the appropriate position
  
        // Convert the canvas to a data URL and initiate download
        const imageDataUrl = canvas.toDataURL('images/png');
  
        const downloadLink = document.createElement('a');
        downloadLink.href = imageDataUrl;
        downloadLink.download = 'business_card.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
    };
  };

  
  

  return (
    <div className="app">
      <div className="image-container" ref={cardRef}>
        <img src={image} alt="Your Image" className="image" />
        <div className="overlay">
          <div className="overlay-content" ref={cardRef}>
            {isFront ? (
            <>
            <div className='front_side'>
              <div className='setform'>
                <h2 className='username'>{formData.username}</h2>
                <h2 className='degignation'>{formData.degination}</h2>
              </div>
              <div className='divider'></div>
              <div className='phone'>
                <p className='phone'>{formData.phone}</p>
              </div>
              <div >
                <p className='linkdin'>{formData.linkedin}</p>
              </div>
              <div className=''>
                <p className='address'>{formData.companyAddress}</p>
              </div>
              <div>
                {/* Display the uploaded logo as an image */}
                {formData.logo && (
                  <img src={URL.createObjectURL(formData.logo)} alt="Logo" className="logo" />
                )}
              </div>
              {/* <p className='email'>{formData.email}</p> */}
            </div>
          </>
            ) : (
              <>
                <div className='back_side'>
                  <h2 className='username'>{formData.companyName}</h2>
                </div>
                <div className="qr-code">
                  <QRCode value={companyUrl} style={{ width: '40px', height: '40px' }}/>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <form className="form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          minLength={3} // Minimum length of 3 characters
          maxLength={18} // Maximum length of 18 characters
          required
        />
        <input
          type="text"
          name="degination"
          placeholder="Degination"
          value={formData.degination}
          onChange={handleInputChange}
          minLength={3} // Minimum length of 3 characters
          maxLength={25} 
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="companyAddress"
          placeholder="Company Address"
          value={formData.companyAddress}
          onChange={handleInputChange}
          minLength={3} // Minimum length of 3 characters
          maxLength={25} 
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          maxLength={10}
          pattern="[0-9]*" // Only allow numerical input
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn"
          value={formData.linkedin}
          onChange={handleInputChange}
          minLength={3} // Minimum length of 3 characters
          maxLength={23} 
        />
        <input
          type="text"
          name='companyUrl'
          placeholder="Enter Company URL"
          value={companyUrl}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleInputChange}
        />
        <button type="button" className="toggle-button" onClick={toggleSide}>{isFront ? 'Back' : 'Front'}</button>
        <button type="button" className="download-button" onClick={handleDownload}>Download Front</button>
        <button type="button" className="download-button" onClick={handleDownloadBack}>Download Back</button>
      </form>
    </div>
  );
};

export default App;

