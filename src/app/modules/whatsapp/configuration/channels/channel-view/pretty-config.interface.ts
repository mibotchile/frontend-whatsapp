export interface PrettyConfig {
    type: string;
    data: string[] | Menu | string;
}

export interface Menu {
    title:   string;
    options: PrettyConfig[];
}
