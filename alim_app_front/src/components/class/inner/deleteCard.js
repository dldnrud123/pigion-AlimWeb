'use client'

import { useState } from "react";

export default function DeleteCard(props) {

    const [isExit, setIsExit] = useState(props.isExit);

    function close() {
        props.onSetIsdeleteCard(false);
    }

    function clsDelete() {
        props.classDelete();
    }

    
    function clsExit() {
        props.classExit();
    }

    return (
        <div className="fixed inset-x-2.5 inset-y-2.5 z-10">
            <div className="max-w-2xl mx-auto">
                {isExit ? 
                <div className="p-4 max-w-md text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
                <div className="mt-3 bg-red-600 text-white">
                    <h1>클래스를 정말 탈퇴하시겠습니까 ? </h1>
                </div>
                <div className="mt-3">
                    <button onClick={clsExit} className="px-5 py-3 hover:bg-orange-300" >예</button>
                    <button onClick={close} className="px-5 py-3 hover:bg-orange-300">아니요</button>
                </div>
            </div>
                :
                <div className="p-4 max-w-md text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
                    <div className="mt-3 bg-red-600 text-white">
                        <h1>클래스를 정말 삭제하시겠습니까 ? </h1>
                    </div>
                    <div className="mt-3">
                        <button onClick={clsDelete} className="px-5 py-3 hover:bg-orange-300" >예</button>
                        <button onClick={close} className="px-5 py-3 hover:bg-orange-300">아니요</button>
                    </div>
                </div>
                }
            </div>



        </div>
    )
}