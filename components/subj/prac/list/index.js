import { gql, useLazyQuery } from "@apollo/client";
import { MyCookie } from "pages/_app";
import { CostumeData } from "../index";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Style from "styles/subj/prac/list.module.scss";
import Ul from "./ul";

const Prac_List = gql`
  query ($uid: ID!, $mod: String!, $unit: String!, $subj: Int!) {
    practiceList(uid: $uid, mod: $mod, unit: $unit, subj: $subj) {
      pid
      correct
    }
  }
`;

export default function PracList() {
  const cookie = useContext(MyCookie);
  const { setPList, pList } = useContext(CostumeData);
  const router = useRouter();
  const { mod, unit, subj } = router.query;
  const [listme, { loading }] = useLazyQuery(Prac_List, {
    onCompleted: (data) => {
      const { practiceList } = data;
      if (practiceList.length > 0) setPList(practiceList);
    },
  });
  useEffect(() => {
    if (cookie && mod && !loading){
      listme({
        variables: { mod, unit, subj: parseInt(subj), uid: cookie.uid },
      });
    }
  }, [cookie, mod, subj]);
  return (
    <div className={Style.pracList}>
      {loading?<ULoading /> :pList.length > 0 && <Ul loading={loading} />}
      
    </div>
  );
}

function ULoading() {
  return (
    <ul className={Style.uLoading}>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
}
