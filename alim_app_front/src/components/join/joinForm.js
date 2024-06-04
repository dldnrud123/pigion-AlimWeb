'use client'

import Link from 'next/link'
import { useState, useEffect } from "react";
import { DevTool } from '@hookform/devtools'
import { ko } from "date-fns/locale";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function JoinForm() {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const router = useRouter();

    const { register, handleSubmit, control, formState, getValues, setValue } = useForm({
        defaultValues: {
            startDate: new Date(),
            collectYN: '',
            primiumYN: "N",
            snsYN:"N",
            gender:"N",
            profileImg:"NONE",
            activeYN:"Y"
        }
    });
    const { errors } = formState;


    // id 중복체크
    const [checkId, setCheckId] = useState("");
    const [isCheckedId, setIsCheckedId] = useState(false);
    const [checkIsPosibleId, setCheckIsPosibleId] = useState(false);

    //id input handler
    const idInputHandler = (event) => {
        setIsCheckedId(false);
        setCheckId(event.target.value);
    };


    //id중복체크 버튼 이벤트
    function idExistCheck() {
        axios.get(API_URL+'/api/user/idCheck', {
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



    //폼 제출시 
    const onSubmit = (data) => {
        
        axios.post(API_URL+"/api/user/save", data)
            .then((response) => {
              router.replace('/login');
            })
            .catch((error) => {
              console.log(error);				//오류발생시 실행
            })
    }
    
    return (
        <>

            <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-md">
                <div className="max-w-2xl mx-auto bg-white p-16">
                    <div className="mb-8">
                        <label className="block mb-2 text-4xl font-large text-gray-900 dark:text-gray-300">회원가입</label>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">* 아이디</label>
                            <p className="font-small text-red-500">{errors.userId?.message}</p>
                            <div className="flex justify-between">
                                <input type="id"
                                    id="userId"
                                    name="userId"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-9/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onInput={idInputHandler}
                                    placeholder="아이디"
                                    {...register("userId", {
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
                                    })}
                                />
                                <button type="button" onClick={idExistCheck}
                                    className="text-white bg-orange-500 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/2 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">중복확인</button>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">* 비밀번호</label>
                            <p className="font-small text-red-500">{errors.userPass?.message}</p>
                            <input type="password"
                                id="userPass"
                                name="userPass"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="비밀번호"
                                {...register("userPass", {
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
                            <p className="font-small text-red-500">{errors.confirmUserPass?.message}</p>
                            <input type="password"
                                id="confirmUserPass"
                                name="confirmUserPass"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="비밀번호 확인"
                                {...register("confirmUserPass", {
                                    required: '비밀번호를 확인해주세요',
                                    validate: {
                                        matchesPreviousPassword: value => {
                                            const { userPass } = getValues();
                                            return userPass === value || "비밀번호가 일치하지 않습니다.";
                                        }
                                    }
                                }
                                )}
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">* 이름</label>
                            <p className="font-small text-red-500">{errors.userName?.message}</p>
                            <input type="name"
                                id="userName"
                                name="userName"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="이름"
                                {...register("userName", { required: '성함을 입력해주세요.',
                                pattern: {
                                    value: /^[가-힣]{2,6}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/,
                                    message: '한글 또는 영문이름을 입력해주세요. ',
                                } })}
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">* 휴대폰번호</label>
                            <p className="font-small text-red-500">{errors.phone?.message}</p>
                            <input type="tel"
                                id="phone"
                                name="phone"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="'-' 없이 01012345678"
                                {...register("phone", {
                                    required: '휴대폰번호를 입력해주세요.',
                                    pattern: {
                                        value: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/,
                                        message: '입력한 휴대폰번호를 확인해주세요 ',
                                    }
                                })}
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">* 이메일주소</label>
                            <p className="font-small text-red-500">{errors.email?.message}</p>
                            <input type="email"
                                id="email"
                                name="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="example@abc.com"
                                {...register("email",
                                    {
                                        required: '이메일을 입력해주세요.',
                                        pattern: {
                                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            message: '입력한 이메일 형식을 확인해주세요.',
                                        },
                                    })} />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">* 생년월일</label>
                            <Controller
                                name="burnDate"
                                id="burnDate"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        showIcon
                                        placeholderText='  클릭하여 날짜선택'
                                        locale={ko}
                                        dateFormatCalendar='yyyy년 M월'
                                        maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        dateFormat="yyyy-MM-dd"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        showYearDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={150}
                                        required
                                    />
                                )}
                            />

                        </div>

                        <p className="font-small text-red-500">{errors.checkCollectYN?.message}</p>
                        <div className="flex items-start mb-5">
                            <div className="flex items-center h-5">
                                <input type="checkbox"
                                    id="checkCollectYN"
                                    name="checkCollectYN"
                                    value=""
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                    {...register("checkCollectYN",{
                                        validate: {
                                            isCheckedCollectYn: value => {
                                                value?setValue("collectYN","Y"):setValue("collectYN","N");
                                                return value || "개인정보수집에 동의해주세요.";
                                            }
                                        }
                                    })}
                                />
                            </div>
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">* 개인정보수집 동의 확인</label>
                        </div>

                        <Link href="/login">
                            <button type="button"
                                className="text-white bg-blue-500 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">돌아가기</button>
                        </Link>
                        <button type="submit"
                            className="ml-2 text-white bg-orange-500 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">가입하기</button>
                    </form> 

                    
                </div>
            </div>
        </>

    )
}