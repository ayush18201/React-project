import React,{useCallback, useEffect} from 'react';
import service from '../../appwrite/service'
import {useForm} from 'react-hook-form'
import{useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Input from '../Input'
import RTE from '../RTE'
import Select from '../Select'
import Button from '../Button'

function PostForm({formData}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValue: [{
         name: formData?.name || '',
         slug: formData?.$id || '',
         content: formData?.content || '',
         status: formData?.status || false
        }]
    })
    console.log(formData,"formdata")
    const navigate = useNavigate()
    const {$id} = useSelector(state => state.auth.userData)

    const onSubmit = async (data) =>{
        console.log(data,"ddd")
        if(formData){
            const file = data?.image[0] ? await service.uploadFile(data.image[0]) : null
            if(file){
             await service.deleteFile(data.featuredImg)
            }
            const dbPost = await service.updateBlog(
                formData.$id,
                {
                  ...data,
                  featuredImg : file ? file.$id : formData?.featuredImg
                }
            )
            if(dbPost){
                navigate(`/post/${formData.$id}`)
            }
        }else{
          
            const file = await service.uploadFile(data.image[0])
            if(file){
                const createPost = await service.addBlog({
                    ...data,
                    userId: $id,
                    featuredImg: file ? file.$id : null
                }
                )
                if(createPost){
                    console.log(createPost ,"createpost")
                    navigate(`/post/${createPost.$id}`)
                }
            }
        }

    }

    const slugTransform =  useCallback((value)=>{
        if(value && typeof value == 'string')
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    },[])

    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name === 'title'){
                setValue('slug', slugTransform(value.title), {shouldValidate: true})
            }
        })
        subscription.unsubscribe()

    },[setValue, watch, slugTransform])

    return(  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={formData?.content} />
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !formData })}
        />
        {formData && (
            <div className="w-full mb-4">
                {console.log(formData,"ffor")}
                <img
                    src={service.previewFile(formData.featuredImg)}
                    alt={formData.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: false })}
        />
        <Button type="submit" bgColor={formData ? "bg-green-500" : undefined} className="w-full">
            {formData ? "Update" : "Submit"}
        </Button>
    </div>
</form>)

}
export default PostForm