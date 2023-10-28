import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// import 'antd/dist/antd.css';
function ImageUploader() {
    // Define custom request function to handle image upload
   
  
    // Function to check file type before upload (e.g., image/png, image/jpeg)
    const beforeUpload = file => {
      if (!file) {
        message.error('You can only upload image files!');
      }
      console.log(file);
    };
  
  
    return (
      <Upload
        action={""}
        showUploadList={true} // Hides the uploaded file list
        beforeUpload={beforeUpload}
      >
        <Button icon={<UploadOutlined/>}>Upload Image</Button>
      </Upload>
    );
  }
  
  export default ImageUploader;
  
  