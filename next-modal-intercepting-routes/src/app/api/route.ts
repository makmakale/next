import { NextRequest, NextResponse } from 'next/server'
import type {PhotoData} from "@/app/photo/[photoId]/page";

const images:PhotoData[]= [
  {
    "id": 1,
    "title": "Americano 1",
    "path": "http://localhost:3000/americano1.jpg"
  },
  {
    "id": 2,
    "title": "Americano 2",
    "path": "http://localhost:3000/americano2.jpg"
  },
  {
    "id": 3,
    "title": "Americano 3",
    "path": "http://localhost:3000/americano3.jpg"
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    // Find specific user
    const image = images.find(i => i.id === parseInt(id))
    return image
      ? NextResponse.json(image)
      : NextResponse.json({ error: 'Image not found' }, { status: 404 })
  }

  return NextResponse.json(images)
}
