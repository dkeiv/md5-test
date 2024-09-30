const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>No.</th>
        <th>Code</th>
        <th>Name</th>
        <th>Genre</th>
        <th>Quantiy</th>
        <th>Price</th>
        <th>Date</th>
      </tr>
    </thead>
  );
};

const List = ({ list }) => {
  return (
    <table className='table table-striped table-hover caption-top'>
      <caption>Book list</caption>
      <TableHeader />
      <tbody>
        {list.map((product, index) => (
          <tr key={product.id}>
            <td>{index + 1}</td>
            <td>{product.code}</td>
            <td>{product.name}</td>
            <td>{product.genre.name}</td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
            <td>{product.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
