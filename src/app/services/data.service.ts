import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import {
  getFirestore,
  collection,
  getDocs,
  CollectionReference,
  addDoc,
  Timestamp,
  Firestore,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  colRef: CollectionReference<Todo>;
  db: Firestore;
  colName = 'todos';

  constructor() {
    const firebaseConfig = environment.firebase;
    // init firebase
    initializeApp(firebaseConfig);

    // init services
    const db = getFirestore();
    this.db = db;

    // collection ref
    this.colRef = collection(db, this.colName) as CollectionReference<Todo>;
  }

  getDbParams() {
    return {
      db: this.db,
      colRef: this.colRef,
      colName: this.colName,
    };
  }
}
