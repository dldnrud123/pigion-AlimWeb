'use client'

import Header from "./header";
import Snb from "./snb";
import Footer from "./footer";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";

export default function Layout({ children }) {

    const { data: session, status } = useSession();

    useEffect(() => {

        if (status === "unauthenticated") {
            signIn(); // 기본 로그인 페이지로 리다이렉트
        }

    }, [status]);

    const [isSnb, setIsSnb] = useState(true);

    //snb 닫기
    function onSetIsSnb(isVisible) {
        setIsSnb(isVisible)
    }


    if (status === "loading") return <div className="w-screen h-screen flex justify-center bg-orange-300"><img className="w-12 h-12 self-center" src="/images/loading.gif" /></div>

    return (
        <>
            <Header onSetIsSnb={onSetIsSnb}></Header>
            <div className="flex" >
                {isSnb ?
                    <Snb></Snb>
                    :
                    ""
                }
                {children}
            </div>
            <Footer></Footer>
        </>
    )
}