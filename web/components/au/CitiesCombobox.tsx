"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const aucities = [
    {
        value: "sydney",
        label: "Sydney",
    },
    {
        value: "melbourne",
        label: "Melbourne",
    }
]

interface CitiesComboboxProps {
    selectedCity?: string;
}

const CitiesCombobox: React.FC<CitiesComboboxProps> = ({ selectedCity = "sydney" }) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(selectedCity)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className={cn('text-16 border-none bg-black-1 text-gray-1')}>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value ? aucities.find((city) => city.value === value)?.label : "Select city"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                <Command>
                    <CommandInput placeholder="Search for cities" />
                    <CommandList>
                        <CommandEmpty>No city found</CommandEmpty>
                        <CommandGroup>
                            {aucities.map((city) => (
                                <CommandItem
                                    className="focus:bg-orange-1"
                                    key={city.value}
                                    value={city.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === city.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {city.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default CitiesCombobox