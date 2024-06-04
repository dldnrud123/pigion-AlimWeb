'use client'

import InnerForm from "@/components/class/inner/innerForm";
import KnockModal from "@/components/class/inner/knockModal";

import axios from "axios";
import { usePathname } from "next/navigation";
import { useSession } from 'next-auth/react'
import { useState, useEffect } from "react";

export default function ClassInnerPage() {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
  const { data: session } = useSession();

  const [isJoinUser, setIsJoinUser] = useState(false);

  const clsId = usePathname().split('/')[2];


  function onSetIsJoinUser(){
      setIsJoinUser(true)
  }
      
  useEffect(() => {

      //회원등록되어있는지 확인 후 없으면 이름을 받은 후 생성 (모달)
      axios.get(API_URL+'/api/classUser/classjoinCheck', {
          params: {
              clsId: clsId,
              userId: session?.user.id
          }
      })
      .then(response => {
          setIsJoinUser(JSON.parse(response.data));
      })
      .catch(error => {
          // Handle any errors that occurred during the request
          console.error('Error fetching data:', error);
      });

  }, []);
  
  return (
      <>
      { isJoinUser?
          <InnerForm />
          :
          <KnockModal onSetIsJoinUser={onSetIsJoinUser} />
      }
      </>
  )
}
