import Image from "next/image"
import Link from "next/link"

export const PostCard = () => {

    const isMedia = true;

  return (
<div className="relative flex p-2 max-md:pr-5 border-b-[1px] border-neutral-800">
    <div className="h-full w-[100px]">
        <div className="relative max-md:w-8 max-md:h-8 h-10 object-contain">
            <Image fill src="/images/logo.svg" alt="username"/>
        </div>
    </div>
    {/* Author section */}
    <div className="relative">

        <div className="flex items-center gap-2 w-full">
            <span className="text-text font-semibold">Name</span> 
            <span className="text-sm text-placeolder">@Username</span>
            <span className="text-sm text-placeolder">8h</span>
        </div>

        <p className="text-text md:text-[15px] text-sm my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus animi dignissimos mollitia laboriosam nemo fugiat est asperiores ipsam tempore saepe!</p>

        {isMedia && (
        <div className="relative max-w-[400px] h-[500px] mt-3 mb-4">
            <Image src="/images/picture.jpg" fill alt="lorem ipsum"
            className="object-cover rounded-xl"
            />
        </div>
        )}

        <div className="flex items-center justify-between gap-2 max-w-[400px] mb-1">

            <div className="text-placeolder">
                <i className="far fa-comment mr-2"></i>
                <span>10</span>
            </div>

            <div className="text-placeolder">
                <i className="far fa-heart mr-2"></i>
                <span>10</span>
            </div>

            <div className="text-placeolder">
                <i className="fas fa-retweet mr-2"></i>
                <span>10</span>
            </div>

            <div className="text-placeolder">
                <i className="fas fa-share-nodes mr-2"></i>
                <span>10</span>
            </div>

        </div>

    </div>

</div>
  )
}
