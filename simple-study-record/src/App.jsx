import { useState, useEffect } from "react";
import { selectAll } from "../utils/supabase";
import { InputRecord } from "./components/InputRecord";
import { RecordsHistory } from "./components/RecordsHistory";
import { RecordsValidator } from "./components/RecordsValidator";
import { TotalRecords } from "./components/TotalRecords";

export const App = () => {
  const [studyContent, setStudyContent] = useState("");
  const [studyDuration, setStudyDuration] = useState(0);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await selectAll();
      if (data) {
        setRecords(data);
      }
    };
    fetchRecords();
  }, []);

  const onChangeStudyContent = (event) => {
    setStudyContent(event.target.value);
  };

  const onChangeStudyDuration = (event) => {
    setStudyDuration(event.target.value);
  };

  const onClickAdd = () => {
    const contentIsNull = studyContent.length === 0;
    const durationIsNull = studyDuration === 0;
    if (contentIsNull || durationIsNull) {
      setError(true);
    } else {
      const newRecords = [
        ...records,
        { title: studyContent, time: studyDuration },
      ];
      setRecords(newRecords);
      setError(false);
      setStudyContent("");
      setStudyDuration(0);
    }
  };

  return (
    <>
      <InputRecord
        studyContent={studyContent}
        studyDuration={studyDuration}
        onChangeStudyContent={onChangeStudyContent}
        onChangeStudyDuration={onChangeStudyDuration}
        onClickAdd={onClickAdd}
      />
      <RecordsValidator error={error} />
      <RecordsHistory records={records} />
      <TotalRecords records={records} />
    </>
  );
};
