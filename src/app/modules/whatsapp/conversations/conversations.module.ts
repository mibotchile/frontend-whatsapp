import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ConversationsRoutingModule } from "./conversations-routing.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { IconModule } from "@visurel/iconify-angular";
import { MatBadgeModule } from "@angular/material/badge";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { ConversationsSidenavComponent } from "./conversations-sidenav/conversations-sidenav.component";
import { ConversationsChatComponent } from "./conversations-chat/conversations-chat.component";
import { NoAssignedSidenavComponent } from "./conversations-sidenav/no-assigned-sidenav/no-assigned-sidenav.component";
import { ScrollbarModule } from "src/@vex/components/scrollbar/scrollbar.module";
import { ConversationsComponent } from "./conversations.component";

@NgModule({
    declarations: [
        ConversationsComponent,
        ConversationsSidenavComponent,
        ConversationsChatComponent,
        NoAssignedSidenavComponent,
    ],
    imports: [
        CommonModule,
        ConversationsRoutingModule,
        PageLayoutModule,
        SecondaryToolbarModule,
        BreadcrumbsModule,
        MatProgressBarModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatBadgeModule,
        IconModule,
        MatRippleModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        ScrollingModule,
        MatMenuModule,
        ScrollbarModule,
        FormsModule,
        MatProgressSpinnerModule,
    ],
})
export class ConversationsModule {}
