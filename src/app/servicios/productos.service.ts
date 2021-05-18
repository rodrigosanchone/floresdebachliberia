import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {Producto} from '../modelo/producto.modelo';
import {archivoImage} from '../modelo/image.modelo';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import {map, finalize} from 'rxjs/operators'
import { firestore } from 'firebase';







@Injectable()
export class ProductosService {
  productosColeccion: AngularFirestoreCollection<Producto>;
  productoDoc: AngularFirestoreDocument<Producto>;
  productoIMG: AngularFireStorage;
  productos:Observable<Producto[]>;
  producto:Observable<Producto>;
  filePath:any;
  downloadURL: Observable<string>;


  constructor( private db: AngularFirestore,
    private storage: AngularFireStorage,
   private domSanitizer: DomSanitizer,

    ) {
      this.productosColeccion = db.collection('productos',ref=>ref.orderBy('nombre','asc'));
      const ref = this.storage.ref('path/to/file.pdf');
      this.downloadURL = ref.getDownloadURL();
  }

  transform(url): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
}

  getProductos(): Observable<Producto[]>{
    //Obtener los productos
    this.productos = this.productosColeccion.snapshotChanges().pipe(
        map(cambios => {
            return cambios.map( accion =>{
                const datos = accion.payload.doc.data() as Producto;
                datos.id = accion.payload.doc.id;
                return  datos;
            })
        })
    );
    return this.productos;

 }


 preAgregarProducto(producto:Producto,image:archivoImage):void{
  this.uploadIMage(producto, image);
}

//Metodo intermediador para cargar imagen y datos a la base de datos


 agregarProducto1(producto:Producto,){
     this.productosColeccion.add(producto);

 }

  getProducto(id: string){
    this.productoDoc = this.db.doc<Producto>(`productos/${id}`);
    this.producto= this.productoDoc.snapshotChanges().pipe(
        map(accion=>{
            if(accion.payload.exists===false){
                return null;
            }else{
                  const datos= accion.payload.data() as Producto;
                  datos.id= accion.payload.id;
                  return datos;
            }
        })
    );
       return this.producto;

  }



  eliminarProducto(producto: Producto){
      this.productoDoc= this.db.doc(`productos/${producto.id}`);
      this.productoDoc.delete();
  }

  modificarProducto(producto:Producto){
     this.productoDoc=this.db.doc(`productos/${producto.id}`);
      this.productoDoc.update(producto);

  }

  //Metodo para subir imagen
  uploadIMage(producto:Producto, image: archivoImage){
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath,image);
    task.snapshotChanges().pipe(
        finalize(()=>{
            fileRef.getDownloadURL().subscribe(urlImage=>{
                this.downloadURL = urlImage;
                // console.log('URL_IMAGE', urlImage);
                 producto.img=urlImage;
                this.downloadURL = urlImage;
                console.log('URL_IMAGE', urlImage);
                this.agregarProducto1(producto)
            })
        })
    ).subscribe();

  }

  subirotraIMage(producto:Producto, image: archivoImage){
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath,image);
    task.snapshotChanges().pipe(
        finalize(()=>{
            fileRef.getDownloadURL().subscribe(urlImage=>{
                this.downloadURL = urlImage;
                // console.log('URL_IMAGE', urlImage);
                 producto.img=urlImage;
                this.downloadURL = urlImage;
                console.log('URL_IMAGE', urlImage);
                this.modificarProducto(producto)
            })
        })
    ).subscribe();

  }



/*   buscarProducto(buscar: string){
            var docRef = this.db.collection(("producto").toLowerCase().trim()).doc(buscar.toLowerCase().trim());
            console.log(docRef);
         try{
            docRef.get().subscribe(function(doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
         }catch(error) {
            console.log("Error getting document:", error);
         }

     }
} */

}
