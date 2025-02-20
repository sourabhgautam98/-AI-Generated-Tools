import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CardGrid() {
  return (
    <Container className=" flex-column align-items-center justify-content-center min-vh-100">
      <h1
        className="mb-4 text-center"
        style={{
          color: "white",
          fontSize: "5rem",
          fontWeight: "bold",
          padding: "2rem",
          marginTop: "60px"
        }}
      >
        AI Generated Tools
      </h1>

      <Row className="justify-content-center g-4 w-100" style={{ marginTop: "100px" }}>



        <Col xs={12} sm={6} lg={4}>
          <Card className="h-100 shadow-sm ">
            <Card.Body>
              <Card.Title style={{ color: "white" }}>Text To Speech</Card.Title>
              <Card.Text style={{ color: "white", fontSize: "18px" }}>
                Text-to-Speech (TTS) is a technology that converts written text
                into spoken words. It uses speech synthesis techniques to
                generate human-like audio from digital text input.
              </Card.Text>
              <Button variant="primary" href="/textToSpeech">
                Text To Speech
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title style={{ color: "white" }}>Text To Image</Card.Title>
              <Card.Text style={{ color: "white", fontSize: "18px" }}>
                Text-to-Image (TTI) is a technology that converts written text
                descriptions into visual images. It uses deep learning models
                and generative AI techniques to create stylized images based on
                the provided textual input.
              </Card.Text>
              <Button variant="primary" href="/textToimage">
                Text To Image
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title style={{ color: "white" }}>
                Background Removal
              </Card.Title>
              <Card.Text style={{ color: "white", fontSize: "18px" }}>
                Background Removal is a technology that isolates the subject of
                an image by removing its background. AI-driven techniques
                distinguish foreground elements from the background, ensuring
                precise cutouts.
              </Card.Text>
              <Button variant="primary" href="/Background_Removal">
                Background Removal
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
