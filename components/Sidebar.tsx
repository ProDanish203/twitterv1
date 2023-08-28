"use client"
import { navItems } from "@/utils/data"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";

export const Sidebar = () => {

    const pathName = usePathname();
    
  return (
    <div className="h-screen lg:min-w-[200px] max-w-[250px] lg:w-full w-fit sticky lg:pr-7 pl-3 py-7 top-0 left-0 border-r-[1px] border-neutral-800">

        <div className="flex flex-col gap-2 justify-between lg:items-start items-center w-full">
            <Link href="/" className="relative max-md:w-10 max-md:h-10 w-14 h-14 object-cover">
                <Image src="/images/logo.svg" fill alt="X" className="object-cover"/>
            </Link>

            <div className="flex flex-col gap-10 lg:items-start w-full items-center mt-10 max-lg:pr-2">
                {navItems.map((link) => {
                    const isActive = (pathName.includes(link.title) && link.path.length > 1) || pathName === link.path;

                    return (
                    <Link key={link.path} href={link.path} className={`${isActive ? "text-primary" : "text-text"} flex items-center gap-5 text-lg`}>
                        <i className={`${link.icon} text-2xl`}></i>
                        <p className="max-lg:hidden">{link.title}</p>
                    </Link>      
                )})
                }

                <button className="text-text bg-primary rounded-full lg:py-2 text-center max-lg:w-[50px] max-lg:h-[50px] w-full">
                    <p className="max-lg:hidden">Tweet</p>
                    <div className="lg:hidden">
                        <i className="fas fa-feather text-xl"></i>
                    </div>
                </button>
            </div>
        </div>

    </div>
  )
}
