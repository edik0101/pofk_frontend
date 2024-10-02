/* eslint-disable react/no-children-prop */
"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GripVerticalIcon, X } from "lucide-react";

type Item = {
  id: string;
  name: string;
  activityType: string;
  description: string;
  children?: Item[];
};

const initialItems: Item[] = [
  {
    id: "1",
    name: "АМО поступления",
    activityType: "Финансовая",
    description: "Вложение денег собственниками",
  },
  {
    id: "2",
    name: "Возврат займа учредителем",
    activityType: "Финансовая",
    description: "Возврат займа",
    children: [
      {
        id: "3",
        name: "Ввод средств",
        activityType: "Инвестиционная",
        description: "Вложение денег собственниками",
      },
      {
        id: "4",
        name: "Возврат подотчетных денег",
        activityType: "Инвестиционная",
        description: "Возврат займа",
      },
      {
        id: "5",
        name: "Возврат займа учредителем",
        activityType: "Инвестиционная",
        description: "Возврат займа",
      },
    ],
  },
  {
    id: "6",
    name: "АМО поступления",
    activityType: "Финансовая",
    description: "Вернул сотрудник для списания",
  },
  {
    id: "7",
    name: "АМО поступления",
    activityType: "Финансовая",
    description: "Ассистент-главный",
  },
];

function SortableRow({
  item,
  onRemove,
  level = 0,
}: {
  item: Item;
  onRemove: (id: string) => void;
  level?: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <TableRow
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={`cursor-move ${isDragging ? "opacity-50" : ""} ${level > 0 ? "bg-blue-200" : ""}`}
      >
        <TableCell
          className={`${item.children ? "text-blue-500" : ""} ${level > 0 ? "pl-8" : ""}`}
          {...listeners}
        >
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2">
              <GripVerticalIcon className="h-4" />
            </Button>
            <span>{item.name}</span>
          </div>
        </TableCell>
        <TableCell {...listeners}>{item.activityType}</TableCell>
        <TableCell {...listeners}>{item.description}</TableCell>
        <TableCell>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              e.preventDefault();
              console.log(e, item.id);
              onRemove(item.id);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>
      {item.children && (
        <ChildrenRows
          children={item.children}
          onRemove={onRemove}
          level={level + 1}
        />
      )}
    </>
  );
}

function ChildrenRows({
  children,
  onRemove,
  level,
}: {
  children: Item[];
  onRemove: (id: string) => void;
  level: number;
}) {
  return (
    <SortableContext
      items={children.map((child) => child.id)}
      strategy={verticalListSortingStrategy}
    >
      {children.map((child) => (
        <SortableRow
          key={child.id}
          item={child}
          onRemove={onRemove}
          level={level}
        />
      ))}
    </SortableContext>
  );
}

function DraggingRow({ item, level = 0 }: { item: Item; level?: number }) {
  return (
    <TableRow className="bg-muted shadow-md">
      <TableCell className={`${level > 0 ? "pl-8" : ""}`}>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2">
            <GripVerticalIcon className="h-4" />
          </Button>
          <span>{item.name}</span>
        </div>
      </TableCell>
      <TableCell>{item.activityType}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>
        <Button variant="ghost" size="icon" disabled>
          <X className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default function NestedDraggableTable() {
  const [items, setItems] = useState(initialItems);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeLevel, setActiveLevel] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    console.log(event);
    const { active } = event;
    setActiveId(event.active.id);
    setActiveLevel(getItemLevel(items, active.id as string));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((prevItems) => {
        if (activeLevel !== 0) {
          const parentIndex = prevItems.findIndex(
            (item) =>
              item.children &&
              item.children.find((child) => child.id === active.id),
          );

          if (parentIndex !== -1) {
            const activeIndex = prevItems[parentIndex]!.children!.findIndex(
              (child) => child.id === active.id,
            );
            const overIndex = prevItems[parentIndex]!.children!.findIndex(
              (child) => child.id === over?.id,
            );
            const sortedParent = arrayMove(
              prevItems[parentIndex]!.children ?? [],
              activeIndex,
              overIndex,
            );
            return prevItems.map((item, ind) =>
              ind === parentIndex ? { ...item, children: sortedParent } : item,
            );
          }
        } else {
          const activeIndex = prevItems.findIndex(
            (item) => item.id === active.id,
          );
          const overIndex = prevItems.findIndex((item) => item.id === over?.id);
          if (activeIndex !== -1 && overIndex !== -1) {
            return arrayMove(prevItems, activeIndex, overIndex);
          }
        }
        return prevItems;
      });
    }
    setActiveId(null);
    setActiveLevel(0);
  }

  const removeItem = (id: string) => {
    console.log(id);
    setItems((items) => removeItemById(items, id));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Table className="rounded-md border border-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Вид деятельности</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <SortableRow key={item.id} item={item} onRemove={removeItem} />
            ))}
          </SortableContext>
        </TableBody>
      </Table>
      <DragOverlay>
        {activeId ? (
          <DraggingRow
            item={findItemById(items, activeId as string)!}
            level={activeLevel}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function findItemById(items: Item[], id: string): Item | undefined {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }
}

function removeItemById(items: Item[], id: string): Item[] {
  return items.reduce((acc: Item[], item) => {
    if (item.id !== id) {
      if (item.children) {
        const newChildren = removeItemById(item.children, id);
        if (newChildren.length > 0) {
          item = { ...item, children: newChildren };
        } else {
          item = { ...item };
          delete item.children;
        }
      }
      acc.push(item);
    }
    return acc;
  }, []);
}

function getItemLevel(items: Item[], id: string, level = 0): number {
  for (const item of items) {
    if (item.id === id) return level;
    if (item.children) {
      const childLevel = getItemLevel(item.children, id, level + 1);
      if (childLevel !== -1) return childLevel;
    }
  }
  return -1;
}
