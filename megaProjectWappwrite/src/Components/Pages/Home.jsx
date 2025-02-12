import React, {useEffect, useState} from 'react'
import service from '../../appwrite/service'
import Container from '../Container/Container'
import PostCard from '../PostCard'

function Home(){
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        service.getAllBlogs([])
        .then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        
        })
    },[])

    if(posts.length ===0){
        return ;
    }

    return(
        <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
    )

}
export default Home