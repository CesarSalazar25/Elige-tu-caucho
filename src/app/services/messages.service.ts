import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Message } from "../models/message"
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageCollection: AngularFirestoreCollection<Message>;
  messageDoc: AngularFirestoreDocument<Message>;
  messages: Observable<Message[]>;
  message: Observable<Message>;
  readedMessages: Observable<Message[]>;
  unreadedMessages: Observable<Message[]>;
  constructor(private afs: AngularFirestore) {
      this.messageCollection = this.afs.collection('messages', ref => ref);
   }

  sendMessage(Sendmessage: Message){
    this.messageCollection.add(Sendmessage);
  }

  deleteMessage(id: string){
    this.messageDoc = this.afs.doc(`messages/${id}`);
    this.messageDoc.delete();
  }

  readMessage(id, message: Message){
    this.messageDoc = this.afs.doc(`messages/${id}`);
    message.readed = true;
    this.messageDoc.update(message);
  }

  getAllMessages(): Observable<Message[]>{
    this.messages = this.messageCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Message;
        const id = action.payload.doc.id;
        return {id, ...data};
      });
    }));
    return this.messages;
  }

  getReadedMessages(): Observable<Message[]>{
    this.readedMessages = this.messageCollection.snapshotChanges().pipe(map(changes=> {
      return changes.map(action => {
          const data = action.payload.doc.data() as Message;
          const id = action.payload.doc.id;
          return {id, ...data};
      });
    }));
    return this.readedMessages.pipe(map(arr => arr.filter( r => r.readed === true)));
  }

  getNumberUnreadedMessages(){
    this.readedMessages = this.messageCollection.snapshotChanges().pipe(map(changes=> {
      return changes.map(action => {
          const data = action.payload.doc.data() as Message;
          const id = action.payload.doc.id;
          return {id, ...data};
      });
    }));
    return this.readedMessages.pipe(map(arr => arr.filter( r => r.readed === false).length));
  }

  getUnreadedMessages(): Observable<Message[]>{
    this.readedMessages = this.messageCollection.snapshotChanges().pipe(map(changes=> {
      return changes.map(action => {
          const data = action.payload.doc.data() as Message;
          const id = action.payload.doc.id;
          return {id, ...data};
      });
    }));
    return this.readedMessages.pipe(map(arr => arr.filter( r => r.readed === false)));
  }

  deleteAllMessages(){
    this.messageCollection.snapshotChanges().pipe(map(changes =>{
      changes.map(action => {
        const id = action.payload.doc.id;
        this.deleteMessage(id);
      });
    }));
  }
}
