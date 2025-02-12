import React,{useState, useEffect} from 'react'
import service from '../../appwrite/service'
import Container from '../Container/Container'
import {useNavigate, useParams} from 'react-router-dom'
import PostForm from '../Post-Form/PostForm'

function EditPost(){
    const [post, setPost] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
       if (slug){
        service.getBlog(slug)
        .then((post)=> {
            console.log(post,"postt")
            setPost(post)
       })
       }else{
        navigate('/')
       }
    },[slug, navigate])

    return post ? (
        <div className='py-8'>
        <Container>
            <PostForm formData={post} />
        </Container>
    </div>
    ) : null
    
}

export default EditPost