'use client';

import * as LucideIcons from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IconPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

const iconList = [
  { name: 'Home', label: 'Casa' },
  { name: 'ShoppingCart', label: 'Carrinho de Compras' },
  { name: 'Coffee', label: 'Café' },
  { name: 'Utensils', label: 'Utensílios' },
  { name: 'Car', label: 'Carro' },
  { name: 'Bus', label: 'Ônibus' },
  { name: 'Train', label: 'Trem' },
  { name: 'Plane', label: 'Avião' },
  { name: 'Heart', label: 'Coração' },
  { name: 'Star', label: 'Estrela' },
  { name: 'Gift', label: 'Presente' },
  { name: 'Music', label: 'Música' },
  { name: 'Film', label: 'Filme' },
  { name: 'Smartphone', label: 'Smartphone' },
  { name: 'Laptop', label: 'Notebook' },
  { name: 'Book', label: 'Livro' },
  { name: 'GraduationCap', label: 'Capelo de Formatura' },
  { name: 'Briefcase', label: 'Maleta' },
  { name: 'DollarSign', label: 'Cifrão' },
  { name: 'CreditCard', label: 'Cartão de Crédito' },
  { name: 'PiggyBank', label: 'Cofrinho' },
  { name: 'TrendingUp', label: 'Tendência de Alta' },
  { name: 'TrendingDown', label: 'Tendência de Baixa' },
  { name: 'Activity', label: 'Atividade' },
  { name: 'BarChart', label: 'Gráfico de Barras' },
  { name: 'PieChart', label: 'Gráfico de Pizza' },
  { name: 'ShoppingBag', label: 'Sacola de Compras' },
  { name: 'Package', label: 'Pacote' },
  { name: 'Shirt', label: 'Camisa' },
  { name: 'Watch', label: 'Relógio' },
  { name: 'Glasses', label: 'Óculos' },
  { name: 'Zap', label: 'Raio' },
  { name: 'Flame', label: 'Chama' },
  { name: 'Droplet', label: 'Gota' },
  { name: 'Sun', label: 'Sol' },
  { name: 'Moon', label: 'Lua' },
  { name: 'Cloud', label: 'Nuvem' },
  { name: 'Umbrella', label: 'Guarda-chuva' },
  { name: 'TreePine', label: 'Pinheiro' },
  { name: 'Leaf', label: 'Folha' },
  { name: 'Flower', label: 'Flor' },
  { name: 'Pizza', label: 'Pizza' },
  { name: 'IceCream', label: 'Sorvete' },
  { name: 'Cake', label: 'Bolo' },
  { name: 'Wine', label: 'Vinho' },
  { name: 'Beer', label: 'Cerveja' },
  { name: 'Salad', label: 'Salada' },
  { name: 'Apple', label: 'Maçã' },
  { name: 'Banana', label: 'Banana' },
  { name: 'Carrot', label: 'Cenoura' },
  { name: 'Fish', label: 'Peixe' },
  { name: 'Beef', label: 'Carne' },
  { name: 'Pill', label: 'Comprimido' },
  { name: 'Syringe', label: 'Seringa' },
  { name: 'Stethoscope', label: 'Estetoscópio' },
  { name: 'Dumbbell', label: 'Haltere' },
  { name: 'Bike', label: 'Bicicleta' },
  { name: 'Football', label: 'Futebol' },
  { name: 'Gamepad', label: 'Controle de Jogo' },
  { name: 'Trophy', label: 'Troféu' },
  { name: 'Medal', label: 'Medalha' },
  { name: 'Target', label: 'Alvo' },
  { name: 'Flag', label: 'Bandeira' },
  { name: 'MapPin', label: 'Marcador de Mapa' },
  { name: 'Globe', label: 'Globo' },
  { name: 'Building', label: 'Prédio' },
  { name: 'Building2', label: 'Edifício' },
  { name: 'Store', label: 'Loja' },
  { name: 'Warehouse', label: 'Armazém' },
  { name: 'Factory', label: 'Fábrica' },
  { name: 'Hotel', label: 'Hotel' },
  { name: 'Church', label: 'Igreja' },
  { name: 'Landmark', label: 'Monumento' },
  { name: 'Wallet', label: 'Carteira' },
  { name: 'Coins', label: 'Moedas' },
  { name: 'Banknote', label: 'Nota' },
  { name: 'Receipt', label: 'Recibo' },
  { name: 'FileText', label: 'Documento' },
  { name: 'Folder', label: 'Pasta' },
  { name: 'Archive', label: 'Arquivo' },
  { name: 'Inbox', label: 'Caixa de Entrada' },
  { name: 'Send', label: 'Enviar' },
  { name: 'Mail', label: 'Email' },
  { name: 'Phone', label: 'Telefone' },
  { name: 'MessageCircle', label: 'Mensagem' },
  { name: 'Bell', label: 'Sino' },
  { name: 'Calendar', label: 'Calendário' },
  { name: 'Clock', label: 'Relógio' },
  { name: 'Timer', label: 'Cronômetro' },
  { name: 'AlarmClock', label: 'Despertador' },
  { name: 'Hourglass', label: 'Ampulheta' },
  { name: 'Camera', label: 'Câmera' },
  { name: 'Video', label: 'Vídeo' },
  { name: 'Image', label: 'Imagem' },
  { name: 'Palette', label: 'Paleta' },
  { name: 'Brush', label: 'Pincel' },
  { name: 'Scissors', label: 'Tesoura' },
  { name: 'Wrench', label: 'Chave Inglesa' },
  { name: 'Hammer', label: 'Martelo' },
  { name: 'Screwdriver', label: 'Chave de Fenda' },
  { name: 'Settings', label: 'Configurações' },
  { name: 'Sliders', label: 'Controles' },
  { name: 'Power', label: 'Energia' },
  { name: 'Plug', label: 'Plugue' },
  { name: 'Battery', label: 'Bateria' },
  { name: 'Wifi', label: 'Wi-Fi' },
  { name: 'Bluetooth', label: 'Bluetooth' },
  { name: 'Usb', label: 'USB' },
  { name: 'Printer', label: 'Impressora' },
  { name: 'Monitor', label: 'Monitor' },
  { name: 'Tv', label: 'TV' },
  { name: 'Speaker', label: 'Alto-falante' },
  { name: 'Headphones', label: 'Fones de Ouvido' },
  { name: 'Mic', label: 'Microfone' },
  { name: 'Radio', label: 'Rádio' },
  { name: 'Key', label: 'Chave' },
  { name: 'Lock', label: 'Cadeado' },
  { name: 'Unlock', label: 'Destravar' },
  { name: 'Shield', label: 'Escudo' },
  { name: 'Award', label: 'Prêmio' },
  { name: 'Sparkles', label: 'Brilhos' },
  { name: 'Crown', label: 'Coroa' },
  { name: 'Diamond', label: 'Diamante' },
  { name: 'Gem', label: 'Gema' },
  { name: 'Circle', label: 'Círculo' },
];

export function IconPicker({ value, onChange }: IconPickerProps) {
  const SelectedIcon = (LucideIcons[value as keyof typeof LucideIcons] ||
    LucideIcons.Circle) as React.ComponentType<{ className?: string }>;

  const selectedIconLabel =
    iconList.find((icon) => icon.name === value)?.label || 'Selecione um ícone';

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue>
          <div className="flex items-center gap-2">
            <SelectedIcon className="h-4 w-4" />
            <span>{selectedIconLabel}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {iconList
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((icon) => {
            const Icon = (LucideIcons[icon.name as keyof typeof LucideIcons] ||
              LucideIcons.Circle) as React.ComponentType<{
              className?: string;
            }>;
            return (
              <SelectItem key={icon.name} value={icon.name}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{icon.label}</span>
                </div>
              </SelectItem>
            );
          })}
      </SelectContent>
    </Select>
  );
}
