/**
 * Image preprocessing utilities for retinal disease classification
 * Matches the Python transforms used in training
 */

// ImageNet normalization values (same as in Python code)
const IMAGENET_MEAN = [0.485, 0.456, 0.406];
const IMAGENET_STD = [0.229, 0.224, 0.225];

/**
 * Resize image to target size
 * @param {ImageData} imageData - Canvas ImageData
 * @param {number} targetSize - Target size (288 for your EfficientNet model)
 * @returns {Promise<ImageData>} Resized image data
 */
export async function resizeImage(imageData, targetSize = 288) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = targetSize;
    canvas.height = targetSize;
    
    // Create temporary canvas with original image
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = imageData.width;
    tempCanvas.height = imageData.height;
    tempCtx.putImageData(imageData, 0, 0);
    
    // Draw resized image
    ctx.drawImage(tempCanvas, 0, 0, targetSize, targetSize);
    
    const resizedImageData = ctx.getImageData(0, 0, targetSize, targetSize);
    resolve(resizedImageData);
  });
}

/**
 * Convert image file to ImageData
 * @param {File} file - Image file
 * @returns {Promise<ImageData>} Image data
 */
export async function fileToImageData(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      resolve(imageData);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Convert image URL to ImageData
 * @param {string} imageUrl - Image URL or data URL
 * @returns {Promise<ImageData>} Image data
 */
export async function urlToImageData(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      resolve(imageData);
    };
    img.onerror = reject;
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
  });
}

/**
 * Normalize image data using ImageNet statistics
 * @param {ImageData} imageData - Image data to normalize
 * @returns {Float32Array} Normalized tensor data [C, H, W] format
 */
export function normalizeImage(imageData) {
  const { data, width, height } = imageData;
  const tensorData = new Float32Array(3 * width * height);
  
  // Convert RGBA to RGB and normalize
  for (let i = 0; i < width * height; i++) {
    const pixelIndex = i * 4; // RGBA format
    
    // Extract RGB values (0-255) and convert to 0-1
    const r = data[pixelIndex] / 255.0;
    const g = data[pixelIndex + 1] / 255.0;
    const b = data[pixelIndex + 2] / 255.0;
    
    // Apply ImageNet normalization: (pixel - mean) / std
    // Store in CHW format (Channel, Height, Width)
    tensorData[i] = (r - IMAGENET_MEAN[0]) / IMAGENET_STD[0]; // R channel
    tensorData[width * height + i] = (g - IMAGENET_MEAN[1]) / IMAGENET_STD[1]; // G channel
    tensorData[2 * width * height + i] = (b - IMAGENET_MEAN[2]) / IMAGENET_STD[2]; // B channel
  }
  
  return tensorData;
}

/**
 * Complete preprocessing pipeline for inference
 * Matches the val_transforms from Python code:
 * - Resize to target size
 * - Normalize with ImageNet stats
 * - Convert to tensor format
 * 
 * @param {File|string} input - Image file or URL
 * @param {number} targetSize - Target image size (default 288)
 * @returns {Promise<{tensorData: Float32Array, shape: number[]}>} Preprocessed tensor
 */
export async function preprocessImage(input, targetSize = 288) {
  try {
    // Convert input to ImageData
    let imageData;
    if (input instanceof File) {
      imageData = await fileToImageData(input);
    } else if (typeof input === 'string') {
      imageData = await urlToImageData(input);
    } else {
      throw new Error('Input must be a File or image URL string');
    }
    
    // Resize image to target size
    const resizedImageData = await resizeImage(imageData, targetSize);
    
    // Normalize and convert to tensor format
    const tensorData = normalizeImage(resizedImageData);
    
    // Return tensor data with shape [1, 3, H, W] for batch processing
    return {
      tensorData,
      shape: [1, 3, targetSize, targetSize]
    };
  } catch (error) {
    console.error('Error preprocessing image:', error);
    throw error;
  }
}

/**
 * Utility function to validate image file
 * @param {File} file - File to validate
 * @returns {boolean} True if valid image file
 */
export function isValidImageFile(file) {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  return validTypes.includes(file.type);
}

/**
 * Utility function to get image dimensions
 * @param {File} file - Image file
 * @returns {Promise<{width: number, height: number}>} Image dimensions
 */
export async function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
