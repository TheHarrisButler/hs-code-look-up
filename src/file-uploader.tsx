import { useState } from "react";
import { analyzeImage } from "./utils/analyze-image";
import { searchTheWeb } from "./utils/search-the-web";

export const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [analyzeImageResponse, setAnalyzeImageResponse] = useState<string>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);

    if (file) {
      setSelectedFile(file);

      // Create a preview of the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (previewUrl) {
      const response = await analyzeImage(previewUrl);

      if (response[0].message.content) {
        console.log(response[0].message.content);
        setAnalyzeImageResponse(response[0].message.content);

        searchTheWeb();
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <div>
          <img
            src={previewUrl}
            alt="Preview"
            style={{ width: "200px", marginTop: "10px" }}
          />
        </div>
      )}
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>

      <pre>{analyzeImageResponse}</pre>
    </div>
  );
};
