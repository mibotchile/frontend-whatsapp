import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BannedWordsComponent } from "./banned-words.component";

const routes: Routes = [
    {
        path: "",
        component: BannedWordsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BannedWordsRoutingModule {}
