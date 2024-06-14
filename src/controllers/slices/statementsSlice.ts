import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Statement, updateArray, StatementSchema } from 'delib-npm'


export interface StatementsState {
    statements: Statement[]
}

const initialState: StatementsState = {
    statements: [],
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setStatements: (state, action: PayloadAction<Statement[]>) => {
            try {
                const statements = action.payload;

                statements.forEach((statement) => {
                    try {
                        StatementSchema.parse(statement);
                        state.statements = updateArray(state.statements, statement, "statementId");
                    } catch (error) {
                        console.error("Error setting statement: ", error);
                    }
                });
            } catch (error) {
                console.error("Error setting statements: ", error);
            }
        },
        setStatement: (state, action: PayloadAction<Statement>) => {
            try {
                const statement = action.payload;
                updateArray(state.statements, statement, "statementId");
            } catch (error) {
                console.error("Error setting statement: ", error);
            }
        },
        deleteStatement: (state, action: PayloadAction<string>) => {
            try {
                const statementId = action.payload;
                state.statements = state.statements.filter((statement) => statement.statementId !== statementId);
            } catch (error) {
                console.error("Error deleting statement: ", error);
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { setStatements, setStatement, deleteStatement } = counterSlice.actions

export const selectStatements = (state: { statements: StatementsState }) => state.statements.statements;
export const selectStatement = (state: { statements: StatementsState }, statementId: string) => state.statements.statements.find((statement) => statement.statementId === statementId);

export default counterSlice.reducer