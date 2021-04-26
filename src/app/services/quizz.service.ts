import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Question } from '../models/question.model';
import { Quizz } from '../models/quizz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  title = '';
  descrip = ''
  questions = new Subject<Question>();

  constructor(
    private firestore: AngularFirestore
  ) { }

  addQuestion(question: Question){
    this.questions.next(question);
  }

  getQuestions(): Observable<Question> {
    return this.questions.asObservable();
  }

  createQuizz(quizz: Quizz): Promise<any> {
    return this.firestore.collection('quizz').add(quizz);
  }

  getQuizzByUserId(uid: string): Observable<any>{
    return this.firestore.collection('quizz', ref => ref.where('uid','==',uid)).snapshotChanges()
  }

  getQuizzById(id: string): Observable<any> {
    return this.firestore.collection('quizz').doc(id).get();
  }

  deleteQuizz(id: string): Promise<any> {
    return this.firestore.collection('quizz').doc(id).delete()
  }
}
