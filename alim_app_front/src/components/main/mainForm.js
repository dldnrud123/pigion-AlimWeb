'use client'

import Link from 'next/link';
import { useState, useEffect } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function MainForm() {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const { data: session, status } = useSession();

    let isSavedToken = false;

    const deviceToken = localStorage.getItem("DEVICE_TOKEN");

    useEffect(() => {

        //두번 실행 방지
        if (isSavedToken === false) {

            // 알림을 받을지 확인 후 그에 따른 분기 granted / default / denied
            Notification.requestPermission().then((permission) => {

                if (permission === 'granted') {
                    console.log('Notification permission granted.');

                    //디바이스 토큰이 없는경우 재발급 후 저장
                    if (deviceToken === null) {
                        const messaging = getMessaging();

                        //messaging과 vapidkey를 넣어주면 token이 생성된다.
                        getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY }).then((currentToken) => {

                            // 토큰이 재발급 되는 경우 api내에서 중복 확인 후 저장 
                            //  -> 같은 디바이스를 사용하지만, 아이디가 다를 경우 저장을 못하는 경우 발생 방지.
                            saveToken(currentToken);

                        }).catch((err) => {
                            console.log('An error occurred while retrieving token. ', err);
                            // ...
                        });
                    } 
                    //디바이스 토큰이 있는경우 로컬에 저장된 토큰으로 저장
                    else {
                        saveToken(deviceToken);
                    }
                }
                //허용안되었을 경우
                else {
                    console.log('No registration token available. Request permission to generate one.');
                    alert("알림을 받으실려면 브라우저 설정 -> 해당도메인에 대한 알림 권한을 허용해주세요 ;c");
                }
            })
        }
    }, [])

    function saveToken(token) {
        //생성된 토큰을 db에 저장
        const post = {
            userId: session?.user.id,
            notiTokenVal: token,
            activeYN: 'Y'
        };

        axios.post(API_URL + "/api/UserNotification/save", post)
            .then((response) => {

                if (JSON.parse(response.data)) {
                    //로컬에 디바이스 토큰 저장
                    localStorage.setItem("DEVICE_TOKEN", token);
                }
                else {
                }

                isSavedToken = true;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>

            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h2 className="text-xs text-yellow-500 tracking-widest font-medium title-font mb-1">환영합니다! :D</h2>
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">알림장을 공유하고 읽었는지 확인해보세요!</h1>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        <div className="p-4 md:w-1/3">
                            <div className="flex rounded-lg h-full bg-orange-100 p-8 flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-yellow-500 text-white flex-shrink-0">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                        </svg>
                                    </div>
                                    <h2 className="text-gray-900 text-lg title-font font-medium">클래스 개설</h2>
                                </div>
                                <div className="flex-grow">
                                    <p className="leading-relaxed text-base">클래스를 생성하여, 알림장 작성 후 회원들이 읽었는지 확인해 보세요 :D</p>
                                    <Link href="/class/create" className="mt-3 text-yellow-500 inline-flex items-center" >Learn More
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3">
                            <div className="flex rounded-lg h-full bg-orange-100 p-8 flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-yellow-500 text-white flex-shrink-0">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    </div>
                                    <h2 className="text-gray-900 text-lg title-font font-medium">가입한 클래스</h2>
                                </div>
                                <div className="flex-grow">
                                    <p className="leading-relaxed text-base">내가 속한 클래스를 확인 할 수 있습니다!</p>
                                    <Link href="/class?isClassMine=false" className="mt-3 text-yellow-500 inline-flex items-center">Learn More
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3">
                            <div className="flex rounded-lg h-full bg-orange-100 p-8 flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-yellow-500 text-white flex-shrink-0">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <circle cx="6" cy="6" r="3"></circle>
                                            <circle cx="6" cy="18" r="3"></circle>
                                            <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                                        </svg>
                                    </div>
                                    <h2 className="text-gray-900 text-lg title-font font-medium">클래스 찾기</h2>
                                </div>
                                <div className="flex-grow">
                                    <p className="leading-relaxed text-base">클래스를 찾아서 회원으로 등록해보세요!!</p>
                                    <Link href="/findClass" className="mt-3 text-yellow-500 inline-flex items-center">Learn More
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}