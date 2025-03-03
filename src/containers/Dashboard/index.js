import { useEffect } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./dashboad.module.css"; // Note: typo 'dashboad', should be 'dashboard'

import textToSpeechImg from '../../../public/images/speech.jpg';
import textToImageImg from '../../../public/images/imageai.jpeg';
import backgroundRemovalImg from '../../../public/images/remove.jpg';

export default function CardGrid() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

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
              {/* <Nav.Link href="/textToSpeech">Text to Speech</Nav.Link>
              <Nav.Link href="/textToimage">Text to Image</Nav.Link>
              <Nav.Link href="/BackgroundRemover">Background Removal</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Container */}
      <Container className="flex-column align-items-center justify-content-center min-vh-100">
        <div data-aos="fade-down" className="d-flex justify-content-center">
          <h1
            className="mb-4 text-center"
            style={{
              color: "black",
              fontSize: "3.5rem",
              fontWeight: "bold",
              padding: "2rem",
            }}
          >
            AI Generated Tools
          </h1>
        </div>

        <Row className="justify-content-center g-4 w-100" >
          <Col xs={12} sm={6} lg={4}>
            <div data-aos="fade-right">
              <Card className="h-100 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={textToSpeechImg.src}
                  alt="Text to Speech"
                  style={{ height: '250px', objectFit: 'cover' }}
                  className={styles.cardImg} // Added hover effect class
                />
                <Card.Body>
                  <Card.Title style={{ color: "black" }}>Text To Speech</Card.Title>
                  <Card.Text style={{ color: "black", fontSize: "18px" }}>
                    Text-to-Speech (TTS) is a technology that converts written text into spoken words.
                    It uses speech synthesis techniques to generate natural, human-like audio voices from digital text input.
                  </Card.Text>
                  <Button
                    variant="primary"
                    href="/textToSpeech"
                    className={`w-100 ${styles.customBtn}`}
                  >
                    Text To Speech
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>

          <Col xs={12} sm={6} lg={4}>
            <div data-aos="fade-up">
              <Card className="h-100 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={textToImageImg.src}
                  alt="Text to Image"
                  style={{ height: '250px', objectFit: 'cover' }}
                  className={styles.cardImg} // Added hover effect class
                />
                <Card.Body>
                  <Card.Title style={{ color: "black" }}>Text To Image</Card.Title>
                  <Card.Text style={{ color: "black", fontSize: "18px" }}>
                    Text-to-Image (TTI) is a technology that converts written text descriptions into visual images.
                    It uses deep learning models and generative AI techniques to create stylized images based on the provided textual input.
                  </Card.Text>
                  <Button
                    variant="primary"
                    href="/textToimage"
                    className={`w-100 ${styles.customBtn}`}
                  >
                    Text To Image
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>

          <Col xs={12} sm={6} lg={4}>
            <div data-aos="fade-left">
              <Card className="h-100 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={backgroundRemovalImg.src}
                  alt="Background Removal"
                  style={{ height: '250px', objectFit: 'cover' }}
                  className={styles.cardImg} // Added hover effect class
                />
                <Card.Body>
                  <Card.Title style={{ color: "black" }}>Background Removal</Card.Title>
                  <Card.Text style={{ color: "black", fontSize: "18px" }}>
                    Background Removal is a technology that isolates the subject of an image by removing its background.
                    AI-driven techniques distinguish foreground elements from the background, ensuring precise cutouts.
                  </Card.Text>
                  <Button
                    variant="primary"
                    href="/BackgroundRemover"
                    className={`w-100 ${styles.customBtn}`}
                  >
                    Background Removal
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}