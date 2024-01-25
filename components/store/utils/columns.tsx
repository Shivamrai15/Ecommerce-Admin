"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellActions } from "./cell-actions";
import { CategoryCellActions } from "./category-cell-actions";
import { SizeCellActions } from "./size-cell-actions";
import { ColorCellActions } from "./color-cell-actions";
import { ProductCellActions } from "./product-cell-actions";

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
];

export type ColorColumn = {
    id: string
    name : string
    value : string,
    createdAt : string
}

export const colorColumns: ColumnDef<ColorColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
        cell : ({row}) => (
            <div className="flex items-center gap-x-2">
                {row.original.value}
                <div className="h-5 w-6 rounded-full" style={{backgroundColor : row.original.value}} />
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id : "actions",
        cell : ({row}) => <ColorCellActions data={row.original}/>
    }
];


export type ProductColumn = {
    id: string,
    name : string,
    isFeatured : boolean,
    isArchieved : boolean,
    price : string,
    stock : number,
    category : string,
    size : string,
    color : string,
    createdAt : string
}

export const productColumns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "isArchieved",
        header: "Archieved",
    },
    {
        accessorKey: "isFeatured",
        header: "Featured",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell : ({row}) => (
            <div className="flex items-center">
                <div className="h-5 w-6 rounded-full" style={{backgroundColor : row.original.color}} />
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id : "actions",
        cell : ({row}) => <ProductCellActions data={row.original}/>
    }
]
