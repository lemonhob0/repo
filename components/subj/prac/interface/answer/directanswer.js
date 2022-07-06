import { useMyClass, useSelectMe } from "functions/answer";
import Style from "styles/subj/prac/answer/directanswer.module.scss";

export default function DirectAnswer({ props }) {
  const { list, index } = props;
  const selector = useSelectMe(index);
  return (
    <ul className={Style.direct_answer}>
      {list.map((content, i) => (
        <Li
          key={`direct-text-${i}`}
          props={{
            content,
            selector,
            index
          }}
        />
      ))}
    </ul>
  );
}

function Li({ props }) {
  const { content, selector, index } = props;
  const { selected, selectme } = selector;
  const myclass = useMyClass({ content, selected, index });
  return (
    <li className={myclass} onClick={() => selectme(content)}>
      {content}
    </li>
  );
}
