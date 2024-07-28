import { Approval, Collections, getStatementSubscriptionId, Statement } from "delib-npm";
import { store } from "../../../model/store";
import { doc, getDoc } from "firebase/firestore";
import { DB } from "../config";

export async function getUserApprovalFromDB({ statement }: { statement: Statement }): Promise<Approval | undefined> {
    try {
        const user = store.getState().user.user;
        if(!user) throw new Error("User not found");
        const approvalId = getStatementSubscriptionId(statement.statementId, user);
        if (!approvalId) throw new Error("Approval Id not found");

        const approvalRef = doc(DB, Collections.approval, approvalId);
        const approvalSnap = await getDoc(approvalRef);

        if (!approvalSnap.exists()) throw new Error("Approval not found");

        return approvalSnap.data() as Approval;
        
    } catch (error) {
        console.error(error);
        return undefined;
    }
}