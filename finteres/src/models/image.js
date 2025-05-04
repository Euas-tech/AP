//caracateristicas para guardar
//no se guarda la imagen entera, solo los datos de la imagen
const{Schema, model}=require('mongoose');
const imageSchema = new Schema({
    title: {type:String},
    description:{type: String},
    filename:{type: String},
    path: {type: String},
    originalname: {type: String},
    mimetype:{type:String},
    size: {type: Number },
    created_at:{type: Date, default:Date.now()}
});//para usarlo hay que crear el metodo model
module.exports=model('Image', imageSchema);
//este modulo se mandaa al archivo index.js en la carpeta routes