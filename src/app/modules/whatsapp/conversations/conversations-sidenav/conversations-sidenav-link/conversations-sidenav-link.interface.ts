import { Icon } from "@visurel/iconify-angular";

export interface ConversationsSidenavLink {
    label: string;
    route: string[];
    icon: Icon;
    routerLinkActiveOptions?: { exact: boolean };
}

