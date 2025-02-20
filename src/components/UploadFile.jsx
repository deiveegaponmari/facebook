import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
//import { useEffect } from 'react';
export default function UploadFile() {
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Prepare FormData
    const formData = new FormData();
    formData.append("media", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/media/createmedia`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Upload successful:", result);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={handleFileUpload}
        multiple
      />
    </Button>
  )
}