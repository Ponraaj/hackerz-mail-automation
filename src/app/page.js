import EmailForm from "@/components/EmailForm"
import UploadButton from "@/components/UploadButton";
export default function Home() {
  const handleUploadNavigate = () => {
    router.push('/upload');
  };

  return (
    <>
    <div>
      <EmailForm />
    </div>
    <div>
    <div className="flex pt-4 justify-center">
          <UploadButton />
        </div>

      </div>
    </>

  )
}
