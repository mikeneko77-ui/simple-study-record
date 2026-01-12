export const RecordsHistory = ({ records, onDelete }) => {
  return (
    <ul>
      {records.map((record) => (
        <li key={record.id}>
          {record.title}: {record.time}時間
          <button onClick={() => onDelete(record.id)}>削除</button>
        </li>
      ))}
    </ul>
  );
};
