export interface Message {
    type: number;
    length: number;
    content: Array<number>;
}