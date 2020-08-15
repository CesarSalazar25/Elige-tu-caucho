import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Others } from '../models/others';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  isCaucho: boolean = true;
  productCollection: AngularFirestoreCollection<Product>;
  otherCollection: AngularFirestoreCollection<Others>;
  productDoc: AngularFirestoreDocument<Product>;
  otherDoc: AngularFirestoreDocument<Others>;
  productos: Observable<any>;
  others: Observable<any>;
  availableProducts: Observable<Product[]>;
  product: Observable<Product>;
  other: Observable<Others>;
  selectedCaucho: any
  selectedOther: any

  constructor(
    private afs: AngularFirestore) {
      this.productCollection = this.afs.collection('products', ref => ref);
      this.otherCollection = this.afs.collection('others', ref => ref);
  }

  Setestado(estado: boolean)
  {
    this.isCaucho=estado;
  }

  estadoActual()
  {
   return this.isCaucho;
  }

  crearProducto(product: Product){
    this.productCollection.add(product);
  }

  crearProductoO(other: Others){
    this.otherCollection.add(other);
  }

  updateProducto(id: string, product: Product){
    this.productDoc = this.afs.doc(`products/${id}`);
    this.productDoc.update(product);
  }

  updateProductoO(id: string, other: Others){
    this.otherDoc = this.afs.doc(`others/${id}`);
    this.otherDoc.update(other);
  }

  deleteProducto(id: string){
    this.productDoc = this.afs.doc(`products/${id}`);
    this.productDoc.delete();
  }

  deleteProductoO(id: string)
  {
    this.otherDoc = this.afs.doc(`others/${id}`);
    this.otherDoc.delete();
  }

  quitarDisponibilidad(id: string, product: Product)
  {
    this.productDoc = this.afs.doc(`products/${id}`);
    product.disponibility = false;
    this.productDoc.update(product);
  }

  agregarDisponibilidad(id: string, product: Product)
  {
    this.productDoc = this.afs.doc(`products/${id}`);
    product.disponibility = true;
    this.productDoc.update(product);
  }

  quitarDisponibilidadO(id: string, other: Others){
    this.otherDoc = this.afs.doc(`others/${id}`);
    other.disponibility = false;
    this.otherDoc.update(other);
  }

  agregarDisponibilidadO(id: string, other: Others){
    this.otherDoc = this.afs.doc(`others/${id}`);
    other.disponibility = true;
    this.otherDoc.update(other);
  }

  getProductos():Observable<Product[]>{
    this.productos = this.productCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
          const data = action.payload.doc.data() as Product;
          const id = action.payload.doc.id;
          return {id, ...data};
      });
    }));
    return this.productos;
  }

  getProduct(index: number):any{
    var productos: Product[] = []
    this.selectedCaucho = this.getAvailableProducts().pipe(map(items => {
      items.forEach(element => {
        productos.push(element);
      });
      return productos[index]
    }))
    return this.selectedCaucho
  }

  getOthers():Observable<Others[]>{
    this.others= this.otherCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Product;
        const id = action.payload.doc.id;
        return {id, ...data};
      });
    }));
    return this.others
  }
  getAvaliableOthers():Observable<Others[]>{
    this.others= this.otherCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Product;
        const id = action.payload.doc.id;
        return {id, ...data};
      });
    }));
    return this.others.pipe(map(arr => arr.filter(r => r.disponibility ===true)))
  }

  getOther(index: number):any{
    var productos: Product[] = []
    this.selectedCaucho = this.getOthers().pipe(map(items => {
      items.forEach(element => {
        productos.push(element);
      });
      return productos[index]
    }))
    return this.selectedCaucho
  }

  getAvailableProducts():Observable<Product[]>{
    this.availableProducts = this.productCollection.snapshotChanges().pipe(map(changes=> {
      return changes.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return {id, ...data};
      });
    }));
    return this.  availableProducts.pipe(map(arr => arr.filter( r => r.disponibility === true)))
  }
}
