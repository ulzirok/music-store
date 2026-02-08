import debounce from "lodash.debounce";
import { useMemo, useState, useEffect } from "react";
import { generate64BitSeed } from "../utils/seedHelper";

import {
  Navbar,
  Container,
  Form,
  Row,
  Col,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { Shuffle, Table, BookImage } from "lucide-react";
import { VIEW_MODES } from "../constants/viewModes";
import { LANGUAGES } from "../constants/languages";

export default function Header({
  ui,
  viewMode,
  onViewChange,
  lang,
  seed,
  likesAverage,
  onLangChange,
  onSeedChange,
  onRandomSeed,
  onLikesChange,
}) {
  const [localSeed, setLocalSeed] = useState(seed);
  const [localLikes, setLocalLikes] = useState(likesAverage);

  useEffect(() => {
    setLocalSeed(seed);
  }, [seed]);
  useEffect(() => {
    setLocalLikes(likesAverage);
  }, [likesAverage]);

  const debounced = useMemo(
    () =>
      debounce((callback, value) => {
        callback(value);
      }, 500),
    [],
  );

  const handleRandomClick = () => {
    const newSeed = generate64BitSeed();
    onRandomSeed(newSeed);
  };

  return (
    <Navbar bg="light" expand="lg" className="px-3 border-bottom py-3">
      <Container fluid>
        <Form className="w-100">
          <Row className="align-items-center g-3">
            <Col xs="auto">
              <Form.Group className="d-flex align-items-center">
                <Form.Label className="me-2 mb-0">{ui.region}:</Form.Label>
                <Form.Select
                  value={lang}
                  onChange={(e) => onLangChange(e.target.value)}
                >
                  {LANGUAGES.map(({ code, label }) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Form.Group className="d-flex align-items-center gap-1">
                <Form.Label className="me-2 mb-0">{ui.seed}:</Form.Label>
                <Form.Control
                  type="text"
                  value={localSeed}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      setLocalSeed(val);
                      debounced(onSeedChange, e.target.value);
                    }
                  }}
                  placeholder="Enter seed"
                />
                <Button
                  title="Random seed"
                  variant="light"
                  onClick={handleRandomClick}
                >
                  <Shuffle size={18} />
                </Button>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="d-flex align-items-center w-50">
                <Form.Label className="me-2 mb-0 text-nowrap">
                  {ui.likes}:
                </Form.Label>
                <Form.Range
                  value={localLikes}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setLocalLikes(val);
                    debounced(onLikesChange, val);
                  }}
                  min={0}
                  max={10}
                  step={0.1}
                />
                <span className="ms-2 fw-semibold">
                  {localLikes.toFixed(1)}
                </span>
              </Form.Group>
            </Col>
            <Col xs="auto">
              <ButtonGroup size="sm">
                <Button
                  title="Table View"
                  variant={
                    viewMode === VIEW_MODES.TABLE
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => {
                    onViewChange(VIEW_MODES.TABLE);
                  }}
                >
                  <Table size={18} />
                </Button>
                <Button
                  title="Gallery View"
                  variant={
                    viewMode === VIEW_MODES.GALLERY
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => {
                    onViewChange(VIEW_MODES.GALLERY);
                  }}
                >
                  <BookImage size={18} />
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Form>
      </Container>
    </Navbar>
  );
}
