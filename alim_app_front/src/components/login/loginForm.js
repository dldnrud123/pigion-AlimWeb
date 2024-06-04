'use client'

import { signIn } from "next-auth/react";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';


export default function LoginForm() {

    const { register, handleSubmit} = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        

        const result = await signIn("credentials", {
            redirect: false,
            //callbackUrl: "/",// Set to true to redirect to success/error page
            userId: data.userId,
            userPass: data.userPass
        });

        if (result.error) {
            alert("로그인 할 수 없습니다.");
            console.log(result.error);
        } else {
            // Handle success case
            router.push('/');
        }
    };

    return (
        <>
            <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-md">
                <div className="py-8 px-8 rounded-xl">
                    <h1 className="font-medium text-2xl mt-3 text-center">로그인</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                        <div className="my-5 text-sm">
                            <label className="block text-black">아이디</label>
                            <input type="text"
                                id="userId"
                                name="userId"
                                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                                placeholder="ID"
                                {...register("userId",{
                                    required: '아이디를 입력해주세요'
                                })}
                            />
                        </div>

                        <div className="my-5 text-sm">
                            <label className="block text-black">패스워드</label>
                            <input type="password"
                                id="userPass"
                                name="userPass"
                                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                                placeholder="Password"
                                {...register("userPass",{
                                    required: '비밀번호를 입력해주세요'
                                })}
                            />
                        </div>

                        <button className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full hover:bg-gray-600">로그인하기</button>
                    </form>

                    <div className="flex md:justify-between justify-center items-center mt-10">
                        <div style={{ height: '1px' }} className="bg-gray-300 md:block hidden w-4/12"></div>
                        <p className="md:mx-2 text-sm font-light text-gray-500"> 간편 로그인 </p>
                        <div style={{ height: '1px' }} className="bg-gray-300 md:block hidden w-4/12"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-2 mt-7">
                        <div>
                            <button className="text-center w-full text-white bg-green-700 p-3 duration-300 rounded-sm hover:bg-green-400"
                                    onClick={() => signIn("naver", { redirect: true, callbackUrl: "/" })}>NAVER</button>
                        </div>
                        <div>
                            <button className="text-center w-full text-white bg-yellow-400 p-3 duration-300 rounded-sm hover:bg-yellow-500"
                                    onClick={() => signIn("kakao", { redirect: true, callbackUrl: "/" })}>KAKAO Talk</button>
                        </div>
                    </div>

                    <p className="mt-12 text-xs text-center font-light text-gray-400"> 계정이 없으신가요 ?
                        <a href="./join" className="text-black font-medium"> 계정만들기 </a>
                    </p>

                </div>
            </div>
        </>

    )
}