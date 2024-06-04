'use client'

import axios from "axios";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

export default function SearchClass() {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const { data: session } = useSession();

    const [clsId, setClsId] = useState("");
    const [classList, setClassList] = useState([]);

    const [isSearching, setIsSearching] = useState(false);


    //클래스 아이디
    const handleInputChange = (e) => {
        setClsId(e.currentTarget.value);
      };


    // 검색하기버튼
    const onSubmit = (e) => {
        e.preventDefault();

        axios.get(API_URL+'/api/class/classInfo', {
            params: {
                clsId: clsId
            }
        })
        .then(response => {
            setClassList(response.data);
            setIsSearching(true);
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error fetching data:', error);
            alert("클래스를 찾을 수 없습니다. 잠시후 다시시도해주세요")
        });

    };

    return (
        <>
        {isSearching ? 
        <div className="relative lg:w-1/2 md:6/12 w-10/12 m-auto my-20">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-orange-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                번호
                            </th>
                            <th scope="col" className="px-6 py-3">
                                클래스명
                            </th>
                            <th scope="col" className="px-6 py-3" colSpan="3">
                                클래스설명
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            classList?.length !== 0 ?

                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600" >
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            1
                                        </th>
                                        <td className="px-6 py-4">
                                            {classList.clsName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {classList.clsComment}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a href={'/class/' + classList.clsId} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">입장</a>
                                        </td>
                                    </tr>


                                :
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 text-center" colSpan="3">클래스가 없습니다.</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        :
            <div className="modal bg-gray-600 w-full h-200 shadow-md overflow-y-auto">
                <div className="modal-content max-w-2xl mx-auto bg-white p-16 mt-20">
                    <form onSubmit={onSubmit} className="mt-6">
                        <div className="my-5 text-sm">
                            <label className="block text-black">클래스 아이디</label>
                            <input 
                            id="clsId" 
                            type="text" 
                            placeholder="검색할 클래스 아이디를 입력해주세요"
                            onChange={handleInputChange} 
                            className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" 
                            required/>
                        </div>
                        <button className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full hover:bg-gray-600">검색</button>
                    </form>
                </div>
            </div>


            }
        </>

    )
}