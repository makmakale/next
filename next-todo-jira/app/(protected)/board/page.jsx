import Board from "@/components/pages/board";

export default async function Page() {
  return (
    <div className={'w-full h-full flex flex-col p-4 lg:p-10'}>
      <Board/>
    </div>
  )
}