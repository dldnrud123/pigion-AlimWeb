import firebaseAdmin from "@/lib/firebase-admin-sdk"
import { NextResponse, NextRequest } from "next/server"

export async function POST(request) {
  const reqBody = await request.json()
  const { deviceToken, title, body, icon, image, click_action } = reqBody

  const message = {
    tokens: deviceToken,
    data: {
      title,
      body,
      icon,
      image,
      click_action,
    },
  }

  console.log("FCM Send Message --\n", message);

  //단일전송
  // try {
  //   await firebaseAdmin.messaging().send(message)
  //   return NextResponse.json({ success: true, message: "전송완료" })
  // } catch (error) {
  //   console.log("[ERROR] : ", error.errorInfo)
  //   return NextResponse.json({ success: false, message: "전송실패" })
  // }

  // 멀티전송
  await firebaseAdmin.messaging().sendEachForMulticast(message)
    .then((response) => {
      if (response.failureCount > 0) {
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(deviceToken[idx]);
          }
        });
        console.log('List of tokens that caused failures: ', failedTokens);
        return NextResponse.json({ success: false, message: "일부 전송실패" })
      }
    })
    .catch((error) => {
      console.log('Error sending multicast message:', error);
      return NextResponse.json({ success: false, message: "일부 전송실패" })
    });
    
    return NextResponse.json({ success: true, message: "전송완료" })
}