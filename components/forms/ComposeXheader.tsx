"use client"
import Image from "next/image"
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "../helpers/Loader";
import { useRouter } from "next/navigation";

interface Props{
  placeholder: string;
  btnTitle: string;
  authorImg: string;
  authorId: string;
  authorUsername: string;
}

export const ComposeXheader = ({placeholder, btnTitle, authorImg, authorId, authorUsername}: Props) => {

  const [text, setText] = useState("")
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      setLoader(true);
      if(!text) return toast.error("Textfield cannot be empty");
      const response = await fetch("/api/posts/new", {
        method: "POST",
        body: JSON.stringify({
          text,
          author: authorId
        }),
      })
      setLoader(false);
      if(!response.ok) return toast.error("An error occured creating the post");
      else{
        setText("");
        router.push("/");
        return toast.success("Post created")
      } 

    }catch(error){
      toast.error("Something went wrong");
      setLoader(false);
    }
  }

  return (
  <div className="flex items-start gap-0 py-2 mt-5 px-3 border-b-[1px] border-neutral-800">
        
    <div className="h-full w-[80px]">
        <div className="relative max-md:w-8 max-md:h-8 w-12 h-12 object-contain">
            <Image fill src={authorImg || "/images/dummyUser.png"} alt={authorUsername} className="rounded-full object-cover"/>
        </div>
    </div>

    <form onSubmit={handlePost} className="relative w-full">

      <textarea className="w-full text-text bg-transparent border-b-[1px] border-neutral-800 resize-none mb-1 outline-none"
      placeholder={placeholder}
      value={text}
      onChange={(e:  React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
      >
      </textarea>

      <div className="flex items-center justify-between gap-2">

        <div className="text-primary flex gap-5">
            <i className="far fa-image cursor-pointer"></i>
        </div>

        <button className="text-text bg-primary rounded-full px-5 py-1" type="submit">{loader ? <Loader dark={false}/> : btnTitle}</button>

      </div>

    </form>

  </div>
  )
}
