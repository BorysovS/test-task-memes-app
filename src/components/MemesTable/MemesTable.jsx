import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
} from "@heroui/react";

import { EditModal } from "../EditModal";

import { getAllMemes, updateMemes } from "@/api-services";

import { EditIcon } from "../icons";

const columns = [
  { name: "ID", uid: "id" },
  { name: "Назва", uid: "name" },
  { name: "Кількість лайків", uid: "likes" },
  { name: "Дії", uid: "actions" },
];

export const MemesTable = () => {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        setLoading(true);

        const data = await getAllMemes();

        if (Array.isArray(data)) {
          const validMemes = data.filter(
            (meme) =>
              meme &&
              typeof meme === "object" &&
              "id" in meme &&
              "name" in meme &&
              "image" in meme &&
              "likes" in meme
          );

          setMemes(validMemes);
        } else {
          setError("Невірний формат даних з API.");
        }
      } catch (err) {
        setError("Не вдалося завантажити меми. Спробуйте ще раз.");
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  const updateMeme = async (updatedMeme) => {
    try {
      const updatedData = await updateMemes(updatedMeme.id, updatedMeme);
      const updatedMemes = memes.map((meme) =>
        meme.id === updatedData.id ? updatedData : meme
      );

      setMemes(updatedMemes);

      setSelectedMeme(null);
    } catch (err) {
      setError("Не вдалося оновити мем. Спробуйте ще раз.");
    }
  };

  const renderCell = useCallback((meme, columnKey) => {
    const cellValue = meme[columnKey];

    switch (columnKey) {
      case "id":
        return <span>{cellValue}</span>;
      case "name":
        return <span>{cellValue}</span>;
      case "likes":
        return <span>{cellValue}</span>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2 justify-center">
            <Tooltip content="Редагувати мем">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Button
                  onClick={() => {
                    setSelectedMeme(meme);
                  }}
                  variant="flat"
                  className="text-lg text-default-400"
                >
                  <EditIcon />
                </Button>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-600">Завантаження...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!memes.length) {
    return <div className="p-4 text-gray-600">Меми відсутні.</div>;
  }

  return (
    <div className="p-4">
      <Table aria-label="Таблиця мемів">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={memes}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {selectedMeme && (
        <EditModal
          meme={selectedMeme}
          onClose={() => setSelectedMeme(null)}
          onSave={updateMeme}
        />
      )}
    </div>
  );
};
