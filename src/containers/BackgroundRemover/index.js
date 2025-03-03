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
  Navbar,
  Nav,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { SPEECH_API_KEY } from "@/utils/constants";
import styles from "./BackgroundRemover.module.css";

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

    console.log("SPEECH_API_KEY:", SPEECH_API_KEY);

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
      console.log("API Response:", response.data);
      if (response.data?.response?.image_url) {
        setOutputImage(response.data.response.image_url);
      } else if (response.data?.image_url) {
        setOutputImage(response.data.image_url);
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(err.response?.data?.message || "Failed to remove background. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
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

      {/* Main Container */}
      <Container className={styles.container}>
        <h2 className={styles.title}>Background Remover</h2>
        <Form.Group controlId="formFile" className={styles.formGroup}>
          <Form.Label className={styles.label}>
            Select an image
          </Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleUpload}
          disabled={loading}
          className={styles.customBtn}
        >
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
          <div className={styles.outputSection}>
            <h5 style={{ color: "white" }}>Processed Image:</h5>
            <Image src={outputImage} fluid />
          </div>
        )}
      </Container>
    </>
  );
}