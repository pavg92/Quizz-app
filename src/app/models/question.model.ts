import { Answer } from "./answer.model";

export class Question {
    title: string;
    seg: number;
    points: number;
    listAnswer: Answer[];

    constructor(title: string, seg: number, points: number, listAnswer: Answer[]){
        this.title = title;
        this.seg = seg;
        this.points = points;
        this.listAnswer = listAnswer;
    }
}