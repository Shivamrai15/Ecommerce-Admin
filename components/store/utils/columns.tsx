"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellActions } from "./cell-actions";

export type Billboard = {
    id: string
    label : string
    createdAt : string
}

export const columns: ColumnDef<Billboard>[] = [
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id : "actions",
        cell : ({row}) => <CellActions data={row.original}/>
    }
]
