export interface ChannelConfiguration {
    id:             number;
    channel_id:     number;
    channel_number: string;
    menus:          Menu[];
    messages:       Message[];
    quizes:         Quize[];
    steps:          Step[];
}

export interface Menu {
    id:       number;
    title:    string;
    //options?: Option[];
    options?: Menu[];
}

export interface Option {
    id:     number;
    value:  string;
    action: string;
}

export interface Message {
    id:      number;
    title:   string;
    message: string;
}

export interface Question {
    id:            number;
    question:      string;
    error_message: string;
    response_type: string;
}

export interface Quize {
    id:        number;
    questions: Question[];
}

export interface Step {
    step:   number;
    action: string;
    status: number;
}

