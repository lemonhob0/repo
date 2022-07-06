import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { MyCookie } from "pages/_app";
import Style from "styles/subj/content/index.module.scss";
import Info from "./info";
import List from "./list";

const SUBJ_LIST = gql`
  query ($mod: String!, $unit: String!, $uid: ID!) {
    subjList(mod: $mod, unit: $unit, uid: $uid) {
      title
      done
    }
  }
`;

export default function Content() {
  const router = useRouter();
  const cookie = useContext(MyCookie);
  const { mod, unit, subj,pindex } = router.query;
  const [list, setList] = useState([]);
  const [subjme, { loading,called,refetch }] = useLazyQuery(SUBJ_LIST, {
    onCompleted: (data) => {
      const { subjList } = data;
      console.log('holo ?')
      if (subjList) setList(subjList);
      else router.replace("/app");
    },
    notifyOnNetworkStatusChange: true
  });

  useEffect(() => {
    if (subj && !loading && cookie)
      if(called)
      refetch( { mod, unit, uid: cookie.uid })
      else subjme({ variables: { mod, unit, uid: cookie.uid } })
  }, [subj, cookie]);

  return (
    <section className={Style.content}>
      {list.length > 0 && (
        <>
          <Info
            props={{
              subj: parseInt(subj),
              title: list[parseInt(subj)].title,
              length: list.length - 1,
              mod,
              unit,
            }}
          />
          <List
            props={{
              list,
              mod,
              unit,
              subj,
              pindex
            }}
          />
        </>
      )}
    </section>
  );
}
