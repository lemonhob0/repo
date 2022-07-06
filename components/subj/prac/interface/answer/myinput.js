import { CostumeData } from "../../index";
import { ChangeAnswer } from "../index";
import { useContext, useState, useEffect, useRef } from "react";
import Style from "styles/subj/prac/answer/myinput.module.scss";

export default function MyInput({ props }) {
  const { content, index } = props;
  const { answers, setAnswers } = useContext(ChangeAnswer);
  const { result } = useContext(CostumeData);
  const [val, setVal] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    if (!result)
      if (val && val !== answers[index]) setConfirmed(false);
      else if (!val) setConfirmed(null);
  }, [val]);

  const confirmAnswer = e => {
    e.preventDefault();
    if (val) {
      setConfirmed(true);
      setAnswers(arr => {
        arr[index] = val;
        return arr;
      });
    }
  };

  return (
    <form onSubmit={confirmAnswer} className={Style.myinput}>
      <label htmlFor="text">{content}</label>
      <br />
      <Input props={{ setVal, val }} />
      <Button props={{ index, setConfirmed, confirmed, val }} />
    </form>
  );
}

function Input({ props }) {
  const { val, setVal } = props;
  const { result } = useContext(CostumeData);
  const { answers } = useContext(ChangeAnswer);
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef();
  const focusMe = () => {
    const { current } = inputRef;
    setIsFocus(current === document.activeElement);
  };
  const typingHandler = e => {
    if (!result) {
      const { value } = e.target;
      setVal(value);
    }
  };
  useEffect(() => {
    if (answers.length === 0 && val) setVal("");
  }, [answers]);
  useEffect(() => {
    document.addEventListener("click", focusMe);
    return () => {
      document.addEventListener("click", focusMe);
    };
  }, []);

  return (
    <>
      <input
        className={isFocus ? Style.selectme : ""}
        ref={inputRef}
        type="text"
        id="text"
        placeholder="هنا !"
        value={val}
        onChange={typingHandler}
        autoComplete="off"
      />
    </>
  );
}
function Button({ props }) {
  const { index, confirmed } = props;
  const { answers } = useContext(ChangeAnswer);
  const { result } = useContext(CostumeData);

  return (
    <button
      type="submit"
      className={buttonClass(result, index, answers[index], confirmed)}
    >
      {confirmed
        ? "تم التأكيد !"
        : confirmed === false
        ? "قم بالتأكد"
        : "ادخل معطيات"}
    </button>
  );
}
function buttonClass(result, index, myanswer, confirmed) {
  let myclass = "";
  if (result)
    myclass +=
      result.correction[index] === myanswer ? Style.correct : Style.incorrect;
  else
    myclass += confirmed
      ? Style.confirmed
      : confirmed === false
      ? Style.not_confirmed
      : "no_value";

  return myclass;
}
