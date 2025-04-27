import Chat from "@/components/chat";
import FileUploadCard from "@/components/fileuploadcard";

export default function Home() {
  return (
    <div>
      <div className="w-screen h-screen flex">
        <div className="w-[30vw] min-h-screen p-4">
          <FileUploadCard />
        </div>
        <div className="w-[70vw] min-h-screen border-l-4 px-2">
          <Chat />
        </div>
      </div>
    </div>
  );
}
