import { ThumbsUp, Play, MessageCircle } from "lucide-react";
import { playSong } from "../utils/audioGenerator";

export default function SongDetails({ song }) {
  return (
    <tr className="bg-light">
      <td colSpan={6}>
        <div className="p-3 d-flex align-items-center gap-4">
          <img
            src={song.cover}
            alt="cover"
            style={{ width: 120, borderRadius: 8 }}
          />
          <div>
            <h5 className="mb-1">{song.title}</h5>
            <p className="text-muted mb-2">
              {song.artist} — {song.album}
            </p>
            <div className="d-flex align-items-center gap-2 text-primary">
              <ThumbsUp size={18} />
              <span className="fw-bold">{song.likes} Likes</span>
            </div>
          </div>
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2"
            onClick={() => playSong(song.id)}
          >
            <Play size={18} />
            Play
          </button>
          <div className="bg-white p-2 border rounded-3 mb-2 shadow-sm">
            <small className="text-primary d-flex align-items-center gap-1 mb-1">
              <MessageCircle size={14} />
            </small>
            <p className="mb-0 fst-italic small">"{song.review}"</p>
          </div>
        </div>
      </td>
    </tr>
  );
}
