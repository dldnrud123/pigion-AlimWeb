
import MainLayout from "@/components/layout";

export default function Layout({ children }) {
    return (
        <>
            <MainLayout>
                {children}
            </MainLayout>
        </>
    )
}