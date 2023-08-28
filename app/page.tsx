import { Header } from "@/components/Header";
import { PostCard } from "@/components/cards/PostCard";


export default function Home() {
  return (
  <section className="py-2">
    <div>
     <Header label="Home" isBack={false}/>
    </div>
    <PostCard/>
    <PostCard/>
    <PostCard/>

  </section>
  )
}
