import { useParams } from "react-router-dom";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import Section from "./section/Section";
import {
  DocumentObject,
  statementsToDocument,
} from "../../../controllers/general.ts/statement_helpers";
import NewSection from "./newSection/NewSection";

const Document = () => {
  const { statementId } = useParams<{ statementId: string }>();
  const { statements, isLoading, isError, docStatement } =
    useDocument(statementId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: An error occurred.</div>;
  console.log("statements", statements);
  const documents: DocumentObject[] = statementsToDocument({
    statementId,
    statements,
    parentSectionId: "top",
  });
  console.log("st", documents);

  return (
    <div>
      <h1>Document: {statementId}</h1>
      {docStatement && (
        <>
          {documents.map((document) => (
            <Section
              key={document.statementId}
              document={document}
              docStatement={docStatement}
              statement={docStatement}
            />
          ))}
          <NewSection
            docStatement={docStatement}
            isTop={true}
            parentId={docStatement.statementId}
            order={documents.length}
          />
        </>
      )}
    </div>
  );
};

export default Document;
