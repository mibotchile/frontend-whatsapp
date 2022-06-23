import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

interface Type {
    value: string;
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

    question: string;

    types: Type[] = [
        { value: "0", viewValue: "Número" },
        { value: "1", viewValue: "Texto" },
        { value: "2", viewValue: "Email" },
    ];

    constructor() {
        this.question = "";
    }

    ngOnInit(): void {

    }

    onDelete(){
        this.deleteQuestionEvent.emit();
    }
}

