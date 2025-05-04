const express= require('express');
const path=require('path');
const morgan=require('morgan');
const multer=require('multer');
const { v4: uuidv4 } = require('uuid');//id unica a cada nombre
const {format}=require('timeago.js');
//Inicializacion
const app=express();
require('./database');//conecta con mongo
//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs' );
//Middlewares
app.use(morgan('dev'));//vemos lo que esta pasando
app.use(express.urlencoded({extended:false}));
const storage=multer.diskStorage({//nombrealeatorio a la imagen con su extension
    destination: path.join(__dirname, 'public/img/uploads'),
    filename:(req, file, cb, filemame)=>{
        cb(null, uuidv4()+ path.extname(file.originalname));//nombre de las imagenes

    }//las caracteristicas de las imagenes guardadas se ubican en el archivo image.js en models
});
app.use(multer({storage: storage}).single('image'));
//app.use(multer({dest: path.join(__dirname, 'public/img/uploads')}).single('image'));//DONDE SE COLOCAN LAS IMAGENES
//SERVIDOR CONFIGURADO PARA PODER ENTENDER LAS IMAGENES LISTO
//Variables globales
app.use((req, res, next)=>{
    app.locals.format= format;
    next();
})
//Routes
app.use(require('./routes/index'));
//Static files
app.use(express.static(path.join(__dirname,'public')));//carpeta public para mostar imagenes 
//Iniciar servidor
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});