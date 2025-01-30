import {API_HOST} from "@/lib/constants";
import type { PhotoData } from "@/app/photo/[photoId]/page"
import { Modal } from "@/components/Modal"
import PhotoDisplay from "@/app/photo/[photoId]/PhotoDisplay"

type Props = {
    params: {
        photoId: string,
    }
}

export default async function Photo({ params: { photoId } }: Props) {

    const response = await fetch(`${API_HOST}/?id=${photoId}`, { cache: 'no-store' })

    const photoData: PhotoData = await response.json()

    if (!photoData?.id) {
        return (
            <h1 className="text-center">No Photo Found for that ID.</h1>
        )
    }

    return (
        <Modal>
            <PhotoDisplay photoData={photoData} />
        </Modal>
    )
}