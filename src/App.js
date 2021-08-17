import React from 'react';
import NavBar from './components/nav';
import CRUD from './components/crud';
import Galery from './components/Galery';
import Login from './components/login';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {storage,db,auth} from './firebase';


const App = () => {

    const limpiar = () => {
        document.getElementById('thumb').style.display= "none";
        document.getElementById('imageLabel').innerHTML= "";
        document.getElementById('descriptionTextarea').value= "";
        document.getElementById('subirImagen').value= "";
        document.getElementById("progress-bar").style.display = 'none';
        document.getElementById("progress").style.width = 0 + '%';
    }

    const addOrEditImage = (imageObject) =>{
        let uploadTask = storage.ref().child('Imagenes/'+imageObject.image.name).put(imageObject.image);
        console.log('imagen subida exitosamente')

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed', // or 'state_changed'
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById("progress").style.width = progress + '%';
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused': // or 'paused'
                console.log('Upload is paused');
                break;
                case 'running': // or 'running'
                console.log('Upload is running');
                break;
                default: 
                console.log('Upload complete');
            }
        }, 
        (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/unauthorized':
            console.log("User doesn't have permission to access the object");
            break;
            case 'storage/canceled':
            // User canceled the upload
            break;
            case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
            default:
                console.log(error)
        }
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(async(downloadURL) => {
                console.log('File available at', downloadURL);
                await db.collection('imagenes').doc().set({description: imageObject.description, name: imageObject.image.name, url: downloadURL})
                limpiar();
                toast('Imagen guardada satisfactoriamente',{
                    type:'success'
                })
            });
        });
    }

    const loginApp = async (credentials) =>{
        await auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(()=>{
            sessionStorage['loginState'] = true;
            window.location.reload();
        }).catch(() =>{
            toast('Tu correo y/o contraseña estan incorrectos',{
                type:'error'
            })
            console.log("errorsito")
        });       
    }
    

    return (
        <>
        {
            !sessionStorage['loginState'] && <Login loginApp={loginApp}/>
        }
        {
            sessionStorage['loginState'] &&
            <div>
                <NavBar/>
                <div className="container bg-white">
                    <CRUD addOrEdit={addOrEditImage} />
                </div>
                <div>
                    <Galery/>
                </div>
                <ToastContainer/>
            </div>
        }      
        </>
    );
}

export default App;