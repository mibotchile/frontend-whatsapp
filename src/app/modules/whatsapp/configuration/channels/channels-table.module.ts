import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelsTableRoutingModule } from './channels-table-routing.module';
import { ChannelsTableComponent } from './channels-table.component';
import { IconModule } from '@visurel/iconify-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { MatTableModule } from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChannelConfigurationComponent } from './channel-configuration/channel-configuration.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatDividerModule } from '@angular/material/divider';
import { SelectedActionComponent } from './channel-configuration/selected-action/selected-action.component';
import { ActionComponent } from './channel-configuration/action/action.component';
import { ActionMessageComponent } from './channel-configuration/action-message/action-message.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActionDataRequestComponent } from './channel-configuration/action-data-request/action-data-request.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import { DataRequestPanelComponent } from './channel-configuration/action-data-request/data-request-panel/data-request-panel.component';
import { ActionOptionsMenuComponent } from './channel-configuration/action-options-menu/action-options-menu.component';
import { ActionAttentionComponent } from './channel-configuration/action-attention/action-attention.component';
import { OptionsMenuItemComponent } from './channel-configuration/action-options-menu/options-menu-container/options-menu-item/options-menu-item.component';
import { OptionsMenuContainerComponent } from './channel-configuration/action-options-menu/options-menu-container/options-menu-container.component';
import { ActionRedirectionComponent } from './channel-configuration/action-redirection/action-redirection.component';
import {MatRadioModule} from '@angular/material/radio';
import { ActionOptionsComponent } from './channel-configuration/action-options/action-options.component';
import { OptionsContainerComponent } from './channel-configuration/action-options/options-container/options-container.component';
import { OptionsItemComponent } from './channel-configuration/action-options/options-container/options-item/options-item.component';


@NgModule({
  declarations: [
    ChannelsTableComponent,
    ChannelConfigurationComponent,
    SelectedActionComponent,
    ActionComponent,
    ActionMessageComponent,
    ActionDataRequestComponent,
    DataRequestPanelComponent,
    ActionOptionsMenuComponent,
    ActionAttentionComponent,
    OptionsMenuItemComponent,
    OptionsMenuContainerComponent,
    ActionRedirectionComponent,
    ActionOptionsComponent,
    OptionsContainerComponent,
    OptionsItemComponent,
  ],
  imports: [
    CommonModule,
    ChannelsTableRoutingModule,
    IconModule,
    ReactiveFormsModule,
    PageLayoutModule,
    FlexLayoutModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    MatRadioModule
  ]
})
export class ChannelsTableModule { }
