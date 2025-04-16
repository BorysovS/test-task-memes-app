import { MemesList } from "@/components/MemesList";

const ListPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Meme List</h1>

      <MemesList />
    </div>
  );
};

export default ListPage;
