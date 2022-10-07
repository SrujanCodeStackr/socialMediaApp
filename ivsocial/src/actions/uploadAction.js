import * as UploadApi from '../api/UploadRequest'

 export const uploadImage = (data)=>async(dispatch)=>{
    try {
        await UploadApi.uploadImage(data)
        console.log("image uploaded")
    } catch (error) {
        console.log("first")
        console.log(error)
    } 
}

const uploadPost = (data) => async(dispatch)=>{
    dispatch({type:"UPLOAD_START"})
    try {
        console.log("Upload post data")
        const newPost = await UploadApi.uploadPost(data)
        dispatch({type:"UPLOAD_SUCCESS",data:newPost.data})
    } catch (error) {
        console.log(error)
        console.log("do it again")   
        dispatch({type:"UPLOAD_FAIL"})
    }
}
export default uploadPost