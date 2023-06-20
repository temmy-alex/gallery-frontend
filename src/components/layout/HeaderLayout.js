import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineAccountCircle, MdOutlineLogout } from 'react-icons/md';
import { LuPlusSquare } from 'react-icons/lu';
import { useEffect, useState } from "react";
import axios from 'axios';
import UploadImageModal from "../modal/UploadImage";

const HeaderLayout = () => {
    const [auth, setAuth] = useState(false);
    const [accounts, setAccount] = useState(false);
    const [category, setCategory] = useState([]);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    async function fetchCategory(){
        try {
            let res = await axios.get('http://localhost:3000/api/images/category');
    
            setCategory(res.data.data.list);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        fetchCategory();
        if (token) {
            let path = location.pathname.split("/")[1];
            if(path === 'accounts') setAccount(true);
            else setAccount(false)
            setAuth(true)
        };
    }, [location])

    function logout() {
        localStorage.removeItem("accessToken");
        setAuth(false);
        navigate('/');
    }

    return (
        <div className="min-h-screen">
            <div className="flex justify-between items-center bg-gradient-to-tl from-[#fcb502] to-[#06384a] p-4">
                <p className="text-2xl font-bold text-white" onClick={() => navigate('/')}>Gallery GWP</p>
                <div className="flex">
                    {
                        auth && accounts ? <div className="border p-2 border-white h-[50px] w-[150px] items-center flex justify-center" onClick={() => setModal(true)}>
                            <LuPlusSquare size={25} color="white" />
                            <p className="text-sm ml-3 text-white">
                                Add Image
                            </p>
                        </div> : category.map((data) => {
                            return (
                                <p className="mx-2 text-white capitalize" onClick={() => navigate(`/categories/${data.value.toLowerCase()}`)}>{data.value}</p>
                            )
                        })
                    }
                </div>
                {
                    auth && accounts ? <div className="border p-2 border-white h-[50px] w-[150px] items-center justify-center flex" onClick={() => logout()}>
                        <MdOutlineLogout size={25} color="white" />
                        <p className="text-sm ml-3 text-white">Logout</p>
                    </div> : <div className="border p-2 border-white h-[50px] w-[170px] items-center flex justify-center" onClick={() => navigate(auth ? '/accounts' :'/auths/sign-in')}>
                        <MdOutlineAccountCircle size={25} color="white" />
                        <p className="text-sm ml-3 text-white">
                            {
                                auth && !accounts ? "Account" : "Login / Register"
                            }
                        </p>
                    </div>
                }
            </div>
            <Outlet />
            <UploadImageModal open={modal} onClick={() => setModal(false)} fileId={null} section={"create"} />
        </div>
    )
};

export default HeaderLayout;
