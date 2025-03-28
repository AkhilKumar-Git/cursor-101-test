"use client"

import { useState } from "react"
import type { Note } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EditNoteDialog } from "@/components/edit-note-dialog"
import { Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface NotesViewProps {
  notes: Note[]
  onUpdateNote: (note: Note) => void
  onDeleteNote: (id: string) => void
}

export function NotesView({ notes, onUpdateNote, onDeleteNote }: NotesViewProps) {
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null)

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
  }

  const handleDeleteNote = (id: string) => {
    setDeletingNoteId(id)
  }

  const confirmDelete = () => {
    if (deletingNoteId) {
      onDeleteNote(deletingNoteId)
      setDeletingNoteId(null)
    }
  }

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground mb-2">No notes yet</p>
        <p className="text-sm text-muted-foreground">Click the + button to create your first note</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {notes.map((note) => (
        <Card
          key={note.id}
          className="overflow-hidden transition-all hover:shadow-md cursor-pointer"
          onClick={() => handleEditNote(note)}
        >
          <CardContent className="p-5">
            <h3 className="font-medium text-lg mb-2 line-clamp-1">{note.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-4 whitespace-pre-line">{note.content}</p>
          </CardContent>
          <CardFooter className="px-5 py-3 bg-muted/30 flex justify-between">
            <span className="text-xs text-muted-foreground">{formatDate(note.createdAt)}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteNote(note.id)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}

      {editingNote && (
        <EditNoteDialog
          note={editingNote}
          open={!!editingNote}
          onOpenChange={(open) => !open && setEditingNote(null)}
          onUpdateNote={onUpdateNote}
        />
      )}

      <AlertDialog open={!!deletingNoteId} onOpenChange={(open) => !open && setDeletingNoteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Note</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

