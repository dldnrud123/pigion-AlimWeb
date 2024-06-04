'use client'

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useSession } from 'next-auth/react'
import { useState, useEffect } from "react";

export default function ClassList() {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const { data: session } = useSession();
    const params = useSearchParams();
    const isClassMine = JSON.parse(params.get('isClassMine'));
    const userId = session?.user.id;

    const url = isClassMine ? "mineList" : "commonList";

    const [classList, setClassList] = useState([]);

    useEffect(() => {
        axios.get(API_URL+'/api/class/' + url, {
            params: {
                id: userId
            }
        })
            .then(response => {
                setClassList(response.data);
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            });

    }, [url]);


    return (
        <>

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
                            classList.length !== 0 ?
                                classList.map((cls, idx) => (

                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600" key={idx}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {(classList.length - Number(idx))}
                                        </th>
                                        <td className="px-6 py-4">
                                            {cls.clsName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {cls.clsComment}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a href={'/class/' + cls.clsId} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">입장</a>
                                        </td>
                                    </tr>


                                ))
                                :
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 text-center" colSpan="3">클래스가 없습니다.</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}