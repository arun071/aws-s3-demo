import axios from 'axios';

const API_URL = 'http://localhost:8080/api/files';

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
export const getDownloadUrl = async (fileName) => {
    const response = await axios.get(`http://localhost:8080/api/files/url/${fileName}`);
    return response.data; // This will return the presigned URL
};

export const downloadFile = async (fileName) => {
    const response = await axios.get(`${API_URL}/download/${fileName}`, {
        responseType: 'blob',
    });
    return response.data;
};
