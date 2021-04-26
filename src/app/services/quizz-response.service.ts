import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Quizz } from '../models/quizz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizzResponseService {

  quizz!: Quizz;
  namePart = '';

  constructor(
    private firestore: AngularFirestore
  ) { }

  searchByCode(code: string): Observable<any> {
    return this.firestore.collection('quizz', ref => ref.where('code', '==', code)).get()
  }

  setPartQuizz(partQuizz: any): Promise<any> {
    return this.firestore.collection('answer').add(partQuizz)
  }

  getAnswerByid(id: string): Observable<any> {
    return this.firestore.collection('answer').doc(id).get();
  }

  getAnswersByQuizzId(idQ: string): Observable<any> {
    return this.firestore.collection('answer', ref => ref.where('idQuizz', '==', idQ)).snapshotChanges();
  }

  deleteAnswersPart(id: string): Promise<any> {
    return this.firestore.collection('answer').doc(id).delete();
  }
}
