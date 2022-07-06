import DirectAnswer from "./directanswer";
import MyInput from "./myinput";
import ImgList from "./imglist";

export default function Answer({ props }) {
  const { cat } = props;
  if (cat === "direct-answer") return <DirectAnswer props={props} />;
  if (cat === "input") return <MyInput props={props} />;
  if (cat === "img-list") return <ImgList props={props} />;
}
