export const TotalRecords = ({ records }) => {
  return (
    <p>
      合計時間: {records.reduce((sum, record) => sum + Number(record.time), 0)}{" "}
      /1000(h);
    </p>
  );
};
