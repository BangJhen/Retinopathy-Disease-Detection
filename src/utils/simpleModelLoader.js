/**
 * Simple model loader without dynamic imports
 * This should work more reliably
 */

let modelSession = null;
let isLoading = false;

export const loadModelSimple = async () => {
  if (modelSession) {
    return modelSession;
  }

  if (isLoading) {
    throw new Error('Model is already loading');
  }

  isLoading = true;

  try {
    console.log('Loading model with simple approach...');

    // Check if ONNX Runtime is available globally
    if (typeof window === 'undefined' || !window.ort) {
      throw new Error('ONNX Runtime not available. Please load it first.');
    }

    const ort = window.ort;

    // Configure ONNX Runtime
    ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.16.3/dist/';
    ort.env.wasm.numThreads = 1;
    ort.env.logLevel = 'warning';

    // Check model file
    console.log('Checking model file...');
    const response = await fetch('/retinal_classifier_efficientnet_b1.onnx', { method: 'HEAD' });
    if (!response.ok) {
      throw new Error(`Model file not accessible: ${response.status}`);
    }

    console.log('Creating inference session...');
    modelSession = await ort.InferenceSession.create('/retinal_classifier_efficientnet_b1.onnx', {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'disabled'
    });

    console.log('✓ Model loaded successfully');
    console.log('Input names:', modelSession.inputNames);
    console.log('Output names:', modelSession.outputNames);

    isLoading = false;
    return modelSession;

  } catch (error) {
    isLoading = false;
    console.error('Simple model loading failed:', error);
    throw error;
  }
};

export const runSimpleInference = async (imageData) => {
  try {
    if (!modelSession) {
      throw new Error('Model not loaded');
    }

    if (!window.ort) {
      throw new Error('ONNX Runtime not available');
    }

    const ort = window.ort;

    // Create input tensor with correct dimensions (288x288)
    const inputTensor = new ort.Tensor('float32', imageData, [1, 3, 288, 288]);
    
    // Run inference
    const feeds = {};
    feeds[modelSession.inputNames[0]] = inputTensor;
    
    const results = await modelSession.run(feeds);
    const outputTensor = results[modelSession.outputNames[0]];
    
    // Apply softmax
    const logits = Array.from(outputTensor.data);
    const maxLogit = Math.max(...logits);
    const expLogits = logits.map(x => Math.exp(x - maxLogit));
    const sumExp = expLogits.reduce((sum, x) => sum + x, 0);
    const probabilities = expLogits.map(x => x / sumExp);
    
    // Get prediction
    const maxIndex = probabilities.indexOf(Math.max(...probabilities));
    const confidence = Math.round(probabilities[maxIndex] * 100);
    
    return {
      predictions: probabilities,
      confidence: confidence,
      classIndex: maxIndex
    };

  } catch (error) {
    console.error('Simple inference failed:', error);
    throw error;
  }
};

export const isModelReady = () => {
  return modelSession !== null;
};

export const getModelStatus = () => {
  return {
    isLoaded: modelSession !== null,
    isLoading: isLoading
  };
};

// Make available globally for testing
if (typeof window !== 'undefined') {
  window.loadModelSimple = loadModelSimple;
  window.runSimpleInference = runSimpleInference;
}
