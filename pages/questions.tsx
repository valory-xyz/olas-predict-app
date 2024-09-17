import { useQuery } from '@tanstack/react-query';
import { Flex, Segmented } from 'antd';
import { getMarkets } from 'graphql/queries';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { LoadingError } from 'components/ErrorState';
import { Pagination } from 'components/Pagination';
import { QuestionCard } from 'components/QuestionCard';
import { LoaderCard } from 'components/QuestionCard/LoaderCard';
import { STATE_FILTER_VALUES } from 'constants/filters';
import { PAGE_QUERY_PARAM, STATE_QUERY_PARAM } from 'constants/index';
import { MEDIA_QUERY } from 'constants/theme';
import { useScreen } from 'hooks/useScreen';

const Filters = styled(Segmented)`
  margin-bottom: -16px;
  align-self: end;

  ${MEDIA_QUERY.mobile} {
    margin-bottom: 0;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-family: 'Anonymous Pro';
  font-size: 24px;
  font-style: italic;
  font-weight: 700;
  line-height: 1.5;

  ${MEDIA_QUERY.mobile} {
    font-size: 20px;
    margin-bottom: 24px;
  }
`;

const ITEMS_PER_PAGE = 5;

const QuestionsPage = () => {
  const { isMobile } = useScreen();
  const router = useRouter();
  const searchParams = useSearchParams();
  const stateParam = searchParams.get(STATE_QUERY_PARAM) || STATE_FILTER_VALUES[0].value;
  const pageParam = searchParams.get(PAGE_QUERY_PARAM);
  const page = pageParam ? +pageParam : 1;

  // Current page data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getMarkets', page, stateParam],
    queryFn: async () =>
      getMarkets({
        first: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
        ...(STATE_FILTER_VALUES.find((item) => item.value === stateParam)?.when || {}),
      }),
  });

  const markets = data?.fixedProductMarketMakers;

  // Next page data
  const nextPage = page * ITEMS_PER_PAGE;
  const { data: marketsNextPage } = useQuery({
    queryKey: ['getMarkets', nextPage, stateParam],
    queryFn: async () =>
      getMarkets({
        first: ITEMS_PER_PAGE,
        skip: nextPage,
        ...(STATE_FILTER_VALUES.find((item) => item.value === stateParam)?.when || {}),
      }),
  });

  const hasMoreMarkets = marketsNextPage && marketsNextPage.fixedProductMarketMakers.length !== 0;

  const handleFilterChange = (value: unknown) => {
    const params = new URLSearchParams('');

    if (value !== STATE_FILTER_VALUES[0].value) {
      params.set(STATE_QUERY_PARAM, `${value}`);
    }

    const newParams = params.toString();
    router.replace(`${newParams ? `?${newParams}` : ''}`);
  };

  return (
    <Flex vertical gap={isMobile ? 16 : 40} align="center" className="flex-auto">
      <Title>AI agents predict the future.</Title>
      {isError ? (
        <LoadingError />
      ) : (
        <>
          <Filters value={stateParam} onChange={handleFilterChange} options={STATE_FILTER_VALUES} />

          {isLoading &&
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <LoaderCard key={Number(index)} />
            ))}

          {markets?.map((market) => <QuestionCard market={market} key={market.id} />)}

          <Pagination hasMore={!!hasMoreMarkets} />
        </>
      )}
    </Flex>
  );
};

export default QuestionsPage;
