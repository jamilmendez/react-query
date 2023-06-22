import axios from "axios";

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization: 'Bearer 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',
  }
});