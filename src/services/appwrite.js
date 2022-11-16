import { Client, Account, ID, Databases } from 'appwrite';
import {config} from '../utils/config'


var client = null
function provider(){
    if (client){
        return client
    }
    client = new Client()
        .setEndpoint(config.appwrite.endpoint)
        .setProject(config.appwrite.project)
    return client
    
}

client = provider()
const account = new Account(client)
const database = new Databases(client)
export { client }
export { account }
export { database }
export { ID }
