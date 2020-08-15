import { Component, OnInit, TemplateRef } from '@angular/core';
import{ MessagesService } from '../../services/messages.service';
import { Message } from 'src/app/models/message';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  modalRef: BsModalRef;
  messages;
  oneAtATime: boolean = true;
  title = "Todos los mensajes";
  constructor(private toastr: ToastrService, private modalService: BsModalService, private messageService: MessagesService) { }

  openModal(template: TemplateRef<any>) 
  {
    this.modalRef = this.modalService.show(template);
    this.modalRef.hide();
  }

  ngOnInit() 
  {
    this.messageService.getAllMessages().subscribe(messages => this.messages = messages);
  }

  delete(message)
  {
    var id = message.id;
    this.messageService.deleteMessage(id);
    this.modalRef.hide()
    this.toastr.success('Se ha borrado el mensaje exitosamente.');
  }

  readMessage(message)
  {
    var id = message.id;
    this.messageService.readMessage(id, message);
  }

  allMessages()
  {
    this.title = "Todos los mensajes";
    this.messageService.getAllMessages().subscribe(messages => this.messages = messages);
  }

  readedMessages()
  {
    this.title = "Mensajes leídos";
    this.messageService.getReadedMessages().subscribe(messages => this.messages = messages);
  }

  UnreadMessages()
  {
    this.title = "Mensajes no leídos";
    this.messageService.getUnreadedMessages().subscribe(messages => this.messages = messages);
  }
}
