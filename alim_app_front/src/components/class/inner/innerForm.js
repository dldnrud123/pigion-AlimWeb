'use client'

import axios from "axios";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
import { useState, useEffect } from "react";
import Link from 'next/link'
import DeleteCard from "./deleteCard";

export default function InnerForm() {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const { data: session } = useSession();
    const router = useRouter();

    //pathname으로 부터 id값 추출
    const path = usePathname().split('/');
    const path1 = usePathname();
    const clsId = path[path.length - 1];

    const [boardList, setBoardList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [classInfo, setClassInfo] = useState();

    //삭제 확인 메세지 관련
    const [isDeleteCard, setIsDeleteCard] = useState(false); 

    //삭제카드 종류 true: 삭제 , false: 탈퇴
    const [isExit, setIsExit] = useState(false); 

    //로그인 유저의 클래스내부 정보
    const [userClassinfo, SetUserClassinfo] = useState();


    //페이징 관련

    //현재 페이지
    const [page, setPage] = useState(1);

    //페이지 갯수
    const [pageCount, setPageCount] = useState([]);

    useEffect(() => {


        axios.get(API_URL+'/api/classBoard/', {

            params: {
                clsId: clsId,
                userId: session?.user.id
            }
        })
            .then(response => {

                //페이지 갯수 생성
                makePaging(response.data);

                //page해보자 
                paging(response.data, page);


            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            });

    }, [page])

    function onSetIsdeleteCard(flag){
        setIsDeleteCard(flag);
        setIsExit(false);
    }
    
    function openDeleteCard(){
        setIsDeleteCard(true);
    }

    function openExitCard(){
        setIsDeleteCard(true);
        setIsExit(true);
    }


    //현재 페이지로 나눠준다.
    function paging(arr, page) {

        const temp = [];

        //한 페이지에 보여줄 갯수
        const pageMaxCount = 3;

        for (let i = pageMaxCount * (page - 1); i < pageMaxCount * page; i++) {

            if (arr[i] === undefined) {
                break;
            }

            temp.push(arr[i]);
        }
        setBoardList(temp);
 
    }

    //페이지 갯수를 파악하여 만들기
    function makePaging(arr) {

        const temp = [];

        //한 페이지에 보여줄 갯수
        const pageMaxCount = 3;

        let cnt = 0;

        for (let i = 0; i < arr.length; i++) {

            if (i % pageMaxCount === 0) {
                temp.push({ page: ++cnt });
            } else if (i === 0 && arr.length > 0) {
                temp.push({ page: ++cnt });
            }
        }
        setPageCount(temp);
    }

    //페이지 클릭시 페이지값 변경
    function pageHandler(e) {

        e.preventDefault();

        const pageId = e.currentTarget.id;
        setPage(pageId);
    }

    useEffect(() => {
        //클래스 기본정보
        axios.get(API_URL+'/api/class/classInfo', {
            params: {
                clsId: clsId
            }
        })
            .then(response => {
                setClassInfo(response.data);
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




        //클래스 회원리스트를 받아온다 + 프로필 + realname 끌고오기
        axios.get(API_URL+'/api/classUser/classUserList', {

            params: {
                clsId: clsId
            }
        })
            .then(response => {
                setUserList(response.data);
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            });


    }, []);

    // 알림장 쓰기 횟수제한 걸기
    function createClass() {

        //로그인 회원의 금일 글쓰기 횟수 
        axios.get(API_URL+'/api/classBoard/getWriteCount', {

            params: {
                userId: session?.user.id
            }
        })
            .then(response => {

                const writeCount = response.data;

                if (writeCount >= 3) {
                    alert("회원님의 금일 글쓰기 횟수를 초과하셨습니다.")
                } else if (writeCount < 3) {
                    router.replace(path1 + "/board/write");
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            });

    }


    //클래스 삭제
    function classDelete() {

        axios.put(API_URL+"/api/class/delete", null, {
            params: {
                clsId: clsId
            }

        })
            .then(function (response) {
                alert("클래스가 삭제되었습니다");
                router.replace("/class?isClassMine=true");
            }).catch(function (error) {
                // 오류발생시 실행
            }).then(function () {
                // 항상 실행
            });

    };

    
    //클래스 탈퇴
    function classExit() {

        axios.put(API_URL+"/api/classUser/delete", null, {
            params: {
                clsId: clsId,
                userId: session?.user.id
            }

        })
            .then(function (response) {
                alert("클래스에서 탈퇴되었습니다.");
                router.replace("/class?isClassMine=true");
            }).catch(function (error) {
                // 오류발생시 실행
            }).then(function () {
                // 항상 실행
            });

    };

    //db날짜 다듬기
    function toStrDateTime(dateTime) {

        const date = dateTime.split("T")[0];
        const time = dateTime.split("T")[1].split(".")[0];

        const hour = time.split(":")[0];
        const min = time.split(":")[1];

        const day = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        const dayOfWeek = new Date(date).getDay();

        const strDateTime = date + ", " + day[dayOfWeek] + " "+ hour +"시 "+ min + "분" ;

        return strDateTime;
    }



    return (
        <>

            <div className="w-full overflow-x-hidden bg-orange-100">

                <div className="px-6 py-8">
                    <div className="container flex justify-between mx-auto">
                        <div className="w-full lg:w-8/12">
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-bold text-gray-700 md:text-4xl">
                                    {classInfo?.clsName}</h1>
                                    {userClassinfo?.permissionYn == 'Y' || userClassinfo?.readerYn == 'Y' ? 
                                <div>
                                    <button type="button" onClick={openDeleteCard}
                                        className="text-white bg-red-600 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">클래스삭제</button>

                                    <button type="button" onClick={createClass}
                                        className="mx-3 text-white bg-orange-500 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">알림장작성</button>

                                </div>
                                :
                                <button type="button" onClick={openExitCard}
                                className="text-white bg-red-600 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">클래스탈퇴</button>
                                    }
                            </div>
                            <div>
                                <h3 className="text-xs text-orange-600 md:text-sm ">
                                    클래스 아이디 : {classInfo?.clsId}</h3>
                            </div>
                            {boardList.length == 0 ?
                                <div className= "w-screen h-screen">알림장이 없습니다.</div>
                                :
                                boardList.map((board, idx) => (

                                    <div className="mt-6">
                                        <div className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md hover:bg-blue-100">
                                            <div className="flex items-center justify-between">
                                                <span className="font-light text-gray-600">
                                                    {toStrDateTime(board.createDate)}
                                                </span>
                                                {
                                                    board.viewYn === 'Y' ? 
                                                    <div className="px-2 py-1 font-bold text-gray-100 bg-green-600 rounded">
                                                    확인완료
                                                    </div>
                                                    :
                                                    <div className="px-2 py-1 font-bold text-gray-100 bg-red-600 rounded">
                                                    미확인
                                                    </div>
                                                }
                                            </div>
                                            <div className="mt-2"><a href={path1 + "/board/" + board.boardId} className="text-2xl font-bold text-gray-700 hover:underline">
                                                {board.boardTitle}</a>
                                            </div>
                                            {userList.length == 0 ?
                                                ""
                                                :
                                                userList.map((clsUser) => (
                                                    <div className="flex items-center justify-end mt-2">
                                                        {clsUser.userId === board.writerId ?
                                                            <div className="flex justify-end">
                                                                <div className="flex items-center"> 알림장 by
                                                                    <img src={clsUser.profileImg !== "NONE" ? clsUser.profileImg : "/images/no_profile.png"}
                                                                        alt="avatar" className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" />

                                                                    <h1 className="font-bold text-gray-700 hover:underline">
                                                                        {clsUser.realName}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            : ""}
                                                    </div>

                                                ))

                                            }
                                        </div>
                                    </div>
                                ))
                            }

                            <div className="mt-8">
                                <div className="flex justify-center w-full">
                                    {pageCount.length === 0 ?
                                        ""
                                        :
                                        pageCount.map((pageCnt, idx) => (

                                            <Link href="#" id={pageCnt.page} key={idx} onClick={pageHandler} >
                                                {pageCnt.page == page  ? 
                                                <span className = "px-5 py-2 text-lg text-orange-400">{pageCnt.page}</span>
                                                :
                                                <span className = "px-5 py-2 text-lg ">{pageCnt.page}</span>
                                                }
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="hidden w-4/12 -mx-8 lg:block">
                            <div className="px-8">
                                <h1 className="mb-4 text-xl font-bold text-gray-700">클래스회원
                                </h1>
                                <div className="flex flex-col max-w-sm px-6 py-4 mx-auto bg-white rounded-lg shadow-md">
                                    <ul className="-mx-4">
                                        {userList?.length == 0 ?
                                            <li className="flex items-center">
                                                <p>회원이 없습니다.</p>
                                            </li>
                                            :
                                            userList.map((clsUser, idx) => (
                                                <li className="flex justify-between items-center my-1 hover:bg-gray-100 " key={idx}>
                                                    <img
                                                        src={clsUser.profileImg !== "NONE" ? clsUser.profileImg : "/images/no_profile.png"}
                                                        alt="avatar" className="object-cover w-9 h-9 mx-4 rounded-full" />
                                                    <span className="mx-1 font-bold text-gray-700 ">{clsUser.realName}</span>
                                                    <span className="text-sm font-light text-gray-700">
                                                        {clsUser.readerYn === 'Y' ?
                                                            <img
                                                                src="/images/leader_img.png"
                                                                alt="avatar" className="object-cover w-8 h-8 mx-4 rounded-full" />
                                                            :
                                                            <img
                                                                src="/images/user_img.png"
                                                                alt="avatar" className="object-cover w-8 h-8 mx-4 rounded-full" />
                                                        }
                                                    </span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                isDeleteCard ? <DeleteCard classDelete={classDelete} classExit={classExit} isExit={isExit} onSetIsdeleteCard={onSetIsdeleteCard} /> 
                :
                ""
                              
            }

        </>

    )
}