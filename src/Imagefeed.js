import React, {useState,useEffect} from "react";
import './Imagefeed.css';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";


export default function Imagefeed() {
    const [images, setimages] = useState([]);
    const [loadedimg, loadimg] = useState(false);
    const [showModal, handleModal] = useState(false);
    const [selctedIndex, handleIndex] = useState(null);

    
    const Eachimageelement = ({ url, index, handleClick, handleModal }) => (
        <div
            className="image-item"
            index={index}
            onClick={() => {handleClick(index);handleModal(true);console.log(index);}}
        >
            <img className="pnt" src={url} />
        </div>
    );


    const fetchImages = (count = 40) => {
        const accessKey = "lYNMf74lbhliwnSGe7ieNZ9fSoBiRtitWLEN2lUPm50";
        axios.get(`https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`)
            .then((res) => {
                let newArr = [];
                images.map((img) => newArr.push(img));
                res.data.map((img) => newArr.push(img));
                setimages(newArr);
                loadimg(true);
        });
    };



    useEffect(() => {
        fetchImages();
        console.log(images);
    }, []);
    console.log("selctedIndex", selctedIndex);



    return (
        <InfiniteScroll dataLength={images} next={() => fetchImages(10)} hasMore={true}>
            <div className="grid">
                { loadedimg ? images.map((image, index) => (
                        <Eachimageelement url={image.urls.thumb} index={index} handleModal={handleModal} handleClick={handleIndex}/>
                        )
                    )
                : ""}


                { showModal ? (
                <div className="modal">
                    <div className="modalview">
                        <div className="pnimg"
                            onClick={(event) => {
                                event.preventDefault();
                                    if (selctedIndex > 0) {
                                        const newIndex = selctedIndex - 1;
                                        handleIndex(newIndex);
                                    }
                                }
                            }
                            disabled={selctedIndex === 0}
                        >
                        &#60;   
                        </div>          


                        <img className="image" src={images[selctedIndex].urls.thumb} />
                        

                        <div
                            className="pnimg"
                            onClick={(event) => {
                                event.preventDefault();
                                    if (selctedIndex < images.length - 1) {
                                        const newIndex = selctedIndex + 1;
                                        handleIndex(newIndex);
                                        }
                                }
                            }
                            disabled={selctedIndex === images.length - 1}
                        >
                        &#62;   
                        </div>


                        <div className="closebutton" onClick={() => handleModal(false)}>
                            &#43; 
                        </div>
                    </div>
                </div>
                ) : null}
            </div>
        </InfiniteScroll>
    );
}