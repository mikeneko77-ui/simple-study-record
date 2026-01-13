import { useState, useEffect } from "react";
import { insertRecord, selectAll, deleteRecord } from "../utils/supabase";
import { InputRecord } from "./components/InputRecord";
import { RecordsHistory } from "./components/RecordsHistory";
import { RecordsValidator } from "./components/RecordsValidator";
import { TotalRecords } from "./components/TotalRecords";

export const App = () => {
  const [studyContent, setStudyContent] = useState("");
  const [studyDuration, setStudyDuration] = useState(0);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      const data = await selectAll();
      if (data) {
        setRecords(data);
      }
      setLoading(false);
    };
    fetchRecords();
  }, []);

  const onChangeStudyContent = (event) => {
    setStudyContent(event.target.value);
  };

  const onChangeStudyDuration = (event) => {
    setStudyDuration(event.target.value);
  };

  const onClickDelete = async (id) => {
    const success = await deleteRecord(id);
    if (success) {
      setRecords(records.filter((record) => record.id !== id));
    }
  };

  const onClickAdd = async () => {
    const contentIsNull = studyContent.length === 0;
    const durationIsNull = studyDuration === 0;
    if (contentIsNull || durationIsNull) {
      setError(true);
    } else {
      const newRecords = await insertRecord(studyContent, studyDuration);
      if (newRecords) {
        setRecords([...records, ...newRecords]);
      }
      setError(false);
      setStudyContent("");
      setStudyDuration(0);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>学習記録アプリ</h1>
      <InputRecord
        studyContent={studyContent}
        studyDuration={studyDuration}
        onChangeStudyContent={onChangeStudyContent}
        onChangeStudyDuration={onChangeStudyDuration}
        onClickAdd={onClickAdd}
      />
      <RecordsValidator error={error} />
      <RecordsHistory records={records} onDelete={onClickDelete} />
      <TotalRecords records={records} />
    </>
  );
};
