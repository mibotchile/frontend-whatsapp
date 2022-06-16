import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';
import { ChatEmptyComponent } from './chat-empty/chat-empty.component';
import { ConversationsComponent } from './conversations.component';

const routes: Routes = [
  {
    path: '',
    component: ConversationsComponent,
    data: {
      scrollDisabled: true
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ChatEmptyComponent
      },
      {
        path: ':chatId',
        component: ChatConversationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class ConversationsRoutingModule { }
