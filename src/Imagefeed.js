import React, {useState,useEffect} from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import './index.css';

export default function Imagefeed(){
        const [images, setimages] = useState([])
        const [loadedimg, loadimg] = useState(false)
    
        const Eachimageelement = ({ url, key }) => (
            <div className="image-item" key={key} >
              <img className="pnt"  src={url} />
            </div>
          );
    
        const fetchImages = (count = 13) => {
            const accessKey = "LMxV3Ei7wrau-47HDadeU_upGgriexu--URLZ1vWJUs";        
            axios
              .get(`https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`)
              .then (res => {
                setimages([...images, ...res.data]);
                loadimg(true)
              });
        };
        useEffect(()=>{
            fetchImages()
            console.log(images)
        },[])


        return (
                <InfiniteScroll
                    dataLength={images}
                    next={() => fetchImages(10)}
                    hasMore={true}
            >            
            <div  className="grid">
                {loadedimg ? images.map((image, index) => (
                        <Eachimageelement
                          url={image.urls.thumb}
                          key={index}
                        />
                      )) : ''}
            </div>
    </InfiniteScroll>
        )
    }