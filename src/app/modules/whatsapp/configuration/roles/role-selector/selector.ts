export interface Selector {
    name: string;
    tabs: Tab[];
    hasTabs: boolean;
    childrens: Selector[];
    permissions: string[];
    hasChildrens: boolean;
    hasPermissions: boolean;
}

export interface Tab{
    name: string;
    permissions: string[];
    hasPermissions: boolean;
}
