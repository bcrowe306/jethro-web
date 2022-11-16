import {config} from '../utils/config'
import {database} from './appwrite'
const dbID = config.appwrite.database
const pID = config.appwrite.collections.people
const api = {
    people: {
        async get(){
            return database.listDocuments(dbID, pID)
        }
    }
}

export default api