import { Header } from '@/components/Header';
import { PostCard } from '@/components/cards/PostCard';
import { ComposeXheader } from '@/components/forms/ComposeXheader';
import { Reply } from '@/components/forms/Reply';
import React from 'react'

const Post = () => {
  return (
    <section>
    <div>
        <Header label="Post" isBack={true}/>
    </div>

    <PostCard isComments={false}/>

    <ComposeXheader btnTitle="Reply" placeholder="Add reply"/>

    <PostCard isComments={true}/>
    </section>
  )
}

export default Post;