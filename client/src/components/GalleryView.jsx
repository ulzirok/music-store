import InfiniteScroll from "react-infinite-scroll-component";
import { Row, Container } from "react-bootstrap";
import SongCard from "./SongCard";
import Loader from "./Loader.jsx";
import ScrollToTop from "react-scroll-to-top";

export default function GalleryView({ songs, onLoadMore }) {
  return (
    <>
      <Container fluid className="mt-4">
        <InfiniteScroll
          dataLength={songs.length}
          next={onLoadMore}
          hasMore={true}
          loader={<Loader />}
        >
          <Row className="g-4">
            {songs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </Row>
        </InfiniteScroll>
      </Container>
      <ScrollToTop smooth />
    </>
  );
}

