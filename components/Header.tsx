"use client"
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface Props{
    label: String;
    isBack: boolean
}

export const Header = ({label, isBack}: Props) => {

    const router = useRouter()

    const handleReturn = useCallback(() => {
        router.back();
    }, [router]);

  return (
    <div className="absolute top-0 left-0 w-full">
        <div className="flex items-center gap-4 p-7 border-b-[1px] border-neutral-800 w-full">
            {isBack && (
            <div onClick={handleReturn} className="cursor-pointer">
                <i className="fas fa-arrow-left text-xl text-text"></i>
            </div>
            )}

            <p className="text-text font-semibold text-xl">{label}</p>
        </div>
    </div>
  )
}
