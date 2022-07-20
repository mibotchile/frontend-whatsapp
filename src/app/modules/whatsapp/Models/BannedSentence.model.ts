export class BannedSentence {
    id?: number;
    sentence: string;
    description: string;
    constructor(sentence, description) {
        this.sentence = sentence;
        this.description = description;
    }
}
