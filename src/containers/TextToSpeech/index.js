"use client";

import { useState } from "react";
import { Form, Button, Container, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { SPEECH_API_KEY } from "@/utils/constants";
import styles from "./TextToSpeech.module.css"; // Import the CSS module

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const options = {
        method: "POST",
        url: "https://open-ai-text-to-speech1.p.rapidapi.com/",
        headers: {
          "x-rapidapi-key": SPEECH_API_KEY,
          "x-rapidapi-host": "open-ai-text-to-speech1.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          model: "tts-1",
          input: text,
          voice: "alloy",
        },
        responseType: "arraybuffer",
      };

      const response = await axios.request(options);

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
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
              <Nav.Link href="/textToimage">Text to Image</Nav.Link>
              <Nav.Link href="/BackgroundRemover">Background Removal</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Container */}
      <Container className={styles.container}>
        <h2 className={`${styles.title} mb-4 text-center`}>
          Text to Speech Converter
        </h2>
        <Form className={styles.form}>
          <Form.Group controlId="textInput" className="mb-4">
            <Form.Control
              as="textarea"
              rows={12}
              placeholder="Enter the Text..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={styles.textarea}
            />
          </Form.Group>
          <div className="d-grid">
            <Button
              variant="primary"
              size="lg"
              onClick={handleConvert}
              disabled={loading}
              className={styles.customBtn}
              style={{
                fontSize: "1.2rem",
                padding: "10px",
                border: "none",
              }}
            >
              {loading ? "Converting..." : "Convert to Speech"}
            </Button>
          </div>
        </Form>
        {audioUrl && (
          <div className="mt-5 text-center">
            <audio controls style={{ width: "100%" }}>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </Container>
    </>
  );
}