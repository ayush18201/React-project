import React,{useState, useEffect} from 'react'
import service from '../../appwrite/service'
import PostCard from '../PostCard'
import Container from '../Container/Container'

function AllPosts(){
    const [posts, setAllPosts] = useState([])
    const fetchAllPosts = async () =>{
        const posts = await service.getAllBlogs([])
        if(posts){
            setAllPosts(posts.documents)
            console.log(posts.documents,"posttt")
        }
    }
    useEffect(()=>{
        fetchAllPosts()

    },[])
    if(posts.length === 0){
        return (<div>Posts not available</div>)
    }

  return (    <div className='w-full py-8'>
    <Container>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post} />
                </div>
            ))}
        </div>
        </Container>
</div>)

}

export default AllPosts