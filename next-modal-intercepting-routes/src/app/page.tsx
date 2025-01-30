import {API_HOST} from "@/lib/constants";
import {PhotoData} from "@/app/photo/[photoId]/page";
import PhotoDisplay from "@/app/photo/[photoId]/PhotoDisplay";

export default async function Home() {

  const response = await fetch(API_HOST, { cache: 'no-store' })

  const images: PhotoData[] = await response.json()

  if (!images?.length) {
    return <h1>No Images to Display</h1>
  }

  return (
    <main className="flex flex-col items-center gap-8 pb-8">
      {images.map(photoData => (
        <PhotoDisplay key={photoData.id} photoData={photoData} />
      ))}
    </main>
  )

}
