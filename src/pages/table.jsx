import { MemesTable } from "@/components/MemesTable";

const TablePage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Meme Table</h1>

      <MemesTable />
    </div>
  );
};

export default TablePage;
