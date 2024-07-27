import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigator = useNavigate();

    const login = async ({ email, password }) => {
        if (handleError(email, password)) {
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("EmpowerLearn", JSON.stringify(data));

            setAuthUser(data);
            navigator("/home");
            
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, login };
}

function handleError(email, password) {
    if (!email || !password) {
        toast.error("Please enter your credentials");
        return true;
    }
    return false;
}
