'use client'

import axios from "axios";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useMemo, useRef } from "react";


import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AWS from "aws-sdk";

export default function WriteForm() {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const { data: session } = useSession();
    const router = useRouter();

    const params = useSearchParams();
    const modify = JSON.parse(params.get('modify')) ? true : false;
    const boardId = params.get('boardId');

    const path = usePathname().split('/');
    const classId = path[2];

    const userId = session?.user.id;

    const quillRef = useRef(null);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [boardInfo, setBoardInfo] = useState([]);


    //제목
    const handleTitleChange = (e) => {
        setTitle(e.currentTarget.value);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const post = {
            boardId: boardId,
            clsId: classId,
            writerId: userId,
            boardTitle: title,
            boardText: content,
            activeYn: "Y"
        }

        // 수정일때
        if (modify) {

            axios.put(API_URL+"/api/classBoard/update", post)
                .then(function (response) {
                    router.replace("/" + path[1] + "/" + path[2]);
                }).catch(function (error) {
                    alert("알림장 수정 실패하였습니다.\n 잠시후 다시 시도해주세요.");
                }).then(function () {
                    // 항상 실행
                });

        }
        else {

            // 생성일때
            axios.post(API_URL+"/api/classBoard/save", post)
                .then((response) => {

                    const boardId = response.data;
                    pushMsg();
                    //메세지 전송후 이동
                    router.replace("/" + path[1] + "/" + path[2] + "/" + path[3] + "/" + boardId);
                })
                .catch((error) => {
                    console.log(error);
                });

        };

    };

    useEffect(() => {
        if (modify) {

            axios.get(API_URL+'/api/classBoard/boardInfo', {
                params: {
                    boardId: boardId
                }
            })
                .then(response => {

                    setBoardInfo(response.data);
                    setTitle(response.data.boardTitle);
                    setContent(response.data.boardText);
                })
                .catch(error => {
                    // Handle any errors that occurred during the request
                    console.error('Error fetching data:', error);
                });

        }

    }, [modify])


    //푸시알림 보내기
    async function pushMsg() {
        //테스트 성공하면 devicetokens로 배열 만들어서 쏴보기.

        const deviceToken = [];

        // 게시물에
        await axios.get(API_URL+'/api/UserNotification/', {
            params: {
                clsId: classId
            }
        })
            .then(response => {

                // 토큰값만 배열에 저장
                response.data.forEach((user) => {
                    deviceToken.push(user.notiTokenVal);
                });

            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            });

        //현재 클래스 회원에게 푸시알림 띄우기
        await axios.post("/api/notification", {
            deviceToken: deviceToken,
            title: "알림장이 도착했어요!",
            body: "메시지를 눌러 알림장을 확인해주세요",
            icon: "",
            image: "",
            click_action: "/" + path[1] + "/" + path[2]

        }).then(res => {

        }).catch(err => {
            console.log("error : " + err);
        });

    };

    //목록으로
    function goList(){
        router.replace("/class/"+classId);
    }



    // S3 - FrontCloud 정보 가져오기 
    // client side로 local.env를 가져오기위해서는 접두사인 NEXT_PUBLIC을 붙인다
    const REGION = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_REGION;
    const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_ACCESS_KEY_ID;
    const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_SECRET_ACCESS_KEY;
    const CLOUD_FRONT_URL = process.env.NEXT_PUBLIC_AWS_FRONT_CLOUD_URL;
    const BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;


    //이미지 처리 S3 저장 후 화면에 등록
    const imageHandler = async () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.click();

        input.addEventListener("change", async () => {
            //이미지를 담아 전송할 formData를 만든다
            const file = input.files?.[0];
            //이미지 확장자 만들기
            const inputValueSplit = file.name.split(".");
            const imageTypeValue = inputValueSplit[(inputValueSplit.length - 1)];


            try {
                //업로드할 파일의 이름으로 Date 사용

                const name = session.user.email + "_" + session.expires + "." + imageTypeValue;
                //s3 관련 설정들
                AWS.config.update({
                    region: REGION,
                    accessKeyId: ACCESS_KEY,
                    secretAccessKey: SECRET_ACCESS_KEY,
                });


                //업로드
                const upload = new AWS.S3.ManagedUpload({
                    params: {
                        ACL: "public-read",
                        Bucket: BUCKET_NAME,
                        Key: name,
                        Body: file,
                    },
                });

                //이미지 업로드
                //업로드 된 이미지 url을 가져오기
                const url_key = await upload.promise()
                    .then((res) => res.Key)
                    .catch((err) => {
                        console.log("에러메세지" + err);
                    }
                    );


                //useRef를 사용해 에디터에 접근한 후
                //에디터의 현재 커서 위치에 이미지 삽입
                const editor = quillRef.current.getEditor();
                const range = editor.getSelection();
                // 가져온 위치에 이미지를 삽입한다
                editor.insertEmbed(range.index, "image", CLOUD_FRONT_URL + url_key);

            } catch (error) {
                console.log(error);
            }
        });
    };

    //quill-editor 툴바 셋팅
    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ size: [] }],
                    [{ header: [1, 2, 3, 4, 5, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    // [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link', 'image'],
                    [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
                    ['clean']
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        };
    }, []);

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    return (
        <div className="w-full overflow-x-hidden bg-white">
            <form onSubmit={handleSubmit}>
                <div className="px-6 py-8">
                    <div className="my-5 text-sm">
                        <label className="block mb-2 text-4xl font-large text-gray-900 dark:text-gray-300">알림장작성</label>
                    </div>
                    <div className="my-3 flex">
                        <label className="block text-black mt-2 py-4 w-10">제목</label>
                        <input id="title"
                            type="text"
                            value={title}
                            placeholder="제목을 입력하세요"
                            onChange={handleTitleChange}
                            className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                            required />
                    </div>
                    <div className="mb-5 text-lx">
                        <ReactQuill
                            ref={quillRef}
                            style={{ width: "82vw", height: "50vh", margin: "0 auto" }}
                            theme="snow"
                            placeholder={'알림장을 작성해주세요!'}
                            modules={modules}
                            onChange={setContent}
                            value={content}
                            required
                        />
                    </div>
                    <button type="submit"
                        className="mt-8 text-white bg-orange-500 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        저장
                    </button>

                    <button type="button" onClick={goList}
                        className="mt-8 ml-2 text-white bg-green-500 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        뒤로가기
                    </button>
                </div>
            </form>
        </div>

    )
}