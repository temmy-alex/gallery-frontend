import { useEffect, useState } from "react";
import axios from 'axios';

function HomePage(){
    const [images, setImages] = useState([]);

    async function fetchImages(){
        try {
            let res = await axios.get('http://localhost:3000/api/images/');
    
            setImages(res.data.data.list);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchImages();
    }, [])

    return(
        <div className="columns-4 gap-8 p-2">
            {
                images.map((data) => {
                    return (
                        <img className="w-full rounded" alt={data.name} src={`http://localhost:3000/${data.path.replace('public/', "")}`}  />
                    )
                })
            }    
        </div>
    )
}

export default HomePage;