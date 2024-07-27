import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigator = useNavigate();

    const signup = async ({ name, surname, password, confirmPassword, email}) => {
        if (handleError(name,surname,password,confirmPassword,email)) {
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({name,surname,password,confirmPassword,email})
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            
            localStorage.setItem("EmpowerLearn", JSON.stringify(data));
            setAuthUser(data);

            navigator("/home");// other users
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, signup };
}

function handleError(name,surname,password,confirmPassword,email) {
    if (!name || !surname || !password || !confirmPassword || !email) {
        toast.error("Please enter all your credentials");
        return true;
    }
    return false;
}
