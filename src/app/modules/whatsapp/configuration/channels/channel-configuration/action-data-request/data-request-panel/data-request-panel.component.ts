import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Question } from "src/app/modules/whatsapp/interfaces/channel-configuration.interface";

interface Type {
    value: number;
    viewValue: string;
  }

@Component({
    selector: "frontend-whatsapp-data-request-panel",
    templateUrl: "./data-request-panel.component.html",
    styleUrls: ["./data-request-panel.component.scss"],
})
export class DataRequestPanelComponent implements OnInit {

    @Input()
    questionNumber: number;

    @Output()
    deleteQuestionEvent = new EventEmitter<void>();

    @Output()
    createQuestionEvent = new EventEmitter<Question>();

    question: string;
    error: string;

    selected: number;

    types: Type[] = [
        { value: 0, viewValue: "Número" },
        { value: 1, viewValue: "Texto" },
        { value: 2, viewValue: "Email" },
    ];

    constructor() {
        this.question = '';
        this.error = '';
    }

    ngOnInit(): void {

    }

    onDelete(){
        this.deleteQuestionEvent.emit();
    }

    onCreate(){
        let questionObject : Question = {
            id: 0,
            question: this.question,
            response_type: this.selected.toString(),
            error_message: this.error
        }
        this.createQuestionEvent.emit(questionObject);
    }
}

