import { useState } from 'react';
import { Checkbox, Field, Label } from '@headlessui/react';

export function Selection() {
    const [enabled, setEnabled] = useState(false);

    return (
        <Field className="flex items-center gap-2">
            <Checkbox
                checked={enabled}
                onChange={setEnabled}
                className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
            >
                o
                <svg
                    className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                >
                    <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Checkbox>
            <Label>Select</Label>
        </Field>
    );
}
