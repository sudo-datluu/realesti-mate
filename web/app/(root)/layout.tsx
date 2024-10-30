import LeftSideBar from "@/components/LeftSideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
        <main className="relative flex bg-black-3">
            <LeftSideBar />
            {children}
            <p className="text-white-1"> Right Sidebar </p>
        </main>
    </div>
  );
}
