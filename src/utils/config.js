export const config = {
    appwrite: {
        endpoint: import.meta.env.VITE_APP_ENDPOINT,
        project: import.meta.env.VITE_APP_PROJECT,
        collections: {
            people: import.meta.env.VITE_APP_PEOPLE_COLLECTION_ID,
        },
        database: import.meta.env.VITE_APP_DATABASE_ID.toString(),
    }
}