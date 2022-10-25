interface ListProps {
  data: object[];
  onNextCallback?: () => any;
  onPrevCallback?: () => any;
  page?: number;
}

export const List = ({
  data,
  onNextCallback = () => {},
  onPrevCallback = () => {},
  page = 1,
}: ListProps) => {
  return (
    <div>
      <button onClick={() => onPrevCallback()} disabled={page === 1}>
        Página Anterior
      </button>
      <button onClick={() => onNextCallback()}>Próxima Página</button>
      <h2>List</h2>
      <ul>
        {data?.length > 0 ? (
          data.map((item: any) => (
            <li key={item.id}>
              <p>{item.name}</p>
              <p>{item.year_stablished}</p>
              <p>{item.country}</p>
              <p>{item.trust_score}</p>
              <p>{item.trade_volume_24h_btc}</p>
            </li>
          ))
        ) : (
          <p>Sem Resultados</p>
        )}
      </ul>
    </div>
  );
};
