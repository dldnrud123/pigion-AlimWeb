
'use client'

import LoginForm from "@/components/login/loginForm";
import { useSession} from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";



export default function LoginPage() {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {

      if (status === "authenticated") {
        router.push('/');
    }
    
    }, [status]);

    return (
        <>
            <LoginForm/>
        </>
    )
}
