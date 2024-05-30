import { IQuestions } from "./questions";

export interface IQuestionsResponse {
  response_code: number;
  results: Array<IQuestions>;
}
