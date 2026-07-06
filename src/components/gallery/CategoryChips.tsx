import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Nature",
  "Technology",
  "Architecture",
  "Cars",
  "Food",
  "Travel",
  "Animals",
  "People",
  "Space",
  "Minimalism",
  "Abstract"
];

interface CategoryChipsProps {
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap mb-8">
      <div className="flex w-max space-x-2 p-1">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selected === category ? "default" : "secondary"}
            className={cn(
              "rounded-full px-6 transition-all",
              selected === category 
                ? "shadow-md" 
                : "hover:bg-secondary/80 bg-secondary/50 text-secondary-foreground"
            )}
            onClick={() => onSelect(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  );
}
