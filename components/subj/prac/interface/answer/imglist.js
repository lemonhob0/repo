import { useMyClass, useSelectMe } from "functions/answer";
import Style from "styles/subj/prac/answer/imglist.module.scss";

export default function ImgList({ props }) {
  const { list, index } = props;
  const selector = useSelectMe(index);

  return (
    <ul className={Style.img_list}>
      {list.map((uri, i) => (
        <Li
          key={`img_list${i}`}
          props={{
            uri,
            selector,
            index,
            content: i
          }}
        />
      ))}
    </ul>
  );
}

function Li({ props }) {
  const { content, selector, uri, index } = props;
  const { selected, selectme } = selector;
  const myclass = useMyClass({ content, selected, index });
  return (
    <li className={myclass} onClick={() => selectme(content)}>
      <img src={`https://drive.google.com/uc?export=download&id=${uri}`} />
    </li>
  );
}
