import LeftSideBar from "@/components/LeftSideBar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
        <main className="relative flex bg-black-3">
            <LeftSideBar />
            <section className="flex min-h-screen flex-1 flex-col px-4 sm:px:14">
              <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
                <div className="flex h-16 items-center justify-between md:hidden">  
                  <Image src="/icons/logo/android-chrome-192x192.png" alt='logo' width={48} height={48}/>
                  Movile Nav
                </div>
                <div className="flex hehe flex-col md:pb-14">
                  {children} 
                </div>
              </div>
            </section>
            <p className="text-white-1"> Right Sidebar </p>
        </main>
    </div>
  );
}
