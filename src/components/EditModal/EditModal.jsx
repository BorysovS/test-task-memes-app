import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  useDisclosure,
} from "@heroui/react";

export const EditModal = ({ meme, onSave, onClose }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState(meme.name);
  const [image, setImage] = useState(meme.image);
  const [likes, setLikes] = useState(meme.likes);

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const validateForm = () => {
    if (name.length < 3 || name.length > 100) {
      alert("Назва має бути від 3 до 100 символів.");

      return false;
    }
    if (!image.match(/\.(jpg|jpeg)$/i) || !image.match(/^https?:\/\/.*$/)) {
      alert("URL зображення має бути коректним посиланням у форматі JPG.");

      return false;
    }
    if (likes < 0 || likes > 99) {
      alert("Лайки мають бути від 0 до 99.");

      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (validateForm()) {
      await onSave({ ...meme, name, image, likes });
      onClose();
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleLikesChange = (e) => {
    const value = e.target.value;

    setLikes(value === "" ? 0 : Number(value));
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        if (!isOpen) onClose();
      }}
      placement="top-center"
      className="max-w-lg"
    >
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Редагувати мем
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="meme-id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ID (лише для читання):
                  </label>
                  <Input
                    id="meme-id"
                    value={meme.id}
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="meme-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Назва:
                  </label>
                  <Input
                    id="meme-name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Введіть назву мему"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="meme-image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    URL зображення (JPG):
                  </label>
                  <Input
                    id="meme-image"
                    value={image}
                    onChange={handleImageChange}
                    placeholder="Введіть URL зображення"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="meme-likes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Лайки (0-99):
                  </label>
                  <Input
                    id="meme-likes"
                    type="number"
                    value={likes.toString()}
                    onChange={handleLikesChange}
                    placeholder="Введіть кількість лайків"
                    className="mt-1"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onCloseModal}>
                Закрити
              </Button>
              <Button
                color="primary"
                onPress={handleSave}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                Зберегти
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
