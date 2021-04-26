import { Question } from "./question.model";

export class Quizz {
    id?: string;
    uid: string;
    title: string;
    descrip: string;
    code: string;
    questionCount: number;
    creationDate: Date;
    listQuestion: Question[];
    
    constructor(uid: string, title: string, descrip: string, code: string, questionCount: number, creationDate: Date, listQuestion: Question[]){
        this.uid = uid;
        this.title = title;
        this.descrip = descrip;
        this.code = code;
        this.questionCount = questionCount;
        this.creationDate = creationDate;
        this.listQuestion = listQuestion;
    }
}