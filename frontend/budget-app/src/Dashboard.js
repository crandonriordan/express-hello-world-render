const Dashboard = (props) => {
  // eventually will implement actuall and diff once we have tx data
  const tableRows = Object.entries(props.props.budget).map((entry) => {
    return (
      <tr>
        <th scope="row">{entry[0]}</th>
        <td>{entry[1]}</td>
        <td>0</td>
        <td>{entry[1] - 0}</td>
      </tr>
    );
  });
  return (
    <div>
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">Totals</th>
            <th scope="col">Planned</th>
            <th scope="col">Actual</th>
            <th scope="col">Diff</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default Dashboard;
