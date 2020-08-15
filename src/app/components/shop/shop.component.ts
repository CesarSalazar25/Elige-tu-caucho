import { Component, OnInit } from '@angular/core';
import { CatalogService } from './../../services/catalog.service';
import { Router } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Message } from '../../models/message';
import { MessagesService } from 'src/app/services/messages.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products;
  mensaje: boolean = false;
  isCaucho: boolean = true;
  isOthers: boolean = false;
  message: Message = new Message();
  searchterm: string = "";
  startAt = new Subject();
  endAt = new Subject();
  startObs = this.startAt.asObservable();
  endObs = this.endAt.asObservable();
  constructor(private toastr: ToastrService, private catalogoService: CatalogService, private afs: AngularFirestore, private messageService: MessagesService)
  {  }

  ngOnInit()
  {
    if(this.isCaucho){
      this.catalogoService.getAvailableProducts().subscribe(productos => {this.products = productos});
      combineLatest(this.startObs, this.endObs).subscribe((value) => {
        this.firequery(value[0], value[1]).subscribe((productos) => {
          this.products = productos;
        })
      })
    }
    if(this.isOthers){
      this.catalogoService.getOthers().subscribe(others => {this.products = others});
      combineLatest(this.startObs, this.endObs).subscribe((value) => {
        this.firequery(value[0], value[1]).subscribe((others) => {
          this.products = others;
        })
      })
    }
  }
  getProducts()
  {
    this.isCaucho = true;
    this.isOthers = false;
    this.catalogoService.getAvailableProducts().subscribe(productos => {this.products = productos});
    this.mensaje =false;
	this.catalogoService.Setestado(this.isCaucho);
  }
  getAccesorios(){
    this.isOthers = true;
    this.isCaucho = false;
    this.catalogoService.getOthers().subscribe(others => {this.products = others});
    this.mensaje = false;
	this.catalogoService.Setestado(this.isCaucho);
  }

  getTren()
  {
    this.getTrenes().subscribe((others) => {
      this.products = others;
    })
  }
  getTrenes()
  {
    return this.afs.collection('others', ref => ref.where("categoria", "==", "Tren")).valueChanges();
  }

  getAmortiguador()
  {
    this.getAmortiguadores().subscribe((others) => {
      this.products = others;
    })
  }
  getAmortiguadores()
  {
    return this.afs.collection('others', ref => ref.where("categoria", "==", "Amortiguadores")).valueChanges();
  }

  getFreno()
  {
    this.getFrenos().subscribe((others) => {
      this.products = others;
    })
  }
  getFrenos()
  {
    return this.afs.collection('others', ref => ref.where("categoria", "==", "Frenos")).valueChanges();
  }

  getCroche()
  {
    this.getCroches().subscribe((others) => {
      this.products = others;
    })
  }
  getCroches()
  {
    return this.afs.collection('others', ref => ref.where("categoria", "==", "Croches")).valueChanges();
  }

  getFiltro()
  {
    this.getFiltros().subscribe((others) => {
      this.products = others;
    })
  }
  getFiltros()
  {
    return this.afs.collection('others', ref => ref.where("categoria", "==", "Filtros")).valueChanges();
  }

  getOtro()
  {
    this.getOtros().subscribe((others) => {
      this.products = others;
    })
  }
  getOtros()
  {
    return this.afs.collection('others', ref => ref.where("categoria", "==", "Otros")).valueChanges();
  }

  search(event){
    const q = event.toLowerCase();
    if(q!==null){
      this.startAt.next(q);
      this.endAt.next(q + '\uf8ff');
    }else{
      if(this.isCaucho){
        this.getProducts();
      }
      if(this.isOthers){
        this.getAccesorios();
      }
    }
  }
  firequery(start,end){
    if(this.isCaucho == true){
      return this.afs.collection('products', ref => ref.orderBy('lowerCase').where("disponibility", "==", true).startAt(start).endAt(end)).valueChanges();
    }
    if(this.isOthers == true){
      return this.afs.collection('others', ref => ref.orderBy('lowerCase').where("disponibility", "==", true).startAt(start).endAt(end)).valueChanges();
    }
  }
  sendMessage(){
    var message = {
      name: this.message.name,
      email: this.message.email,
      number: this.message.number,
      text: this.message.text,
      marca: this.message.marca,
      readed: this.message.readed,
      publish_date: new Date(),
	  rin: this.message.rin,
	  model: this.message.model
    }

    this.messageService.sendMessage(message);
    this.Mensaje();
    this.toastr.success('Se ha enviado el mensaje exitosamente.');
  }

  Mensaje(){
    this.products = null;
    this.mensaje = true;
    this.message.email = null;
    this.message.name = null;
    this.message.number = null;
    this.message.readed = false;
    this.message.text = null;
    this.message.marca = null;
    this.message.rin = null;
    this.message.model = null;
  }
}
