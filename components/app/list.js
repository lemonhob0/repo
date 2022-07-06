import Style from "styles/app/list.module.scss";
export default function ModList({ props }) {
  const { loading, result, find } = props;
  return (
    <>
      {result.length > 0 ? (
        <>
          <ul
            style={{ opacity: loading ? 0.5 : 1 }}
            className={`${Style.list} ${find ? Style.focus : ""}`}
          >
            {result.map((e, i) => (
              <Card key={`mod_${i}`} obj={e} />
            ))}
          </ul>
        </>
      ) : (
        !loading && (
          <h1 className="ar">
            <span className="en">"{find}"</span>, غير موجود !
          </h1>
        )
      )}
    </>
  );
}

import Link from "next/link";
import Progress from "components/layout/progress";

function Card({ obj }) {
  const { mod, progress, ban, sub } = obj;

  return (
    <>
      <Link href={`/${mod}`}>
        <li className={progress === 100 ? Style.done : "notyet"}>
          <Banner ban={ban} />
          <article>
            <h1 className="en">{mod}</h1>
            <p className="ar">{sub || "لنكمل التعلم !"}</p>
            <Progress
              color={progress === 100 ? "purple" : "blue"}
              progress={progress}
              height={"2em"}
              mod={mod}
            />
          </article>
        </li>
      </Link>
    </>
  );
}

function Banner({ ban }) {
  return (
    <div
      style={{
        backgroundImage: ban ? `url('/${ban}.webp')` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    ></div>
  );
}
