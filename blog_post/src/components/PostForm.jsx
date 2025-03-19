import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { service } from '../services/configAppwrite';

function PostForm({post}){

    const navigate=useNavigate();
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
        defaultValues:{
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })
    const userData = useSelector(state => state.user.userData)

    const submit = async (data)=>{
        if(post){
            const file = data.image[0]? await service.uploadImage(data.image[0]):null;

            if(file){
                await service.deleteImage(post.featuredImage)
            }

            const dbPost =await service.updatePost(
                post.$id,{
                    ...data,
                    featuredImage:file?file.$id : undefined
                }
            )
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }else{
            const file = await service.uploadImage(data.image[0]);

            if(file){
                const fieldId = file.$id;
                data.featuredImage=fieldId
               const dbPost= await service.createPost({
                    ...data,
                    userId: userData.$id
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    return(

    )
}


