import React, { useState, useEffect } from "react";
// import { Heading } from "./components/Heading";
// import { Loader } from "./components/Loader";
// import { UnsplashImage } from "./components/UnsplashImage";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import "react-responsive-modal/styles.css";
import "./App.css";

import axios from "axios";

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {    
    axios
      .get()
      .then((res) => setImages([...images, ...res.data]));
  };

  const breakpointColumnsObj = {
    default: 6,
    1288: 4,
    992: 3,
    768: 2,
    576: 1,
  };

  return (
    <>
      {/* <Heading /> */}
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        // loader={<Loader />}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {/* {images.map((image, idx) => (
            <UnsplashImage url={image.urls.thumb} key={idx} />            
          ))} */}
        </Masonry>
      </InfiniteScroll>
    </>
  );
}

export default App;