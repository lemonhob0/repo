import Answer from "./answer";
import StyleAnswer from "styles/subj/prac/answer/index.module.scss";
import StyleInterface from "styles/subj/prac/interface.module.scss";
export default function Logic({ obj }) {
  const { props, type } = obj;
  if (type === "text") return <Text props={props} />;
  if (type === "img") return <PracImg props={props} />;
  if (type === "datum") return <Datum props={props} />;
  if (type === "text-list") return <TextList props={props} />;
  if (type === "answer")
    return (
      <div className={StyleAnswer.answer}>
        <Answer props={props} />
      </div>
    );
}

function Text({ props }) {
  const { align, content } = props;
  return (
    <div style={{ textAlign: align }} className={StyleInterface.text}>
      <p dir="rtl">{content}</p>
    </div>
  );
}
function PracImg({ props }) {
  const { uri } = props;
  return (
    <div className={StyleInterface.pracImg}>
      <img src={`https://drive.google.com/uc?export=download&id=${uri}`} />
    </div>
  );
}

function Datum({ props }) {
  const { list } = props;
  return (
    <ul className={StyleInterface.datum}>
      {list.map((e, index) => (
        <li key={`datum_${index}`}>{e}</li>
      ))}
    </ul>
  );
}

function TextList({ props }) {
  const { list } = props;
  return (
    <ul className={StyleInterface.text_list}>
      {list.map((e, i) => (
        <li key={i}>{e}</li>
      ))}
    </ul>
  );
}
