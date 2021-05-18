import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {Mensaje} from '../modelo/mensajes.modelo';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import {map, finalize} from 'rxjs/operators'
import { firestore } from 'firebase';


@Injectable()
export class MensajeService {
  mensajeColeccion: AngularFirestoreCollection<Mensaje>;
  mensajeDoc: AngularFirestoreDocument<Mensaje>;
  mensaje:Observable<Mensaje[]>;
  mesaje:Observable<Mensaje>;
  filePath:any;
  downloadURL: Observable<string>;
  
  
  constructor( private db: AngularFirestore,
    private storage: AngularFireStorage,
   private domSanitizer: DomSanitizer,
   
    ) { 
      this.mensajeColeccion = db.collection('mensajes',ref=>ref.orderBy('nombre','asc'));
      const ref = this.storage.ref('path/to/file.pdf');
      this.downloadURL = ref.getDownloadURL();
  }



 


 

//Metodo intermediador para cargar imagen y datos a la base de datos


 agregarMensaje(mensaje:Mensaje){
     this.mensajeColeccion.add(mensaje);
    
 }

  
 





}

