"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Spinner,
  Container,
  InputGroup,
  FormControl,
  Button,
  Navbar,
  Nav,
} from "react-bootstrap";
import { IMAGE_API_KEY } from "@/utils/constants";
import styles from "./TextToImage.module.css";
import ViewImage from "./view-image";

const TextToImage = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const query = async (inputText) => {
    setLoading(true);
    setError("");
    setImage(null);

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        {
          headers: {
            Authorization: `Bearer ${IMAGE_API_KEY}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: inputText }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
    } catch (err) {
      setError(err.message);
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
              <Nav.Link href="/BackgroundRemover">Background Removal</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Container */}
      <Container className={styles.ColorBackground}>
        <h2>Ai Generator Image</h2>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            placeholder="Write Prompt..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            variant="primary"
            onClick={() => query(text)}
            disabled={!text || loading}
            className={styles.customBtn}
          >
            {loading ? "Generating..." : "Image Generate "}
          </Button>
        </InputGroup>

        {loading && (
          <div className="d-flex flex-column align-items-center justify-content-center mt-3">
            <Spinner animation="grow" variant="primary" />
            <p className="mt-2" style={{ color: "White" }}>
              Image Generating, please wait...
            </p>
          </div>
        )}

        {error && <p className="text-danger">{error}</p>}

        {image && !loading ? (
          <>
            <div className="text-center mt-3">
              <h5 style={{ color: "White" }}>Generated Image:</h5>
              <img
                src={image}
                alt="Generated result"
                style={{ width: "60%", height: "auto" }}
                className="img-fluid mb-3"
              />
              <div>
                <a
                  href={image}
                  download="generated-image.png"
                  className={`btn btn-success ${styles.customBtn}`}
                >
                  Download Image
                </a>
              </div>
            </div>
          </>
        ) : (
          <ViewImage />
        )}
      </Container>
    </>
  );
};

export default TextToImage;