
import "@/app/globals.css";
import AuthSession from "/src/app/AuthSession";
import Firebase from "/src/app/Firebase";

export const metadata = {
  title: "알림장",
  description: "알림장을 공유하고 검사하자!",
  icons: {
		icon: "./favicon.ico",
	}
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <AuthSession>
      <Firebase>
        <body>
          {children}
        </body>
      </Firebase>
      </AuthSession>
    </html>
  )
}




