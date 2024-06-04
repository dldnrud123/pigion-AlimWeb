'use client'

import axios from "axios";
import { useSession } from 'next-auth/react'
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function UserCard(props) {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const path = usePathname().split('/');
    const path1 = usePathname();
    const boardId = path[path.length - 1];
    const clsId = path[2];

    const [boardUserList, setBoardUserList] = useState(props.boardUserList);
    const [readboardUserList, setReadBoardUserList] = useState(props.readboardUserList);
    const [notReadboardUserList, setNotReadboardUserList] = useState(props.notReadboardUserList);


    // 읽은 유저카드 or 안읽은 유저카드
    const [isReadUser, setIsReadUser] = useState(props.isRead);

    async function reNotiButtonHandler(e) {

        const deviceToken = [];
        const targetId = notReadboardUserList[e.currentTarget.id].userId;

        // 게시물에
        await axios.get(API_URL+'/api/UserNotification/userNotiTokens', {
            params: {
                userId: targetId,
            }
        })
            .then(response => {

                // 토큰값만 배열에 저장
                response.data.forEach((user) => {
                    deviceToken.push(user.notiTokenVal);
                });

            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            });

        //현재 클래스 회원에게 푸시알림 띄우기
        await axios.post("/api/notification", {
            deviceToken: deviceToken,
            title: "알림장이 도착했어요!",
            body: "메시지를 눌러 알림장을 확인해주세요",
            icon: "",
            image: "",
            click_action: path1

        }).then(res => {
            updateUserRenoti(targetId);

        }).catch(err => {
            console.log("error : " + err);
        });



    }

    //renoti 데이터 갱신
    function updateUserRenoti(targetId) {

        axios.put(API_URL+"/api/boardUser/reNotiUpate", null, {
            params: {
                userId: targetId,
                boardId: boardId
            }
        })
            .then(function (response) {

                //readfome 데이터 갱신
                props.onSetupdateOk();

                //데이터 갱신
                updateUserData();

            }).catch(function (error) {

            }).then(function () {
                // 항상 실행
            });

    };
    
    // 유저정보 갱신
    function updateUserData() {
        
        axios.get(API_URL+'/api/boardUser/', {
            params: {
                boardId: boardId,
                clsId: clsId
            }
        })
            .then(response => {

                // 읽은유저,안 읽은유저로 나누기
                const ru = [];
                const nru = [];

                for (let i = 0; i < response.data.length; i++) {

                    if (response.data[i].viewYn === "Y") {
                        ru.push(response.data[i]);
                    }
                    else if (response.data[i].viewYn === "N") {
                        nru.push(response.data[i]);
                    }

                }

                setBoardUserList(response.data);
                setReadBoardUserList(ru);
                setNotReadboardUserList(nru);


            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            });

    }

    function close() {
        props.onSetIsUserCard(false);
    }

    //db날짜 다듬기
    function toStrDateTime(dateTime) {

        const date = dateTime.split("T")[0];
        const time = dateTime.split("T")[1].split(".")[0];

        const hour = time.split(":")[0];
        const min = time.split(":")[1];

        const day = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"];
        const dayOfWeek = new Date(date).getDay();

        const strDateTime = date + " " + day[dayOfWeek] + " " + hour + ":" + min;

        return strDateTime;
    }


    return (
        <div className="fixed inset-x-10 inset-y-10 z-10 ">

            {
                boardUserList?.length === 0 ?
                    <div className="max-w-2xl mx-auto">

                        <div className="p-4 max-w-md bg-blue-100 rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
                            <span>연결이 불안정 합니다</span>
                            <button onClick={close}>닫기</button>
                        </div>
                    </div>

                    :
                    isReadUser ?

                        //읽은사람
                        <div className="max-w-2xl mx-auto">

                            <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">알림장 읽은 회원</h3>
                                </div>
                                <div className="flow-root">
                                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {readboardUserList?.length === 0 ?
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center space-x-4">
                                                    <span>읽은 회원이 없습니다 ;c</span>
                                                </div>
                                            </li>
                                            :
                                            readboardUserList.map((user, idx) => (
                                                user.viewYn === 'Y' ?
                                                    <li className="py-3 sm:py-4" key={idx}>
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex-shrink-0">
                                                                <img className="w-8 h-8 rounded-full" src={user.profileImg !== "NONE" ? user.profileImg : "/images/no_profile.png"} alt={user.realName} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                    {user.realName}
                                                                </p>
                                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                                    {user.email}
                                                                </p>
                                                            </div>
                                                            <div className="text-sm font-400 text-blue-600 dark:text-white">
                                                                <small>{toStrDateTime(user.updateDate)} <span className="text-green-600">읽음</span></small>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    : ""
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className="text-end">
                                    <button onClick={close} className="px-3 py-2 bg-gray-300 rounded">닫기</button>
                                </div>
                            </div>
                        </div>

                        :

                        //안읽은사람
                        <div className="max-w-2xl mx-auto">

                            <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">알림장 안읽은 회원</h3>
                                </div>
                                <div className="flow-root">
                                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {notReadboardUserList?.length === 0 ?
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center space-x-4">
                                                    <span>안읽은 회원이 없습니다 :D</span>
                                                </div>
                                            </li>
                                            :
                                            notReadboardUserList.map((user, idx) => (
                                                user.viewYn === 'N' ?
                                                    <li className="py-3 sm:py-4" key={idx}>
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex-shrink-0">
                                                                <img className="w-8 h-8 rounded-full" src={user.profileImg !== "NONE" ? user.profileImg : "/images/no_profile.png"} alt={user.realName} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                    {user.realName}
                                                                </p>
                                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                                    {user.email}
                                                                </p>
                                                            </div>
                                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                                {user.reNotiYn === 'N' ?
                                                                    <button href="#" id={idx} onClick={reNotiButtonHandler} className="text-sm text-blue-500 truncate dark:text-green-400">알림재전송</button>
                                                                    :
                                                                    <p className="text-sm text-green-500 truncate dark:text-green-400">
                                                                        재전송 완료
                                                                    </p>
                                                                }
                                                            </div>

                                                        </div>
                                                    </li>
                                                    :
                                                    ""
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className="text-end">
                                    <button onClick={close} className="px-3 py-2 bg-gray-300 rounded">닫기</button>
                                </div>
                            </div>
                        </div>

            }


        </div>
    )
}