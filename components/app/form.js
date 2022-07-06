import { useRef, useEffect, useState } from "react";
import Style from "styles/app/form.module.scss";
export default function ModFind({ props }) {
  const { find, loading, typingHandler } = props;
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef();
  const focusMe = () => {
    const { current } = inputRef;
    setIsFocus(current === document.activeElement);
  };
  useEffect(() => {
    document.addEventListener("click", focusMe);
    return () => {
      document.addEventListener("click", focusMe);
    };
  }, []);

  return (
    <form
      className={`${Style.form} ${loading ? Style.loading : "nono"}`}
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <input
        ref={inputRef}
        value={find}
        onChange={typingHandler}
        type="text"
        placeholder="ابحث عن درس..."
        className={isFocus && !loading ? Style.focus : "nono"}
      />
    </form>
  );
}
