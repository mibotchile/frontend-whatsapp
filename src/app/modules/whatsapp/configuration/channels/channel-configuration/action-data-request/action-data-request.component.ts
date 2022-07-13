import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import icClose from "@iconify/icons-ic/twotone-close";
import icPeople from "@iconify/icons-ic/people";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Question, Quize } from "src/app/modules/whatsapp/interfaces/channel-configuration.interface";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DataRequestStatusService } from "./data-request-status.service";
import { Subscription } from "rxjs";

@Component({
    selector: "frontend-whatsapp-action-data-request",
    templateUrl: "./action-data-request.component.html",
    styleUrls: ["./action-data-request.component.scss"],
})
export class ActionDataRequestComponent implements OnInit, OnDestroy {

    deactivationStatus$ = this.dataRequestStatusService.getStatusObs();

    panelOpenState = false;

    questions: Question[];

    icClose = icClose;
    icPeople = icPeople;

    form: FormGroup;
    mode: "create" | "update" = "create";

    question: Question;
    action: string;

    subscription: Subscription;

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ActionDataRequestComponent>,
        private fb: FormBuilder,
        private dataRequestStatusService: DataRequestStatusService
    ) {

    }

    ngOnInit(): void {
        this.action = "noaction";

        this.question = {
            id: 0,
            question: "",
            error_message: "",
            response_type: "",
        };

        if (this.defaults.id) {
            this.mode = "update";
            this.action = "update";
            this.questions = this.defaults.configuration.quizes[this.defaults.id].questions;
        } else {
            this.questions = [];
        }

        // this.form = this.fb.group({
        //     id: this.question.id,
        //     message: this.question.question,
        // });
    }

    addQuestion() {
        this.questions.push({
            id: this.question.id++,
            question: "",
            response_type: "",
            error_message: "",
        });

        this.dataRequestStatusService.setConfigObs(true);
    }

    save() {
        if (this.mode === "create") {
            this.createMessage();
        } else if (this.mode === "update") {
            this.updateMessage();
        }
    }

    createMessage() {
        // const message = this.form.value;

        // this.defaults.messages.push(message);
        this.defaults.configuration.quizes.push({
            id: this.defaults.configuration.quizes.length,
            questions: this.questions,
        });

        this.action = "create";

        this.dialogRef.close([this.defaults.configuration, this.action]);
    }

    updateMessage() {
        // const message = this.form.value;
        // message.id = this.defaults.id;
        console.log(this.defaults.id)
        this.action = "update";
        this.defaults.configuration.quizes[this.defaults.id].questions = this.questions;
        this.dialogRef.close([this.defaults.configuration, this.action]);
    }

    isCreateMode() {
        return this.mode === "create";
    }

    isUpdateMode() {
        return this.mode === "update";
    }

    fillQuestion(question: Question, id: number) {
        this.questions[id] = {
            id: this.questions[id].id,
            question: question.question,
            response_type: question.response_type,
            error_message: question.error_message,
        };
    }

    deleteQuestion(i: number) {
        this.questions.splice(i, 1);
    }

    ngOnDestroy(): void {
        this.dataRequestStatusService.setConfigObs(false);
        this.dialogRef.close([this.defaults.configuration, this.action]);
    }
}
