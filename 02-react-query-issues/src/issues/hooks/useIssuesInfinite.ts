import { useInfiniteQuery } from '@tanstack/react-query';
import { Issue, State } from '../interfaces';
import { sleep } from '../../helpers';
import { githubApi } from '../../api/githubApi';

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props)[];
}

const getIssues = async ({ queryKey, pageParam = 1 }: QueryProps): Promise<Issue[]> => {

  const [, , args] = queryKey;
  const { labels, state } = args as Props;

  // await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append('state', state);

  if (labels.length > 0) {
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }

  params.append('page', pageParam.toString());
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssuesInfinite = ({ labels, state }: Props) => {

  const issuesQuery = useInfiniteQuery(
    ['issues', 'infinite', { state, labels }],
    (data) => getIssues(data),
    {
      getNextPageParam: (lastPage, pages) => {
        if ( lastPage.length === 0) return;

        return pages.length + 1;
      }
    }
  );


  return {
    issuesQuery,
  }
}