import conf from '../conf/conf'
import {Client, Account, ID} from 'appwrite'

export class AuthService {
   client = new Client()
   account
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteId)
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try{
          const accountCreation =  await this.account.create(ID.unique(), email, password, name )
          if(accountCreation){
          this.loginAccount(email,password)
          }
        }
        catch(error){
         throw error
        }
    }
    async loginAccount({email, password}){
        console.log(email, password,"emailpass")
        try{
        const userLogin = await this.account.createEmailPasswordSession(email, password)
         return userLogin
        }
        catch(error){
          throw error
        }
    }
    async getCurrentUser(){
        try {
            const user = await this.account.get();
            return user;
          } catch (error) {
            if (error.code === 401) {
              // User is not authenticated
              return null;
            }
            throw error;
          }
       
    }
    async logout(){
        try{
        await this.account.deleteSessions()
        }
        catch(error){
            throw error
        }
    }
}
const authService = new AuthService()
export default authService