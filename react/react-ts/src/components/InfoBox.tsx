import { ReactNode } from "react";

type HintBoxProps = {
  mode: "hint";
  children: ReactNode;
};

type WarningBoxProps = {
  mode: "hint" | "warning";
  severity: "low" | "medium" | "high";
  children: ReactNode;
};
type InfoBoxProps = HintBoxProps | WarningBoxProps;
export default function InfoBox(props: InfoBoxProps) {
  if (props.mode == "hint") {
    return (
      <aside className="infobox infobox-hint">
        <p>{props.children}</p>
      </aside>
    );
  }
  const { severity } = props;
  return (
    <aside className={`infobox infobox-warning warning--${severity}`}>
      <h2>warning</h2>
      <p>{props.children}</p>
    </aside>
  );
}
