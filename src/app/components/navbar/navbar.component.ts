import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MessagesService } from './../../services/messages.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  modalRef: BsModalRef;
  isCollapsed = true;
  isforgot=false;
  constructor(private toastr: ToastrService, private modalService: BsModalService, public auth: AuthService, private router: Router, private MessageService: MessagesService) {}

  unreadMessage: number = 0;

  openModal(template: TemplateRef<any>) 
  {
    this.modalRef = this.modalService.show(template);
    this.modalRef.hide();
  }

  isforgotten()
  {
    this.isforgot=true;
  }

  notforgotten()
  {
    this.isforgot=false;
  }

  goShop()
  {
    this.router.navigateByUrl('dashboard/shop');
  }

  ngOnInit() 
  {
    this.MessageService.getNumberUnreadedMessages().subscribe(unreadedMessage => {
      this.unreadMessage = unreadedMessage;
    });
  }

  login(form: NgForm)
  {
    const email = form.value.email;
    const password = form.value.password;

    this.auth.emailAndPassword(email,password).then(()=> {
      this.modalRef.hide();
      this.router.navigate(['dashboard/admin']);
      this.toastr.success("Ha iniciado sesión exitosamente");
    }).catch(err => {
      this.toastr.error("No se pudo iniciar sesión.");
    })
  }

  forgot(form: NgForm)
  {
    const email = form.value.email;
    this.auth.ForgotPassword(email);
    this.toastr.success("Mensaje enviado. Compruebe su correo.");
    this.isforgot=false;
  }

}
