import React, { useEffect, useState } from "react";
import {db} from '../firebase';
import {storage} from '../firebase';
import {toast} from 'react-toastify';



const Galery = () => {

    const [imagenes, setImagenes] = useState([]);

    const getImagenes = () => {
        db.collection("imagenes").onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setImagenes(docs);
          console.log(docs)
        });
    };

    useEffect(() => {
        getImagenes();
    }, []);

    const deleteImage = async(id,name) => {
        if(window.confirm("Desea eliminar esta imagen?")){
            await db.collection("imagenes").doc(id).delete();
            await storage.ref().child('Imagenes/'+name).delete();
            toast('Imagen eliminada satisfactoriamente',{
                type:'error',
                autoClose:3000
            })
        }
    }; 

    return(
        <div>    
            <div className="d-flex container flex-wrap justify-content-around">
                {imagenes.map((imagenes) => (
                    <div key={imagenes.id} style={{width:'fit-content'}} className="p-2">
                        <div className="card text-left" style={{width:'300px'}}>
                            <img className="card-img-top" src={imagenes.url} alt="" />                            
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h4 className="card-title">{imagenes.description}</h4>
                                    <ul className="nav nav-pills">
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="./"> </a>
                                            <div className="dropdown-menu">
                                                <i className="dropdown-item" onClick={() => deleteImage(imagenes.id, imagenes.name)}>Eliminar</i>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}            
            </div>
        </div>
    );
};

export default Galery;