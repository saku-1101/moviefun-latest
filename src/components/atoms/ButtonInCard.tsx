import Button from 'react-bootstrap/Button';

export default function ButtonIconCard(movie_url: string) {
  return (
    <Button href={movie_url} target="_blank">
      VISIT
    </Button>
  );
}
