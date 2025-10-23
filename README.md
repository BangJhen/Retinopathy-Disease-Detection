# RetinaScan

AI-powered eye disease detection system for 19 different retinal conditions.

## Overview

RetinaScan is a web-based application that uses machine learning to analyze fundus images and detect various eye diseases. The system can identify 19 different conditions including diabetic retinopathy, glaucoma, macular degeneration, and other retinal disorders.

## Features

- Real-time AI analysis of fundus images
- Detection of 19 eye disease classes
- Client-side processing for privacy
- Responsive web interface
- Demo mode with sample images
- Medical-grade accuracy reporting

## Technology Stack

- Next.js 14 with App Router
- ONNX Runtime Web for AI inference
- EfficientNet-B1 model architecture
- TailwindCSS for styling
- Lucide React for icons

## Installation

1. Clone the repository
```bash
git clone https://github.com/username/Retinopathy-Disease-Detection.git
cd Retinopathy-Disease-Detection
```

2. Install dependencies
```bash
npm install
```

3. Add model file
Place your ONNX model file in the `public` directory:
```
public/
├── model.onnx
└── [other files]
```

4. Add demo images
Place sample fundus images in the `public/demo` directory:
```
public/demo/
├── normal.jpg
├── diabetic-retinopathy.jpg
├── glaucoma.jpg
└── [other demo images]
```

## Usage

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

Build and start the production server:
```bash
npm run build
npm start
```

## How to Use the Application

### Basic Analysis

1. Open the application in your web browser
2. Wait for the AI model to load (status shown in header)
3. Click "Upload Image" or drag and drop a fundus image
4. Click "Analyze Image" to start the detection process
5. View the results with confidence scores and recommendations

### Demo Mode

1. Click "Try Demo" in the header
2. Select any sample image from the demo gallery
3. The system will simulate analysis and show results
4. Use this to understand how the application works

### Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- Maximum file size: 10MB
- Recommended resolution: 288x288 pixels or higher

## Detected Conditions

The system can detect the following eye conditions:

**Retinal Conditions**
- Normal (healthy eye)
- Macular Scar
- Central Serous Chorioretinopathy
- Drusen
- Age Macular Degeneration
- Retinal Detachment
- Macular Epiretinal Membrane
- Macular Hole

**Diabetic Retinopathy**
- Mild Diabetic Retinopathy
- Severe Diabetic Retinopathy
- Proliferative Diabetic Retinopathy

**Optic Nerve & Glaucoma**
- Disc Edema
- Glaucoma

**Vascular Conditions**
- Branch Retinal Vein Occlusion

**Surface & Lens**
- Pterygium
- Cataract

**Genetic & Other**
- Retinitis Pigmentosa
- Myopia
- Refractive Media Opacity

## Model Information

- Architecture: EfficientNet-B1
- Input size: 288x288x3 RGB images
- Output: 19-class probability distribution
- Framework: ONNX Runtime Web
- Processing: Client-side inference

## Important Notes

- This application is for screening purposes only
- Results do not replace professional medical diagnosis
- Always consult qualified healthcare providers for medical decisions
- The AI model provides probability scores, not definitive diagnoses

## Browser Requirements

- Modern web browser with WebAssembly support
- JavaScript enabled
- Minimum 2GB RAM recommended
- Stable internet connection for initial load

## File Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
├── data/               # Demo data and configurations
├── utils/              # Utility functions and model loaders
└── styles/             # Global styles

public/
├── model.onnx          # AI model file (add this)
├── demo/               # Demo images (add these)
└── [static assets]
```

## Configuration

The application uses several configuration files:

- `src/data/eyeConditions.js` - Disease definitions and styling
- `src/data/demoImages.js` - Demo image configurations
- `src/utils/imagePreprocessing.js` - Image processing settings
- `next.config.js` - Next.js configuration

## Troubleshooting

**Model not loading**
- Ensure model.onnx file is in the public directory
- Check browser console for error messages
- Verify WebAssembly support in your browser

**Analysis fails**
- Check image format and size requirements
- Ensure stable internet connection
- Try refreshing the page to reload the model

**Poor performance**
- Close other browser tabs to free memory
- Use a device with sufficient RAM
- Ensure good internet connection speed

## License

This project is for educational and research purposes. Consult appropriate licenses for commercial use.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For technical issues or questions, please create an issue in the repository or contact the development team.
