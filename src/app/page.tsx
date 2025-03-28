"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotesView } from "@/components/notes-view"
import { TodoView } from "@/components/todo-view"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddNoteDialog } from "@/components/add-note-dialog"
import { AddTodoDialog } from "@/components/add-todo-dialog"
import type { Note, TodoItem } from "@/lib/types"

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Meeting notes",
      content: "Discuss project timeline and deliverables",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Ideas",
      content: "App redesign concepts and feature improvements",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ])

  const [todos, setTodos] = useState<TodoItem[]>([
    { id: "1", text: "Prepare presentation", completed: false, createdAt: new Date().toISOString() },
    {
      id: "2",
      text: "Review design mockups",
      completed: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    { id: "3", text: "Send weekly report", completed: false, createdAt: new Date().toISOString() },
  ])

  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false)
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("notes")

  const addNote = (note: Omit<Note, "id" | "createdAt">) => {
    const newNote = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setNotes([newNote, ...notes])
  }

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTodos([newTodo, ...todos])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <main className="container max-w-4xl mx-auto p-4 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Notes & Tasks</h1>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-10 w-10"
          onClick={() => (activeTab === "notes" ? setIsAddNoteOpen(true) : setIsAddTodoOpen(true))}
        >
          <PlusCircle className="h-6 w-6" />
        </Button>
      </div>

      <Tabs defaultValue="notes" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="notes" className="text-base">
            Notes
          </TabsTrigger>
          <TabsTrigger value="todos" className="text-base">
            To-Do
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="mt-0">
          <NotesView notes={notes} onUpdateNote={updateNote} onDeleteNote={deleteNote} />
        </TabsContent>

        <TabsContent value="todos" className="mt-0">
          <TodoView todos={todos} onToggleTodo={toggleTodo} onDeleteTodo={deleteTodo} />
        </TabsContent>
      </Tabs>

      <AddNoteDialog open={isAddNoteOpen} onOpenChange={setIsAddNoteOpen} onAddNote={addNote} />

      <AddTodoDialog open={isAddTodoOpen} onOpenChange={setIsAddTodoOpen} onAddTodo={addTodo} />
    </main>
  )
}

