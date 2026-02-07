import { Card, Col, Badge } from "react-bootstrap";
import { ThumbsUp, Play } from "lucide-react";
import { playSong } from "../utils/audioGenerator";

export default function SongCard({ song }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
      <Card className="shadow-sm">
        <Card.Img variant="top" src={song.cover} alt="cover" />
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Card.Title className="h6 mb-0">{song.title}</Card.Title>
            <Badge>{song.genre}</Badge>
          </div>
          <Card.Text className="text-muted small">{song.artist}</Card.Text>
          <Card.Text className="text-muted small">{song.album}</Card.Text>
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2 mb-3"
            onClick={() => playSong(song.id)}
          >
            <Play size={18} />
            Play
          </button>
          <div className="d-flex justify-content-between">
            <div className="fw-semibold text-primary">
              <ThumbsUp size={18} /> {song.likes}
            </div>
            <small className="text-muted">{song.index}</small>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
