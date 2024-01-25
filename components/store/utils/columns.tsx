"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellActions } from "./cell-actions";
import { CategoryCellActions } from "./category-cell-actions";
import { SizeCellActions } from "./size-cell-actions";

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

export type CategoryColumn = {
    id: string
    name : string
    billboardLabel : string,
    createdAt : string
}

export const categoryColumns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "billboard",
        header: "Billboard",
        cell : ({row}) => row.original.billboardLabel
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id : "actions",
        cell : ({row}) => <CategoryCellActions data={row.original}/>
    }
];

export type SizeColumn = {
    id: string
    name : string
    value : string,
    createdAt : string
}

export const sizeColumns: ColumnDef<SizeColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
        cell : ({row}) => row.original.value
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id : "actions",
        cell : ({row}) => <SizeCellActions data={row.original}/>
    }
]
