import { Card } from 'antd';
import Link from 'next/link';

const { Meta } = Card;

interface MovieData {
  id: string;
  attributes: {
    titles: {
      en_jp: string;
    };
    posterImage: {
      medium: string;
    };
    synopsis: string;
  };
}

interface CustomCardProps {
  movie: MovieData;
}

export const CustomCard = ({ movie }: CustomCardProps): JSX.Element => {
  const truncateSynopsis = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.slice(0, limit) + '...';
    }
    return text;
  };

  return (
    <Link href={`/pages/${movie.id}`} passHref>
      <Card hoverable style={{ width: 240 }} cover={<img alt="example" src={movie.attributes.posterImage.medium} />}>
        <Meta title={movie.attributes.titles.en_jp} description={truncateSynopsis(movie.attributes.synopsis, 100)} />
      </Card>
    </Link>
  );
};