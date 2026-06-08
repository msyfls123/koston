import { DocumentViewServerProps } from "payload";
import { Support } from "@/payload-types";
import { SupportViewClient } from "./SupportViewClient";

const SupportView = (props: DocumentViewServerProps) => {
  const doc = props.doc as Support

  return <article className="pt-8 px-15 pb-15">
    <SupportViewClient doc={doc} />
  </article>
}

export default SupportView