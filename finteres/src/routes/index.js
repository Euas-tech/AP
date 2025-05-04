const {Router}=require('express');
const router= Router();
const path=require('path');
const {unlink}=require('fs-extra');//recive un parametro de la imagen que quieres eliminar
const Image=require('../models/image');//modulo de la carpeta models archivo image.js
//definimos rutas
//bienvenida
router.get('/', async(req, res) => {//manejador de peticiones
    //res.send('Index page');
    
    const images= await Image.find();//consulta a la base de datos
    //console.log(images);
    res.render('index', {images:images});
});
//fin de bienvenida
//formulario para subir imagenes
router.get('/upload', (req,res)=>{
    //res.send('Form Upload');
    res.render('upload');
});
//fin formulario
//ruta post
router.post('/upload',async (req,res)=>{

    const image= new Image();
    //console.log(req.file);
    //inicio datos recividos del formulario UBICADO EN views, archivo upload.ejs
    image.title=req.body.title;
    image.description=req.body.description;
    image.filename=req.file.filename;
    image.path='/img/uploads/' + req.file.filename;
    image.originalname=req.file.originalname;
    image.mimetype=req.file.mimetype;
    image.size= req.file.size;
    console.log(image);//imagen que se va a guardar en la base de datos, se ve en el Id
    await image.save()//guardar imagen operacion asincrona
    //res.send('Uploaded');
    res.redirect('/');//Vista principal de la aplicación después de subir
});
// fin post
//mostrar una unica imagen
router.get('/image/:id', async (req, res) => {
    
        const { id } = req.params;
        const image = await Image.findById(id);

        
        //console.log("Imagen recuperada:", image); // Verifica que se obtiene correctamente

        res.render('profile', { image:image}); // Asegura que se pasa correctamente a la vista
    
});
//fin mostrar unica imagen
//elimnar imagen
router.get('/image/:id/delete', async (req,res)=>{
    //console.log(req.params.id);
    const{id}=req.params;//obtenemos la id
    const image=await Image.findByIdAndDelete(id);//consulta a la base de datos
    //solo estamos eliminando los datos no la imagen
    await unlink(path.resolve('./src/public'+image.path));
    //res.send('Image deleted');
    res.redirect('/');
});
//fin imagen eliminada
module.exports=router;
//para iniciar mondgo  sudo service mongod start