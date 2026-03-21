import { Button } from "../components/Button";
import { Input } from "../components/input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate(); 

  async function handleSignin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password
      });

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");

    } catch (error: any) {
      alert(error.response?.data?.message || "Signin failed");
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white border min-w-48 p-8 rounded-xl">
        
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password" />

        <div className="flex justify-center pt-4">
          <Button
            onClick={handleSignin}
            variant="primary"
            text="Signin"
            FullWidth
            loading={false}
          />
        </div>

      </div>
    </div>
  );
}