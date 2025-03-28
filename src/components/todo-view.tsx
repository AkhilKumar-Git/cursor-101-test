"use client"

import type { TodoItem } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface TodoViewProps {
  todos: TodoItem[]
  onToggleTodo: (id: string) => void
  onDeleteTodo: (id: string) => void
}

export function TodoView({ todos, onToggleTodo, onDeleteTodo }: TodoViewProps) {
  const activeTodos = todos.filter((todo) => !todo.completed)
  const completedTodos = todos.filter((todo) => todo.completed)

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground mb-2">No tasks yet</p>
        <p className="text-sm text-muted-foreground">Click the + button to add your first task</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {activeTodos.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tasks</h3>
          {activeTodos.map((todo) => (
            <TodoItemCard key={todo.id} todo={todo} onToggle={onToggleTodo} onDelete={onDeleteTodo} />
          ))}
        </div>
      )}

      {completedTodos.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Completed</h3>
          {completedTodos.map((todo) => (
            <TodoItemCard key={todo.id} todo={todo} onToggle={onToggleTodo} onDelete={onDeleteTodo} />
          ))}
        </div>
      )}
    </div>
  )
}

interface TodoItemCardProps {
  todo: TodoItem
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function TodoItemCard({ todo, onToggle, onDelete }: TodoItemCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 flex items-center gap-3">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          className="h-5 w-5 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <label
            htmlFor={`todo-${todo.id}`}
            className={cn(
              "text-base font-medium cursor-pointer",
              todo.completed && "line-through text-muted-foreground",
            )}
          >
            {todo.text}
          </label>
          <p className="text-xs text-muted-foreground mt-1">{formatDate(todo.createdAt)}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
          onClick={() => onDelete(todo.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

