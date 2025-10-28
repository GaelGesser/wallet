'use client';

import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface IconPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

const iconList = [
  'Home',
  'ShoppingCart',
  'Coffee',
  'Utensils',
  'Car',
  'Bus',
  'Train',
  'Plane',
  'Heart',
  'Star',
  'Gift',
  'Music',
  'Film',
  'Smartphone',
  'Laptop',
  'Book',
  'GraduationCap',
  'Briefcase',
  'DollarSign',
  'CreditCard',
  'PiggyBank',
  'TrendingUp',
  'TrendingDown',
  'Activity',
  'BarChart',
  'PieChart',
  'ShoppingBag',
  'Package',
  'Shirt',
  'Watch',
  'Glasses',
  'Zap',
  'Flame',
  'Droplet',
  'Sun',
  'Moon',
  'Cloud',
  'Umbrella',
  'TreePine',
  'Leaf',
  'Flower',
  'Pizza',
  'IceCream',
  'Cake',
  'Wine',
  'Beer',
  'Salad',
  'Apple',
  'Banana',
  'Carrot',
  'Fish',
  'Beef',
  'Pill',
  'Syringe',
  'Stethoscope',
  'Dumbbell',
  'Bike',
  'Football',
  'Gamepad',
  'Trophy',
  'Medal',
  'Target',
  'Flag',
  'MapPin',
  'Globe',
  'Building',
  'Building2',
  'Store',
  'Warehouse',
  'Factory',
  'Hotel',
  'Church',
  'Landmark',
  'Wallet',
  'Coins',
  'Banknote',
  'Receipt',
  'FileText',
  'Folder',
  'Archive',
  'Inbox',
  'Send',
  'Mail',
  'Phone',
  'MessageCircle',
  'Bell',
  'Calendar',
  'Clock',
  'Timer',
  'AlarmClock',
  'Hourglass',
  'Camera',
  'Video',
  'Image',
  'Palette',
  'Brush',
  'Scissors',
  'Wrench',
  'Hammer',
  'Screwdriver',
  'Settings',
  'Sliders',
  'Power',
  'Plug',
  'Battery',
  'Wifi',
  'Bluetooth',
  'Usb',
  'Printer',
  'Monitor',
  'Tv',
  'Speaker',
  'Headphones',
  'Mic',
  'Radio',
  'Key',
  'Lock',
  'Unlock',
  'Shield',
  'Award',
  'Sparkles',
  'Crown',
  'Diamond',
  'Gem',
  'Circle',
];

export function IconPicker({ value = 'Circle', onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const SelectedIcon = (LucideIcons[
    value as keyof typeof LucideIcons
  ] || LucideIcons.Circle) as React.ComponentType<{ className?: string }>;

  const filteredIcons = iconList.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start gap-2',
            !value && 'text-muted-foreground'
          )}
        >
          <SelectedIcon className="h-4 w-4" />
          {value || 'Selecione um ícone'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Buscar ícone..."
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            <CommandEmpty>Nenhum ícone encontrado.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {filteredIcons.map((name) => {
                const Icon = (LucideIcons[
                  name as keyof typeof LucideIcons
                ] || LucideIcons.Circle) as React.ComponentType<{
                  className?: string;
                }>;
                return (
                  <CommandItem
                    key={name}
                    value={name}
                    onSelect={() => {
                      onChange?.(name);
                      setOpen(false);
                    }}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

