/* eslint-disable no-useless-catch */
import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}) {
        try {
          const userAccount = await this.account.create(ID.unique(),email,password,name); 
          if(!userAccount){
            return userAccount;
          }
          return this.login({email,password});
        } catch (error) {
            throw error;     
        }
    }

    async login ({email,password}){
        try {
           return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }

    async logOut(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

export const authService = new AuthService();