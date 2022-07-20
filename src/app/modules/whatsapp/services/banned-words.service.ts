import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BannedSentence } from "../Models/BannedSentence.model";

@Injectable({
    providedIn: "root",
})
export class BannedWordsService {
    endpoint = environment.url_api_local + "censoredSentence";

    bannedWordSubject: BehaviorSubject<BannedSentence> = new BehaviorSubject<BannedSentence>(null);
    onAddedOrUpdatedBannedWord: Observable<BannedSentence> = this.bannedWordSubject.asObservable();

    constructor(private http: HttpClient) {}

    emitAddOrUpdateWord(bannedWord) {
        this.bannedWordSubject.next(bannedWord);
    }

    addNewWord(word: BannedSentence) {
        return this.http.post<BannedSentence>(this.endpoint, word);
    }
    getActiveWords(pageSize?, page?) {
        return this.http.get<BannedSentence[]>(this.endpoint + `/actives?pageSize=${pageSize}&page=${page}`);
    }
    getInactiveWords(pageSize?, page?) {
        return this.http.get<BannedSentence[]>(this.endpoint + `/inactives?pageSize=${pageSize}&page=${page}`);
    }
    deleteWord(wordId: number) {
        return this.http.delete(this.endpoint + `/${wordId}`);
    }
    searchWord(word: string) {
        console.log(`${this.endpoint}/search?sentence=${word}`);
        return this.http.get(`${this.endpoint}/search?sentence=${word}`);
    }
    updateWord(word: BannedSentence) {
        return this.http.put(`${this.endpoint}/${word.id}`, { sentence: word.sentence, description: word.description });
    }
}
