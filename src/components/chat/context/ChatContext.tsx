import { ChangeEvent, FC, ReactNode, createContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";

interface StreamResponse {
  addMessage: () => void;
  message: string;
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
}

interface ChatContextProviderProps {
  fileId: string;
  children: ReactNode;
}

export const ChatContext = createContext<StreamResponse>({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoading: false,
});

export const ChatContextProvider: FC<ChatContextProviderProps> = ({
  fileId,
  children,
}) => {
  const [message, setMessage] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { toast } = useToast();

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const response = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          fileId,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return response.body;
    },
  });

  const addMessage = (): void => sendMessage({ message });

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(event.target.value);
  };

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
