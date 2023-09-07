import Image from "next/image"
import Link from "next/link"
import { format, formatDistanceToNowStrict } from "date-fns";


interface Props{
    isComments: boolean
    isMedia: boolean;
    data: any
}

export const PostCard = ({isComments, isMedia, data}: Props) => {

    // const formattedDate = format(new Date(data.createdAt), 'Pp')
    const formattedDate = formatDistanceToNowStrict(new Date(data.createdAt))


  return (
<div className="relative flex p-2 max-md:pr-5 border-b-[1px] border-neutral-800 overflow-hidden">
    <div className="h-full w-[70px] max-md:w-[50px]">
        <Link href={`/profile/${data.User.id}`}>
        <div className="relative max-md:w-10 max-md:h-10 w-12 h-12 object-contain">
            <Image fill src={data.User.profileImage ? data.User.profileImage : data.User.image || `/images/dummyUser.png`} alt="username"
            className="rounded-full object-cover"
            />
        </div>
        </Link>
        {isComments && (
            <div className="h-[90%] w-[2px] bg-neutral-700 absolute md:left-8 left-6"/>
        )}
    </div>
    {/* Author section */}
    <div className="relative">

        <div className="flex items-center gap-2 w-full">
            <Link href={`/profile/${data.User.id}`} className="text-text font-semibold">{data.User.name}</Link> 
            <Link href={`/profile/${data.User.id}`} className="text-sm text-placeolder">@{data.User.username}</Link>
            <span className="text-sm text-placeolder">{formattedDate}</span>
        </div>

        <Link href={`/post/${data.id}`}>
            
        <p className="text-text md:text-[15px] my-2">{data.body}</p>

        {isMedia && (
            <div className="relative max-w-[400px] h-[500px] mt-3 mb-4">
            <Image src="/images/picture.jpg" fill alt="lorem ipsum"
            className="object-cover rounded-xl"
            />
        </div>
        )}
        </Link>

        <div className="flex items-center justify-between gap-2 max-w-[400px] mb-1">

            <div className="text-placeolder">
                <i className="far fa-comment mr-2"></i>
                <span>{data.comments.length}</span>
            </div>

            <div className="text-placeolder">
                <i className="far fa-heart mr-2"></i>
                <span>{data.likesId.length}</span>
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
