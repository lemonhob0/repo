import SelectmeStyle from "styles/subj/prac/answer/selectme.module.scss";
import { CostumeData } from "components/subj/prac";
import { ChangeAnswer } from "components/subj/prac/interface";
import { useState, useEffect, useContext } from "react";
export function useMyClass({ ...props }) {
  const { selected, content, index } = props;
  const { result } = useContext(CostumeData);
  const { answers } = useContext(ChangeAnswer);
  let myclass = `${SelectmeStyle.selectme} `;
  if (selected === content)
    if (result)
      myclass +=
        result.correction[index] === answers[index]
          ? SelectmeStyle.correct
          : SelectmeStyle.incorrect;
    else myclass += SelectmeStyle.selected;
  return myclass;
}

export function useSelectMe(index) {
  const { setAnswers, answers } = useContext(ChangeAnswer);
  const { result } = useContext(CostumeData);
  const [selected, setSelected] = useState(null);

  const selectme = select => {
    if (!result) {
      setSelected(select);
      setAnswers(arr => {
        arr[index] = select;
        return arr;
      });
    }
  };
  useEffect(() => {
    if (answers.length === 0) setSelected(null);
  }, [answers]);

  return { selected, selectme };
}
