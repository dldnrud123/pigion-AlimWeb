'use client'

import axios from "axios";
import { usePathname } from "next/navigation";
import { useSession } from 'next-auth/react'
import { useState, useEffect } from "react";
import Link from 'next/link'

export default function HistoryForm() {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const { data: session } = useSession();

    const path = usePathname();

    const [boardList, setBoardList] = useState([]);
    const [classList, setClassList] = useState([]);

    //페이징 관련

    //현재 페이지
    const [page, setPage] = useState(1);

    //페이지 갯수
    const [pageCount, setPageCount] = useState([]);

    useEffect(() => {

        axios.get(API_URL+'/api/classBoard/aWeekBoard', {

            params: {
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

        axios.get(API_URL+'/api/class/allList', {
            params: {
                id: session?.user.id
            }
        })
            .then(response => {
                setClassList(response.data);
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            });
    }, [page])


    //현재 페이지로 나눠준다.
    function paging(arr, page) {
        console.log("arr:" + arr);

        const temp = [];

        //한 페이지에 보여줄 갯수
        const pageMaxCount = 5;

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
        const pageMaxCount = 5;

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




    //페이징 시나리오
    //1. boardList 페이지 갯수파악 -> 페이지 state배열 생성 -> 페이지 a태그 생성 
    //2. a태그 클릭 -> page 값 변경됨에 따라 useEffect에 의해서 BoardList 변경 


    //db날짜 다듬기
    function toStrDateTime(dateTime) {

        const date = dateTime.split("T")[0];
        const time = dateTime.split("T")[1].split(".")[0];

        const hour = time.split(":")[0];
        const min = time.split(":")[1];

        const day = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        const dayOfWeek = new Date(date).getDay();

        const strDateTime = date + ", " + day[dayOfWeek] + " " + hour + "시 " + min + "분";

        return strDateTime;
    }

    return (
        <>

            <div className="w-full overflow-x-hidden bg-orange-100">

                <div className="px-6 py-8">
                    <div className="container flex justify-between mx-auto">
                        <div className="w-full">
                            <h1 className="ml-10 text-xl font-bold text-gray-700 md:text-2xl">
                                최근 작성한 알림장</h1>

                            {boardList.length === 0 ?
                                <div>최근 작성된 알림장이 없습니다.</div>
                                :
                                boardList.map((board, idx) => (
                                    <div className="mt-6">
                                        <div className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md hover:bg-blue-100">
                                            <div className="flex items-center justify-between">
                                                <span className="font-light text-gray-600">
                                                    {toStrDateTime(board.createDate)}
                                                </span>

                                            </div>
                                            <div className="mt-2"><a href={"class/" + board.clsId + "/board/" + board.boardId} className="text-2xl font-bold text-gray-700 hover:underline">
                                                {board.boardTitle}</a>
                                            </div>
                                            <div className="flex items-center justify-end mt-2">
                                                <div className="flex justify-end">
                                                    {classList.length === 0 ?
                                                        ""
                                                        :
                                                        classList.map((cls, idx) => (
                                                            <div className="flex items-center"> 

                                                                <h1 className="font-bold text-orange-400">
                                                                    {board.clsId === cls.clsId ? "From. " + cls.clsName + " 클래스" : ""}
                                                                </h1>
                                                            </div>

                                                        ))
                                                    }

                                                </div>
                                            </div>
                                      
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
                                                {pageCnt.page == page ?
                                                    <span className="px-5 py-2 text-lg text-orange-400">{pageCnt.page}</span>
                                                    :
                                                    <span className="px-5 py-2 text-lg ">{pageCnt.page}</span>
                                                }
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>

    )
}