const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: "dnizoc474",
    api_key:"795331495625983",
    api_secret:"i2rxrHo8P08K65pfFc3SPcX6Z3E" 
})

uploadToCloudinary = (path, folder)=>{
    return cloudinary.v2.uploader.upload(path,{
        folder
    }).then((data)=>{
        return { url: data.url, public_id: data.public_id};
    }).catch((error)=>{
        console.log(error)
    })
}
removeFromCloudinary = async (public_id)=>{
    await cloudinary.v2.uploader.destroy(public_id, function (error, result){
        console.log(result, error)
    })
}

module.exports = {uploadToCloudinary, removeFromCloudinary}


