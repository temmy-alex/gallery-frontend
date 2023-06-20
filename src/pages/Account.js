import { useEffect, useState } from "react";
import ActivityCard from "../components/card/ActivityCard";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

function AccountProfile() {

    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [modalUpdate, setModalUpdate] = useState(false);

    async function fetchImages(){
        const token = localStorage.getItem("accessToken");

        try {
            let res = await axios.get('http://localhost:3000/api/images/user', {
                headers: {
                    access_token: token
                }
            });
    
            setImages(res.data.data.list);
        } catch (error) {
            console.log(error)
        }
    }

    async function onDeleteImage({id}){
        try {
            const token = localStorage.getItem("accessToken");

            await axios.delete(`http://localhost:3000/api/images/${id}`, {
                headers: {
                    access_token: token
                }
            });

            fetchImages();
        } catch (error) {
            
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        
        if (!token) navigate("/auths/sign-in");
        fetchImages();
    }, [location]);

    useEffect(() => {
        fetchImages();
    }, [modalUpdate]);
    
    return(
        <div className="grid grid-cols-4 gap-4 px-2 py-3">
            {
                images.map((data) => {
                    return (
                        <ActivityCard key={data.id} backgroundImage={data.path} name={data.name} slug={data.slug} id={data.id} onDelete={() => onDeleteImage({id: data.id})} open={modalUpdate} onModal={() => setModalUpdate(!modalUpdate)} />
                    )
                })
            }
        </div>
    )

}

export default AccountProfile;