import Style from "styles/subj/content/list.module.scss";
import {useRouter} from "next/router";
import { PlayBtn } from "components/svg/ui";

export default function List({ props }) {
  const { list, mod, unit, subj } = props;
  const router = useRouter()
  const clickHandler = url=>{
    router.push(url,undefined,{scroll:false}) 
  }
  return (
    <div className={Style.list}>
      <p>دروس</p>
      <ul>
        {list.map((e, i) => {
          return (
              <li
                className={
                  i == subj ? Style.select : e.done ? Style.done : Style.yet
                }
                key={i}
                onClick={()=>{clickHandler(`/${mod}/${unit}/${i}?pindex=0`)}}
              >
                <p className="ar">{e.title}</p>
                {i == subj && <PlayBtn />}
              </li>
          );
        })}
      </ul>
    </div>
  );
}
