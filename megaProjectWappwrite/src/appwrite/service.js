import conf from '../conf/conf'
import {Client, Databases, Storage, ID, Query} from 'appwrite'

export class Service{
    client = new Client()
    databases;
    storage;

    constructor(){
        this.client?.setEndpoint(conf.appWriteUrl)?.setProject(conf.appWriteId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async addBlog ({title, slug, content, featuredImg, status, userId}){
        try{
         return await this.databases.createDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImg,
                status,
                userId
            }
         )
        }
        catch(error){
            console.log(error)
        }
    }
    async updateBlog (slug, {title, content, featuredImg, status, userId}){
        try{
         return await this.databases.updateDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImg,
                status,
                userId
            }
         )
        }
        catch(error){
            console.log(error)
        }
    }
    async deleteBlog (slug){
        try{
         await this.databases.deleteDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId,
            slug
         )
         return true
        }
        catch(error){
            console.log(error)
            return false
        }
    }
    async getBlog (slug){
        try{
        return  await this.databases.getDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId,
            slug
         )
        
        }
        catch(error){
            console.log(error)
           
        }
    }
    async getAllBlogs (queries= [Query.equal('status', 'active')]){
        try{
        return  await this.databases.listDocuments(conf.appWriteDatabaseId, conf.appWriteCollectionId, queries)
        
        }
        catch(error){
            console.log(error)
           
        }
    }
    async uploadFile (file){
        try{
        return  await this.storage.createFile(conf.appWriteBucketId, ID.unique(), file)
        
        }
        catch(error){
            console.log(error)
           
        }
    }
    async deleteFile (fileId){
        try{
        return  await this.storage.deleteFile(conf.appWriteBucketId, fileId)
        
        }
        catch(error){
            console.log(error)
           
        }
    }
    previewFile (fileId){
        try{
        return  this.storage.getFilePreview(conf.appWriteBucketId, fileId)
        
        }
        catch(error){
            console.log(error)
           
        }
    }
    
}

const service = new Service()
export default service