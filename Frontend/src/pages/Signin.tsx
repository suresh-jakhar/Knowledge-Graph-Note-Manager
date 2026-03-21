import { Button } from "../components/Button";
import { Input } from "../components/input";

export function Signin() {
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white border min-w-48 p-8 rounded-xl">
        <Input placeholder="Username" />
        <Input placeholder="password" />

        <div className="flex justify-center pt-4">
          <Button
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