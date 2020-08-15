import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Router} from '@angular/router';
import { Product } from 'src/app/models/product';
import { Others } from 'src/app/models/others';
import { Message } from 'src/app/models/message';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgForm, Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { CatalogService } from './../../services/catalog.service';
import { MessagesService } from './../../services/messages.service';
import { AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from './../../services/auth.service';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() ArrayIndex: number;
  @Input() Product: Product;
  @Input() WhatAmI: boolean

  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  modalRef4: BsModalRef;
  modalRef5: BsModalRef;
  selectedProduct;
  nameValue;
  descriptionValue;
  priceValue;
  marcaValue;
  modeloValue;
  benefitsValue;
  treadwearValue;
  tractionValue;
  temperatureValue;
  categoriaValue;
  partValue;
  vehicleValue;
  uploadProgress: Observable<number>;
  uploadProgress2: Observable<number>;
  uploadProgress3: Observable<number>;
  ref: AngularFireStorageReference;
  ref2: AngularFireStorageReference;
  ref3: AngularFireStorageReference;
  downloadURL: Observable<string>;
  imageUrl: string = null;
  imageUrl2: string = null;
  imageUrl3: string = null;
  oldimageUrl: string = null;
  oldimageUrl2: string = null;
  oldimageUrl3: string = null;
  message: Message = new Message();
  pic1=false;
  pic2=false;
  pic3=false;

  constructor(private toastr: ToastrService, private modalService: BsModalService, public auth: AuthService, private router: Router,
    private catalogoService: CatalogService, private messageService: MessagesService, private storage: AngularFireStorage)
  {}

  estado: boolean = this.catalogoService.estadoActual();

  ngOnInit() {}

  showIndicator = false;
  noWrapSlides = true;

  isPic1(): void
  {
   this.pic1=true;
  }

  isPic2(): void
  {
   this.pic2=true;
  }

  isPic3(): void
  {
   this.pic3=true;
  }

   OpenDetails(template: TemplateRef<any>)
  {
	  this.modalRef = this.modalService.show(template);
	  this.modalRef.hide();
  }

  OpenDetailsOthers(template: TemplateRef<any>)
  {
	  this.modalRef2 = this.modalService.show(template);
	  this.modalRef2.hide();
  }

  OpenEdit(template: TemplateRef<any>, editProduct)
  {
    this.selectedProduct = editProduct;
    this.nameValue=this.selectedProduct.name;
    this.descriptionValue = this.selectedProduct.descrition;
    this.priceValue = this.selectedProduct.price;
    this.marcaValue = this.selectedProduct.marca;
    this.modeloValue = this.selectedProduct.modelo;
    this.benefitsValue = this.selectedProduct.benefits;
    this.treadwearValue = this.selectedProduct.treadwear;
    this.tractionValue = this.selectedProduct.traction;
    this.temperatureValue = this.selectedProduct.temperature;
    this.partValue = this.selectedProduct.part;
    this.vehicleValue  = this.selectedProduct.vehicle;
    this.categoriaValue  = this.selectedProduct.categoria;
    this.modalRef3 = this.modalService.show(template, { class: 'modal-lg' });
    this.modalRef3.hide();
  }

  OpenConfirmation(template: TemplateRef<any>)
  {
    this.modalRef4 = this.modalService.show(template, { class: 'second' });
    this.modalRef4.hide();
  }

  OpenDetailsAdmin(template: TemplateRef<any>)
  {
    this.modalRef5 = this.modalService.show(template);
    this.modalRef5.hide();
  }

  removeAvaliable(product)
  {
    if(this.estado)
    {
      var id = product.id;
      this.catalogoService.quitarDisponibilidad(id, product);
      this.toastr.info("Se ha quitado la disponibilidad del artículo seleccionado");
    }
    else
    {
      var id = product.id;
      this.catalogoService.quitarDisponibilidadO(id, product);
      this.toastr.info("Se ha quitado la disponibilidad del artículo seleccionado");
    }
  }

  addAvaliable(product)
  {
    if(this.estado)
    {
      var id = product.id;
      this.catalogoService.agregarDisponibilidad(id, product);
    }
    else
    {
      var id = product.id;
      this.catalogoService.agregarDisponibilidadO(id, product);
    }
    this.toastr.info("Se ha añadido la disponibilidad para el artículo seleccionado");
  }

  upload(event)
  {

    if(this.pic1)
    {
      const file = event.target.files[0];

      const randomId = Math.random().toString(36).substring(2);
      const filepath = `Imágenes/products/${randomId}`;

      const task = this.storage.upload(filepath, file);
      this.ref = this.storage.ref(filepath);

      this.uploadProgress = task.percentageChanges();

      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = this.ref.getDownloadURL();
          if(this.imageUrl!=null)
          {
            this.deleteImage(this.imageUrl);
          }
          this.downloadURL.subscribe(url => {this.imageUrl = url} );
          this.toastr.success('Se ha subido la imagen #1 exitosamente.');
          this.pic1=false;
        })
      ).subscribe();
    }

    if(this.pic2)
    {
      const file = event.target.files[0];

      const randomId = Math.random().toString(36).substring(2);
      const filepath = `Imágenes/products/${randomId}`;

      const task = this.storage.upload(filepath, file);

      this.ref2 = this.storage.ref(filepath);

      this.uploadProgress2 = task.percentageChanges();

      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = this.ref2.getDownloadURL();
          if(this.imageUrl2!=null)
          {
            this.deleteImage(this.imageUrl2);
          }
          this.downloadURL.subscribe(url => {this.imageUrl2 = url} );
          this.toastr.success('Se ha subido la imagen #2 exitosamente.');
          this.pic2=false;
        })
      ).subscribe();

    }

    if(this.pic3)
    {
      const file = event.target.files[0];

      const randomId = Math.random().toString(36).substring(2);
      const filepath = `Imágenes/products/${randomId}`;

      const task = this.storage.upload(filepath, file);
      this.ref3 = this.storage.ref(filepath);

      this.uploadProgress3 = task.percentageChanges();

      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = this.ref3.getDownloadURL();
          if(this.imageUrl3!=null)
          {
            this.deleteImage(this.imageUrl3);
          }
          this.downloadURL.subscribe(url => {this.imageUrl3 = url} );
          this.toastr.success('Se ha subido la imagen #3 exitosamente.');
          this.pic3=false;
        })
      ).subscribe();

    }

  }

  deleteImage(downloadUrl)
  {
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }

  updateProduct(form: NgForm)
  {
    var id = this.selectedProduct.id;

    if(form.value.name != "")
    {
      this.selectedProduct.name = form.value.name;
      this.selectedProduct.lowerCase = this.selectedProduct.name.toLowerCase();
    }
    else
    {
      this.toastr.warning('Debe añadirse un nombre.');
      return null;
    }

    if(form.value.descripcion != "")
    {
      this.selectedProduct.descrition = form.value.descripcion;
    }
    else
    {
      this.toastr.warning('Debe añadirse una descripción');
      return null;
    }

    if(form.value.precio > 0)
    {
      this.selectedProduct.price = form.value.precio;
    }
    else if(form.value.precio <= 0)
    {
      this.toastr.warning('Debe añadirse un precio a la publicación');
      return null;
    }

    if(form.value.marca != "")
    {
      this.selectedProduct.marca = form.value.marca;
    }
    else
    {
      this.toastr.warning('Debe añadirse la marca.');
      return null;
    }

    if(this.estado)
    {
      if(form.value.modelo != "")
      {
        this.selectedProduct.modelo = form.value.modelo;
      }
      else
      {
        this.toastr.warning('Debe añadirse el modelo.');
        return null;
      }

      if(form.value.benefits != "")
      {
        this.selectedProduct.benefits = form.value.benefits;
      }
      else
      {
        this.toastr.warning('Debe añadirse el beneficio.');
        return null;
      }

      if(form.value.treadwear != "")
      {
        this.selectedProduct.treadwear = form.value.treadwear;
      }
      else
      {
        this.toastr.warning('Debe añadirse el desgaste del rodamiento.');
        return null;
      }

      if(form.value.temperature != "")
      {
        this.selectedProduct.temperature = form.value.temperature;
      }
      else
      {
        this.toastr.warning('Debe añadirse la temperatura.');
        return null;
      }

      if(form.value.traction != "")
      {
        this.selectedProduct.traction = form.value.traction;
      }
      else
      {
        this.toastr.warning('Debe añadirse la tracción.');
        return null;
      }
    }
    else
    {
      if(form.value.vehicle != "")
      {
        this.selectedProduct.vehicle = form.value.vehicle;
      }
      else
      {
        this.toastr.warning('Debe añadirse el vehículo al que aplica.');
        return null;
      }

      if(form.value.categoria != "")
      {
        this.selectedProduct.categoria = form.value.categoria;
      }
      else
      {
        this.toastr.warning('Debe añadirse una categoría');
        return null;
      }

      if(form.value.part != "")
      {
        this.selectedProduct.part = form.value.part;
      }
      else
      {
        this.toastr.warning('Debe añadirse el número de parte.');
        return null;
      }
    }


    if(this.imageUrl!=null)
    {
      this.oldimageUrl=this.selectedProduct.photoUrl;
      if(this.oldimageUrl!="")
      {
        this.deleteImage(this.oldimageUrl);
      }
        this.selectedProduct.photoUrl=this.imageUrl;
      this.imageUrl=null;
    }

    if(this.imageUrl2!=null)
    {
      this.oldimageUrl2=this.selectedProduct.photoUrl2;
      if(this.oldimageUrl2!="")
      {
        this.deleteImage(this.oldimageUrl2);
      }
        this.selectedProduct.photoUrl2=this.imageUrl2;
      this.imageUrl2=null;
    }

    if(this.imageUrl3!=null)
    {
      this.oldimageUrl3=this.selectedProduct.photoUrl3;
      if(this.oldimageUrl3!="")
      {
        this.deleteImage(this.oldimageUrl3);
      }
        this.selectedProduct.photoUrl3=this.imageUrl3;
      this.imageUrl3=null;
    }

    if(this.estado)
    {
       this.catalogoService.updateProducto(id, this.selectedProduct);
    }
    else
    {
       this.catalogoService.updateProductoO(id, this.selectedProduct);
    }
    this.modalRef3.hide();
    this.modalRef3 = null;
    this.toastr.success("Se ha editado el artículo exitosamente");
  }

  decline(): void
  {

	if(this.imageUrl!=null)
    {
      this.deleteImage(this.imageUrl);
      this.imageUrl=null;
    }
	else
	{
		this.imageUrl=null;
	}

	if(this.imageUrl2!=null)
    {
      this.deleteImage(this.imageUrl2);
      this.imageUrl2=null;
    }
	else
	{
		this.imageUrl2=null;
	}

	if(this.imageUrl3!=null)
    {
      this.deleteImage(this.imageUrl3);
      this.imageUrl3=null;
    }
	else
	{
		this.imageUrl3=null;
	}
    this.toastr.info("Se ha cancelado la edición del artículo");
  }

  delete(product)
  {
    var id = product.id;
    var estado = this.catalogoService.estadoActual();
    if(estado)
    {
      this.catalogoService.deleteProducto(id);
    }
    else
    {
      this.catalogoService.deleteProductoO(id);
    }
    this.modalRef4.hide();

  	if(product.photoUrl!='')
  	{
  		this.deleteImage(product.photoUrl);
  	}
  	if(product.photoUrl2!='')
  	{
  		this.deleteImage(product.photoUrl2);
  	}
  	if(product.photoUrl3!='')
  	{
  		this.deleteImage(product.photoUrl3);
  	}
    this.toastr.success("Se ha borrado el artículo exitosamente");
  }
}
