"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Spinner,
  Image,
  Alert,
  Navbar,
  Nav,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./BackgroundRemover.module.css";
import { REMOVER_API_KEY } from "@/utils/constants";

export default function BackgroundRemover() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [outputImage, setOutputImage] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    } else {
      setPreviewImage(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image_file", selectedFile);
    formData.append("size", "auto");

    try {
      const response = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        formData,
        {
          headers: {
            "X-Api-Key": REMOVER_API_KEY,
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer",
        }
      );

      const base64Image = Buffer.from(response.data, "binary").toString("base64");
      const imageUrl = `data:image/png;base64,${base64Image}`;
      setOutputImage(imageUrl);
    } catch (err) {
      console.error("API Error:", err);
      setError(
        err.response?.data?.errors?.[0]?.title ||
          "Failed to remove background. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (outputImage) {
      const link = document.createElement("a");
      link.href = outputImage;
      link.download = "background_removed_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const imageStyle = {
    maxHeight: "300px",
    maxWidth: "100%",
    objectFit: "contain",
    width: "auto",
    height: "auto",
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="fw-bold">
            AI Tools
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/textToSpeech">Text to Speech</Nav.Link>
              <Nav.Link href="/textToimage">Text to Image</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className={styles.container}>
        <h2 className={styles.title}>Background Remover</h2>
        
        <Form.Group controlId="formFile" className={`${styles.formGroup} mb-4`}>
          <Form.Label>Select an image to process</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Form.Group>

        <div className="row justify-content-center">
          {/* Input Preview Box */}
          <div className="col-md-5 mb-4">
            <Card className="h-100 shadow">
              <Card.Body>
                <Card.Title>Original Image</Card.Title>
                {previewImage ? (
                  <div className="mt-3 text-center">
                    <Image 
                      src={previewImage} 
                      style={imageStyle}
                      alt="Preview"
                    />
                  </div>
                ) : (
                  <div className="text-center text-muted py-5">
                    Upload an image to see preview
                  </div>
                )}
                <Button
                  variant="primary"
                  onClick={handleUpload}
                  disabled={loading || !selectedFile}
                  className={`${styles.customBtn} mt-3 w-100`}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Remove Background"
                  )}
                </Button>
              </Card.Body>
            </Card>
          </div>

          {/* Output Box */}
          <div className="col-md-5 mb-4">
            <Card className="h-100 shadow">
              <Card.Body>
                <Card.Title>Output Image</Card.Title>
                {outputImage ? (
                  <div className="text-center">
                    <Image 
                      src={outputImage} 
                      style={imageStyle}
                      alt="Processed"
                    />
                    <Button
                      variant="success"
                      onClick={handleDownload}
                      className={`${styles.customBtn} mt-3 w-100`} // Changed to use customBtn
                    >
                      Download Image
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-muted py-5">
                    Processed image will appear here
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Container>
    </>
  );
}