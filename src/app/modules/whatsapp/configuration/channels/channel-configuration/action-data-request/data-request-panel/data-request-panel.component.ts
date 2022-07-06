import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { Question } from "src/app/modules/whatsapp/interfaces/channel-configuration.interface";
import { ChannelService } from "src/app/modules/whatsapp/services/channel.service";

interface Type {
    value: number;
    viewValue: string;
  }

@Component({
    selector: "frontend-whatsapp-data-request-panel",
    templateUrl: "./data-request-panel.component.html",
    styleUrls: ["./data-request-panel.component.scss"],
})
export class DataRequestPanelComponent implements OnInit, OnDestroy {

    @Input()
    questionNumber: number;

    @Input()
    data: Question;

    @Output()
    deleteQuestionEvent = new EventEmitter<void>();

    @Output()
    createQuestionEvent = new EventEmitter<Question>();

    subscription: Subscription;

    question: string;
    error: string;

    selected: number;

    types: Type[] = [
        { value: 0, viewValue: "Número" },
        { value: 1, viewValue: "Texto" },
        { value: 2, viewValue: "Email" },
    ];

    constructor(private channelService: ChannelService) {
        this.question = '';
        this.error = '';
    }

    ngOnInit(): void {

        console.log(this.data);

        this.question = this.data.question;
        this.error = this.data.error_message;
        this.selected = Number(this.data.response_type);

        this.subscription = new Subscription();
        this.subscription = this.channelService.getResponseValidator().subscribe((response: any) => {
            this.types = [];
            response.forEach(e=>{
                this.types.push({
                    value: e.id,
                    viewValue: e.name
                });
            });
        });
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

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

