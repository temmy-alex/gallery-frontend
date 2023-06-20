import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputSingleField } from "../components/field/InputField";
import TextButton from "../components/button/TextButton";
import { BsChevronCompactLeft } from "react-icons/bs";
import { TextAreaField } from "../components/field/TextAreaField";
import axios from 'axios';

function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [biodata, setBiodata] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) navigate("/");
  }, []);

  async function submit() {
    setLoading(true);
    
    try {
        let data = {
            email,
            password,
            name,
            biodata,
            confirmPassword
        };
    
        let res = await axios.post('http://localhost:3000/api/auths/register', data);
    
        localStorage.setItem("accessToken", res.data.data.accessToken);
    
        navigate(-1);
        setLoading(false)
    } catch (error) {
        setLoading(false)
    }
  }

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="max-w-[550px] p-10 border bg-white rounded w-full">
        <div className="overflow-auto">
          <InputSingleField
            textColor={"black"}
            value={name}
            type={"text"}
            placeholder={""}
            required={true}
            label={"Nama"}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="my-4">
          <InputSingleField
            textColor={"black"}
            value={email}
            type={"email"}
            placeholder={""}
            required={true}
            label={"Email"}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <TextAreaField
              textColor={"black"}
              value={biodata}
              label={"Bio Data"}
              onChange={(e) => setBiodata(e.target.value)}
            />
          <div className="my-4">
          <InputSingleField
            textColor={"black"}
            value={password}
            type={"password"}
            placeholder={""}
            required={true}
            label={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
            <InputSingleField
              textColor={"black"}
              value={confirmPassword}
              type={"password"}
              placeholder={""}
              required={true}
              label={"Konfirmasi Password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          <div className="mt-4">
            <TextButton title={"Daftar"} onClick={() => submit()} loading={loading} />
          </div>
        </div>
        <p className="text-xs text-black text-center my-2 mt-5">
          Sudah memiliki akun ?{" "}
          <span
            className="hover:text-[#07638d] font-bold"
            onClick={() => navigate("/auths/sign-in")}
          >
            Masuk
          </span>
        </p>
        <p
          className="flex  text-black justify-center items-center text-xs my-4"
          onClick={() => navigate("/")}
        >
          <BsChevronCompactLeft size={15} /> Kembali ke awal
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
