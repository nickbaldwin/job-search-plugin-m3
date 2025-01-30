import * as React from 'react';

import './table.css';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getExpandedRowModel,
    useReactTable,
    ExpandedState,
} from '@tanstack/react-table';

import { Checkbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/16/solid';

type ColumnSort = {
    id: string;
    desc: boolean;
};
type SortingState = ColumnSort[];

const columnHelper = createColumnHelper<DisplayJob>();

const defaultColumns = [
    columnHelper.display({
        id: 'select-col',
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onChange={row.getToggleSelectedHandler()}
                className="group block size-4 rounded border !bg-white data-[checked]:!bg-blue-500 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500"
            >
                <CheckIcon className="hidden size-4 !fill-black group-data-[checked]:block" />
            </Checkbox>
        ),
        enableResizing: false,
        enableHiding: false,
    }),
    {
        header: 'expand',
        // @ts-expect-error todo
        cell: ({ row }) => {
            return row.getCanExpand() ? (
                <button
                    onClick={row.getToggleExpandedHandler()}
                    style={{ cursor: 'pointer' }}
                >
                    {row.getIsExpanded() ? '👇' : '👉'}
                </button>
            ) : (
                ''
            );
        },
        enableResizing: false,
        enableHiding: false,
    },

    columnHelper.accessor('title', {
        header: () => <span>Title</span>,
    }),
    columnHelper.accessor('description', {
        header: () => <span>description</span>,
    }),
    columnHelper.accessor('location', {
        header: () => <span>location</span>,
    }),
    columnHelper.accessor('remote', {
        header: () => <span>remote</span>,
    }),
    columnHelper.accessor('company', {
        header: () => <span>company</span>,
    }),
    columnHelper.accessor('nowId', {
        header: () => <span>nowId</span>,
    }),
    columnHelper.accessor('jobId', {
        header: () => <span>jobId</span>,
    }),
    columnHelper.accessor('template', {
        header: () => <span>template</span>,
    }),
    columnHelper.accessor('xCode', {
        header: () => <span>xCode</span>,
    }),
    columnHelper.accessor('applyType', {
        header: () => <span>applyType</span>,
    }),

    columnHelper.accessor('formattedDate', {
        header: () => <span>formattedDate</span>,
    }),
    columnHelper.accessor('mesco', {
        header: () => <span>mesco</span>,
    }),
    columnHelper.accessor('provider', {
        header: () => <span>provider</span>,
    }),
    columnHelper.accessor('providerCode', {
        header: () => <span>providerCode</span>,
    }),
    columnHelper.accessor('providerJobId', {
        header: () => <span>providerJobId</span>,
    }),

    columnHelper.accessor('dateRecency', {
        header: () => <span>dateRecency</span>,
    }),
    columnHelper.accessor('ingestionMethod', {
        header: () => <span>ingestionMethod</span>,
    }),
    columnHelper.accessor('pricingType', {
        header: () => <span>pricingType</span>,
    }),
    columnHelper.accessor('seoJobId', {
        header: () => <span>seoJobId</span>,
    }),
    columnHelper.accessor('refCode', {
        header: () => <span>refCode</span>,
    }),

    columnHelper.accessor('validThrough', {
        header: () => <span>validThrough</span>,
    }),
    columnHelper.accessor('url', {
        header: () => <span>url</span>,
    }),
    columnHelper.accessor('jobType', {
        header: () => <span>jobType</span>,
    }),
    columnHelper.accessor('adProvider', {
        header: () => <span>adProvider</span>,
    }),
    columnHelper.accessor('searchEngine', {
        header: () => <span>searchEngine</span>,
    }),

    columnHelper.accessor('decisionId', {
        header: () => <span>decisionId</span>,
    }),
    columnHelper.accessor('adRank', {
        header: () => <span>adRank</span>,
    }),
    columnHelper.accessor('remainder', {
        header: () => <span>remainder</span>,
    }),
    columnHelper.accessor('relevanceScore', {
        header: () => <span>relevanceScore</span>,
    }),
    columnHelper.accessor('ecpm', {
        header: () => <span>ecpm</span>,
    }),

    columnHelper.accessor('price', {
        header: () => <span>price</span>,
    }),
    columnHelper.accessor('campaignId', {
        header: () => <span>campaignId</span>,
    }),
    columnHelper.accessor('position', {
        header: () => <span>position</span>,
    }),
];

export function Table({
    results,
    hiddenSettings,
}: {
    results: DisplayJob[];
    hiddenSettings: object;
}) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const [expanded, setExpanded] = React.useState<ExpandedState>({});
    // todo - pass this in as a prop

    const [columns] = React.useState<typeof defaultColumns>(() => [
        ...defaultColumns,
    ]);
    const table = useReactTable({
        data: results,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            columnVisibility: {
                ...hiddenSettings,

                'select-col': true,
                expand: true, //hide this column by default

                data: false,
                decisionId: false,
                kevelData: false,
                selected: false,
            },

            rowSelection,
            expanded: expanded, // must pass expanded state back to the table
        },
        onExpandedChange: setExpanded,
        enableRowSelection: true, //enable row selection for all rows
        onRowSelectionChange: setRowSelection,
        enableMultiRowSelection: false,
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand: (row) => true,
        defaultColumn: {
            minSize: 20,
            maxSize: 300,
        },
        columnResizeMode: 'onChange', // todo try "onChange"
        columnResizeDirection: 'ltr',
    });

    return (
        <div style={{ direction: table.options.columnResizeDirection }}>
            <div className="p-2">
                <div>
                    <table
                        {...{
                            className: 'results',
                            style: {
                                width: table.getCenterTotalSize(),
                            },
                        }}
                    >
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            {...{
                                                key: header.id,
                                                colSpan: header.colSpan,
                                                style: {
                                                    width: header.getSize(),
                                                },
                                            }}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    className={
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : ''
                                                    }
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    title={
                                                        header.column.getCanSort()
                                                            ? header.column.getNextSortingOrder() ===
                                                              'asc'
                                                                ? 'Sort ascending'
                                                                : header.column.getNextSortingOrder() ===
                                                                    'desc'
                                                                  ? 'Sort descending'
                                                                  : 'Clear sort'
                                                            : undefined
                                                    }
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: ' 🔼',
                                                        desc: ' 🔽',
                                                    }[
                                                        header.column.getIsSorted() as string
                                                    ] ?? null}

                                                    <div
                                                        {...{
                                                            onDoubleClick: () =>
                                                                header.column.resetSize(),
                                                            onMouseDown:
                                                                header.getResizeHandler(),
                                                            onTouchStart:
                                                                header.getResizeHandler(),
                                                            className: `resizer ${
                                                                table.options
                                                                    .columnResizeDirection
                                                            } ${
                                                                header.column.getIsResizing()
                                                                    ? 'isResizing'
                                                                    : ''
                                                            }`,
                                                        }}
                                                    >
                                                        &gt;
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <React.Fragment key={row.id}>
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                style={{
                                                    width: cell.column.getSize(),
                                                }}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                    {row.getIsExpanded() && (
                                        <tr>
                                            <td
                                                colSpan={
                                                    row.getAllCells().length
                                                }
                                            >
                                                Expanded details here
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
