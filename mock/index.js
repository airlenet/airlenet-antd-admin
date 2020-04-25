import Mock from 'mockjs'
import user from "./user.js"
// import notices from './notices.js'

Mock.setup({
    timeout: 1000
})
Mock.mock(/\/currentUser/, user["GET /api/currentUser"])
//eslint-disable-next-line
Mock.mock(/\/notices/, (req,res)=>{
    debugger
    return [

]})