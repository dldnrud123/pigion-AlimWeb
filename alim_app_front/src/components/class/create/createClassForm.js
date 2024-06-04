'use client'

import axios from "axios";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
import { useState, useEffect } from "react";


export default function CreateClassForm() {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const { data: session } = useSession();
    const router = useRouter();


    const { register, handleSubmit, formState, setValue } = useForm({
        defaultValues: {
            createUserId: session?.user.id ? session.user.id : session.user.email,
            //일단 전부 비공개로
            clsPublicYn: 'N',
            activeYn: 'Y'
        }
    });

    const { errors } = formState;

    // id 중복체크
    const [checkId, setCheckId] = useState("");
    const [isCheckedId, setIsCheckedId] = useState(false);
    const [checkIsPosibleId, setCheckIsPosibleId] = useState(false);


    //id중복체크 버튼 이벤트
    function idExistCheck() {
        axios.get(API_URL+'/api/class/idCheck', {
            params: {
                id: checkId
            }
        })
            .then(response => {

                setCheckIsPosibleId(JSON.parse(response.data));
                setIsCheckedId(true);

                if(JSON.parse(response.data)){
                    alert("사용가능한 아이디 입니다.")
                }else{
                    alert("사용 불가능한 아이디 입니다.")
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            });
    }

    //id input handler
    const idInputHandler = (event) => {
        setIsCheckedId(false);
        setCheckId(event.target.value);
    };


    //폼 제출시 
    const onSubmit = (data) => {

        axios.post(API_URL+"/api/class/save", data)
            .then((response) => {
                //정상등록시 클래스 내부 주소로 이동
                router.replace('/class?isClassMine=true');
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <>

            <div className="bg-white lg:w-4/12 md:4/12 w-10/12 m-auto my-10 shadow-md overflow-y-auto">
                <div className="max-w-2xl mx-auto bg-white p-16">
                    <div className="mb-8">
                        <label className="block mb-2 text-4xl font-large text-gray-900 dark:text-gray-300">클래스개설</label>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">* 클래스아이디</label>
                            <p className="font-small text-red-500">{errors.clsId?.message}</p>
                            <div className="flex justify-between">
                                <input type="id"
                                    id="clsId"
                                    name="clsId"
                                    onInput={idInputHandler}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="클래스url"
                                    {...register("clsId", {
                                        required: '아이디를 입력해주세요',
                                        pattern: {
                                            value: /^[0-9a-zA-Z]{6,20}$/,
                                            message: '영문/숫자 혼합 6-20자리를 입력해주세요',
                                        },
                                        validate: {
                                            isCheckedkSet: () => {
                                                return (isCheckedId && checkIsPosibleId) || "아이디 중복확인을 해주세요.";
                                            }
                                        }
                                    })} />
                                <button type="button"
                                    onClick={idExistCheck}
                                    className="text-white bg-orange-500 hover:bg-orange-300 focus:ring-4 focus:outline-none ml-5 focus:ring-blue-300 font-medium rounded-lg text-sm w-screen sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">중복확인</button>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">* 비밀번호</label>
                            <p className="font-small text-red-500">{errors.clsPass?.message}</p>
                            <input type="password"
                                id="clsPass"
                                name="clsPass"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">* 비밀번호확인</label>
                            <p className="font-small text-red-500">{errors.confirm_password?.message}</p>
                            <input type="password"
                                id="confirm_password"
                                name="confirm_password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="비밀번호 확인"
                                {...register("confirm_password", {
                                    required: '비밀번호를 입력해주세요',
                                    pattern: {
                                        value: /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,20}$/,
                                        message: '영문/숫자/특수문자 혼합 6-20자리를 입력해주세요',
                                    }
                                })}
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">* 클래스명</label>
                            <p className="font-small text-red-500">{errors.clsName?.message}</p>
                            <input type="clsName"
                                id="clsName"
                                name="clsName"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="클래스명"
                                {...register("clsName", {
                                    required: '클래스명을 입력해주세요.',
                                    pattern: {
                                        value: /^[가-힣]{5,20}|[a-zA-Z]{5,20}\s[a-zA-Z]{5,20}$/,
                                        message: '5-20자 이내의 한글 또는 영문이름을 입력해주세요. ',
                                    }
                                })}
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">클래스 설명</label>
                            <p className="font-small text-red-500">{errors.clsComment?.message}</p>
                            <input type="text"
                                id="clsCmt"
                                name="clsCmt"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="간단하게 클래스를 설명해주세요"
                                {...register("clsComment", {
                                    required: '클래스 설명을 최소 10자이상 50자 미만으로 적어주세요',
                                    pattern: {
                                        value: /^[a-zA-Z0-9가-힣\s]{10,50}$/,
                                        message: '특수문자를 제외하여 10~50자 이내로 입력해주세요.',
                                    }
                                })}
                            />
                        </div>

                        {/* 
                        일단 전부 비공개로 하기
                        <div className="flex items-start mb-5">
                            <div className="flex items-center h-5">
                                <input type="checkbox" 
                                       id="checkClsPublicYn"
                                       name="checkClsPublicYn"
                                       value="" 
                                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" 
                                       {...register("checkClsPublicYn",{
                                           validate: {
                                               isCheckedPublicYn: value => {
                                                   value?setValue("clsPublicYn","Y"):setValue("clsPublicYn","N");
                                               }
                                           }
                                       })}
                                />
                            </div>
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">비공개 클래스 여부</label>
                            <p className="font-small text-red-500">*비공개권장</p>
                        </div> */}
                        <button type="submit" className="text-white bg-orange-500 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">개설하기</button>
                    </form>

                </div>
            </div>
        </>

    )
}