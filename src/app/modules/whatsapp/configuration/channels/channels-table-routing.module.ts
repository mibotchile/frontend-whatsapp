import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChannelsTableComponent } from "./channels-table.component";

const routes: Routes = [
    {
        path: "",
        component: ChannelsTableComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChannelsTableRoutingModule {}

