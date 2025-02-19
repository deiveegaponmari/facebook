import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
//import { useEffect } from 'react';
export default function UploadFile(){
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
      async function handleFileUpload(event){
        const file=event.target.files;
        if(!file) return;

        fetch(`${import.meta.env.VITE_BACKEND_URL}/media/createmedia`,{
          method:"POST",
          headers:{
            "Content-Type": "application/json"
          },
          body:file
        }).then((response)=>{
          console.log(response)
        }).catch((error)=>{
          console.log(error)
        })
/* 
        const data=new FormData();
        data.append("file",file);
        data.append("upload_preset","first_app_cloudinary")
        data.append("cloud_name","djlxdttvr")
        const response=await fetch("https://api.cloudinary.com/v1_1/djlxdttvr/image/upload",{
          method:"POST",
          body:data
        })
        const UploadImageUrl= await response.json();
        console.log(UploadImageUrl); */
        console.log(file)
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