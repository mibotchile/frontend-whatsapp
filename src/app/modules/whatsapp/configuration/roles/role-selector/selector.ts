export interface Selector {
    name: string;
    displayName: string;
    tabs: Tab[];
    hasTabs: boolean;
    childrens: Selector[];
    permissionsToDisplay: string[];
    permissions: string[];
    hasChildrens: boolean;
    hasPermissions: boolean;
}

export interface Tab{
    name: string;
    displayName: string;
    permissionsToDisplay: string[];
    permissions: string[];
    hasPermissions: boolean;
}
