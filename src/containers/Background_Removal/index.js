"use client";

import { useState } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Spinner,
  Image,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { SPEECH_API_KEY } from "@/utils/constants";

export default function BackgroundRemover() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [outputImage, setOutputImage] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    const options = {
      method: "POST",
      url: "https://background-removal.p.rapidapi.com/remove",
      headers: {
        "x-rapidapi-key": SPEECH_API_KEY,
        "x-rapidapi-host": "background-removal.p.rapidapi.com",
      },
      data: formData,
    };

    try {
      const response = await axios.request(options);
      setOutputImage(response.data.response.image_url);
    } catch (err) {
      console.error("API Error:", err);
      setError(err.response?.data?.message || "Failed to remove background. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 text-center">
      <h2 style={{ color: "white" }}>Background Remover</h2>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label style={{ color: "white" }} >
          Select an image
        </Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleUpload} disabled={loading}>
        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          "Remove Background"
        )}
      </Button>
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      {outputImage && (
        <div className="mt-4">
          <h5>Processed Image:</h5>
          <Image src={outputImage} fluid />
        </div>
      )}
    </Container>
  );
}