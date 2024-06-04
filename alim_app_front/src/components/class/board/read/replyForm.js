'use client'

import axios from "axios";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
import { useState, useEffect,useRef } from "react";
import { usePathname } from "next/navigation";

export default function ReplyForm() {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const { data: session } = useSession();


    const path = usePathname().split('/');
    const boardId = path[path.length - 1];
    const clsId = path[2];

    const [boardRepleList, setBoardRepleList] = useState([]);
    const [stateUpdate, setStateUpdate] = useState(0);

    const [comment, setComment] = useState("");
    const [reComment, setReComment] = useState("");

    const [visible, setVisible] = useState([]); 

    //input 연결 후 제어 -> clear하기 위해
    const inputText = useRef();

    const [classUserlist, SetClassUserlist] = useState([]);



    useEffect(() => {

        axios.get(API_URL+'/api/boardReple/', {
            params: {
                boardId: boardId,
                clsId: clsId
            }
        })
            .then(response => {
                // Handle the response data

                let temp = [];
                

                // setBoardRepleList(response.data);

                for(let i = 0; i < response.data.length; i++ ){
                    visible.push({idx :i, isVisible:false});
                 }


                 //lvl이 0인 댓글을 넣고, 자식댓글들을 그밑에 넣어준다 이때 시퀀스 순서대로 정렬해서 나온 리스트기때문에 댓글 순서는 정렬할 필요가 없다

                 for(let i = 0; i < response.data.length; i++ ){
                    
                    if(response.data[i].replyLevel === "0"){
                        temp.push(response.data[i]);

                        for(let j = 0; j < response.data.length; j++ ){
                            if(response.data[i].replySeq === response.data[j].parentReplySeq){
                            temp.push(response.data[j]);
                            }
                        }

                    }

                }

                setBoardRepleList(temp);
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            });

    }, [stateUpdate])


    //댓글정보 저장
    const handleCommentChange = (e) => {
        setComment(e.currentTarget.value);
    };

    //대댓글정보 저장
    const handleReCommentChange = (e) => {
        setReComment(e.currentTarget.value);
    };

    //댓글 저장
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const level =  "0";
        const replySeq = null;
 
        createReple(comment ,level, replySeq);

    };

    //대 댓글 저장
    const handleReSubmit = (e) => {
       e.preventDefault();

       const level =  "1";
       const replySeq = e.currentTarget.id;

       createReple(reComment, level, replySeq);


    };

    function createReple(replyText, level, replySeq,){

        if(replyText === null || replyText === ""){
            alert("댓글 내용을 입력해주세요");
            return;
        }

         //userId 확인 필수  seq는 서버에서 해당조건으로 count해보고 count+1으로 seq넣어주기
         const post = {
             boardId: boardId,
             userId: session?.user.id,
             replyText: replyText,
             replyLevel: level,
             parentReplySeq: replySeq
         };

         axios.post(API_URL+"/api/boardReple/save", post)
             .then((response) => {
                 inputText.current.value = "";
                 setStateUpdate(stateUpdate + 1);
                 shutdownForm();

             })
             .catch((error) => {
                 console.log(error);
             });
    }

    //댓글 삭제
    function commentDelete(e) {
        e.preventDefault();

        const replySeq = e.currentTarget.id;

        axios.delete(API_URL+"/api/boardReple/delete", {
            params: {
                boardId: boardId,
                // setReplySeq 로 해당 삭제 버튼 클릭시 변경 어딘가에 seq넣어놓고 여기로가져오기
                replySeq: replySeq
            }

        }).then(function (response) {

            alert("댓글이 삭제되었습니다.");
            setStateUpdate(stateUpdate + 1);
            
        }).catch(function (error) {

            alert("삭제 실패하였습니다. 잠시후 다시 시도해주세요");
        });

    };

    // 입력폼 껏다켰다
    function disableForm(e){
        let temp = [...visible];
        temp[e.currentTarget.id].isVisible = !temp[e.currentTarget.id].isVisible ;
        
        //여기 
        for(let i = 0; i < temp.length; i++ ){

            if(i != e.currentTarget.id){
                temp[i].isVisible = false;
            }
        }
        setVisible(temp);
        setReComment("");
    }

    //댓글 인풋 다숨기기
    function shutdownForm(){
        let temp = [...visible];

        //여기 
        for(let i = 0; i < temp.length; i++ ){
            temp[i].isVisible = false;
        }
        setVisible(temp);
        setReComment("");
    }



    return (
        <>
            <form className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 flex justify-between" onSubmit={handleSubmit} noValidate>
                <input type="text" onChange={handleCommentChange} ref={inputText} className="rounded-sm focus:outline-none bg-gray-100 w-11/12" placeholder="댓글을 남겨주세요" 
                 />
                <button type="submit" className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-200 hover:bg-gray-600">등록</button>
            </form>
            {
                boardRepleList?.length === 0 ?
                    ""
                    :
                    boardRepleList.map((reple, idx) => (

                        reple.replyLevel === "1" ?
                            <div className="flex items-center space-x-2 mt-2 ml-8" >
                                <div className="flex flex-shrink-0 self-start">
                                    <img src={reple.profileImg === "NONE" ? "/images/no_profile.png" : reple.profileImg} alt="" className="h-8 w-8 object-fill rounded-full" />
                                </div>

                                <div className="flex items-center justify-center space-x-2">
                                    <div className="block">
                                        <div className="bg-orange-100 w-full rounded-xl px-2 pb-2">
                                            <div className="font-bold">
                                                <small>{reple.realName}</small>
                                            </div>
                                            <div className="text-xs">
                                                {reple.replyText}
                                            </div>
                                        </div>
                                        <div className="flex justify-start items-center text-xs w-full">
                                            {reple.userId !== session?.user.id ?
                                                <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                                                    <small>{reple.createDate.split("T")[0]}</small>
                                                </div>
                                                :
                                                <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                                                    <small>{reple.createDate.split("T")[0]}</small>

                                                    <small className="self-center">.</small>
                                                    <a href="#" id ={reple.replySeq} onClick={commentDelete} className="hover:underline">
                                                        <small>삭제</small>
                                                    </a>
                                                </div>
                                            }
                                        </div>

                                    </div>
                                </div>

                            </div>
                            :
                            <div>
                                <div className="flex items-center space-x-2 mt-6" >
                                    <div className="flex flex-shrink-0 self-start">
                                    <img src={reple.profileImg === "NONE" ? "/images/no_profile.png" : reple.profileImg} alt="" className="h-8 w-8 object-fill rounded-full" />
                                    </div>

                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="block">
                                            <div className="bg-orange-100 w-full rounded-xl px-2 pb-2">
                                                <div className="font-bold">
                                                    <small>{reple.realName}</small>
                                                </div>
                                                <div className="text-xs">
                                                    {reple.replyText}
                                                </div>
                                            </div>
                                            <div className="flex justify-start items-center text-xs w-full">

                                            {reple.userId !== session?.user.id ?
                                                <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                                                <small>{reple.createDate.split("T")[0]}</small>

                                                <small className="self-center">.</small>

                                                <small className="cursor-pointer" id ={idx} onClick={disableForm}>Reply</small>
                                            </div>
                                                :
                                                <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                                                    <small>{reple.createDate.split("T")[0]}</small>

                                                    <small className="self-center">.</small>

                                                    <small className="cursor-pointer" id ={idx} onClick={disableForm}>Reply</small>

                                                    <small className="self-center">.</small>
                                                    <a href="#" id ={reple.replySeq} onClick={commentDelete} className="hover:underline">
                                                        <small>삭제</small>
                                                    </a>
                                                </div>
                                            }
                                                
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            {visible[idx]?.isVisible ? 
                                <div className="text-center l-8">
                                    <form id={reple.replySeq} key= {idx} className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 flex justify-between w-11/12" onSubmit={handleReSubmit} noValidate >
                                        <input type="text" onChange={handleReCommentChange} ref={inputText} className="rounded-sm focus:outline-none bg-gray-100 w-11/12" placeholder="대댓글을 남겨주세요"
                                        />
                                        <button type="submit" className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-200 hover:bg-gray-600">등록</button>
                                    </form>
                                </div>
                            :
                                ""
                            
                            }
                            </div>
                    ))
            }

        </>



    )
}