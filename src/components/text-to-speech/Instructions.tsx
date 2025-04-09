
import React from 'react';

const Instructions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">How to Use the Text to Speech Tool</h2>
      <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300">
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
          <li>Enter or paste your text in the text area</li>
          <li>Choose your preferred voice from the options</li>
          <li>Adjust the volume, speed, and pitch to your liking</li>
          <li>Click "Play" to listen to the speech</li>
          <li>Click "Generate Audio File" to create a downloadable audio file</li>
          <li>Click "Download Audio" to save the generated file to your device</li>
        </ol>
      </div>
    </div>
  );
};

export default Instructions;
