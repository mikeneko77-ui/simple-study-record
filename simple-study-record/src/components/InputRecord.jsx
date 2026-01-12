export const InputRecord = (props) => {
  const formStyle = { display: "flex", alignItems: "center" };
  const {
    studyContent,
    studyDuration,
    onChangeStudyContent,
    onChangeStudyDuration,
    onClickAdd,
  } = props;
  return (
    <>
      <div style={formStyle}>
        <label>学習内容</label>
        <input
          type="text"
          value={studyContent}
          onChange={onChangeStudyContent}
        />
      </div>

      <div style={formStyle}>
        <label>学習時間</label>
        <input
          type="number"
          value={studyDuration}
          onChange={onChangeStudyDuration}
        />
        <label>時間</label>
      </div>

      <div>
        <p>{`入力されている学習内容: ${studyContent}`}</p>
        <p>{`入力されている時間: ${studyDuration}時間`}</p>
      </div>

      <button onClick={onClickAdd}>登録</button>
    </>
  );
};
