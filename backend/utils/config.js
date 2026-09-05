import 'dotenv/config'

const PORT= process.env.PORT
const MONGODB_URI= process.env.NODE_ENV !=='PRODUCTION'? process.env.MONGODB_TEST_URI: process.env.MONGODB_URI;
const NODE_ENV= process.env.NODE_ENV ==='PRODUCTION'? 'PRODUCTION':process.env.NODE_ENV==='DEVELOPMENT'? 'DEVELOPMENT':'TEST'
const JWT_SECRET= process.env.JWT_SECRET
const B2_APP_KEY= process.env.B2_APP_KEY
const B2_KEY_ID= process.env.B2_KEY_ID
const B2_ENDPOINT= process.env.B2_ENDPOINT
const B2_REGION= process.env.B2_REGION
const BUCKET_NAME= process.env.BUCKET_NAME
export default {PORT, MONGODB_URI,NODE_ENV,JWT_SECRET, B2_APP_KEY, B2_KEY_ID, B2_ENDPOINT, B2_REGION, BUCKET_NAME}