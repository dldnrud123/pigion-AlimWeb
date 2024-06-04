'use client'

import axios from "axios";
import { usePathname } from "next/navigation";
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function KnockModal(props) {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;


    const { data: session } = useSession();
    const router = useRouter();

    //pathname으로 부터 id값 추출
    const clsId = usePathname().split('/')[2];

    const { register, handleSubmit, formState, setValue } = useForm({
        defaultValues: {
            clsId: clsId,
            userId: session?.user.id,
            readerYn: "N",
            permissionYn: "N",
            activeYn: "Y"
        }
    });

    const { errors } = formState;

    //classinfo값 가져와서 생성자인지 확인 후 reader_yn,  permission_yn 셋팅
    useEffect(() => {
        axios.get(API_URL+'/api/class/classInfo', {
            params: {
                clsId : clsId 
            }
        })
            .then(response => {
                setValue("readerYn", response.data.createUserId === session?.user.id ? "Y" : "N");
                setValue("permissionYn", response.data.createUserId === session?.user.id ? "Y" : "N");
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            });

    }, [])


    // 최초 회원등록시 제출버튼
    const onSubmit = (data) => {
        console.log("data :"+data.clsPass);

        axios.post(API_URL+"/api/classUser/save", data)
            .then((response) => {
                
                if(JSON.parse(response.data) === false){
                    alert("이전 정보가 존재합니다. 재가입 되었습니다.")
                }
                props.onSetIsJoinUser();
            })
            .catch((error) => {
                console.log(error);
                alert("비밀번호를 확인해주세요.");	
            });

    };


    return (
        <>

            <div className="modal bg-gray-600 w-full h-200 shadow-md overflow-y-auto">
                <div className="modal-content max-w-2xl mx-auto bg-white p-16 mt-20">
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                        <div className="my-5 text-sm">
                            <label className="block text-black">해당 클래스에서 사용할 이름</label>
                            <p className="font-small text-red-500">{errors.realName?.message}</p>
                            <input type="text"
                                id="realName"
                                name="realName"
                                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                                placeholder="인식 가능한 실명을 입력해주세요"
                                {...register("realName", {
                                    required: '빈칸을 채워주세요',
                                    pattern: {
                                        value: /^[가-힣]{2,6}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/,
                                        message: '2-6자의 한글 또는 2-10자이내의 영문이름을 입력해주세요. ',
                                    }
                                })}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">클래스 비밀번호</label>
                            <p className="font-small text-red-500">{errors.clsPass?.message}</p>
                            <input type="password"
                                id="clsPass"
                                name="clsPass"
                                className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                                placeholder="비밀번호"
                                {...register("clsPass", {
                                    required: '비밀번호를 입력해주세요',
                                    pattern: {
                                        value: /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,20}$/,
                                        message: '영문/숫자/특수문자 혼합 6-20자리를 입력해주세요',
                                    }
                                })}
                            />
                        </div>
                        <button className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full hover:bg-gray-600">제출</button>
                    </form>
                </div>
            </div>



        </>

    )
}