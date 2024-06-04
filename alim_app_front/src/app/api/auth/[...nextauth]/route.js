import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const API_URL = process.env.API_URL;

//아이디 존재하는지
async function isExistCheckId(user) {

  await axios.get(API_URL+'/api/user/idCheck', {
    params: {
      id: user.email
    }
  })
    .then(response => {
      console.log(JSON.parse(response.data))
      return JSON.parse(response.data);
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error('에러', error);
      return false;
    });
}

// 아이디 회원가입 시키기
async function joinSnsUser(user) {

  // 이메일만 확실히 세션에 박힘. 나머지 정보를 디폴트로 넣어준다.
  const data = {
    userId: user.email,
    userPass: Math.random(),
    userName: user.name ? user.name : user.email,
    email: user.email,
    phone: user.phone ? user.phone : "NONE",
    profileImg: user.image ? user.image : "NONE",
    gender: user.gender ? user.gender : "N",
    burnDate: "NONE",
    collectYN: "Y",
    primiumYN: "N",
    snsYN: "Y",
    activeYN: "Y"
  };

  let success = true;

  await axios.post(API_URL+"/api/user/save", data)
    .then((response) => {
      console.log(response.data);		//정상 통신 후 응답된 메시지 출력
      success = true;
    })
    .catch((error) => {
      console.log(error);				//오류발생시 실행
      success = false;
    })

  return success;
};

async function snsLogin(user) {
  // null을 두번째인자로 넣어줘야 request param 값이 전달된다.
  const res = await axios.post(API_URL+'/api/user/snsLogin', null, {
    params: {
      id: user.email
    }
  });

  const result = res.data;

  if (res.status === 200) {
    //세션에 아이디가 없기때문에 넣어준다.
    user.userId = result.userId;
    // user.email = result.email;
    // user.userName = result.userName;
    // user.profileImg = result.profileImg;

  } else {
    return false;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        userId: { label: "ID", type: "text", placeholder: "ID" },
        userPass: { label: "Password", type: "password", placeholder: "Password" }
      },
      authorize: async (credentials) => {
        try {


          // null을 두번째인자로 넣어줘야 request param 값이 전달된다.
          const res = await axios.post(API_URL+'/api/user/login', null, {
            params: {
              id: credentials.userId,
              pass: credentials.userPass
            }
          });

          const user = res.data;

          if (res.status === 200) {
            return user;
          } else {
            return null;
          }
        } catch (e) {
          console.log(e.response.data.message);
          throw new Error(e.response.data.message || '아이디 또는 비밀번호를 확인하세요');
        }
      }
    }),
    //네이버 간편 로그인 
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET
    }),
    //카카오 간편 로그인 
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET
    })
  ],
  callbacks: {


    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.userId;
        token.email = user.email;
        token.userName = user.userName;
        token.profileImg = user.profileImg;
      }
      return token;
    },

    session: async ({ session, token }) => {

      //간편로그인 값은 애초에 session에 박히는데 여기서 초기화되버림... 

      session.user.id = token.userId;
      session.user.userName = token.userName;
      session.user.email = token.email;
      session.user.profileImg = token.profileImg;

      console.log(session)

      return session;
    },

    async signIn({ user, account }) {

      if (account.provider === 'naver' || account.provider === 'kakao') {

        //아이디가 존재하지 않을 때, 가입 
        if (isExistCheckId(user)) {
          await joinSnsUser(user);
        }
        
        try {
          
          await snsLogin(user);

        } catch (e) {
          console.log(e.response.data.message);
          throw new Error(e.response.data.message || 'SNS Login 불가');
        }
      }
      return true;
    },
    async signOut() {
      return "/login";
    }
  },
  pages: {
    signIn: '/login',
  }

});

export { handler as GET, handler as POST };