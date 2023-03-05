import { ApiResponse } from "src/utils/api-response";

interface ErrorItem {
    message: string;
  }

export interface Message {
    apiResponse: ApiResponse;
    errors: ErrorItem[];
  }