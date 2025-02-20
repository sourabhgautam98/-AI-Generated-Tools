"use client";

import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { SPEECH_API_KEY } from "@/utils/constants";
import "./TextToSpeech.module.css"

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
    <Container
      className="mt-5"
      style={{
        maxWidth: "800px",
        borderRadius: "10px",
        padding: "15px",
      }}
    >
      <h2
        className="mb-4 text-center"
        style={{ color: "white", background: "none", fontSize: "3rem" }}
      >
        Text to Speech Converter
      </h2>
      <Form
        style={{ padding: "10px", borderRadius: "10px", background: "none" }}
      >
        <Form.Group controlId="textInput" className="mb-4">
          <Form.Control
            as="textarea"
            rows={12}
            placeholder="Enter the Text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              fontSize: "1.1rem",
              padding: "15px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              background: "rgba(255, 255, 255, 0.1)",
            }}
          
          />
        </Form.Group>
        <div className="d-grid" style={{ background: "none" }}>
          <Button
            variant="primary"
            size="lg"
            onClick={handleConvert}
            disabled={loading}
            style={{
              fontSize: "1.2rem",
              padding: "10px",
              background: "rgba(0, 123, 255, 0.8)",
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
  );
}