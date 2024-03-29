"use client";

import { FC, useContext, useRef } from "react";
import { Send } from "lucide-react";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { ChatInputProps } from "@/interfaces/components/chat/ChatInputProps";
import { ChatContext } from "./context/ChatContext";

const ChatInput: FC<ChatInputProps> = ({ isDisabled }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addMessage, handleInputChange, isLoading, message } =
    useContext(ChatContext);

  return (
    <div className="absolute bottom-0 left-0 w-full">
      <form
        className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex w-full flex-grow flex-col p-4">
            <div className="relative">
              <Textarea
                rows={1}
                maxRows={4}
                placeholder="Enter your question..."
                autoFocus
                ref={textareaRef}
                onChange={handleInputChange}
                value={message}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addMessage();
                    textareaRef.current?.focus();
                  }
                }}
                className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch resize-none py-3 pr-12 text-base"
              />
              <Button
                className="absolute bottom-[5px] right-[6px]"
                aria-label="send message"
                disabled={isLoading || isDisabled}
                type="submit"
                onClick={() => {
                  addMessage();
                  textareaRef.current?.focus();
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ChatInput;
