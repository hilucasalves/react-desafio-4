import { List } from '@/components/List';
import { useState } from 'react';
import useSWR from 'swr';

export default function Home() {
  const [page, setPage] = useState(0);

  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/exchanges/?page=${page}&per_page=1`,
    url => fetch(url).then(res => res.json())
  );

  if (error) {
    return <div>Error</div>;
  }

  return (
    <List
      data={data}
      onNextCallback={() => setPage(currentPage => currentPage + 1)}
    ></List>
  );
}
