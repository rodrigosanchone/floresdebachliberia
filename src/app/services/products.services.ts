import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Product } from '../modelos/product.modelo';
import {map,finalize} from 'rxjs/operators'
import {  Observable } from 'rxjs';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {stockImage}  from '../modelos/image.modelo'
@Injectable()

export class Products{
    productosColeccion: AngularFirestoreCollection<Product>;
    productoDoc: AngularFirestoreDocument<Product>;
    products:Observable<Product[]>;
    productoIMG: AngularFireStorage;
    producto:Observable<Product>;
    filePath:any;
    downloadURL: Observable<string>;

    constructor(
       private db:AngularFirestore,
       private storage: AngularFireStorage,
     
    ){
        this.productosColeccion = db.collection('productos',ref=>ref.orderBy('nombre','asc'));
       const ref = this.storage.ref('path/to/file.pdf');
      
    }



    getProducts():Observable<Product[]>{
        this.products = this.productosColeccion.snapshotChanges().pipe(
            map(cambios => {
                return cambios.map( accion =>{
                    const datos = accion.payload.doc.data() as Product;
                    datos.id = accion.payload.doc.id;
                    return  datos;
                })
            })
        );
        return this.products;
    }

    getProduct(id:string){
       this.productoDoc=this.db.doc<Product>(`productos/${id}`);
       this.producto= this.productoDoc.snapshotChanges().pipe(
        map(accion=>{
            if(accion.payload.exists===false){
                return null
            }else{
              const datos=accion.payload.data() as Product;
              datos.id=accion.payload.id;
              return datos;
            }
        }
       )
       );
       return this.producto
    }

    addProduct(producto:Product){
       this.productosColeccion.add(producto); 
     
    }
    uploadImage(producto:Product,image: stockImage){
        this.filePath=`images/${image.name}`;
        const fileRef= this.storage.ref(this.filePath);
        const task= this.storage.upload(this.filePath,image);
        task.snapshotChanges().pipe(
            finalize(()=>{
                fileRef.getDownloadURL().subscribe(urlImage=>{
                    this.downloadURL= urlImage;
                    producto.img=urlImage;
                    this.addProduct(producto)
                })
            })
        ).subscribe()
        
    }

    edit(producto:Product){    
         this.productoDoc=this.db.doc(`productos/${producto.id}`)
            this.productoDoc.update(producto) 
          /*  return this.db.collection('productos').doc(id).update(producto); */
       
    }

    uploadImage2(producto:Product,image: stockImage){
        this.filePath=`images/${image.name}`;
        const fileRef= this.storage.ref(this.filePath);
        const task= this.storage.upload(this.filePath,image);
        task.snapshotChanges().pipe(
            finalize(()=>{
                fileRef.getDownloadURL().subscribe(urlImage=>{
                    this.downloadURL= urlImage;
                    producto.img=urlImage;
                    this.edit(producto)
                })
            })
        ).subscribe()
        
    } 

    delete(producto:Product){
        this.productoDoc= this.db.doc(`productos/${producto.id}`);
      this.productoDoc.delete();
    }


}