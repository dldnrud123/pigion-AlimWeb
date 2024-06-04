'use client'

import axios from "axios";
import { useSession } from 'next-auth/react'
import { useState, useEffect } from "react";
import Link from 'next/link'

export default function SettingForm() {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const { data: session } = useSession();

    //현재 알람설정 상태 
    const [isNotiOn, setIsNotiOn] = useState('');
    const [notiToggle, setNotiToggle] = useState(false);

    useEffect(() => {

        const deviceToken = localStorage.getItem("DEVICE_TOKEN");

        // 알람 셋팅정보를 가져온다.
        axios.get(API_URL+'/api/UserNotification/isNotiOnOff', {
            params: {
                userId: session?.user.id,
                notiTokenVal: deviceToken
            }
        })
            .then(response => {
                setIsNotiOn(response.data.activeYN);

                // 토글 스위치 초기화
                if (response.data.activeYN === 'Y') {
                    setNotiToggle(true);

                } else if (response.data.activeYN === 'N') {
                    setNotiToggle(false);
                }

            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            });


    }, [])

    function togleboxHandler() {
        const deviceToken = localStorage.getItem("DEVICE_TOKEN");

        axios.put(API_URL+"/api/UserNotification/notiOnOff", null, {
            params: {
                userId: session?.user.id,
                notiTokenVal: deviceToken,
                activeYN: isNotiOn === 'Y' ? 'N' : 'Y'
            }
        })
            .then(function (response) {
                if (response.data === 'Y') {
                    alert("알림설정이 켜졌습니다. ");
                    setIsNotiOn(response.data);
                    setNotiToggle(true);

                } else if (response.data === 'N') {

                    alert("알림설정이 꺼졌습니다. ");
                    setIsNotiOn(response.data);
                    setNotiToggle(false);
                }

            }).catch(function (error) {
                alert("수정실패");
            }).then(function () {
                // 항상 실행
            });
    }



    return (
        <>
            <div className="modal bg-gray-600 w-full h-200 shadow-md overflow-y-auto">
                <div className="modal-content max-w-2xl mx-auto bg-white p-16 mt-20">
                    <div className="mb-8">
                        <label className="block mb-2 text-4xl font-large text-gray-900 dark:text-gray-300">설정</label>
                    </div>

                    {/* <div className="mb-5">
                        <label for="toggle" className="text-xs text-gray-700">알림 설정</label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                            <label for="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div> */}

                    <div className="mb-5">

                        <label className="flex items-center cursor-pointer justify-between">
                            <span className="ms-3 text-xl font-medium text-gray-700 dark:text-gray-300">알람 ON/OFF</span>
                            <input type="checkbox" onChange={togleboxHandler}
                            checked={notiToggle} className="sr-only peer"/>
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                </div>
            </div>
        </>

    )
}