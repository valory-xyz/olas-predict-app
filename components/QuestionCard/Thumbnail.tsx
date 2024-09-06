import { useQuery } from '@tanstack/react-query';
import { getMarketThumbnail } from 'graphql/queries';

import { QUESTION_IMAGE_SIZE } from 'constants/index';
import { byte32ToIPFSCIDV0 } from 'utils/ipfs';

import { ThumbnailImage, ThumbnailLoader } from './styles';

type ImageProps = {
  marketId: string;
};

export const Thumbnail = ({ marketId }: ImageProps) => {
  const { data: thumbnailData, isLoading } = useQuery({
    queryKey: ['getThumbnail', marketId],
    queryFn: async () => getMarketThumbnail({ id: marketId }),
    staleTime: Infinity,
    enabled: !!marketId,
  });

  const ipfsHash = thumbnailData?.omenThumbnailMapping?.image_hash
    ? byte32ToIPFSCIDV0(thumbnailData.omenThumbnailMapping.image_hash.slice(2))
    : null;

  if (!ipfsHash) {
    return <ThumbnailLoader active={isLoading} />;
  }

  return (
    <ThumbnailImage
      src={`https://ipfs.io/ipfs/${ipfsHash}`}
      width={QUESTION_IMAGE_SIZE}
      height={QUESTION_IMAGE_SIZE}
      alt="Thumbnail image"
    />
  );
};
