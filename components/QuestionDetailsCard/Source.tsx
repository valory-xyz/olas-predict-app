import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import { ArrowUpRight } from 'lucide-react';

import { DashedLink } from 'components/shared/styles';
import { ARTICLE_SOURCE_BY_CREATOR, NA } from 'constants/index';

type SourceProps = {
  id: string;
  creator: string;
};

export const Source = ({ id, creator }: SourceProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getMarketSource', id],
    retry: false,
    queryFn: async () => {
      const response = await fetch(`${ARTICLE_SOURCE_BY_CREATOR[creator]}/${id.toLowerCase()}`);
      const data = await response.json();
      if (data.error) {
        throw data.error;
      }
      return data;
    },
  });

  if (isLoading) return <Skeleton.Input size="small" active />;
  if (isError) return null;

  const article = data.article;
  if (!article) return null;

  return (
    <DashedLink
      target="_blank"
      href={article.url}
      onClick={(e) => e.stopPropagation()}
      className="mb-16"
    >
      Question is based on {article.source?.name || NA} article <ArrowUpRight size={16} />
    </DashedLink>
  );
};
