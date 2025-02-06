/* eslint-disable no-useless-catch */
import conf from "../config/config";
import { Databases,Client,ID,Storage,Query } from "appwrite";


export class Service{
    client= new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases= new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status 
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost (slug){
       try {
         return await this.databases.deleteDocument(
             conf.appwriteDatabaseId,
             conf.appwriteCollectionId,
             slug,
         )
       } catch (error) {
            throw error
       }
    }

    async getOneDocument(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            throw error
        }
    }

    async getAllDocuments(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('status','active'),
                ]
            )
        } catch (error) {
            throw error
        }  
    }

    // file upload

    async uploadImage(file){
        try {
            return await this.bucket.createFile()
        } catch (error) {
            throw error
        }
    }
}

export const service = new Service();