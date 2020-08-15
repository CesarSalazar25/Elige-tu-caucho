import { Component, OnInit, TemplateRef } from '@angular/core';
import { CatalogService } from './../../services/catalog.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Others } from 'src/app/models/others';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

products;
isCaucho: boolean = true;
isOthers: boolean = false;
modalRef6: BsModalRef;
modalRef7: BsModalRef;
selectedProduct: Product;
newProduct: Product = new Product();
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
pic1=false;
pic2=false;
pic3=false;

  constructor(private toastr: ToastrService, private catalogoService: CatalogService, private modalService: BsModalService,
    private router: Router,private storage: AngularFireStorage, public afs: AngularFirestore) {  }

  ngOnInit()
  {
  	this.catalogoService.getProductos().subscribe(productos => this.products = productos);
  }

  showIndicator = false;
  noWrapSlides = false;

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


  OpenCreate(template: TemplateRef<any>)
  {
    this.newProduct.name = "";
    this.newProduct.marca = "";
    this.newProduct.descrition = "";
    this.newProduct.price = null;

    if(this.isCaucho)
    {
      this.newProduct.modelo = "";
      this.newProduct.benefits = "";
      this.newProduct.treadwear = "";
      this.newProduct.traction = "";
      this.newProduct.temperature = "";
    }
    else
    {
      this.newProduct.vehicle = "";
      this.newProduct.part = "";
      this.newProduct.categoria = "";
    }

    this.modalRef6 = this.modalService.show(template, { class: 'modal-lg' });
    this.modalRef6.hide();
  }

  createProduct(form: NgForm)
  {
    if(this.isCaucho)
    {
      if(form.value.name === "")
      {
        this.toastr.warning("Debe insertar el nombre");
        return;
      }
      if(form.value.marca === "")
      {
        this.toastr.warning("Debe insertar la marca");
        return;
      }
      if(form.value.modelo === "")
      {
        this.toastr.warning("Debe insertar el modelo");
        return;
      }
      if(form.value.precio === null || form.value.precio<=0 || form.value.precio === "")
      {
        this.toastr.warning("Debe insertar el precio");
        return;
      }
      if(form.value.descripcion === "")
      {
        this.toastr.warning("Debe insertar una descripción");
        return;
      }
      if(form.value.benefits === "")
      {
        this.toastr.warning("Debe insertar los beneficios del producto");
        return;
      }
      if(form.value.treadwear === "")
      {
        this.toastr.warning("Debe insertar el desgaste del rodamiento");
        return;
      }
      if(form.value.traction === "")
      {
        this.toastr.warning("Debe insertar la tracción");
        return;
      }
      if(form.value.temperature === "")
      {
        this.toastr.warning("Debe insertar la temperatura");
        return;
      }

      if(this.imageUrl!=null && this.imageUrl2==null && this.imageUrl3==null)
      {

        var cauchoNuevo =
        {
          name: form.value.name,
          price: form.value.precio,
          descrition: form.value.descripcion,
          photoUrl: this.imageUrl,
          photoUrl2: "",
          photoUrl3: "",
          marca: form.value.marca,
          modelo: form.value.modelo,
          benefits: form.value.benefits,
          treadwear: form.value.treadwear,
          traction: form.value.traction,
          temperature: form.value.temperature,
          disponibility: true,
          lowerCase: form.value.name.toLowerCase()
        }
      }
      else if(this.imageUrl!=null && this.imageUrl2!=null && this.imageUrl3==null)
      {

        var cauchoNuevo =
        {
          name: form.value.name,
          price: form.value.precio,
          descrition: form.value.descripcion,
          photoUrl: this.imageUrl,
          photoUrl2: this.imageUrl2,
          photoUrl3: "",
          marca: form.value.marca,
          modelo: form.value.modelo,
          benefits: form.value.benefits,
          treadwear: form.value.treadwear,
          traction: form.value.traction,
          temperature: form.value.temperature,
          disponibility: true,
          lowerCase: form.value.name.toLowerCase()
        }
      }
      else if(this.imageUrl!=null && this.imageUrl2!=null && this.imageUrl3!=null)
      {
        var cauchoNuevo =
        {
          name: form.value.name,
          price: form.value.precio,
          descrition: form.value.descripcion,
          photoUrl: this.imageUrl,
          photoUrl2: this.imageUrl2,
          photoUrl3: this.imageUrl3,
          marca: form.value.marca,
          modelo: form.value.modelo,
          benefits: form.value.benefits,
          treadwear: form.value.treadwear,
          traction: form.value.traction,
          temperature: form.value.temperature,
          disponibility: true,
          lowerCase: form.value.name.toLowerCase()
        }
      }
      else if(this.imageUrl==null && this.imageUrl2==null && this.imageUrl3==null)
      {
        var cauchoNuevo =
        {
          name: form.value.name,
          price: form.value.precio,
          descrition: form.value.descripcion,
          photoUrl: "",
          photoUrl2: "",
          photoUrl3: "",
          marca: form.value.marca,
          modelo: form.value.modelo,
          benefits: form.value.benefits,
          treadwear: form.value.treadwear,
          traction: form.value.traction,
          temperature: form.value.temperature,
          disponibility: true,
          lowerCase: form.value.name.toLowerCase()
        }
      }
      else
      {
        this.declineCreate();
        this.toastr.error('Ha ocurrido un error, por favor vuelva a intentarlo.');
      }


      this.catalogoService.crearProducto(cauchoNuevo);
      this.toastr.success('Se ha añadido un nuevo artículo (Caucho) al catálago exitosamente.');
    }
    else
    {
      if(form.value.name === "")
      {
        this.toastr.warning("Debe insertar el nombre");
        return;
      }
      if(form.value.marca === "")
      {
        this.toastr.warning("Debe insertar la marca");
        return;
      }
      if(form.value.part === "")
      {
        this.toastr.warning("Debe insertar el número de parte");
        return;
      }
      if(form.value.precio === null || form.value.precio<=0 || form.value.precio === "")
      {
        this.toastr.warning("Debe insertar el precio");
        return;
      }
      if(form.value.descripcion === "")
      {
        this.toastr.warning("Debe insertar una descripción");
        return;
      }
      if(form.value.vehicle === "")
      {
        this.toastr.warning("Debe insertar el vehículo al cual aplica");
        return;
      }
      if(form.value.categoria === "")
      {
        this.toastr.warning('Debe añadirse una categoría');
        return null;
      }


      if(this.imageUrl!=null && this.imageUrl2==null && this.imageUrl3==null)
      {

        var repuestoNuevo =
        {
          name: form.value.name,
          price: form.value.precio,
          descrition: form.value.descripcion,
          photoUrl: this.imageUrl,
          photoUrl2: "",
          photoUrl3: "",
          marca: form.value.marca,
          part: form.value.part,
          vehicle: form.value.vehicle,
          categoria: form.value.categoria,
          disponibility: true,
          lowerCase: form.value.name.toLowerCase()
        }
      }
      else if(this.imageUrl!=null && this.imageUrl2!=null && this.imageUrl3==null)
      {
        var repuestoNuevo =
        {
          name: form.value.name,
          price: form.value.precio,
          descrition: form.value.descripcion,
          photoUrl: this.imageUrl,
          photoUrl2: this.imageUrl2,
          photoUrl3: "",
          marca: form.value.marca,
          part: form.value.part,
          vehicle: form.value.vehicle,
          categoria: form.value.categoria,
          disponibility: true,
          lowerCase: form.value.name.toLowerCase()
        }
      }
      else if(this.imageUrl!=null && this.imageUrl2!=null && this.imageUrl3!=null)
      {
        var repuestoNuevo =
        {
          name: form.value.name,
          price: form.value.precio,
          descrition: form.value.descripcion,
          photoUrl: this.imageUrl,
          photoUrl2: this.imageUrl2,
          photoUrl3: this.imageUrl3,
          marca: form.value.marca,
          part: form.value.part,
          vehicle: form.value.vehicle,
          categoria: form.value.categoria,
          disponibility: true,
          lowerCase: form.value.name.toLowerCase()
        }
      }
      else if(this.imageUrl==null && this.imageUrl2==null && this.imageUrl3==null)
      {
        var repuestoNuevo =
        {
          name: form.value.name,
          price: form.value.precio,
          descrition: form.value.descripcion,
          photoUrl: "",
          photoUrl2: "",
          photoUrl3: "",
          marca: form.value.marca,
          part: form.value.part,
          vehicle: form.value.vehicle,
          categoria: form.value.categoria,
          disponibility: true,
          lowerCase: form.value.name.toLowerCase()
        }
      }
      else
      {
        this.declineCreate();
        this.toastr.error('Ha ocurrido un error, por favor vuelva a intentarlo.');
      }
      this.catalogoService.crearProductoO(repuestoNuevo);
      this.toastr.success('Se ha añadido un nuevo artículo (Repuesto) al catálago exitosamente.');
    }

    this.imageUrl=null;
    this.imageUrl2=null;
    this.imageUrl3=null;
    this.modalRef6.hide();
    this.modalRef6=null;

  }

  declineCreate()
  {
    this.modalRef6.hide();

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
      this.toastr.error('Se ha cancelado la creación de un nuevo artículo');
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

  getProducts()
  {
    this.isCaucho = true;
    this.isOthers = false;
    this.catalogoService.getProductos().subscribe(productos => {this.products = productos});
    this.catalogoService.Setestado(this.isCaucho);
  }

  getAccesorios()
  {
    this.isOthers = true;
    this.isCaucho = false;
    this.catalogoService.getOthers().subscribe(others => {this.products = others});
    this.catalogoService.Setestado(this.isCaucho);
  }


}
