import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ cloud_name:process.env.CLOUDINARY_CLOUD_NAME, api_key:process.env.CLOUDINARY_API_KEY, api_secret:process.env.CLOUDINARY_API_SECRET })

export async function uploadItemImages(files=[]) {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) throw new Error('Cloudinary is not configured.')
  return Promise.all(files.map((file)=>new Promise((resolve,reject)=>cloudinary.uploader.upload_stream({folder:'futa-findit/items',resource_type:'image',transformation:[{width:1600,height:1600,crop:'limit',quality:'auto'}]},(error,result)=>error?reject(error):resolve(result.secure_url)).end(file.buffer))))
}

export async function uploadDataUrls(images=[]) {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) throw new Error('Cloudinary is not configured.')
  return Promise.all(images.map((image)=>cloudinary.uploader.upload(image,{folder:'futa-findit/items',resource_type:'image',transformation:[{width:1600,height:1600,crop:'limit',quality:'auto'}]}).then((result)=>result.secure_url)))
}
