import React, {useState} from 'react'
import Morpheus from 'morpheus-image-resize';

const  CRUD = (props) => {

    const initialStateValues = {
        image:'',
        description:''
    }

    const [values, setValues] = useState(initialStateValues);

    const handleSubmit = (e) => {
        e.preventDefault();
        document.getElementById("progress-bar").style.display = "flex";
        props.addOrEdit(values);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value})       
    };

    const handleInputImage = async(e) => {
        const imagen = e.target.files[0];
        if(imagen != null){
            document.getElementById('imageLabel').innerHTML= imagen.name;
            Morpheus.resize(imagen, {                
                width: 200
            })
            .then(canvas => Morpheus.toBase64(canvas))
            .then(image => {
                document.getElementById('thumb').style.display= "block";
                document.getElementById('imagenThumb').src= image;
            });    
            Morpheus.resize(imagen, {                
                width: 500
            })
            .then(canvas => Morpheus.toFile(canvas, imagen.name))
            .then(image => {
                const {name} = e.target;
                setValues({...values, [name]: image})
            });                 
        }
        else{
            console.log('No se ingreso ninguna imagen')
        } 
    }
    

    return(
        <div className="p-4">
            <div id="thumb" style={{width: '100%', display:'none'}}>
                <div className="p-4" style={{margin: 'auto',width:'fit-content'}}>
                    <img className="img-thumbnail" id="imagenThumb" alt=" "/>
                </div>                
            </div>
            <form onSubmit={handleSubmit}>
                <div className="pb-4">
                    <div className="progress" id="progress-bar" style={{display:'none'}}>
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="progress" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" style={{width: '0%'}}></div>
                    </div>
                </div>
                                
                <div className="form-group">
                    <div className="input-group mb-3">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="subirImagen" accept="image/*" name="image" onChange={handleInputImage} required></input>
                        <label className="custom-file-label" htmlFor="subirImagen" id="imageLabel">Choose file</label>
                    </div>
                    <div className="input-group-append">
                        <span className="input-group-text">Upload</span>
                    </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="descriptionTextarea">Descripcion</label>
                    <textarea className="form-control" id="descriptionTextarea" name="description" rows="3" onChange={handleInputChange} required></textarea>
                </div>
                <div>
                    <button className="btn btn-primary">
                        Guardar
                    </button>
                    <label className="p-2" id="state" style={{display:"none"}}></label>
                </div>
            </form>
        </div>
    );
}

export default CRUD;