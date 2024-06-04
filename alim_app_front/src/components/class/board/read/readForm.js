'use client'
import ReplyForm from "./replyForm"
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import UserCard from "./userCard";
import sanitizeHtml from 'sanitize-html';
import DeleteCard from "./deleteCard";

export default function ReadForm() {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const { data: session } = useSession();

    const router = useRouter();

    const path = usePathname().split('/');
    const boardId = path[path.length - 1];
    const clsId = path[2];

    const [boardInfo, setBoardInfo] = useState([]);

    const [isUserCard, setIsUserCard] = useState(false);
    const [isRead, setIsRead] = useState(false);
    const [updateOk, setUpdateOk] = useState(0);

    //유저 관련
    const [boardUserList, setBoardUserList] = useState([]);
    const [readboardUserList, setReadBoardUserList] = useState([]);
    const [notReadboardUserList, setNotReadboardUserList] = useState([]);

    //로그인 유저의 클래스내부 정보
    const [userClassinfo, SetUserClassinfo] = useState();

    const [htmlContents, setHtmlContents] = useState();


    //유저카드 보이고 안보이고
    function handlerReadUserCard(e) {
        //visible
        setIsUserCard(!isUserCard);
        //읽은사람 유저카드 볼때
        setIsRead(true);
    }

    //삭제 확인 창
    const [isDeleteCard, setIsDeleteCard] = useState(false); 


    // 삭제확인 창열기
    function onSetIsdeleteCard(flag){
        setIsDeleteCard(flag);
    }

    //삭제확인 창
    function openDeleteCard(){
        setIsDeleteCard(true);
    }

    function handlerNotReadUserCard(e) {
        setIsUserCard(!isUserCard);
        //안읽은사람 유저카드 볼때
        setIsRead(false);
    }

    //유저카드 닫을때 자식으로부터 제공받는 데이터
    function onSetIsUserCard(isVisible) {
        setIsUserCard(isVisible)
    }


    // html 보안
    function clearHtmlContents(htmlContent) {
        const cleanContent = sanitizeHtml(htmlContent, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'ul', 'ol', 'li', 'p', 'h1', 'h2', 'h3']),
            allowedAttributes: {
                '*': ['href', 'align', 'alt', 'center', 'bgcolor', 'title', 'style', 'src'],
            },
        });

        return cleanContent;
    }

    useEffect(() => {

        // 알림장 가져오기
        axios.get(API_URL+'/api/classBoard/boardInfo', {
            params: {
                boardId: boardId
            }
        })
            .then(response => {
                setBoardInfo(response.data);
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            });


        //로그인 유저 클래스 정보가져오기 
        axios.get(API_URL+'/api/classUser/', {

            params: {
                clsId: clsId,
                userId: session?.user.id
            }
        })
            .then(response => {
                SetUserClassinfo(response.data);
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            });


        // 세션 유저가 읽은 유저인지 확인 후 안읽으면 업데이트 
        axios.post(API_URL+'/api/boardUser/viewMine', null, {
            params: {
                boardId: boardId,
                userId: session?.user.id
            }
        })
            .then(response => {

                if (JSON.parse(response.data)) {
                    setUpdateOk(updateOk + 1);
                } 
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('유저가 읽었는지 확인 또는 업데이트 불가 :', error);
            });


    }, [])


    useEffect(() => {


        // 해당 알림장 - 유저리스트 
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

    }, [updateOk]);

    //유저 카드에서 데이터 갱신 시 
    function onSetupdateOk() {
        setUpdateOk(updateOk + 1);
    }


    //알림장 삭제
    function boardDelete() {

        axios.put(API_URL+"/api/classBoard/delete", null, {
            params: {
                boardId: boardId,
                activeYn: "N"
            }

        })
            .then(function (response) {
                alert("알림장이 삭제되었습니다.");
                router.replace("/class/" + boardInfo.clsId);
            }).catch(function (error) {
                // 오류발생시 실행
            }).then(function () {
                // 항상 실행
            });

    };

    //목록으로
    function goList() {
        router.replace("/class/" + boardInfo.clsId);
    }

    //수정하기
    function goModify() {
        router.replace("/class/" + boardInfo.clsId + "/board/write?modify=true&boardId=" + boardId);
    }


    return (
        <>
            <div className="w-full overflow-y-auto relative">

                <div className="px-6 py-8">
                    <div className="my-3">
                        <label className="block  text-3xl text-gray-700 rounded-sm px-2 py-2 w-full">{boardInfo?.boardTitle}</label>
                        <hr className="border-2 border-orange-200 mb-5" />
                    </div>

                    <div className="ml-6 mb-5 bg-white w-full h-full" dangerouslySetInnerHTML={{ __html: clearHtmlContents(boardInfo?.boardText) }} />
                    {userClassinfo?.permissionYn == 'Y' || userClassinfo?.readerYn == 'Y' ?
                        <div>
                            <hr className="border-1 border-dashed border-gray-700" />
                            <div className="my-3 flex cursor-pointer hover:bg-blue-100" onClick={handlerReadUserCard}>
                                <small className="px-3 text-sm font-bold text-gray-500">읽은 회원</small>
                                <div className="flex items-center overflow-hidden" >
                                    {readboardUserList?.length === 0 ? <small className="text-gray-600">흠...아무도 안읽었네요 ;c</small>
                                        :
                                        readboardUserList.map((user, idx) => (
                                            <img ket={idx} className="inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center"
                                                src={user.profileImg !== "NONE" ? user.profileImg : "/images/no_profile.png"} alt={user.realName} />
                                        ))
                                    }
                                </div>
                            </div>

                            <hr className="border-1 border-gray-200" />
                            <div className="my-3 flex cursor-pointer hover:bg-blue-100" onClick={handlerNotReadUserCard}>
                                <small className="px-3 text-sm font-bold text-gray-500">안읽은 회원</small>
                                <div className="flex items-center overflow-hidden cursor-pointer" >
                                    {notReadboardUserList?.length === 0 ? <small className="text-gray-600">와우! 다 읽었네요 :D</small>
                                        :
                                        notReadboardUserList.map((user, idx) => (
                                            <img ket={idx} className="inline-block h-6 w-6 rounded-full text-white border-2 border-white object-cover object-center"
                                                src={user.profileImg !== "NONE" ? user.profileImg : "/images/no_profile.png"} alt={user.realName} />
                                        ))
                                    }
                                </div>
                            </div>


                            <hr className="border-1 border-dashed border-gray-700" />
                        </div>
                        :
                        <hr className="border-1 border-dashed border-gray-700" />
                    }

                    <ReplyForm />
                    <hr className="border-1 border-dashed border-gray-700 mt-3" />
                    {userClassinfo?.permissionYn == 'Y' || userClassinfo?.readerYn == 'Y' ?
                        <div>
                            <button type="button" onClick={goModify}
                                className="mt-8 mr-1 text-white bg-orange-500 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                글수정
                            </button>

                            <button type="button" onClick={openDeleteCard}
                                className="mt-8 mr-1 text-white bg-red-500 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                글삭제
                            </button>
                            <button type="button" onClick={goList}
                                className="mt-8 text-white bg-green-500 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                글목록
                            </button>
                        </div>
                        : <div>
                            <button type="button" onClick={goList}
                                className="mt-8 text-white bg-green-500 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                글목록
                            </button>
                        </div>}


                </div>
                {
                    isUserCard ?
                        <UserCard isRead={isRead} onSetIsUserCard={onSetIsUserCard} onSetupdateOk={onSetupdateOk} boardUserList={boardUserList} readboardUserList={readboardUserList} notReadboardUserList={notReadboardUserList} /> :
                        ""
                }
                {
                isDeleteCard ? <DeleteCard boardDelete={boardDelete} onSetIsdeleteCard={onSetIsdeleteCard} /> 
                :
                ""
                              
                }
            </div>
        </>

    )
}