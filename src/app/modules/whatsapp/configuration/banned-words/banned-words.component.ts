import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";

import icSearch from "@iconify/icons-ic/twotone-search";
import icAdd from "@iconify/icons-ic/twotone-add";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icEdit from "@iconify/icons-ic/twotone-edit";

import { TableColumn } from "src/@vex/interfaces/table-column.interface";

import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { MenuService } from "src/app/services/menu.service";
import { MatDialog } from "@angular/material/dialog";
import { CreateUpdateWordComponent } from "./create-update-word/create-update-word.component";
import { BannedSentence } from "../../Models/BannedSentence.model";
import { BannedWordsService } from "../../services/banned-words.service";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { FormControl } from "@angular/forms";
import { ConfirmationComponent } from "src/app/components/dialogs/confirmation/confirmation.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@UntilDestroy()
@Component({
    selector: "frontend-whatsapp-banned-words",
    templateUrl: "./banned-words.component.html",
    styleUrls: ["./banned-words.component.scss"],
    animations: [fadeInUp400ms],
})
export class BannedWordsComponent implements OnInit, AfterViewInit {
    icSearch = icSearch;
    icAdd = icAdd;
    icMoreHoriz = icMoreHoriz;
    icDelete = icDelete;
    icEdit = icEdit;

    tableSearch = new FormControl();

    isChecked = true;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    length: number;

    pageSize = 10;
    pageIndex = 1;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    dataSource: MatTableDataSource<any> | null;
    dataSourceForSearch: MatTableDataSource<any> | null;

    BannedSentences: BannedSentence[] = [];

    columns: TableColumn<any>[] = [
        { label: "palabra/frase", property: "sentence", type: "text", visible: true },
        {
            label: "descripción",
            property: "description",
            type: "text",
            visible: true,
        },
        { label: "Acciones", property: "actions", type: "button", visible: true },
    ];

    menu: any;
    subscription;
    constructor(
        private menuService: MenuService,
        public dialog: MatDialog,
        private bannedWordsService: BannedWordsService,
        private snackbar: MatSnackBar
    ) {
        this.bannedWordsService.onAddedOrUpdatedBannedWord.subscribe((word) => {
            console.log(this.pageIndex);
            this.getData(this.pageIndex, this.pageSize);
        });
    }

    ngOnInit(): void {
        this.subscription = new Subscription();
        this.subscription = this.menuService.getConfigObs().subscribe((response) => {
            this.menu = response;
        });
        this.isChecked = true;
        this.dataSource = new MatTableDataSource();
        this.tableSearch.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => this.onFilterChange(value));
    }
    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }
    trackByProperty<T>(index: number, column: TableColumn<T>) {
        return column.property;
    }

    OnPageChange(event: PageEvent) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex + 1;
        this.getData(event.pageIndex + 1, event.pageSize);
    }
    getData(page?: number, pageSize?: number) {
        this.subscription = new Subscription();
        if (this.isChecked) {
            this.subscription = this.bannedWordsService.getActiveWords(pageSize, page).subscribe((result: any) => {
                this.updateDataTable(result);
            });
        } else {
            this.subscription = this.bannedWordsService.getInactiveWords(pageSize, page).subscribe((result: any) => {
                this.updateDataTable(result);
            });
        }
    }

    onFilterChange(value: string) {
        value = value.trim();
        value = value.toLowerCase();
        this.subscription = new Subscription();
        if (value === "") {
            this.dataSource = new MatTableDataSource();
            return this.getData(1, this.pageSize);
        }
        this.subscription = this.bannedWordsService.searchWord(value).subscribe((response: any) => {
            console.log(response);
            this.dataSourceForSearch = response.data.censoredSentences;
            this.dataSource = this.dataSourceForSearch;
        });
    }

    showData() {
        this.isChecked = !this.isChecked;
        this.paginator.pageSize = 10;
        this.paginator.firstPage();
        this.getData(1, this.pageSize);
    }

    menuVisibility(value: string) {
        for (const item of this.menu) {
            for (const i of item.tabs) {
                if (i.name === "user") {
                    for (const j of i.permissions) {
                        if (j === value) {
                            return true;
                        }
                    }
                }
            }
        }
        false;
    }
    get visibleColumns() {
        return this.columns.filter((column) => column.visible).map((column) => column.property);
    }
    openCreateUpdateModal(sentence?: BannedSentence) {
        this.dialog.open(CreateUpdateWordComponent, {
            width: "250px",
            data: Object.keys({ ...sentence }).length > 0 ? sentence : {},
        });
    }
    openConfirmationModal(data) {
        return this.dialog.open(ConfirmationComponent, {
            width: "auto",
            data,
        });
    }
    updateDataTable(response) {
        this.dataSource.data = response.data.censoredSentences;
        this.length = response.data.length;
    }

    deleteSentence(sentence: BannedSentence) {
        const DIALOG_DATA = {
            body: `¿estas seguro de eliminar: ${sentence.sentence}`,
            title: "Eliminar sentencia",
            btnColor: "warn",
        };
        this.openConfirmationModal(DIALOG_DATA)
            .afterClosed()
            .subscribe(
                (didUserConfirm) => {
                    if (!didUserConfirm) return;
                    this.bannedWordsService.deleteWord(sentence.id).subscribe((res: any) => {
                        console.log(res);
                        if (res.success) {
                            this.snackbar.open("La sentencia ha sido eliminada", "ok", { duration: 3500 });
                            return this.getData(this.pageIndex, this.pageSize);
                        }
                        this.showErrorMessage();
                    });
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
