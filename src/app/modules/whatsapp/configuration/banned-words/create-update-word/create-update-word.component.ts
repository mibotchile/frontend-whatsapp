import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BannedSentence } from "../../../Models/BannedSentence.model";
import { BannedWordsService } from "../../../services/banned-words.service";

@Component({
    selector: "frontend-whatsapp-create-update-word",
    templateUrl: "./create-update-word.component.html",
    styleUrls: ["./create-update-word.component.scss"],
})
export class CreateUpdateWordComponent implements OnInit {
    updateOrCreateForm: FormGroup;
    wasCreatingOrUpdatingSuccesful = false;

    constructor(
        public dialogRef: MatDialogRef<CreateUpdateWordComponent>,
        private fb: FormBuilder,
        private bannedWordsService: BannedWordsService,
        private snackbar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public wordData
    ) {
        console.log(wordData);
        this.updateOrCreateForm = this.fb.group({
            word: [wordData.sentence, Validators.required],
            description: [wordData.description, Validators.required],
        });
    }

    ngOnInit(): void {}
    addWord(formDirective: FormGroupDirective) {
        if (!this.updateOrCreateForm.valid) {
            for (let formControl in this.updateOrCreateForm.controls) {
                this.updateOrCreateForm.controls[formControl].markAsTouched();
            }
            return;
        }
        this.bannedWordsService
            .addNewWord({
                sentence: this.updateOrCreateForm.get("word").value,
                description: this.updateOrCreateForm.get("description").value,
            })
            .subscribe(
                (bannedWord: any) => {
                    if (bannedWord.success) {
                        formDirective.resetForm();
                        this.updateOrCreateForm.reset();
                        const SNACKBAR_MESSAGE = "La sentencia ha sido registrada";
                        this.snackbar.open(SNACKBAR_MESSAGE, "ok", { duration: 3000 });
                        return this.bannedWordsService.emitAddOrUpdateWord(bannedWord.data);
                    }
                    this.showErrorMessage();
                },
                (err) => {
                    this.showErrorMessage();
                }
            );
    }
    updateWord(formDirective: FormGroupDirective) {
        if (!this.updateOrCreateForm.valid) {
            for (let formControl in this.updateOrCreateForm.controls) {
                this.updateOrCreateForm.controls[formControl].markAsTouched();
            }
            return;
        }
        this.bannedWordsService
            .updateWord({
                ...this.wordData,
                sentence: this.updateOrCreateForm.get("word").value,
                description: this.updateOrCreateForm.get("description").value,
            })
            .subscribe(
                (bannedWord: any) => {
                    console.log(bannedWord);
                    if (bannedWord.success) {
                        this.bannedWordsService.emitAddOrUpdateWord(bannedWord.data);
                        const SNACKBAR_MESSAGE = "La sentencia ha sido Actualizada";
                        this.snackbar.open(SNACKBAR_MESSAGE, "ok", { duration: 3500 });
                        return this.dialogRef.close();
                    }
                    this.showErrorMessage();
                },
                (err) => {
                    this.showErrorMessage();
                }
            );
    }

    showErrorMessage() {
        const SNACKBAR_MESSAGE = "Ha ocurrido un error, vuelva a intentarlo por favor";
        this.snackbar.open(SNACKBAR_MESSAGE, "ok", { duration: 3500 });
    }
}
